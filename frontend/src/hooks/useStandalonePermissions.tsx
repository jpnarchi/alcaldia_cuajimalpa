import { useState, useEffect } from 'react';

export interface Permission {
  resource: string;
  action: 'list' | 'show' | 'edit' | 'create' | 'delete';
}

const DEFAULT_PERMISSIONS: Record<string, Permission[]> = {
  admin: [
    { resource: 'users', action: 'list' },
    { resource: 'users', action: 'show' },
    { resource: 'users', action: 'edit' },
    { resource: 'users', action: 'create' },
    { resource: 'users', action: 'delete' },
  ],
  editor: [
    { resource: 'posts', action: 'list' },
    { resource: 'posts', action: 'show' },
    { resource: 'posts', action: 'edit' },
    { resource: 'posts', action: 'create' },
  ],
  viewer: [
    { resource: 'users', action: 'list' },
    { resource: 'users', action: 'show' },
  ],
  visitor: [], // Default for homepage visitors
};

export const useStandalonePermissions = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [role, setRole] = useState<string>('visitor');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For standalone use (outside React Admin), check localStorage or default to visitor
    const storedRole = localStorage.getItem('role') || 'visitor';
    const userPermissions = DEFAULT_PERMISSIONS[storedRole] || DEFAULT_PERMISSIONS.visitor;
    
    setRole(storedRole);
    setPermissions(userPermissions);
    setLoading(false);
  }, []);

  const hasPermission = (resource: string, action: 'list' | 'show' | 'edit' | 'create' | 'delete'): boolean => {
    return permissions.some(
      (permission) => permission.resource === resource && permission.action === action
    );
  };

  const canList = (resource: string): boolean => hasPermission(resource, 'list');
  const canShow = (resource: string): boolean => hasPermission(resource, 'show');
  const canEdit = (resource: string): boolean => hasPermission(resource, 'edit');
  const canCreate = (resource: string): boolean => hasPermission(resource, 'create');
  const canDelete = (resource: string): boolean => hasPermission(resource, 'delete');

  return {
    permissions,
    role,
    loading,
    hasPermission,
    canList,
    canShow,
    canEdit,
    canCreate,
    canDelete,
  };
};