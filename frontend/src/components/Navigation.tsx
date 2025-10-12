import { useEffect, useState } from 'react';
import { LogIn, LayoutDashboard, UserPlus } from 'lucide-react';
import { Button } from './ui';
import '../styles/global.css';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('username');
    setIsAuthenticated(!!username);
  }, []);

  const handleNavigation = () => {
    window.location.href = isAuthenticated ? '/admin' : '/admin';
  };

  const handleRegister = () => {
    window.location.href = '/register';
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="nav-appbar">
      <div className="nav-toolbar">
        <div className="nav-logo-container">
          <img
            src="/logo.png"
            alt="Logo"
            className="nav-logo"
            onClick={handleLogoClick}
            style={{ cursor: 'pointer' }}
          />
          <h6 className="nav-title">
            {title}
          </h6>
        </div>
        <div className="nav-spacer" />
        {showLoginButton && (
          <div className="flex items-center gap-3">
            {!isAuthenticated && (
              <Button
                onClick={handleRegister}
                startIcon={<UserPlus size={20} />}
                variant="outline"
              >
                Registrarse
              </Button>
            )}
            <Button
              onClick={handleNavigation}
              startIcon={isAuthenticated ? <LayoutDashboard size={20} /> : <LogIn size={20} />}
            >
              {isAuthenticated ? 'Panel Admin' : 'Iniciar sesión'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
