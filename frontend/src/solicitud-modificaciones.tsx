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
  ChipField,
  DateField,
  FunctionField,
} from "react-admin";
import React from "react";
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
            label={record.estadoSolicitud}
            color={
              record.estadoSolicitud === "Pendiente"
                ? "warning"
                : record.estadoSolicitud === "Aprobada"
                ? "success"
                : "error"
            }
            size="small"
          />
        )}
      />
      <TextField source="motivoSolicitud" label="Motivo" />
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
        <TextField source="rolSolicitante" label="Rol del solicitante" />
        <DateField source="fechaSolicitud" label="Fecha de solicitud" showTime />
        <ChipField source="estadoSolicitud" label="Estado de la solicitud" />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Detalles de la Modificación
        </Typography>
        <TextField source="motivoSolicitud" label="Motivo de la solicitud" />
        <TextField source="camposModificar" label="Campos a modificar" />
        <TextField source="justificacion" label="Justificación" />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Información del Folio Original
        </Typography>
        <TextField source="folioOriginal.diaFechaHora" label="Fecha y hora original" />
        <TextField source="folioOriginal.nombrePersonal" label="Personal asignado" />
        <TextField source="folioOriginal.tipoServicio" label="Tipo de servicio" />
        <TextField source="folioOriginal.ubicacion" label="Ubicación" />
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
      <TextInput source="motivoSolicitud" label="Motivo de la solicitud" fullWidth multiline disabled />
      <TextInput source="justificacion" label="Justificación" fullWidth multiline rows={3} disabled />

      <SelectInput
        source="estadoSolicitud"
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
