import { postPaquetes } from '@lib/api';
import { Button } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router';

const Barrio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <Button
      onClick={() => {
        void postPaquetes(1, id);
      }}
    >
      Aumentar 1
    </Button>
  );
};

export default Barrio;
