import React from 'react';
import {
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import theme from '@lib/theme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MyAppBar from '@lib/components/MyAppBar';
import LogIn from '@lib/components/LogIn';
import Dashboard from '@lib/components/Dashboard';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MyAppBar />
        <Switch>
          <Route path="/logIn">
            <LogIn />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
