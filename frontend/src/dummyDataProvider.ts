import { DataProvider } from 'react-admin';

// Datos dummy para "Crear folio"
const folios = [
  {
    id: 1,
    diaFechaHora: "2025-10-10 08:30",
    turno: "Matutino",
    nombrePersonal: "Dr. Juan Pérez",
    modoActivacion: "Llamada de emergencia",
    tipoServicio: "Petición de mitigación de riesgo",
    fechaHoraAtencion: "2025-10-10 08:45",
    tiempoTraslado: "15 minutos",
    ubicacion: "Av. Juárez 123, Col. Centro",
    gravedadEmergencia: "Alta",
    kmRecorridos: "5.2 km",
    trabajosRealizados: "Atención médica de urgencia, estabilización del paciente",
    observaciones: "Paciente con signos vitales estables después de la atención",
    conclusion: "Paciente trasladado al hospital más cercano",
    responsablesEmergencia: "Jefe de zona norte",
    autoridades: "Seguridad Pública, Bomberos"
  },
  {
    id: 2,
    diaFechaHora: "2025-10-10 14:20",
    turno: "Vespertino",
    nombrePersonal: "Dra. María González",
    modoActivacion: "Seguimiento de oficio",
    tipoServicio: "Petición de mitigación de riesgo",
    fechaHoraAtencion: "2025-10-10 14:30",
    tiempoTraslado: "10 minutos",
    ubicacion: "Calle Reforma 456, Col. Lomas",
    gravedadEmergencia: "Media",
    kmRecorridos: "3.8 km",
    trabajosRealizados: "Inspección de área, evaluación de riesgos",
    observaciones: "Área acordonada por prevención",
    conclusion: "Situación controlada, no requiere más intervención",
    responsablesEmergencia: "Responsable del inmueble",
    autoridades: "Protección Civil"
  },
  {
    id: 3,
    diaFechaHora: "2025-10-11 10:15",
    turno: "Matutino",
    nombrePersonal: "Dr. Carlos Ramírez",
    modoActivacion: "Llamada de emergencia",
    tipoServicio: "Petición de mitigación de riesgo",
    fechaHoraAtencion: "2025-10-11 10:25",
    tiempoTraslado: "10 minutos",
    ubicacion: "Av. Constituyentes 789, Col. San Pedro",
    gravedadEmergencia: "Baja",
    kmRecorridos: "2.5 km",
    trabajosRealizados: "Revisión general, recomendaciones de seguridad",
    observaciones: "Falsa alarma, todo en orden",
    conclusion: "No se requirió intervención mayor",
    responsablesEmergencia: "Jefe de zona centro",
    autoridades: "Ninguna"
  },
  {
    id: 4,
    diaFechaHora: "2025-10-11 16:45",
    turno: "Vespertino",
    nombrePersonal: "Dra. Ana Martínez",
    modoActivacion: "Llamada de emergencia",
    tipoServicio: "Petición de mitigación de riesgo",
    fechaHoraAtencion: "2025-10-11 17:00",
    tiempoTraslado: "15 minutos",
    ubicacion: "Calle Morelos 234, Col. Guadalupe",
    gravedadEmergencia: "Alta",
    kmRecorridos: "7.1 km",
    trabajosRealizados: "Atención de emergencia múltiple, coordinación con bomberos",
    observaciones: "Incidente requirió apoyo de varias unidades",
    conclusion: "Emergencia controlada exitosamente",
    responsablesEmergencia: "Jefe de zona sur, Responsable del inmueble",
    autoridades: "Seguridad Pública, Bomberos, Protección Civil"
  },
  {
    id: 5,
    diaFechaHora: "2025-10-12 09:30",
    turno: "Matutino",
    nombrePersonal: "Dr. Luis Hernández",
    modoActivacion: "Seguimiento de oficio",
    tipoServicio: "Petición de mitigación de riesgo",
    fechaHoraAtencion: "2025-10-12 09:45",
    tiempoTraslado: "15 minutos",
    ubicacion: "Av. Insurgentes 567, Col. Del Valle",
    gravedadEmergencia: "Media",
    kmRecorridos: "4.3 km",
    trabajosRealizados: "Verificación de condiciones de seguridad post-emergencia",
    observaciones: "Seguimiento de caso previo, todo en orden",
    conclusion: "Caso cerrado satisfactoriamente",
    responsablesEmergencia: "Jefe de zona este",
    autoridades: "Protección Civil"
  },
  {
    id: 6,
    diaFechaHora: "2025-10-12 14:00",
    turno: "Vespertino",
    nombrePersonal: "Dr. Roberto Silva",
    modoActivacion: "Llamada de emergencia",
    tipoServicio: "Petición de mitigación de riesgo",
    fechaHoraAtencion: "2025-10-12 14:15",
    tiempoTraslado: "15 minutos",
    ubicacion: "Calle Hidalgo 890, Col. Centro Histórico",
    gravedadEmergencia: "Alta",
    kmRecorridos: "6.8 km",
    trabajosRealizados: "Evacuación de edificio, revisión estructural",
    observaciones: "Riesgo de colapso identificado",
    conclusion: "Área acordonada hasta evaluación estructural completa",
    responsablesEmergencia: "Jefe de zona centro, Protección Civil",
    autoridades: "Seguridad Pública, Bomberos, Protección Civil"
  },
  {
    id: 7,
    diaFechaHora: "2025-10-13 07:20",
    turno: "Matutino",
    nombrePersonal: "Dra. Patricia Ruiz",
    modoActivacion: "Seguimiento de oficio",
    tipoServicio: "Petición de mitigación de riesgo",
    fechaHoraAtencion: "2025-10-13 07:30",
    tiempoTraslado: "10 minutos",
    ubicacion: "Av. Universidad 345, Col. Copilco",
    gravedadEmergencia: "Baja",
    kmRecorridos: "3.2 km",
    trabajosRealizados: "Seguimiento de incidente previo, verificación de medidas correctivas",
    observaciones: "Todas las medidas implementadas correctamente",
    conclusion: "Caso cerrado, sin necesidad de seguimiento adicional",
    responsablesEmergencia: "Responsable del inmueble",
    autoridades: "Ninguna"
  },
  {
    id: 8,
    diaFechaHora: "2025-10-13 16:30",
    turno: "Vespertino",
    nombrePersonal: "Dr. Fernando Torres",
    modoActivacion: "Llamada de emergencia",
    tipoServicio: "Petición de mitigación de riesgo",
    fechaHoraAtencion: "2025-10-13 16:50",
    tiempoTraslado: "20 minutos",
    ubicacion: "Calle Puebla 678, Col. Roma",
    gravedadEmergencia: "Media",
    kmRecorridos: "8.5 km",
    trabajosRealizados: "Atención de incidente vehicular, coordinación con autoridades",
    observaciones: "Víctimas trasladadas a hospital, área limpiada",
    conclusion: "Incidente resuelto satisfactoriamente",
    responsablesEmergencia: "Jefe de zona sur",
    autoridades: "Seguridad Pública, Tránsito"
  },
];

