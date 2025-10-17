import {
  TextField,
  Edit,
  Show,
  SimpleShowLayout,
  SimpleForm,
  TextInput,
  EmailField,
  ChipField,
  useGetIdentity,
  usePermissions,
  PasswordInput,
} from "react-admin";
import React from "react";
import { Typography, Box, Card, CardContent, Avatar, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

// Lista redirige automáticamente al perfil del usuario
export const listarPerfil = () => {
  const { identity } = useGetIdentity();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    const buscarPerfil = async () => {
      if (identity?.id) {
        try {
          const token = localStorage.getItem('token');

          // Buscar el perfil del usuario actual por username
          const response = await fetch(`http://localhost:3000/perfiles?username=${identity.id}`, {
            headers: {
              'Authentication': token || '',
              'Accept': 'application/json',
            },
          });

          if (response.ok) {
            const perfiles = await response.json();

            if (perfiles && perfiles.length > 0) {
              // Redirigir al perfil encontrado
              navigate(`/admin/perfiles/${perfiles[0].id}/show`);
            } else {
              setError(true);
              setLoading(false);
            }
          } else {
            setError(true);
            setLoading(false);
          }
        } catch (err) {
          console.error('Error buscando perfil:', err);
          setError(true);
          setLoading(false);
        }
      }
    };

    buscarPerfil();
  }, [identity, navigate]);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Cargando perfil...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">
          No se encontró un perfil para este usuario. Por favor, contacta al administrador.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography>Redirigiendo...</Typography>
    </Box>
  );
};

// Mostrar perfil completo con información según el rol
export const mostrarHorario = () => {
  const { permissions } = usePermissions();

  return (
    <Show>
      <SimpleShowLayout>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80, mr: 2, bgcolor: "primary.main" }}>
            <PersonIcon sx={{ fontSize: 50 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom>
              Mi Perfil
            </Typography>
            <ChipField source="rol" label="Rol" />
          </Box>
        </Box>

        {/* Información Personal - Todos los roles */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              Información Personal
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField source="nombre" label="Nombre completo" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField source="username" label="Usuario" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <EmailField source="email" label="Correo electrónico" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField source="telefono" label="Teléfono" />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Información Laboral - Usuario y Jefe de Turno */}
        {(permissions === "usuario" || permissions === "jefe_turno") && (
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Turno Laboral
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField source="turno" label="Turno asignado" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Información Administrativa - Solo Admin */}
        {permissions === "admin" && (
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Información Administrativa
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField source="departamento" label="Departamento" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField source="nivelAcceso" label="Nivel de acceso" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

      </SimpleShowLayout>
    </Show>
  );
};

// Editar perfil
export const editarPerfil = () => {
  const { permissions } = usePermissions();

  return (
    <Edit>
      <SimpleForm>
        <Typography variant="h6" gutterBottom>
          Editar Mi Perfil
        </Typography>

        {/* Información Personal - Todos pueden editar */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom color="primary">
            Información Personal
          </Typography>
          <TextInput source="nombre" label="Nombre completo" fullWidth />
          <TextInput source="email" label="Correo electrónico" type="email" fullWidth />
          <TextInput source="telefono" label="Teléfono" fullWidth />
        </Box>

        {/* Cambiar contraseña - Todos */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom color="primary">
            Cambiar Contraseña
          </Typography>
          <PasswordInput source="passwordActual" label="Contraseña actual" fullWidth />
          <PasswordInput source="passwordNueva" label="Nueva contraseña" fullWidth />
          <PasswordInput source="passwordConfirmar" label="Confirmar nueva contraseña" fullWidth />
        </Box>

        {/* Información Laboral - Solo usuario y jefe_turno */}
        {(permissions === "usuario" || permissions === "jefe_turno") && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom color="primary">
              Información Laboral (Solo lectura)
            </Typography>
            <TextInput source="turno" label="Turno asignado" fullWidth disabled />
            <TextInput source="especialidad" label="Especialidad" fullWidth />
            <TextInput source="numeroEmpleado" label="Número de empleado" fullWidth disabled />
          </Box>
        )}
      </SimpleForm>
    </Edit>
  );
};

// Crear no se usa en perfil, pero lo mantenemos por compatibilidad
export const crearPerfil = () => (
  <Typography>No disponible</Typography>
);
