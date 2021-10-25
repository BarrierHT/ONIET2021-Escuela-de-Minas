import { useUserController } from '@lib/user-state';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

const Label = styled('label')({ display: 'block' });

const LogIn: React.FC = () => {
  const userController = useUserController();

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
    <form onSubmit={handleSubmit}>
      <section>
        <Label htmlFor="email">E-mail</Label>
        <input
          type="email"
          autoComplete="username"
          required
          disabled={formLoading}
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </section>
      <section>
        <Label htmlFor="current-password">Contraseña</Label>
        <input
          type="password"
          autoComplete="current-password"
          required
          disabled={formLoading}
          name="current-password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </section>
      <button>Log In</button>
    </form>
  );
};

export default LogIn;
