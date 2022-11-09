import CssBaseline from '@mui/material/CssBaseline';
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Store } from 'redux';
import { Dispatch } from 'redux';

import App from './App';
import SignInScreen from './components/top-level-components/SignInScreen';
import { appRoutes } from './configs/app-settings/app-routes';
import { getTheme } from './configs/app-settings/theme';
import { loggedInUser } from './creators/user';
import { Initializer } from './firebase/Initializer';
import { AuthContext } from './firebase/auth/AuthContext';

const AppRouter = (props: AppRouterProps): JSX.Element => {
  const { store, updateLoggedInUserHandler } = props;
  const user = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const initializer = new Initializer(store);
      initializer.initializeFirebase();
      user.email && updateLoggedInUserHandler(user.email);
    }
  }, [user]);

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={getTheme('light')}>
        <CssBaseline />
        {user ? (
          <App>
            <div className={'route'}>
              {Object.keys(appRoutes).map((name: string, index: number) => {
                const route = appRoutes[name];

                // if (route.adminOnly && !userHasAdminPrivileges) {
                //   // if user isn't an admin, return without rendering
                //   return;
                // }

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

type AppRouterProps = PassedInProps & DispatchProps;

interface PassedInProps {
  store: Store;
}

interface DispatchProps {
  updateLoggedInUserHandler: (email: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  updateLoggedInUserHandler: (email: string) => {
    dispatch(loggedInUser(email));
  },
});

export default connect(null, mapDispatchToProps)(AppRouter);