// Datos dummy para "Folios creados"
const foliosCreados = [
  { id: 1, folio: "F-001", fecha: "2025-10-10", estado: "Completado", paciente: "Pedro López" },
  { id: 2, folio: "F-002", fecha: "2025-10-11", estado: "En proceso", paciente: "Laura Sánchez" },
  { id: 3, folio: "F-003", fecha: "2025-10-11", estado: "Pendiente", paciente: "José García" },
  { id: 4, folio: "F-004", fecha: "2025-10-12", estado: "Completado", paciente: "Carmen Rodríguez" },
  { id: 5, folio: "F-005", fecha: "2025-10-12", estado: "En proceso", paciente: "Miguel Ángel Soto" },
  { id: 6, folio: "F-006", fecha: "2025-10-12", estado: "Completado", paciente: "Sofía Hernández" },
  { id: 7, folio: "F-007", fecha: "2025-10-13", estado: "Pendiente", paciente: "Ricardo Morales" },
  { id: 8, folio: "F-008", fecha: "2025-10-13", estado: "Completado", paciente: "Andrea Jiménez" },
];

// Datos dummy para "Mi Perfil" (perfiles de usuario)
const perfiles = [
  {
    id: 1,
    userId: "admin",
    username: "admin",
    nombre: "Administrador General",
    email: "admin@cuajimalpa.gob.mx",
    telefono: "555-0001",
    rol: "admin",
    // Información administrativa
    departamento: "Dirección General",
    nivelAcceso: "Total",
    // Estadísticas
    estadisticas: {
      foliosCreados: 0,
      foliosCompletados: 0,
      ultimaActividad: "2025-10-13 09:30"
    }
  },
  {
    id: 2,
    userId: "jefe",
    username: "jefe",
    nombre: "Jefe de Turno",
    email: "jefe.turno@cuajimalpa.gob.mx",
    telefono: "555-0002",
    rol: "jefe_turno",
    // Información laboral
    turno: "Matutino",
    especialidad: "Coordinación de Emergencias",
    numeroEmpleado: "JT-001",
    fechaIngreso: "2025-01-15",
    // Horario de trabajo
    horario: {
      horaInicio: "06:00",
      horaFin: "14:00",
      diasTrabajo: "Lunes a Viernes"
    },
    // Información de supervisión
    equipoACargo: "8 miembros",
    zona: "Zona Norte y Centro",
    // Estadísticas
    estadisticas: {
      foliosCreados: 15,
      foliosCompletados: 12,
      ultimaActividad: "2025-10-13 08:15"
    }
  },
  {
    id: 3,
    userId: "usuario",
    username: "usuario",
    nombre: "Usuario Normal",
    email: "usuario@cuajimalpa.gob.mx",
    telefono: "555-0003",
    rol: "usuario",
    // Información laboral
    turno: "Vespertino",
    especialidad: "Atención de Emergencias",
    numeroEmpleado: "US-003",
    fechaIngreso: "2025-02-01",
    // Horario de trabajo
    horario: {
      horaInicio: "14:00",
      horaFin: "22:00",
      diasTrabajo: "Lunes a Sábado"
    },
    // Estadísticas
    estadisticas: {
      foliosCreados: 8,
      foliosCompletados: 7,
      ultimaActividad: "2025-10-12 16:45"
    }
  },
];

