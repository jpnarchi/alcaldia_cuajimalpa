import {
  Datagrid,
  List,
  TextField,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  Edit,
  Show,
  SimpleShowLayout,
  EmailField,
  ChipField,
  PasswordInput,
} from "react-admin";
import React from "react";
import { Typography, Box } from "@mui/material";

export const listarUsuarios = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="username" label="Usuario" />
      <TextField source="fullName" label="Nombre completo" />
      <EmailField source="email" label="Correo" />
      <ChipField source="role" label="Rol" />
      <ChipField source="status" label="Estado" />
    </Datagrid>
  </List>
);

export const mostrarUsuario = () => (
  <Show>
    <SimpleShowLayout>
      <Typography variant="h5" gutterBottom>
        Información del Usuario
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Datos de Acceso
        </Typography>
        <TextField source="username" label="Nombre de usuario" />
        <TextField source="fullName" label="Nombre completo" />
        <EmailField source="email" label="Correo electrónico" />
        <ChipField source="role" label="Rol" />
        <ChipField source="status" label="Estado" />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Información Adicional
        </Typography>
        <TextField source="telefono" label="Teléfono" />
        <TextField source="fechaCreacion" label="Fecha de creación" />
        <TextField source="ultimoAcceso" label="Último acceso" />
      </Box>
    </SimpleShowLayout>
  </Show>
);

export const editarUsuario = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="username" label="Nombre de usuario" fullWidth disabled />
      <TextInput source="fullName" label="Nombre completo" fullWidth />
      <TextInput source="email" label="Correo electrónico" type="email" fullWidth />
      <SelectInput
        source="role"
        label="Rol"
        choices={[
          { id: "admin", name: "Administrador" },
          { id: "jefe_turno", name: "Jefe de Turno" },
          { id: "usuario", name: "Usuario Normal" },
        ]}
        fullWidth
      />
      <TextInput source="telefono" label="Teléfono" fullWidth />
      <SelectInput
        source="status"
        label="Estado"
        choices={[
          { id: "Activo", name: "Activo" },
          { id: "Inactivo", name: "Inactivo" },
          { id: "Suspendido", name: "Suspendido" },
        ]}
        fullWidth
      />
      <PasswordInput source="password" label="Nueva contraseña (opcional)" fullWidth />
    </SimpleForm>
  </Edit>
);

export const crearUsuario = () => (
  <Create>
    <SimpleForm>
      <TextInput source="username" label="Nombre de usuario" fullWidth required />
      <PasswordInput source="password" label="Contraseña" fullWidth required />
      <TextInput source="fullName" label="Nombre completo" fullWidth required />
      <TextInput source="email" label="Correo electrónico" type="email" fullWidth required />
      <SelectInput
        source="role"
        label="Rol"
        choices={[
          { id: "admin", name: "Administrador" },
          { id: "jefe_turno", name: "Jefe de Turno" },
          { id: "usuario", name: "Usuario Normal" },
        ]}
        defaultValue="usuario"
        fullWidth
        required
      />
      <TextInput source="telefono" label="Teléfono" fullWidth />
      <SelectInput
        source="status"
        label="Estado"
        choices={[
          { id: "Activo", name: "Activo" },
          { id: "Inactivo", name: "Inactivo" },
          { id: "Suspendido", name: "Suspendido" },
        ]}
        defaultValue="Activo"
        fullWidth
      />
    </SimpleForm>
  </Create>
);
