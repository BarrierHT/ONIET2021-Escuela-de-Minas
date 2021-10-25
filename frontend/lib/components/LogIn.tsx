import { useUserController } from '@lib/user-state';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Loader from './Loader';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  TextField,
} from '@mui/material';
import Title from './Title';

const LogIn: React.FC = () => {
  const userController = useUserController();

  if (userController.current !== null && userController.current !== undefined)
    return <Redirect to="/" />;
  else if (userController.current === undefined) return <Loader />;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  let stopLoading = () => setFormLoading(false);
  useEffect(
    () => () => {
      stopLoading = () => {
        return;
      };
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    void userController.logIn(email, password).then(stopLoading);
  };

  return (
    <>
      <Title>Iniciar sesión</Title>
      <form onSubmit={handleSubmit}>
        <Container>
          <Card sx={{ margin: 2, padding: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Stack spacing={1}>
                <TextField
                  label="E-mail"
                  type="email"
                  autoComplete="username"
                  required
                  disabled={formLoading}
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Contraseña"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={formLoading}
                  name="current-password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button size="large" variant="contained" type="submit">
                Iniciar Sesión
              </Button>
            </CardActions>
          </Card>
        </Container>
      </form>
    </>
  );
};

export default LogIn;
