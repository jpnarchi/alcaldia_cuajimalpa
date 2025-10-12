import React, { ReactNode } from 'react';
import { Navigation } from '../Navigation';

export interface AuthLayoutProps {
  children: ReactNode;
  backgroundImage?: string;
  logo?: string;
  logoAlt?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  backgroundImage = '/cuajimalpa-login.webp',
  logo = '/logo.png',
  logoAlt = 'Logo Alcaldía Cuajimalpa',
}) => {
  return (
    <div className="fixed inset-0 z-[9999] h-screen w-screen overflow-auto bg-white">
      <Navigation />
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Overlay */}
      <div className="fixed inset-0 bg-white/40 z-[1]" />


      {/* Content Container */}
      <div className="relative z-[2] flex items-center justify-center w-full min-h-screen p-2 sm:p-4 py-8">
        {children}
      </div>
    </div>
  );
};