// Datos dummy para "Equipo" (miembros del equipo)
const equipoMiembros = [
  {
    id: 1,
    nombre: "Dr. Juan Pérez",
    rol: "Paramédico",
    turno: "Matutino",
    telefono: "555-1234",
    email: "juan.perez@cuajimalpa.gob.mx",
    jefeId: "jefe", // ID del jefe de turno
    especialidad: "Medicina de emergencia",
    status: "Activo"
  },
  {
    id: 2,
    nombre: "Dra. María González",
    rol: "Paramédico",
    turno: "Vespertino",
    telefono: "555-5678",
    email: "maria.gonzalez@cuajimalpa.gob.mx",
    jefeId: "jefe",
    especialidad: "Primeros auxilios",
    status: "Activo"
  },
  {
    id: 3,
    nombre: "Dr. Carlos Ramírez",
    rol: "Técnico de emergencias",
    turno: "Matutino",
    telefono: "555-9012",
    email: "carlos.ramirez@cuajimalpa.gob.mx",
    jefeId: "jefe",
    especialidad: "Rescate urbano",
    status: "Activo"
  },
  {
    id: 4,
    nombre: "Dra. Ana Martínez",
    rol: "Paramédico",
    turno: "Vespertino",
    telefono: "555-3456",
    email: "ana.martinez@cuajimalpa.gob.mx",
    jefeId: "jefe",
    especialidad: "Atención prehospitalaria",
    status: "Activo"
  },
  {
    id: 5,
    nombre: "Dr. Luis Hernández",
    rol: "Conductor ambulancia",
    turno: "Matutino",
    telefono: "555-7890",
    email: "luis.hernandez@cuajimalpa.gob.mx",
    jefeId: "jefe",
    especialidad: "Manejo de vehículos de emergencia",
    status: "Activo"
  },
  {
    id: 6,
    nombre: "Dr. Roberto Silva",
    rol: "Técnico de emergencias",
    turno: "Vespertino",
    telefono: "555-2345",
    email: "roberto.silva@cuajimalpa.gob.mx",
    jefeId: "jefe",
    especialidad: "Evaluación de riesgos",
    status: "Activo"
  },
  {
    id: 7,
    nombre: "Dra. Patricia Ruiz",
    rol: "Paramédico",
    turno: "Matutino",
    telefono: "555-6789",
    email: "patricia.ruiz@cuajimalpa.gob.mx",
    jefeId: "jefe",
    especialidad: "Atención médica de urgencia",
    status: "Activo"
  },
  {
    id: 8,
    nombre: "Dr. Fernando Torres",
    rol: "Conductor ambulancia",
    turno: "Vespertino",
    telefono: "555-0123",
    email: "fernando.torres@cuajimalpa.gob.mx",
    jefeId: "jefe",
    especialidad: "Logística de emergencias",
    status: "Activo"
  },
];

