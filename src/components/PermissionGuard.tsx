import React from 'react';
import { usePermissions } from '../hooks/usePermissions';

interface PermissionGuardProps {
  resource: string;
  action: 'list' | 'show' | 'edit' | 'create' | 'delete';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  resource,
  action,
  children,
  fallback = null,
}) => {
  const { hasPermission, loading } = usePermissions();

  if (loading) {
    return <div>Cargando permisos...</div>;
  }

  if (!hasPermission(resource, action)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};