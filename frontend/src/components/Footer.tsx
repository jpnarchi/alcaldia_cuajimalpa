import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Divider,
  IconButton,
  Link,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Dashboard,
  Login,
  GitHub,
  LinkedIn,
  Email,
  Phone,
  LocationOn,
} from '@mui/icons-material';

export const Footer: React.FC = () => {
  const theme = useTheme();

  const handleAdminAccess = () => {
    window.location.href = '/admin';
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.grey[900],
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Panel Admin
            </Typography>
            <Typography variant="body2" paragraph sx={{ opacity: 0.8 }}>
              Sistema completo de administración con control de permisos, 
              gestión de usuarios y estadísticas en tiempo real.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <IconButton 
                size="small" 
                sx={{ color: 'white', '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) } }}
              >
                <GitHub />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ color: 'white', '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) } }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ color: 'white', '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) } }}
              >
                <Email />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Enlaces Rápidos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Inicio
              </Link>
              <Link href="#features" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Características
              </Link>
              <Link href="#stats" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Estadísticas
              </Link>
              <Link href="#contact" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Contacto
              </Link>
            </Box>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Recursos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Documentación
              </Link>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                API Reference
              </Link>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Tutoriales
              </Link>
              <Link href="#" color="inherit" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                Soporte
              </Link>
            </Box>
          </Grid>

          {/* Admin Access */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Acceso Admin
            </Typography>
            <Button
              variant="contained"
              startIcon={<Dashboard />}
              onClick={handleAdminAccess}
              fullWidth
              sx={{
                bgcolor: theme.palette.primary.main,
                mb: 2,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Panel Admin
            </Button>
            
            <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 1 }}>
              Credenciales requeridas
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: alpha(theme.palette.common.white, 0.2) }} />

        {/* Bottom Section */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              © 2024 Panel Admin. Todos los derechos reservados.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 3 }}>
              <Link href="#" color="inherit" variant="body2" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                Política de Privacidad
              </Link>
              <Link href="#" color="inherit" variant="body2" sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}>
                Términos de Uso
              </Link>
            </Box>
          </Grid>
        </Grid>

        {/* Contact Info */}
        <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${alpha(theme.palette.common.white, 0.1)}` }}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.7 }}>
                <Email fontSize="small" />
                <Typography variant="body2">admin@panel.com</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.7 }}>
                <Phone fontSize="small" />
                <Typography variant="body2">+52 123 456 7890</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.7 }}>
                <LocationOn fontSize="small" />
                <Typography variant="body2">México, CDMX</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};