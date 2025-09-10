import React, { useState } from 'react';
import { useGetList } from '../hooks/useGetList';
import { usePermissions } from '../hooks/usePermissions';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
  TextField,
  Box,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Edit, Refresh } from '@mui/icons-material';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export const CustomUserList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [filter, setFilter] = useState('');

  const { canEdit } = usePermissions();

  const { data, total, isLoading, error, refetch } = useGetList<User>('users', {
    pagination: { page, perPage },
    sort: { field: sortField, order: sortOrder },
    filter: filter ? { q: filter } : {},
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setPage(1); // Reset to first page when filtering
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" action={
        <Button color="inherit" size="small" onClick={refetch}>
          <Refresh /> Reintentar
        </Button>
      }>
        Error al cargar usuarios: {error.message}
      </Alert>
    );
  }

  return (
    <Box p={2}>
      <h2>Lista de Usuarios - useGetList Hook</h2>
      
      {/* Controles de filtrado y ordenamiento */}
      <Box mb={2} display="flex" gap={2} alignItems="center" flexWrap="wrap">
        <TextField
          label="Buscar usuarios"
          variant="outlined"
          size="small"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Nombre, email, etc..."
        />
        
        <FormControl size="small" style={{ minWidth: 120 }}>
          <InputLabel>Ordenar por</InputLabel>
          <Select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            label="Ordenar por"
          >
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="name">Nombre</MenuItem>
            <MenuItem value="username">Usuario</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl size="small" style={{ minWidth: 100 }}>
          <InputLabel>Orden</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'ASC' | 'DESC')}
            label="Orden"
          >
            <MenuItem value="ASC">Ascendente</MenuItem>
            <MenuItem value="DESC">Descendente</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" style={{ minWidth: 100 }}>
          <InputLabel>Por página</InputLabel>
          <Select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            label="Por página"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        
        <Button variant="outlined" onClick={refetch} startIcon={<Refresh />}>
          Actualizar
        </Button>
      </Box>

      {/* Tabla de usuarios */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              {canEdit('users') && <TableCell>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                {canEdit('users') && (
                  <TableCell>
                    <Button
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => console.log('Editar usuario:', user.id)}
                    >
                      Editar
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(total / perPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>

      {/* Información de estado */}
      <Box mt={1} textAlign="center" color="text.secondary">
        Mostrando {data.length} de {total} usuarios
        {filter && ` (filtrados por: "${filter}")`}
      </Box>
    </Box>
  );
};