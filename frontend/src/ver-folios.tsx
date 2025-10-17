import {
  List,
  TextField,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  Edit,
  Show,
  SimpleShowLayout,
  Datagrid,
  useRecordContext,
  FunctionField,
  Button,
  useDataProvider,
  useNotify,
} from "react-admin";
import { useState } from "react";
import { Typography, Chip, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField as MuiTextField } from "@mui/material";

export const listarFolio = () => (
  <List>
    <Datagrid rowClick="show">
      <TextField source="id" label="Folio #" />
      <TextField source="diaFechaHora" label="Fecha y Hora" />
      <TextField source="turno" label="Turno" />
      <TextField source="nombrePersonal" label="Personal" />
      <TextField source="tipoServicio" label="Tipo de Servicio" />
      <FunctionField
        label="Gravedad"
        render={(record: any) => (
          <Chip
            label={record.gravedadEmergencia}
            color={
              record.gravedadEmergencia === "Alta"
                ? "error"
                : record.gravedadEmergencia === "Media"
                ? "warning"
                : "success"
            }
            size="small"
          />
        )}
      />
    </Datagrid>
  </List>
);

// Botón que tiene acceso al record context
const BotonSolicitarModificacion = ({ onOpen }: { onOpen: (id: number) => void }) => {
  const record = useRecordContext();

  return (
    <Button
      label="Solicitar Modificación"
      onClick={() => onOpen(record?.id)}
      variant="outlined"
      color="primary"
    />
  );
};

const SolicitarModificacionDialog = ({ open, onClose, folioId }: any) => {
  const [razon, setRazon] = useState("");
  const dataProvider = useDataProvider();
  const notify = useNotify();

  const handleSubmit = async () => {
    if (!razon) {
      notify('Por favor escribe una razón para la modificación', { type: 'warning', messageArgs: { _: 'Por favor escribe una razón para la modificación' } });
      return;
    }

    if (!folioId) {
      notify('Error: No se pudo identificar el folio', { type: 'error', messageArgs: { _: 'Error: No se pudo identificar el folio' } });
      return;
    }

    try {
      console.log('Enviando solicitud con folioId:', folioId);
      await dataProvider.create('solicitudesModificacion', {
        data: {
          folioId: Number(folioId),
          motivoSolicitud: razon,
          estadoSolicitud: "Pendiente",
          fechaSolicitud: new Date().toISOString(),
          solicitadoPor: localStorage.getItem('username') || 'usuario',
          rolSolicitante: localStorage.getItem('role') || 'usuario'
        }
      });

      notify('Solicitud de modificación enviada exitosamente', { type: 'success', messageArgs: { _: 'Solicitud de modificación enviada exitosamente' } });
      setRazon("");
      onClose();
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      notify('Error al enviar la solicitud de modificación', { type: 'error', messageArgs: { _: 'Error al enviar la solicitud de modificación' } });
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Pedir cambio</DialogTitle>
      <DialogContent>
        <MuiTextField
          label="Razón de la modificación"
          fullWidth
          multiline
          rows={4}
          value={razon}
          onChange={(e) => setRazon(e.target.value)}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button label="Cancelar" onClick={onClose} />
        <Button label="Enviar" onClick={handleSubmit} />
      </DialogActions>
    </Dialog>
  );
};
// Componente Show para ver el detalle completo del folio
export const mostrarFolio = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [folioId, setFolioId] = useState<number | null>(null);

  const handleOpenDialog = (id: number) => {
    console.log('Abriendo diálogo para folio ID:', id);
    setFolioId(id);
    setShowDialog(true);
  };

  return (
    <>
      <Show>
        <SimpleShowLayout>
          <FunctionField
            render={(record: any) => (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, width: '100%' }}>
                <Typography variant="h5" gutterBottom>
                  Reporte de Emergencia Urbana - Folio #{record?.id}
                </Typography>
                <BotonSolicitarModificacion onOpen={handleOpenDialog} />
              </Box>
            )}
          />

          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Información General
          </Typography>
          <TextField source="diaFechaHora" label="Día, fecha y hora" />
          <TextField source="turno" label="Turno" />
          <TextField source="nombrePersonal" label="Nombre del personal a cargo" />
          <TextField source="modoActivacion" label="Modo de activación" />
          <TextField source="tipoServicio" label="Tipo de servicio" />

          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Detalles de Atención
          </Typography>
          <TextField source="fechaHoraAtencion" label="Fecha y hora de atención" />
          <TextField source="tiempoTraslado" label="Tiempo de traslado" />
          <TextField source="ubicacion" label="Ubicación" />
          <TextField source="gravedadEmergencia" label="Gravedad de la emergencia" />
          <TextField source="kmRecorridos" label="Kilómetros recorridos" />

          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Trabajos y Observaciones
          </Typography>
          <TextField source="trabajosRealizados" label="Trabajos realizados" />
          <TextField source="observaciones" label="Observaciones" />
          <TextField source="conclusion" label="Conclusión/Dictamen" />

          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Responsables y Autoridades
          </Typography>
          <TextField source="responsablesEmergencia" label="Responsables de la emergencia" />
          <TextField source="autoridades" label="Autoridades participantes" />
        </SimpleShowLayout>
      </Show>

      <SolicitarModificacionDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        folioId={folioId}
      />
    </>
  );
};

