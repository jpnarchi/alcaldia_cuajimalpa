import React, { ReactNode } from 'react';

export interface AlertProps {
  children: ReactNode;
  variant?: 'success' | 'error' | 'warning' | 'info';
  icon?: ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'info',
  icon,
  className = '',
}) => {
  const variants = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: 'text-green-600',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: 'text-red-600',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: 'text-yellow-600',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-600',
    },
  };

  const styles = variants[variant];

  return (
    <div
      className={`mb-4 p-3 ${styles.bg} border ${styles.border} rounded-lg flex items-start gap-2 ${className}`}
    >
      {icon && (
        <span className={`${styles.icon} flex-shrink-0 mt-0.5`}>
          {icon}
        </span>
      )}
      <p className={`text-sm ${styles.text}`}>{children}</p>
    </div>
  );
};

