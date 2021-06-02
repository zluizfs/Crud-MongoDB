import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'sans-serif'
    ].join(','),
    fontWeight: 400,
  },
  palette: {
    background: {
      default: '#f2f3f5',
    },
    primary: {
      light: '#a957db',
      main: '#DE5022',
      dark: '#ba431c',
      contrastText: '#fff',
    },
  },
});

export default theme;