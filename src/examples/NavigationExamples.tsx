import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { Navigation } from '../components/Navigation';

export const NavigationExamples: React.FC = () => {
  return (
    <Box>
      {/* Ejemplo 1: Navigation por defecto */}
      <Paper sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Navigation por defecto
        </Typography>
        <Navigation />
      </Paper>

      {/* Ejemplo 2: Navigation con título personalizado */}
      <Paper sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Navigation con título personalizado
        </Typography>
        <Navigation title="Mi Aplicación" />
      </Paper>

      {/* Ejemplo 3: Navigation sin botón de login */}
      <Paper sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Navigation sin botón de login
        </Typography>
        <Navigation showLoginButton={false} />
      </Paper>

      {/* Ejemplo 4: Navigation con URL de login personalizada */}
      <Paper sx={{ mb: 4, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Navigation con URL de login personalizada
        </Typography>
        <Navigation 
          title="Panel Personalizado" 
          loginUrl="/custom-login" 
        />
      </Paper>
    </Box>
  );
};
