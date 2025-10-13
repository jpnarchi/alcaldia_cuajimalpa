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
} from "react-admin";
import React from "react";
import { Typography, Chip } from "@mui/material";

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

// Componente Show para ver el detalle completo del folio
export const mostrarFolio = () => (
  <Show>
    <SimpleShowLayout>
      <Typography variant="h5" gutterBottom>
        Reporte de Emergencia Urbana - Folio #{<TextField source="id" />}
      </Typography>

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
);

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
