import React from 'react';
import { useGetList } from '../hooks/useGetList';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import { People, Article, Photo, CheckCircle, Comment, Collections } from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, isLoading }) => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="center">
        <Box
          mr={2}
          p={1}
          borderRadius="50%"
          bgcolor={`${color}.100`}
          color={`${color}.600`}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {title}
          </Typography>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          )}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export const DashboardStats: React.FC = () => {
  const { data: users, total: totalUsers, isLoading: usersLoading, error: usersError } = useGetList('users', {
    pagination: { page: 1, perPage: 1 }, // Solo necesitamos el total
  });

  const { data: posts, total: totalPosts, isLoading: postsLoading, error: postsError } = useGetList('posts', {
    pagination: { page: 1, perPage: 1 },
  });

  const { data: albums, total: totalAlbums, isLoading: albumsLoading, error: albumsError } = useGetList('albums', {
    pagination: { page: 1, perPage: 1 },
  });

  const { data: photos, total: totalPhotos, isLoading: photosLoading, error: photosError } = useGetList('photos', {
    pagination: { page: 1, perPage: 1 },
  });

  const { data: comments, total: totalComments, isLoading: commentsLoading, error: commentsError } = useGetList('comments', {
    pagination: { page: 1, perPage: 1 },
  });

  const { data: todos, total: totalTodos, isLoading: todosLoading, error: todosError } = useGetList('todos', {
    pagination: { page: 1, perPage: 1 },
  });

  const hasErrors = usersError || postsError || albumsError || photosError || commentsError || todosError;

  if (hasErrors) {
    return (
      <Alert severity="warning">
        Algunos datos del dashboard no pudieron cargarse. 
        Los servicios de API pueden no estar disponibles.
      </Alert>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Dashboard - Estadísticas con useGetList
      </Typography>
      
      <Typography variant="body1" color="textSecondary" paragraph>
        Este dashboard utiliza múltiples instancias del hook useGetList para mostrar 
        estadísticas en tiempo real de diferentes recursos.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Usuarios Registrados"
            value={totalUsers}
            icon={<People />}
            color="primary"
            isLoading={usersLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Publicaciones"
            value={totalPosts}
            icon={<Article />}
            color="secondary"
            isLoading={postsLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Álbumes"
            value={totalAlbums}
            icon={<Collections />}
            color="success"
            isLoading={albumsLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Fotos Subidas"
            value={totalPhotos}
            icon={<Photo />}
            color="info"
            isLoading={photosLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Comentarios"
            value={totalComments}
            icon={<Comment />}
            color="warning"
            isLoading={commentsLoading}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Tareas Pendientes"
            value={totalTodos}
            icon={<CheckCircle />}
            color="error"
            isLoading={todosLoading}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Características del useGetList Hook:
        </Typography>
        <ul>
          <li>✅ Carga automática de datos</li>
          <li>✅ Estados de loading y error manejados</li>
          <li>✅ Función refetch para actualizar datos</li>
          <li>✅ Paginación configurable</li>
          <li>✅ Ordenamiento dinámico</li>
          <li>✅ Filtros personalizables</li>
          <li>✅ Integración con notificaciones</li>
        </ul>
      </Box>
    </Box>
  );
};