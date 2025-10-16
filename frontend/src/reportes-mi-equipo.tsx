import {
  Datagrid,
  List,
  TextField,
  Show,
  SimpleShowLayout,
} from "react-admin";
import { Typography} from "@mui/material";

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

