import { useUserController } from '@lib/user-state';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          COVID-19 App
        </Typography>
        {user !== null ? (
          <UserPopover user={user} handleLogOut={handleLogOut} />
        ) : (
          <Button>Log In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
