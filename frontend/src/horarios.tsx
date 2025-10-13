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

export const listarHorarios = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="dia" label="Día" />
      <TextField source="horaInicio" label="Hora Inicio" />
      <TextField source="horaFin" label="Hora Fin" />
      <TextField source="turno" label="Turno" />
    </Datagrid>
  </List>
);

export const mostrarHorario = () => (
  <Show>
    <SimpleShowLayout>
      <Typography variant="h5" gutterBottom>
        Detalles del Horario
      </Typography>
      <TextField source="dia" label="Día" />
      <TextField source="horaInicio" label="Hora de inicio" />
      <TextField source="horaFin" label="Hora de fin" />
      <TextField source="turno" label="Turno" />
    </SimpleShowLayout>
  </Show>
);

export const editarHorarios = () => (
  <Edit>
    <SimpleForm>
      <SelectInput
        source="dia"
        label="Día"
        choices={[
          { id: "Lunes", name: "Lunes" },
          { id: "Martes", name: "Martes" },
          { id: "Miércoles", name: "Miércoles" },
          { id: "Jueves", name: "Jueves" },
          { id: "Viernes", name: "Viernes" },
          { id: "Sábado", name: "Sábado" },
          { id: "Domingo", name: "Domingo" },
        ]}
        fullWidth
      />
      <TextInput source="horaInicio" label="Hora de inicio" fullWidth />
      <TextInput source="horaFin" label="Hora de fin" fullWidth />
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
    </SimpleForm>
  </Edit>
);

export const crearHorarios = () => (
  <Create>
    <SimpleForm>
      <SelectInput
        source="dia"
        label="Día"
        choices={[
          { id: "Lunes", name: "Lunes" },
          { id: "Martes", name: "Martes" },
          { id: "Miércoles", name: "Miércoles" },
          { id: "Jueves", name: "Jueves" },
          { id: "Viernes", name: "Viernes" },
          { id: "Sábado", name: "Sábado" },
          { id: "Domingo", name: "Domingo" },
        ]}
        fullWidth
      />
      <TextInput source="horaInicio" label="Hora de inicio" fullWidth />
      <TextInput source="horaFin" label="Hora de fin" fullWidth />
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
    </SimpleForm>
  </Create>
);
