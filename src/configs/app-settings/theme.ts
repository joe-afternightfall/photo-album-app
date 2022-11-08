import { createTheme, Palette, Theme, ThemeOptions } from '@mui/material';

interface CustomPalette extends Palette {
  colors: {
    active: {
      light: string;
      main: string;
    };
    accents: {
      pink: string;
      orange: string;
      green: string;
      blue: string;
      purple: string;
    };
  };
}
export interface AppTheme extends Theme {
  palette: CustomPalette;
}

interface AppThemeOptions extends ThemeOptions {
  palette: CustomPalette;
}

export const getTheme = (type: 'light' | 'dark'): Theme => {
  return type === 'dark' ? createDarkTheme() : createLightTheme();
};

const createDarkTheme = (): Theme => {
  return createTheme({
    typography: {
      allVariants: {
        fontFamily: "'Montserrat', sans-serif",
        textTransform: 'none',
      },
    },
    palette: {
      mode: 'dark',
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#651fff',
      },
      colors: {
        active: {
          light: '#C5E6EC',
          main: '#018786',
        },
        accents: {
          // coral: '#f28b82',
          pink: '#E43F78',
          orange: '#EF8C0A',
          green: '#77C74B',
          blue: '#2C9DF0',
          purple: '#725FE7',
        },
      },
    },
  } as unknown as AppThemeOptions);
};

const createLightTheme = (): Theme => {
  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#2196f3',
        // dark: '#22524c',
        // contrastText: '#202124',
      },
      secondary: {
        main: '#651fff',
      },
      colors: {
        active: {
          main: '#10b8a0',
          dark: '#22524c',
        },
        accents: {
          pink: '#E43F78',
          orange: '#EF8C0A',
          green: '#77C74B',
          blue: '#2C9DF0',
          purple: '#725FE7',
        },
      },
    },
  } as unknown as AppThemeOptions);
};
