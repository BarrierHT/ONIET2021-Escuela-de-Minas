import React from 'react';
import { Box, CircularProgress, Container } from '@mui/material';

const Loader: React.FC = () => {
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: 3 }}>
        <CircularProgress />
      </Box>
    </Container>
  );
};

export default Loader;
