import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useTheme,
  alpha,
  Box,
} from '@mui/material';
import { Login, Dashboard } from '@mui/icons-material';
import { useEffect, useState } from 'react';

interface NavigationProps {
  title?: string;
  showLoginButton?: boolean;
  loginUrl?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  title = "",
  showLoginButton = true,
  loginUrl = "/admin/login"
}) => {
  const theme = useTheme();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    setIsAuthenticated(!!username);
  }, []);

  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: alpha(theme.palette.common.white, 0.95),
        backdropFilter: 'blur(10px)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderBottom: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            component="img"
            src="/logo.png"
            alt="Logo"
            sx={{
              height: 40,
              width: 'auto',
            }}
          />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {showLoginButton && (
          <Button
            variant="contained"
            startIcon={isAuthenticated ? <Dashboard /> : <Login />}
            onClick={() => window.location.href = isAuthenticated ? '/admin' : loginUrl}
            sx={{
              bgcolor: theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                bgcolor: theme.palette.primary.dark,
              },
              px: 3,
              py: 1,
              borderRadius: 2,
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            {isAuthenticated ? 'Panel Admin' : 'Iniciar sesión'}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
