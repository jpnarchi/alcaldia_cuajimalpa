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
} from "react-admin";
import React from "react";
import { Typography } from "@mui/material";

export const listarReporteEquipo = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="folio" label="Folio" />
      <TextField source="fecha" label="Fecha" />
      <TextField source="estado" label="Estado" />
      <TextField source="paciente" label="Paciente" />
    </Datagrid>
  </List>
);

export const mostrarReporteEquipo = () => (
  <Show>
    <SimpleShowLayout>
      <Typography variant="h5" gutterBottom>
        Detalles del Folio
      </Typography>
      <TextField source="folio" label="Número de Folio" />
      <TextField source="fecha" label="Fecha" />
      <TextField source="estado" label="Estado" />
      <TextField source="paciente" label="Paciente" />
    </SimpleShowLayout>
  </Show>
);

export const editarReporteEquipo = () => (
  <Edit l>
    <SimpleForm>
      <TextInput source="folio" label="Folio" fullWidth />
      <TextInput source="fecha" label="Fecha" fullWidth />
      <SelectInput
        source="estado"
        label="Estado"
        choices={[
          { id: "Completado", name: "Completado" },
          { id: "En proceso", name: "En proceso" },
          { id: "Pendiente", name: "Pendiente" },
        ]}
        fullWidth
      />
      <TextInput source="paciente" label="Paciente" fullWidth />
    </SimpleForm>
  </Edit>
);

export const crearReporteEquipo = () => (
  <Create>
    <SimpleForm>
      <TextInput source="folio" label="Folio" fullWidth />
      <TextInput source="fecha" label="Fecha" fullWidth />
      <SelectInput
        source="estado"
        label="Estado"
        choices={[
          { id: "Completado", name: "Completado" },
          { id: "En proceso", name: "En proceso" },
          { id: "Pendiente", name: "Pendiente" },
        ]}
        fullWidth
      />
      <TextInput source="paciente" label="Paciente" fullWidth />
    </SimpleForm>
  </Create>
);
