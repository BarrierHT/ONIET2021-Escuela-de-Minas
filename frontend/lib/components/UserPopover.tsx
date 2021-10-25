import { UserState } from '@lib/user-state';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Avatar, Button, Popover, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const UserPopover: React.FC<{
  user: UserState;
  handleLogOut: (s: (v: boolean) => void) => () => Promise<void>;
}> = ({ user, handleLogOut }) => {
  if (user === null) return null;

  const [authLoading, setAuthLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleOpen: React.MouseEventHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  let handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(
    () => () => {
      handleClose = () => {
        return;
      };
    },
    []
  );

  const open = Boolean(anchorEl);
  const id = open ? 'user-popover' : undefined;
  return (
    <>
      <Button
        size="large"
        color="inherit"
        startIcon={<AccountCircle />}
        onClick={user !== undefined ? handleOpen : undefined}
        aria-describedby={id}
        sx={{
          textTransform: 'none',
        }}
      >
        {user === undefined ? 'Cargando...' : user.email}
      </Button>
      {user !== undefined ? (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Stack alignItems="center" margin={2}>
            <Avatar>
              <AccountCircle />
            </Avatar>
            <Typography variant="h6">{user.email}</Typography>
            <Button
              disabled={authLoading}
              onClick={handleLogOut(setAuthLoading)}
              variant="contained"
            >
              Cerrar sesión
            </Button>
          </Stack>
        </Popover>
      ) : null}
    </>
  );
};

export default UserPopover;
