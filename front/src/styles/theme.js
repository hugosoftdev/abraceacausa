import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

const palette = {
  primary: {
    main: '#11C3CC',
    dark: '#0F8282',
  },
  secondary: {
    main: '#FBB03B',
    dark: '#CC8A33',
  },
  dark: indigo[900],
};

export default createMuiTheme({
  palette,
  typography: {
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    subtitle2: {
      color: palette.primary.dark,
      fontWeight: 'normal',
    }
  }
});
