import CssBaseline from '@mui/material/CssBaseline';
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Dispatch } from 'redux';

import App from './App';
import SignInScreen from './components/top-level-components/sign-in-screen/SignInScreen';
import { appRoutes } from './configs/app-settings/app-routes';
import { getTheme } from './configs/app-settings/theme';
import { State } from './configs/redux/store';
import { loadAlbums } from './creators/albums';
import { loadImages } from './creators/images';
import { loadNewUserRequests } from './creators/new-user-requests';
import { loggedInUser } from './creators/user';
import { AuthContext } from './firebase/auth/AuthContext';
import { getAllAlbums } from './firebase/services/firebase-albums-service';
import { getAllImages } from './firebase/services/firebase-images-service';
import { getSignedInUserProfile } from './firebase/services/firebase-users-service';
import { getAllNewUserRequests } from './firebase/services/request-access';

const AppRouter = (props: AppRouterProps): JSX.Element => {
  const { userIsAdmin, initHandler, updateLoggedInUserHandler } = props;
  const user = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      initHandler();
      user.email && updateLoggedInUserHandler();
    }
  }, [user]);

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={getTheme('dark')}>
        <CssBaseline />
        {user ? (
          <App>
            <div className={'route'}>
              {Object.keys(appRoutes).map((name: string, index: number) => {
                const route = appRoutes[name];

                if (route.adminOnly && !userIsAdmin) {
                  // if user isn't an admin, return without rendering
                  return;
                }

                return (
                  <Route
                    key={index}
                    exact
                    path={route.path}
                    component={route.routerComponent}
                  />
                );
              })}
            </div>
          </App>
        ) : (
          <SignInScreen />
        )}
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};

type AppRouterProps = StateProps & DispatchProps;

interface StateProps {
  userIsAdmin: boolean;
}

interface DispatchProps {
  updateLoggedInUserHandler: () => void;
  initHandler: () => void;
}

const mapStateToProps = (state: State): StateProps => {
  return {
    userIsAdmin: state.applicationState.userIsAdmin,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  updateLoggedInUserHandler: async () => {
    const userProfile = await getSignedInUserProfile();
    dispatch(loggedInUser(userProfile));
  },
  initHandler: async () => {
    const albums = await getAllAlbums();
    const images = await getAllImages();
    const requests = await getAllNewUserRequests();

    dispatch(loadAlbums(albums));
    dispatch(loadImages(images));
    dispatch(loadNewUserRequests(requests));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
