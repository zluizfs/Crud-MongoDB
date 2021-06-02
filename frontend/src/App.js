import Routes from './routes.js'
import { MuiThemeProvider } from '@material-ui/core';

import Navbar from './components/Navbar/index.js';
import theme from './theme/index.js';

import { SnackProvider } from './contexts/SnackContext.js';

import './styles/global.css';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <SnackProvider>
        <Navbar>
          <Routes />
        </Navbar>
      </SnackProvider>
    </MuiThemeProvider>
  );
}

export default App;
