import {
  Datagrid,
  List,
  TextField,
  Edit,
  Show,
  SimpleShowLayout,
  SimpleForm,
  TextInput,
  SelectInput,
  DateField,
  FunctionField,
} from "react-admin";
import { Typography, Box, Chip } from "@mui/material";

export const listarSolicitudes = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="folioId" label="Folio #" />
      <TextField source="solicitadoPor" label="Solicitado por" />
      <DateField source="fechaSolicitud" label="Fecha de solicitud" />
      <FunctionField
        label="Estado"
        render={(record: any) => (
          <Chip
            label={record.estado}
            color={
              record.estado === "Pendiente"
                ? "warning"
                : record.estado === "Aprobada"
                ? "success"
                : "error"
            }
            size="small"
          />
        )}
      />
      <TextField source="razon" label="Razón" />
    </Datagrid>
  </List>
);

export const mostrarSolicitud = () => (
  <Show>
    <SimpleShowLayout>
      <Typography variant="h5" gutterBottom>
        Detalles de la Solicitud de Modificación
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Información de la Solicitud
        </Typography>
        <TextField source="folioId" label="Folio #" />
        <TextField source="solicitadoPor" label="Solicitado por" />
        <DateField source="fechaSolicitud" label="Fecha de solicitud" showTime />
        <FunctionField
          label="Estado"
          render={(record: any) => (
            <Chip
              label={record.estado}
              color={
                record.estado === "Pendiente"
                  ? "warning"
                  : record.estado === "Aprobada"
                  ? "success"
                  : "error"
              }
              size="small"
            />
          )}
        />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Detalles de la Modificación
        </Typography>
        <TextField source="razon" label="Razón de la solicitud" />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Respuesta del Administrador
        </Typography>
        <TextField source="respuestaAdmin" label="Respuesta" />
        <DateField source="fechaRespuesta" label="Fecha de respuesta" showTime />
      </Box>
    </SimpleShowLayout>
  </Show>
);

export const editarSolicitud = () => (
  <Edit>
    <SimpleForm>
      <TextField source="folioId" label="Folio #" />
      <TextField source="solicitadoPor" label="Solicitado por" />
      <TextField source="fechaSolicitud" label="Fecha de solicitud" />
      <TextInput source="razon" label="Razón de la solicitud" fullWidth multiline disabled />

      <SelectInput
        source="estado"
        label="Estado de la solicitud"
        choices={[
          { id: "Pendiente", name: "Pendiente" },
          { id: "Aprobada", name: "Aprobada" },
          { id: "Rechazada", name: "Rechazada" },
        ]}
        fullWidth
      />

      <TextInput
        source="respuestaAdmin"
        label="Respuesta del administrador"
        fullWidth
        multiline
        rows={4}
        helperText="Escriba la respuesta o comentarios sobre la solicitud"
      />
    </SimpleForm>
  </Edit>
);
