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

// Datos dummy para "Mi Perfil" (horarios)
const horarios = [
  { id: 1, dia: "Lunes", horaInicio: "08:00", horaFin: "16:00", turno: "Matutino" },
  { id: 2, dia: "Martes", horaInicio: "08:00", horaFin: "16:00", turno: "Matutino" },
  { id: 3, dia: "Miércoles", horaInicio: "14:00", horaFin: "22:00", turno: "Vespertino" },
  { id: 4, dia: "Jueves", horaInicio: "08:00", horaFin: "16:00", turno: "Matutino" },
  { id: 5, dia: "Viernes", horaInicio: "14:00", horaFin: "22:00", turno: "Vespertino" },
];

// Almacenamiento en memoria para simular persistencia
const data: Record<string, any[]> = {
  "Crear folio": [...folios],
  "Folios creados": [...foliosCreados],
  "Mi Perfil": [...horarios],
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