// Datos dummy para "Solicitudes de Modificación"
const solicitudesModificacion = [
  {
    id: 1,
    folioId: 1,
    solicitadoPor: "Dr. Juan Pérez",
    rolSolicitante: "usuario",
    fechaSolicitud: "2025-10-11T10:30:00",
    estadoSolicitud: "Pendiente",
    motivoSolicitud: "Error en ubicación registrada",
    camposModificar: "ubicacion, kmRecorridos",
    justificacion: "La ubicación registrada es incorrecta. El servicio se realizó en Av. Juárez 456, no en el 123. También los km recorridos fueron 6.5 km en lugar de 5.2 km.",
    folioOriginal: {
      id: 1,
      diaFechaHora: "2025-10-10 08:30",
      nombrePersonal: "Dr. Juan Pérez",
      tipoServicio: "Petición de mitigación de riesgo",
      ubicacion: "Av. Juárez 123, Col. Centro"
    },
    respuestaAdmin: null,
    fechaRespuesta: null
  },
  {
    id: 2,
    folioId: 3,
    solicitadoPor: "Dr. Carlos Ramírez",
    rolSolicitante: "usuario",
    fechaSolicitud: "2025-10-11T14:20:00",
    estadoSolicitud: "Pendiente",
    motivoSolicitud: "Falta información en observaciones",
    camposModificar: "observaciones, conclusion",
    justificacion: "Necesito agregar información adicional sobre las medidas preventivas recomendadas al responsable del inmueble que no fueron incluidas en el reporte inicial.",
    folioOriginal: {
      id: 3,
      diaFechaHora: "2025-10-11 10:15",
      nombrePersonal: "Dr. Carlos Ramírez",
      tipoServicio: "Petición de mitigación de riesgo",
      ubicacion: "Av. Constituyentes 789, Col. San Pedro"
    },
    respuestaAdmin: null,
    fechaRespuesta: null
  },
  {
    id: 3,
    folioId: 4,
    solicitadoPor: "Dra. Ana Martínez",
    rolSolicitante: "usuario",
    fechaSolicitud: "2025-10-12T09:00:00",
    estadoSolicitud: "Aprobada",
    motivoSolicitud: "Corrección de autoridades participantes",
    camposModificar: "autoridades",
    justificacion: "Faltó registrar la participación de Cruz Roja en la atención de la emergencia múltiple.",
    folioOriginal: {
      id: 4,
      diaFechaHora: "2025-10-11 16:45",
      nombrePersonal: "Dra. Ana Martínez",
      tipoServicio: "Petición de mitigación de riesgo",
      ubicacion: "Calle Morelos 234, Col. Guadalupe"
    },
    respuestaAdmin: "Solicitud aprobada. Puede proceder con la modificación del campo de autoridades para incluir Cruz Roja.",
    fechaRespuesta: "2025-10-12T11:30:00"
  },
  {
    id: 4,
    folioId: 6,
    solicitadoPor: "Dr. Roberto Silva",
    rolSolicitante: "usuario",
    fechaSolicitud: "2025-10-12T16:45:00",
    estadoSolicitud: "Rechazada",
    motivoSolicitud: "Cambio de conclusión",
    camposModificar: "conclusion",
    justificacion: "Quiero modificar la conclusión del folio.",
    folioOriginal: {
      id: 6,
      diaFechaHora: "2025-10-12 14:00",
      nombrePersonal: "Dr. Roberto Silva",
      tipoServicio: "Petición de mitigación de riesgo",
      ubicacion: "Calle Hidalgo 890, Col. Centro Histórico"
    },
    respuestaAdmin: "Solicitud rechazada. La justificación no es suficientemente específica. Por favor proporcione más detalles sobre qué cambios exactos necesita realizar en la conclusión y el motivo técnico.",
    fechaRespuesta: "2025-10-12T18:00:00"
  },
  {
    id: 5,
    folioId: 7,
    solicitadoPor: "Dra. Patricia Ruiz",
    rolSolicitante: "usuario",
    fechaSolicitud: "2025-10-13T08:30:00",
    estadoSolicitud: "Pendiente",
    motivoSolicitud: "Error en tiempo de traslado",
    camposModificar: "tiempoTraslado, trabajosRealizados",
    justificacion: "El tiempo de traslado registrado fue de 10 minutos pero en realidad fueron 15 minutos debido al tráfico. También necesito agregar detalles sobre las verificaciones realizadas en los trabajos.",
    folioOriginal: {
      id: 7,
      diaFechaHora: "2025-10-13 07:20",
      nombrePersonal: "Dra. Patricia Ruiz",
      tipoServicio: "Petición de mitigación de riesgo",
      ubicacion: "Av. Universidad 345, Col. Copilco"
    },
    respuestaAdmin: null,
    fechaRespuesta: null
  },
];

