import React from 'react';
import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import theme from '@lib/theme';
import MyAppBar from '@lib/components/MyAppBar';
import { useUserController } from '@lib/user-state';
import LogIn from '@lib/components/LogIn';
import Dashboard from '@lib/components/Dashboard';

const App: React.FC = () => {
  const userController = useUserController();

  const MainView: React.FC = () => {
    if (userController.current === undefined) {
      return (
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'center', margin: 3 }}>
            <CircularProgress />
          </Box>
        </Container>
      );
    } else if (userController.current === null) {
      return <LogIn />;
    }
    return <Dashboard />;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyAppBar />
      <MainView />
    </ThemeProvider>
  );
};

export default App;
