import { createTheme } from '@mui/material';
import { red, indigo } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: indigo[200] },
    secondary: { main: red[200] },
  },
});

export default theme;