// Datos dummy para "Usuarios"
const usuarios = [
  {
    id: 1,
    username: "admin",
    password: "admin", // En producción, esto debe estar hasheado
    fullName: "Administrador General",
    email: "admin@cuajimalpa.gob.mx",
    role: "admin",
    telefono: "555-0001",
    status: "Activo",
    fechaCreacion: "2025-01-01",
    ultimoAcceso: "2025-10-13 09:30"
  },
  {
    id: 2,
    username: "jefe",
    password: "jefe",
    fullName: "Jefe de Turno",
    email: "jefe.turno@cuajimalpa.gob.mx",
    role: "jefe_turno",
    telefono: "555-0002",
    status: "Activo",
    fechaCreacion: "2025-01-15",
    ultimoAcceso: "2025-10-13 08:15"
  },
  {
    id: 3,
    username: "usuario",
    password: "usuario",
    fullName: "Usuario",
    email: "usuario@cuajimalpa.gob.mx",
    role: "usuario",
    telefono: "555-0003",
    status: "Activo",
    fechaCreacion: "2025-02-01",
    ultimoAcceso: "2025-10-12 16:45"
  },
  {
    id: 4,
    username: "jperez",
    password: "jperez123",
    fullName: "Dr. Juan Pérez",
    email: "juan.perez@cuajimalpa.gob.mx",
    role: "usuario",
    telefono: "555-1234",
    status: "Activo",
    fechaCreacion: "2025-03-10",
    ultimoAcceso: "2025-10-13 07:20"
  },
  {
    id: 5,
    username: "mgonzalez",
    password: "mgonzalez123",
    fullName: "Dra. María González",
    email: "maria.gonzalez@cuajimalpa.gob.mx",
    role: "usuario",
    telefono: "555-5678",
    status: "Activo",
    fechaCreacion: "2025-03-15",
    ultimoAcceso: "2025-10-12 14:30"
  },
  {
    id: 6,
    username: "cramirez",
    password: "cramirez123",
    fullName: "Dr. Carlos Ramírez",
    email: "carlos.ramirez@cuajimalpa.gob.mx",
    role: "jefe_turno",
    telefono: "555-9012",
    status: "Activo",
    fechaCreacion: "2025-04-01",
    ultimoAcceso: "2025-10-13 06:00"
  },
  {
    id: 7,
    username: "amartinez",
    password: "amartinez123",
    fullName: "Dra. Ana Martínez",
    email: "ana.martinez@cuajimalpa.gob.mx",
    role: "usuario",
    telefono: "555-3456",
    status: "Inactivo",
    fechaCreacion: "2025-05-10",
    ultimoAcceso: "2025-09-30 18:00"
  },
];

// Almacenamiento en memoria para simular persistencia
const data: Record<string, any[]> = {
  "Folios": [...folios],
  "Crear folio": [...folios], // Mantener compatibilidad
  "Folios creados": [...foliosCreados],
  "Mi Perfil": [...perfiles],
  "Equipo": [...equipoMiembros],
  "Usuarios": [...usuarios],
  "Solicitudes de Modificación": [...solicitudesModificacion],
};

// Función auxiliar para generar nuevo ID
const getNewId = (resource: string): number => {
  const ids = data[resource].map(item => item.id);
  return Math.max(...ids, 0) + 1;
};

