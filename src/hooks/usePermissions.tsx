import { useAuthProvider, useGetIdentity } from 'react-admin';
import { useState, useEffect } from 'react';

export interface Permission {
  resource: string;
  action: 'list' | 'show' | 'edit' | 'create' | 'delete';
}

export interface UserPermissions {
  permissions: Permission[];
  role: string;
}

const DEFAULT_PERMISSIONS: Record<string, Permission[]> = {
  admin: [
    { resource: 'users', action: 'list' },
    { resource: 'users', action: 'show' },
    { resource: 'users', action: 'edit' },
    { resource: 'users', action: 'create' },
    { resource: 'users', action: 'delete' },
    { resource: 'posts', action: 'list' },
    { resource: 'posts', action: 'show' },
    { resource: 'posts', action: 'edit' },
    { resource: 'posts', action: 'create' },
    { resource: 'posts', action: 'delete' },
    { resource: 'albums', action: 'list' },
    { resource: 'albums', action: 'show' },
    { resource: 'albums', action: 'edit' },
    { resource: 'albums', action: 'create' },
    { resource: 'albums', action: 'delete' },
    { resource: 'comments', action: 'list' },
    { resource: 'comments', action: 'show' },
    { resource: 'comments', action: 'edit' },
    { resource: 'comments', action: 'create' },
    { resource: 'comments', action: 'delete' },
    { resource: 'todos', action: 'list' },
    { resource: 'todos', action: 'show' },
    { resource: 'todos', action: 'edit' },
    { resource: 'todos', action: 'create' },
    { resource: 'todos', action: 'delete' },
    { resource: 'photos', action: 'list' },
    { resource: 'photos', action: 'show' },
    { resource: 'photos', action: 'edit' },
    { resource: 'photos', action: 'create' },
    { resource: 'photos', action: 'delete' },
  ],
  editor: [
    { resource: 'posts', action: 'list' },
    { resource: 'posts', action: 'show' },
    { resource: 'posts', action: 'edit' },
    { resource: 'posts', action: 'create' },
    { resource: 'albums', action: 'list' },
    { resource: 'albums', action: 'show' },
    { resource: 'albums', action: 'edit' },
    { resource: 'albums', action: 'create' },
    { resource: 'photos', action: 'list' },
    { resource: 'photos', action: 'show' },
    { resource: 'photos', action: 'edit' },
    { resource: 'photos', action: 'create' },
  ],
  viewer: [
    { resource: 'users', action: 'list' },
    { resource: 'users', action: 'show' },
    { resource: 'posts', action: 'list' },
    { resource: 'posts', action: 'show' },
    { resource: 'albums', action: 'list' },
    { resource: 'albums', action: 'show' },
    { resource: 'comments', action: 'list' },
    { resource: 'comments', action: 'show' },
    { resource: 'todos', action: 'list' },
    { resource: 'todos', action: 'show' },
    { resource: 'photos', action: 'list' },
    { resource: 'photos', action: 'show' },
  ],
};

export const usePermissions = () => {
  const { data: identity, isLoading: identityLoading } = useGetIdentity();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [role, setRole] = useState<string>('viewer');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!identityLoading && identity) {
      const userRole = identity.role || 'admin'; // Default to admin for A01781518
      const userPermissions = DEFAULT_PERMISSIONS[userRole] || DEFAULT_PERMISSIONS.viewer;
      
      setRole(userRole);
      setPermissions(userPermissions);
      setLoading(false);
    }
  }, [identity, identityLoading]);

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