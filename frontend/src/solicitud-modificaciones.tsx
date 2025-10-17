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
  useRecordContext,
  useDataProvider,
  useNotify,
  useRedirect,
  Button,
} from "react-admin";
import { Typography, Box, Chip, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const listarSolicitudes = () => {
  const username = localStorage.getItem('username');

  return (
    <List filter={{ solicitadoPor: username }}>
      <Datagrid rowClick="show">
        <TextField source="id" label="ID" />
        <TextField source="folioId" label="Folio #" />
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
        <FunctionField
          label="Acciones"
          render={(record: any) => (
            record.estadoSolicitud === "Aprobada" ? (
              <Chip label="Puede editar folio" color="success" size="small" />
            ) : record.estadoSolicitud === "Pendiente" ? (
              <Chip label="En revisión" color="warning" size="small" />
            ) : (
              <Chip label="Rechazada" color="error" size="small" />
            )
          )}
        />
      </Datagrid>
    </List>
  );
};

// Componente de botones de acción
const AccionesSolicitud = () => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const redirect = useRedirect();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const userRole = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  const handleAprobar = async () => {
    if (!record) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/solicitudesModificacion/${record.id}/aprobar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authentication': localStorage.getItem('token') || '',
        },
        body: JSON.stringify({
          respuestaAdmin: 'Solicitud aprobada. Puede proceder con la modificación del folio.'
        })
      });

      if (response.ok) {
        const data = await response.json();
        notify('Solicitud aprobada exitosamente', { type: 'success', messageArgs: { _: 'Solicitud aprobada exitosamente' } });

        // Redirigir al edit del folio
        navigate(`/admin/folios/${data.folioId}`);
      } else {
        notify('Error al aprobar la solicitud', { type: 'error', messageArgs: { _: 'Error al aprobar la solicitud' } });
      }
    } catch (error) {
      console.error('Error:', error);
      notify('Error al aprobar la solicitud', { type: 'error', messageArgs: { _: 'Error al aprobar la solicitud' } });
    } finally {
      setLoading(false);
    }
  };

  const handleVerFolio = () => {
    if (record?.folioId) {
      navigate(`/admin/folios/${record.folioId}/show`);
    }
  };

  const handleEditarFolio = () => {
    if (record?.folioId) {
      navigate(`/admin/folios/${record.folioId}`);
    }
  };

  if (!record) return null;

  // Si es usuario y la solicitud está aprobada, puede editar
  const esUsuarioYAprobada = userRole === 'usuario' && record.estadoSolicitud === 'Aprobada' && record.solicitadoPor === username;

  return (
    <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button
        label="Ver Folio"
        onClick={handleVerFolio}
        variant="outlined"
        color="primary"
      />

      {/* Botones para Admin */}
      {userRole === 'admin' && record.estadoSolicitud === "Pendiente" && (
        <Button
          label="Aprobar y Editar Folio"
          onClick={handleAprobar}
          disabled={loading}
          variant="contained"
          color="success"
        />
      )}
      {userRole === 'admin' && record.estadoSolicitud === "Aprobada" && (
        <Button
          label="Editar Folio"
          onClick={handleEditarFolio}
          variant="contained"
          color="primary"
        />
      )}

      {/* Botón para Usuario cuando su solicitud está aprobada */}
      {esUsuarioYAprobada && (
        <Button
          label="Editar Mi Folio"
          onClick={handleEditarFolio}
          variant="contained"
          color="success"
        />
      )}
    </Box>
  );
};

export const mostrarSolicitud = () => {
  const userRole = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  return (
    <Show>
      <SimpleShowLayout>
        <Typography variant="h5" gutterBottom>
          Detalles de la Solicitud de Modificación
        </Typography>

        <FunctionField
          render={(record: any) => {
            const esUsuarioYAprobada = userRole === 'usuario' && record.estadoSolicitud === 'Aprobada' && record.solicitadoPor === username;

            if (record.estadoSolicitud === "Aprobada") {
              return (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {esUsuarioYAprobada
                    ? '✅ Tu solicitud ha sido aprobada! Ahora puedes editar el folio haciendo clic en "Editar Mi Folio".'
                    : 'Esta solicitud ha sido aprobada. Puede proceder a editar el folio.'}
                </Alert>
              );
            } else if (record.estadoSolicitud === "Rechazada") {
              return (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {userRole === 'usuario' && record.solicitadoPor === username
                    ? '❌ Tu solicitud ha sido rechazada. Revisa la respuesta del administrador a continuación.'
                    : 'Esta solicitud ha sido rechazada.'}
                </Alert>
              );
            } else {
              return (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  {userRole === 'usuario' && record.solicitadoPor === username
                    ? '⏳ Tu solicitud está pendiente de revisión por el administrador.'
                    : 'Esta solicitud está pendiente de revisión.'}
                </Alert>
              );
            }
          }}
        />

        <AccionesSolicitud />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Información de la Solicitud
        </Typography>
        <TextField source="id" label="ID de Solicitud" />
        <TextField source="folioId" label="Folio #" />
        <TextField source="solicitadoPor" label="Solicitado por" />
        <TextField source="rolSolicitante" label="Rol del solicitante" />
        <DateField source="fechaSolicitud" label="Fecha de solicitud" showTime />
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
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Detalles de la Modificación
        </Typography>
        <TextField source="motivoSolicitud" label="Motivo de la solicitud" />
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
};

export const editarSolicitud = () => (
  <Edit>
    <SimpleForm>
      <Typography variant="h6" gutterBottom>
        Revisar Solicitud de Modificación
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom color="primary">
          Información de la Solicitud (Solo lectura)
        </Typography>
        <TextInput source="id" label="ID de Solicitud" disabled fullWidth />
        <TextInput source="folioId" label="Folio #" disabled fullWidth />
        <TextInput source="solicitadoPor" label="Solicitado por" disabled fullWidth />
        <TextInput source="rolSolicitante" label="Rol del solicitante" disabled fullWidth />
        <TextInput source="fechaSolicitud" label="Fecha de solicitud" disabled fullWidth />
        <TextInput source="motivoSolicitud" label="Motivo de la solicitud" fullWidth multiline rows={3} disabled />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom color="primary">
          Respuesta del Administrador
        </Typography>
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
      </Box>
    </SimpleForm>
  </Edit>
);