export const dummyDataProvider: DataProvider = {
  // getList: Obtener lista de recursos con paginación y ordenamiento
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = params.filter;

    let resourceData = [...(data[resource] || [])];

    // Filtrar
    if (query && Object.keys(query).length > 0) {
      resourceData = resourceData.filter(item => {
        return Object.keys(query).every(key => {
          if (!query[key]) return true;
          return String(item[key]).toLowerCase().includes(String(query[key]).toLowerCase());
        });
      });
    }

    // Ordenar
    resourceData.sort((a, b) => {
      if (a[field] < b[field]) return order === 'ASC' ? -1 : 1;
      if (a[field] > b[field]) return order === 'ASC' ? 1 : -1;
      return 0;
    });

    const total = resourceData.length;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    return {
      data: resourceData.slice(start, end),
      total,
    };
  },

  // getOne: Obtener un solo recurso por ID
  getOne: async (resource, params) => {
    // Convertir el ID a número para asegurar compatibilidad
    const idToFind = typeof params.id === 'string' ? parseInt(params.id, 10) : params.id;

    const item = data[resource]?.find(item => item.id === idToFind);
    if (!item) {
      throw new Error(`Item not found: ${resource} with id ${params.id}`);
    }
    return { data: item };
  },

  // getMany: Obtener múltiples recursos por IDs
  getMany: async (resource, params) => {
    // Convertir IDs a números para asegurar compatibilidad
    const idsToFind = params.ids.map(id => typeof id === 'string' ? parseInt(id, 10) : id);
    const items = data[resource]?.filter(item => idsToFind.includes(item.id)) || [];
    return { data: items };
  },

  // getManyReference: Obtener recursos relacionados
  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const { target, id } = params;

    let resourceData = [...(data[resource] || [])];

    // Filtrar por referencia
    resourceData = resourceData.filter(item => item[target] === id);

    // Ordenar
    resourceData.sort((a, b) => {
      if (a[field] < b[field]) return order === 'ASC' ? -1 : 1;
      if (a[field] > b[field]) return order === 'ASC' ? 1 : -1;
      return 0;
    });

    const total = resourceData.length;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    return {
      data: resourceData.slice(start, end),
      total,
    };
  },

  // create: Crear un nuevo recurso
  create: async (resource, params) => {
    const newItem = {
      id: getNewId(resource),
      ...params.data,
    };

    if (!data[resource]) {
      data[resource] = [];
    }

    data[resource].push(newItem);
    return { data: newItem };
  },

  // update: Actualizar un recurso existente
  update: async (resource, params) => {
    const idToFind = typeof params.id === 'string' ? parseInt(params.id, 10) : params.id;
    const index = data[resource]?.findIndex(item => item.id === idToFind);
    if (index === -1 || index === undefined) {
      throw new Error(`Item not found: ${resource} with id ${params.id}`);
    }

    data[resource][index] = {
      ...data[resource][index],
      ...params.data,
    };

    return { data: data[resource][index] };
  },

  // updateMany: Actualizar múltiples recursos
  updateMany: async (resource, params) => {
    const idsToFind = params.ids.map(id => typeof id === 'string' ? parseInt(id, 10) : id);
    idsToFind.forEach(id => {
      const index = data[resource]?.findIndex(item => item.id === id);
      if (index !== -1 && index !== undefined) {
        data[resource][index] = {
          ...data[resource][index],
          ...params.data,
        };
      }
    });
    return { data: params.ids };
  },

  // delete: Eliminar un recurso
  delete: async (resource, params) => {
    const idToFind = typeof params.id === 'string' ? parseInt(params.id, 10) : params.id;
    const index = data[resource]?.findIndex(item => item.id === idToFind);
    if (index === -1 || index === undefined) {
      throw new Error(`Item not found: ${resource} with id ${params.id}`);
    }

    const deletedItem = data[resource][index];
    data[resource].splice(index, 1);

    return { data: deletedItem };
  },

  // deleteMany: Eliminar múltiples recursos
  deleteMany: async (resource, params) => {
    const idsToFind = params.ids.map(id => typeof id === 'string' ? parseInt(id, 10) : id);
    const deletedIds: any[] = [];

    idsToFind.forEach(id => {
      const index = data[resource]?.findIndex(item => item.id === id);
      if (index !== -1 && index !== undefined) {
        data[resource].splice(index, 1);
        deletedIds.push(id);
      }
    });

    return { data: deletedIds };
  },
};
