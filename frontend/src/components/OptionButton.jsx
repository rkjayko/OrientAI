import React from 'react';
import { Button } from '@mui/material';

const OptionButton = ({ children, ...props }) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{
        // Usamos el tema para los colores
        backgroundColor: 'background.paper',
        color: 'text.primary',
        border: '2px solid',
        borderColor: 'grey.300',
        justifyContent: 'flex-start',
        padding: '16px',
        textAlign: 'left',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: 'primary.light',
          color: 'white',
          borderColor: 'primary.light',
          boxShadow: 'none',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default OptionButton;