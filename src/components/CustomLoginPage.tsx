import React, { useState } from 'react';
import { Login, useLogin, useNotify } from 'react-admin';
import { 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Container,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Estilos personalizados
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 400,
  width: '100%',
  borderRadius: 8,
  boxShadow: 'none',
  backgroundColor: 'white',
  color: 'black',
  border: 'none',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    borderRadius: 8,
    '& fieldset': {
      borderColor: 'black',
    },
    '&:hover fieldset': {
      borderColor: '#1976d2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'black',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  padding: '14px 28px',
  fontSize: '18px',
  fontWeight: 600,
  textTransform: 'none',
  backgroundColor: '#1976d2',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
}));

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login({ username, password });
      notify('¡Bienvenido!', { type: 'success' });
    } catch (err) {
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
      notify('Error de autenticación', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/cuajimalpa-login.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          zIndex: 1,
        },
      }}
    >
      {/* Logo en esquina superior izquierda */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 20, sm: 30 },
          left: { xs: 20, sm: 40 },
          zIndex: 10000,
        }}
      >
        <img 
          src="/logo.png" 
          alt="Logo Alcaldía Cuajimalpa" 
          style={{ 
            height: '60px', 
            width: 'auto',
            objectFit: 'contain'
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          padding: { xs: 1, sm: 2 },
          position: 'relative',
          zIndex: 2,
        }}
      >
        <StyledCard
          sx={{
            width: { xs: '95%', sm: '400px' },
            maxWidth: '400px',
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
            {/* Header */}
            <Box textAlign="center" mb={4}>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', sm: '2rem' }
                }}
              >
                Alcaldía Cuajimalpa de Morelos
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'black',
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                Atención a Emergencias Urbanas
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <StyledTextField
                fullWidth
                label="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <StyledTextField
                fullWidth
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                variant="outlined"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Iniciar Sesión'
                )}
              </StyledButton>
            </form>

            {/* Footer */}
            <Box textAlign="center" mt={3}>
              <Typography variant="body2" sx={{ color: 'black' }}>
                © 2025 Alcaldía Cuajimalpa. Todos los derechos reservados.
              </Typography>
            </Box>
          </CardContent>
        </StyledCard>
      </Box>
    </Box>
  );
};

export const CustomLoginPage = () => (
  <>
    <style>
      {`
        body, html, #root {
          background-color: white !important;
        }
        .MuiCssBaseline-root {
          background-color: white !important;
        }
      `}
    </style>
    <Login>
      <LoginForm />
    </Login>
  </>
);
