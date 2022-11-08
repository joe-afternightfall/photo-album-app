import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import React from 'react';
import { Route } from 'react-router';

import App from './App';
import { appRoutes } from './configs/app-settings/app-routes';
import { getTheme } from './configs/app-settings/theme';

const useStyles = makeStyles(() => createStyles({}));

export default function AppRouter(): JSX.Element {
  const classes = useStyles();

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={getTheme('light')}>
        <CssBaseline />
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
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
}
