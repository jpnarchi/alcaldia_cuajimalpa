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
} from "react-admin";
import React from "react";
import { Typography, Box } from "@mui/material";

export const listarEquipo = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="nombre" label="Nombre" />
      <TextField source="rol" label="Rol" />
      <TextField source="turno" label="Turno" />
      <TextField source="telefono" label="Teléfono" />
      <ChipField source="status" label="Estado" />
    </Datagrid>
  </List>
);

export const mostrarEquipo = () => (
  <Show>
    <SimpleShowLayout>
      <Typography variant="h5" gutterBottom>
        Información del Miembro del Equipo
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Datos Personales
        </Typography>
        <TextField source="nombre" label="Nombre completo" />
        <TextField source="rol" label="Rol/Puesto" />
        <TextField source="especialidad" label="Especialidad" />
        <ChipField source="status" label="Estado" />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Información de Contacto
        </Typography>
        <TextField source="telefono" label="Teléfono" />
        <EmailField source="email" label="Correo electrónico" />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Asignación
        </Typography>
        <TextField source="turno" label="Turno asignado" />
      </Box>
    </SimpleShowLayout>
  </Show>
);

export const editarEquipo = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="nombre" label="Nombre completo" fullWidth />
      <SelectInput
        source="rol"
        label="Rol/Puesto"
        choices={[
          { id: "Paramédico", name: "Paramédico" },
          { id: "Técnico de emergencias", name: "Técnico de emergencias" },
          { id: "Conductor ambulancia", name: "Conductor ambulancia" },
          { id: "Enfermero/a", name: "Enfermero/a" },
        ]}
        fullWidth
      />
      <SelectInput
        source="turno"
        label="Turno"
        choices={[
          { id: "Matutino", name: "Matutino" },
          { id: "Vespertino", name: "Vespertino" },
          { id: "Nocturno", name: "Nocturno" },
        ]}
        fullWidth
      />
      <TextInput source="telefono" label="Teléfono" fullWidth />
      <TextInput source="email" label="Correo electrónico" type="email" fullWidth />
      <TextInput source="especialidad" label="Especialidad" fullWidth />
      <SelectInput
        source="status"
        label="Estado"
        choices={[
          { id: "Activo", name: "Activo" },
          { id: "Inactivo", name: "Inactivo" },
          { id: "Vacaciones", name: "Vacaciones" },
          { id: "Incapacidad", name: "Incapacidad" },
        ]}
        fullWidth
      />
    </SimpleForm>
  </Edit>
);

export const crearEquipo = () => (
  <Create>
    <SimpleForm>
      <TextInput source="nombre" label="Nombre completo" fullWidth />
      <SelectInput
        source="rol"
        label="Rol/Puesto"
        choices={[
          { id: "Paramédico", name: "Paramédico" },
          { id: "Técnico de emergencias", name: "Técnico de emergencias" },
          { id: "Conductor ambulancia", name: "Conductor ambulancia" },
          { id: "Enfermero/a", name: "Enfermero/a" },
        ]}
        fullWidth
      />
      <SelectInput
        source="turno"
        label="Turno"
        choices={[
          { id: "Matutino", name: "Matutino" },
          { id: "Vespertino", name: "Vespertino" },
          { id: "Nocturno", name: "Nocturno" },
        ]}
        fullWidth
      />
      <TextInput source="telefono" label="Teléfono" fullWidth />
      <TextInput source="email" label="Correo electrónico" type="email" fullWidth />
      <TextInput source="especialidad" label="Especialidad" fullWidth />
      <SelectInput
        source="status"
        label="Estado"
        choices={[
          { id: "Activo", name: "Activo" },
          { id: "Inactivo", name: "Inactivo" },
          { id: "Vacaciones", name: "Vacaciones" },
          { id: "Incapacidad", name: "Incapacidad" },
        ]}
        defaultValue="Activo"
        fullWidth
      />
    </SimpleForm>
  </Create>
);
