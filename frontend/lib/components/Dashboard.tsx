import React from 'react';

import Loader from '@lib/components/Loader';
import { useUserController } from '@lib/user-state';
import { Redirect } from 'react-router-dom';
import Title from './Title';

const Dashboard: React.FC = () => {
  const controller = useUserController();
  if (controller.current === undefined) return <Loader />;
  else if (controller.current === null) return <Redirect to="/logIn" />;

  return (
    <>
      <Title>Dashboard</Title>
    </>
  );
};

export default Dashboard;
