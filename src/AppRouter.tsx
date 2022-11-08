import CssBaseline from '@mui/material/CssBaseline';
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import React, { useContext, useEffect } from 'react';
import { Route } from 'react-router';
import { Store } from 'redux';

import App from './App';
import SignInScreen from './components/top-level-components/SignInScreen';
import { appRoutes } from './configs/app-settings/app-routes';
import { getTheme } from './configs/app-settings/theme';
import { Initializer } from './firebase/Initializer';
import { AuthContext } from './firebase/auth/AuthContext';

export default function AppRouter(props: AppRouterProps): JSX.Element {
  const { store } = props;
  const user = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const initializer = new Initializer(store);
      initializer.initializeFirebase();
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
}

interface AppRouterProps {
  store: Store;
}