export const editarFolio = () => (
  <Edit>
    <SimpleForm>
      <Typography variant="h6" gutterBottom>
        Información General
      </Typography>
      <TextInput source="diaFechaHora" label="Día, fecha y hora" fullWidth />
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
      <TextInput source="nombrePersonal" label="Nombre del personal a cargo" fullWidth />
      <SelectInput
        source="modoActivacion"
        label="Modo de activación"
        choices={[
          { id: "Llamada de emergencia", name: "Llamada de emergencia" },
          { id: "Seguimiento de oficio", name: "Seguimiento de oficio" },
        ]}
        fullWidth
      />
      <TextInput source="tipoServicio" label="Tipo de servicio" fullWidth />

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Detalles de Atención
      </Typography>
      <TextInput source="fechaHoraAtencion" label="Fecha y hora de atención" fullWidth />
      <TextInput source="tiempoTraslado" label="Tiempo de traslado" fullWidth />
      <TextInput source="ubicacion" label="Ubicación" fullWidth multiline />
      <SelectInput
        source="gravedadEmergencia"
        label="Gravedad de la emergencia"
        choices={[
          { id: "Alta", name: "Alta" },
          { id: "Media", name: "Media" },
          { id: "Baja", name: "Baja" },
        ]}
        fullWidth
      />
      <TextInput source="kmRecorridos" label="Kilómetros recorridos" fullWidth />

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Trabajos y Observaciones
      </Typography>
      <TextInput source="trabajosRealizados" label="Trabajos realizados" fullWidth multiline rows={3} />
      <TextInput source="observaciones" label="Observaciones" fullWidth multiline rows={3} />
      <TextInput source="conclusion" label="Conclusión/Dictamen" fullWidth multiline rows={2} />

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Responsables y Autoridades
      </Typography>
      <TextInput source="responsablesEmergencia" label="Responsables de la emergencia" fullWidth />
      <TextInput source="autoridades" label="Autoridades participantes" fullWidth />
    </SimpleForm>
  </Edit>
);

export const crearFolio = () => (
  <Create>
    <SimpleForm>
      <Typography variant="h6" gutterBottom>
        Información General
      </Typography>
      <TextInput source="diaFechaHora" label="Día, fecha y hora" fullWidth />
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
      <TextInput source="nombrePersonal" label="Nombre del personal a cargo" fullWidth />
      <SelectInput
        source="modoActivacion"
        label="Modo de activación"
        choices={[
          { id: "Llamada de emergencia", name: "Llamada de emergencia" },
          { id: "Seguimiento de oficio", name: "Seguimiento de oficio" },
        ]}
        fullWidth
      />
      <TextInput source="tipoServicio" label="Tipo de servicio" fullWidth />

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Detalles de Atención
      </Typography>
      <TextInput source="fechaHoraAtencion" label="Fecha y hora de atención" fullWidth />
      <TextInput source="tiempoTraslado" label="Tiempo de traslado" fullWidth />
      <TextInput source="ubicacion" label="Ubicación" fullWidth multiline />
      <SelectInput
        source="gravedadEmergencia"
        label="Gravedad de la emergencia"
        choices={[
          { id: "Alta", name: "Alta" },
          { id: "Media", name: "Media" },
          { id: "Baja", name: "Baja" },
        ]}
        fullWidth
      />
      <TextInput source="kmRecorridos" label="Kilómetros recorridos" fullWidth />

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Trabajos y Observaciones
      </Typography>
      <TextInput source="trabajosRealizados" label="Trabajos realizados" fullWidth multiline rows={3} />
      <TextInput source="observaciones" label="Observaciones" fullWidth multiline rows={3} />
      <TextInput source="conclusion" label="Conclusión/Dictamen" fullWidth multiline rows={2} />

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Responsables y Autoridades
      </Typography>
      <TextInput source="responsablesEmergencia" label="Responsables de la emergencia" fullWidth />
      <TextInput source="autoridades" label="Autoridades participantes" fullWidth />
    </SimpleForm>
  </Create>
);
