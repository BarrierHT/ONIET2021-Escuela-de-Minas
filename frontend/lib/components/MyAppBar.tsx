import { useUserController } from '@lib/user-state';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import UserPopover from './UserPopover';

const MyAppBar: React.FC = () => {
  const userController = useUserController();
  const user = userController.current;

  const handleLogOut = (setAuthLoading: (v: boolean) => void) => async () => {
    setAuthLoading(true);
    await userController.logOut();
    setAuthLoading(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textDecoration: 'none' }}
          component={RouterLink}
          to="/"
          color="inherit"
        >
          Barrios
        </Typography>
        {user !== null ? (
          <UserPopover user={user} handleLogOut={handleLogOut} />
        ) : (
          <Button component={RouterLink} to="/logIn">
            Iniciar sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
