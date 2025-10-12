import React, { ReactNode } from 'react';

export interface FormCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  onSubmit?: (e: React.FormEvent) => void;
  footer?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const FormCard: React.FC<FormCardProps> = ({
  children,
  title,
  subtitle,
  onSubmit,
  footer,
  maxWidth = 'md',
  className = '',
}) => {
  const widthClasses = {
    sm: 'sm:w-[400px] max-w-[400px]',
    md: 'sm:w-[500px] max-w-[500px]',
    lg: 'sm:w-[600px] max-w-[600px]',
    xl: 'sm:w-[700px] max-w-[700px]',
  };

  return (
    <div className={`w-[95%] ${widthClasses[maxWidth]} bg-white rounded-lg shadow-none ${className}`}>
      <div className="p-4 sm:p-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base text-black">
              {subtitle}
            </p>
          )}
        </div>

        {/* Form Content */}
        <form onSubmit={onSubmit} className="-mb-10">
          {children}
        </form>

        {/* Footer */}
        {footer && (
          <div className="text-center mt-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

