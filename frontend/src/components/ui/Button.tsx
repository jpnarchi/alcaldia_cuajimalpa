import React, { CSSProperties, ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  style?: CSSProperties;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  startIcon,
  endIcon,
  fullWidth = false,
  style,
  className,
  type = 'button',
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Estilos base del botón
  const baseStyle: CSSProperties = {
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  // Estilos por tamaño
  const sizeStyles: Record<string, CSSProperties> = {
    small: {
      padding: '4px 12px',
      fontSize: '0.75rem',
      borderRadius: '6px',
    },
    medium: {
      padding: '8px 24px',
      fontSize: '0.875rem',
      borderRadius: '8px',
    },
    large: {
      padding: '12px 32px',
      fontSize: '1rem',
      borderRadius: '10px',
    },
  };

  // Estilos por variante
  const variantStyles: Record<string, { normal: CSSProperties; hover: CSSProperties }> = {
    primary: {
      normal: {
        backgroundColor: '#1976d2',
        color: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      },
      hover: {
        backgroundColor: '#1565c0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      },
    },
    secondary: {
      normal: {
        backgroundColor: '#dc004e',
        color: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      },
      hover: {
        backgroundColor: '#c51162',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      },
    },
    outline: {
      normal: {
        backgroundColor: 'transparent',
        color: '#1976d2',
        border: '2px solid #1976d2',
      },
      hover: {
        backgroundColor: 'rgba(25, 118, 210, 0.08)',
      },
    },
    text: {
      normal: {
        backgroundColor: 'transparent',
        color: '#1976d2',
      },
      hover: {
        backgroundColor: 'rgba(25, 118, 210, 0.08)',
      },
    },
  };

  const currentVariant = variantStyles[variant];
  const buttonStyle: CSSProperties = {
    ...baseStyle,
    ...sizeStyles[size],
    ...currentVariant.normal,
    ...(isHovered && !disabled ? currentVariant.hover : {}),
    ...style,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {startIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{startIcon}</span>}
      {children}
      {endIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{endIcon}</span>}
    </button>
  );
};

