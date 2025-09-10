import React from 'react';
import { usePermissions } from '../hooks/usePermissions';
import { PermissionGuard } from '../components/PermissionGuard';
import { Button } from '@mui/material';

export const PermissionExamples = () => {
  const { role, canEdit, canCreate, canDelete, hasPermission } = usePermissions();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ejemplos de uso de usePermissions</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Información del usuario</h3>
        <p><strong>Rol:</strong> {role}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Verificación de permisos con hooks</h3>
        <p>¿Puede editar usuarios?: {canEdit('users') ? 'Sí' : 'No'}</p>
        <p>¿Puede crear posts?: {canCreate('posts') ? 'Sí' : 'No'}</p>
        <p>¿Puede eliminar albums?: {canDelete('albums') ? 'Sí' : 'No'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Botones condicionales</h3>
        {canEdit('users') && (
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Editar Usuario
          </Button>
        )}
        
        {canCreate('posts') && (
          <Button variant="contained" color="secondary" style={{ marginRight: '10px' }}>
            Crear Post
          </Button>
        )}
        
        {canDelete('albums') && (
          <Button variant="contained" color="error" style={{ marginRight: '10px' }}>
            Eliminar Album
          </Button>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Usando PermissionGuard</h3>
        
        <PermissionGuard 
          resource="users" 
          action="edit"
          fallback={<p style={{ color: 'red' }}>No tienes permisos para editar usuarios</p>}
        >
          <Button variant="outlined" color="primary">
            Solo visible si puedes editar usuarios
          </Button>
        </PermissionGuard>
        
        <br /><br />
        
        <PermissionGuard 
          resource="comments" 
          action="delete"
          fallback={<p style={{ color: 'orange' }}>Permiso denegado para eliminar comentarios</p>}
        >
          <Button variant="outlined" color="error">
            Solo visible si puedes eliminar comentarios
          </Button>
        </PermissionGuard>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Verificación manual de permisos</h3>
        <p>
          {hasPermission('photos', 'create') 
            ? '✅ Tienes permiso para crear fotos' 
            : '❌ No tienes permiso para crear fotos'}
        </p>
        <p>
          {hasPermission('todos', 'list') 
            ? '✅ Puedes listar tareas' 
            : '❌ No puedes listar tareas'}
        </p>
      </div>
    </div>
  );
};