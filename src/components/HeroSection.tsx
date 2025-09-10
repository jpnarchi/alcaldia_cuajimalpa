import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Dashboard,
  Security,
  Speed,
  TrendingUp,
  ChevronRight,
  Launch,
} from '@mui/icons-material';
import { useStandalonePermissions } from '../hooks/useStandalonePermissions';
import { Navigation } from './Navigation';
import { useEffect, useState } from 'react';

export const HeroSection = () => {
  const theme = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    setIsAuthenticated(!!username);
  }, []);

  return (
    <Box>
      {/* Navigation Bar */}
      <Navigation />

      {/* Hero Content - Full Screen */}
      <Box
        sx={{
          bgcolor: 'white',
          height: '90vh',
          width: '100vw',
          display: 'flex',
        }}
      >
        {/* Left Column - Text */}
        <Box 
          sx={{ 
            width: { xs: '100%', md: '50%' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: { xs: 4, md: 6 },
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, maxWidth: '500px' }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                color: theme.palette.grey[800],
                lineHeight: 1.1,
                mb: 4,
              }}
            >
              Alcaldía de Cuajimalpa de Morelos
            </Typography>
            
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 300,
                color: theme.palette.grey[600],
                lineHeight: 1.4,
                mb: 4,
                fontSize: { xs: '1.5rem', md: '2.125rem' },
              }}
            >
              Atención a Emergencias Urbanas
            </Typography>

            <Button
              variant="contained"
              size="large"
              endIcon={<ChevronRight />}
              onClick={() => window.location.href = isAuthenticated ? '/admin' : '/admin/login'}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: 'white',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
             {isAuthenticated ? 'Panel Admin' : 'Iniciar sesión'}
            </Button>
          </Box>
        </Box>
        
        {/* Right Column - Image (Hidden on mobile) */}
        <Box 
          sx={{ 
            width: '50%',
            height: '100%',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box
            component="img"
            src="/cuajimalpa-banner.jpg"
            alt="Alcaldía de Cuajimalpa de Morelos"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};  