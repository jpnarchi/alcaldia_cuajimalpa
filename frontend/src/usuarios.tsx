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
  FormDataConsumer,
  DeleteButton,
} from "react-admin";
import { Typography, Box } from "@mui/material";

export const listarUsuarios = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="username" label="Usuario" />
      <TextField source="fullName" label="Nombre completo" />
      <EmailField source="email" label="Correo" />
      <ChipField source="role" label="Rol" />
      <TextField source="turno" label="Turno" />
      <ChipField source="status" label="Estado" />
      <DeleteButton />
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
        <TextField source="turno" label="Turno" />
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
      <CondicionalTurno />
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

// Componente condicional para el campo turno
const CondicionalTurno = () => (
  <FormDataConsumer>
    {({ formData, ...rest }) =>
      formData.role === "jefe_turno" || formData.role === "usuario" ? (
        <SelectInput
          source="turno"
          label="Seleccionar Turno"
          choices={[
            { id: "1", name: "Turno 1" },
            { id: "2", name: "Turno 2" },
            { id: "3", name: "Turno 3" },
            { id: "4", name: "Turno 4" },
            { id: "5", name: "Turno 5" },
            { id: "6", name: "Turno 6" },
          ]}
          fullWidth
          required
          {...rest}
        />
      ) : null
    }
  </FormDataConsumer>
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
      <CondicionalTurno />
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

export const borrarUsuario = () => (
  <Show>
    <SimpleShowLayout>
      <Typography variant="h5" gutterBottom color="error">
        ¿Estás seguro de que deseas eliminar este usuario?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Esta acción no se puede deshacer.
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Información del Usuario a Eliminar
        </Typography>
        <TextField source="username" label="Nombre de usuario" />
        <TextField source="fullName" label="Nombre completo" />
        <EmailField source="email" label="Correo electrónico" />
        <ChipField source="role" label="Rol" />
        <TextField source="turno" label="Turno" />
        <ChipField source="status" label="Estado" />
      </Box>
    </SimpleShowLayout>
  </Show>
);
