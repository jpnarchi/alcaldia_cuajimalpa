import React, { useState } from 'react';
import { Title } from 'react-admin';
import { Edit, Check, X, Clock, AlertCircle, User } from 'lucide-react';

const mockModificationRequests = [
    {
        id: 1,
        folio: 'RPT-2024-001',
        solicitante: 'Juan Pablo Narchi',
        rolSolicitante: 'usuario',
        turno: 'mañana',
        fechaSolicitud: '2024-01-17T10:30:00Z',
        tipoModificacion: 'Corrección de datos',
        motivoSolicitud: 'Error en la descripción del incidente reportado',
        detallesActuales: 'Reporte de seguridad en área común',
        detallesSolicitados: 'Reporte de seguridad en área de estacionamiento',
        estado: 'pendiente',
        prioridad: 'media',
        comentarios: 'Se requiere corrección urgente para el reporte mensual'
    },
    {
        id: 2,
        folio: 'RPT-2024-003',
        solicitante: 'Carlos López',
        rolSolicitante: 'jefe_turno',
        turno: 'tarde',
        fechaSolicitud: '2024-01-16T18:45:00Z',
        tipoModificacion: 'Actualización de estado',
        motivoSolicitud: 'El protocolo de emergencia se completó exitosamente',
        detallesActuales: 'Estado: En proceso',
        detallesSolicitados: 'Estado: Completado',
        estado: 'aprobada',
        prioridad: 'alta',
        comentarios: 'Solicitud aprobada por jefe de turno',
        fechaResolucion: '2024-01-16T19:00:00Z',
        resueltoLor: 'Ana Rodríguez'
    },
    {
        id: 3,
        folio: 'RPT-2024-004',
        solicitante: 'María García',
        rolSolicitante: 'jefe_turno',
        turno: 'mañana',
        fechaSolicitud: '2024-01-17T09:15:00Z',
        tipoModificacion: 'Corrección de horario',
        motivoSolicitud: 'El reporte se generó con hora incorrecta',
        detallesActuales: 'Hora: 11:15 AM',
        detallesSolicitados: 'Hora: 09:15 AM',
        estado: 'rechazada',
        prioridad: 'baja',
        comentarios: 'No se puede modificar la hora después de 2 horas',
        fechaResolucion: '2024-01-17T10:00:00Z',
        resueltoLor: 'Ana Rodríguez'
    },
    {
        id: 4,
        folio: 'RPT-2024-005',
        solicitante: 'Pedro Martínez',
        rolSolicitante: 'usuario',
        turno: 'tarde',
        fechaSolicitud: '2024-01-17T11:00:00Z',
        tipoModificacion: 'Adición de información',
        motivoSolicitud: 'Faltó incluir detalles importantes del incidente',
        detallesActuales: 'Reporte de actividad sospechosa',
        detallesSolicitados: 'Reporte de actividad sospechosa - Se observó persona no autorizada en área restringida sector B',
        estado: 'pendiente',
        prioridad: 'alta',
        comentarios: 'Información crítica para seguimiento de seguridad'
    }
];

const estadoColors = {
    'pendiente': { bg: '#fff3cd', color: '#856404' },
    'aprobada': { bg: '#d4edda', color: '#155724' },
    'rechazada': { bg: '#f8d7da', color: '#721c24' }
};

const prioridadColors = {
    'alta': { bg: '#ffebee', color: '#c62828' },
    'media': { bg: '#fff8e1', color: '#f57c00' },
    'baja': { bg: '#f3e5f5', color: '#7b1fa2' }
};

export const AdminModificationRequests = () => {
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroPrioridad, setFiltroPrioridad] = useState('');
    const [filtroTurno, setFiltroTurno] = useState('');

    const solicitudesFiltradas = mockModificationRequests.filter(request => {
        return (filtroEstado === '' || request.estado === filtroEstado) &&
               (filtroPrioridad === '' || request.prioridad === filtroPrioridad) &&
               (filtroTurno === '' || request.turno === filtroTurno);
    });

    const estadisticas = {
        total: mockModificationRequests.length,
        pendientes: mockModificationRequests.filter(r => r.estado === 'pendiente').length,
        aprobadas: mockModificationRequests.filter(r => r.estado === 'aprobada').length,
        rechazadas: mockModificationRequests.filter(r => r.estado === 'rechazada').length,
        altaPrioridad: mockModificationRequests.filter(r => r.prioridad === 'alta').length
    };

    const handleApprove = (requestId: number) => {
        alert(`Aprobar solicitud ID: ${requestId}`);
    };

    const handleReject = (requestId: number) => {
        alert(`Rechazar solicitud ID: ${requestId}`);
    };

    const handleViewDetails = (requestId: number) => {
        alert(`Ver detalles de solicitud ID: ${requestId}`);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
                color: 'white',
                padding: '20px',
                borderRadius: '10px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Edit size={24} />
                    <Title title="Solicitudes de Modificación (Administrador)" />
                </div>
                <div style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    padding: '10px 15px',
                    borderRadius: '5px'
                }}>
                    <span style={{ fontSize: '14px' }}>
                        {estadisticas.pendientes} pendientes de {estadisticas.total} total
                    </span>
                </div>
            </div>

            {/* Estadísticas */}
            <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '15px',
                marginBottom: '20px'
            }}>
                <div style={{ 
                    background: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                }}>
                    <Edit size={24} color="#3498db" style={{ marginBottom: '10px' }} />
                    <h3 style={{ color: '#3498db', margin: '0 0 5px 0' }}>Total</h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>
                        {estadisticas.total}
                    </p>
                </div>
                
                <div style={{ 
                    background: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                }}>
                    <Clock size={24} color="#f39c12" style={{ marginBottom: '10px' }} />
                    <h3 style={{ color: '#f39c12', margin: '0 0 5px 0' }}>Pendientes</h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>
                        {estadisticas.pendientes}
                    </p>
                </div>

                <div style={{ 
                    background: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                }}>
                    <Check size={24} color="#27ae60" style={{ marginBottom: '10px' }} />
                    <h3 style={{ color: '#27ae60', margin: '0 0 5px 0' }}>Aprobadas</h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>
                        {estadisticas.aprobadas}
                    </p>
                </div>

                <div style={{ 
                    background: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                }}>
                    <AlertCircle size={24} color="#e74c3c" style={{ marginBottom: '10px' }} />
                    <h3 style={{ color: '#e74c3c', margin: '0 0 5px 0' }}>Urgentes</h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>
                        {estadisticas.altaPrioridad}
                    </p>
                </div>
            </div>

            {/* Filtros */}
            <div style={{ 
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px'
            }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#667eea' }}>Filtros</h3>
                
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#2c3e50' }}>
                            Estado:
                        </label>
                        <select 
                            value={filtroEstado}
                            onChange={(e) => setFiltroEstado(e.target.value)}
                            style={{ 
                                padding: '8px 12px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '14px'
                            }}
                        >
                            <option value="">Todos los estados</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="aprobada">Aprobada</option>
                            <option value="rechazada">Rechazada</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#2c3e50' }}>
                            Prioridad:
                        </label>
                        <select 
                            value={filtroPrioridad}
                            onChange={(e) => setFiltroPrioridad(e.target.value)}
                            style={{ 
                                padding: '8px 12px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '14px'
                            }}
                        >
                            <option value="">Todas las prioridades</option>
                            <option value="alta">Alta</option>
                            <option value="media">Media</option>
                            <option value="baja">Baja</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#2c3e50' }}>
                            Turno:
                        </label>
                        <select 
                            value={filtroTurno}
                            onChange={(e) => setFiltroTurno(e.target.value)}
                            style={{ 
                                padding: '8px 12px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '14px'
                            }}
                        >
                            <option value="">Todos los turnos</option>
                            <option value="mañana">Mañana</option>
                            <option value="tarde">Tarde</option>
                        </select>
                    </div>

                    <button
                        onClick={() => {
                            setFiltroEstado('');
                            setFiltroPrioridad('');
                            setFiltroTurno('');
                        }}
                        style={{ 
                            backgroundColor: '#95a5a6',
                            color: 'white',
                            border: 'none',
                            padding: '8px 12px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '20px'
                        }}
                    >
                        Limpiar Filtros
                    </button>
                </div>
            </div>

            {/* Lista de solicitudes */}
            <div style={{ 
                background: 'white',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <h3 style={{ color: '#667eea', marginBottom: '15px' }}>
                    Solicitudes ({solicitudesFiltradas.length} de {mockModificationRequests.length})
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {solicitudesFiltradas.map((request) => (
                        <div 
                            key={request.id}
                            style={{ 
                                border: '1px solid #e9ecef',
                                borderRadius: '10px',
                                padding: '20px',
                                backgroundColor: '#f8f9fa'
                            }}
                        >
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'flex-start',
                                marginBottom: '15px'
                            }}>
                                <div>
                                    <h4 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>
                                        Folio: {request.folio}
                                    </h4>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                                        <User size={14} color="#7f8c8d" />
                                        <span style={{ fontSize: '14px', color: '#7f8c8d' }}>
                                            {request.solicitante} ({request.rolSolicitante})
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#95a5a6' }}>
                                        Solicitado: {new Date(request.fechaSolicitud).toLocaleString()}
                                    </div>
                                </div>
                                
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <span style={{ 
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        backgroundColor: estadoColors[request.estado as keyof typeof estadoColors].bg,
                                        color: estadoColors[request.estado as keyof typeof estadoColors].color
                                    }}>
                                        {request.estado.charAt(0).toUpperCase() + request.estado.slice(1)}
                                    </span>
                                    
                                    <span style={{ 
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        backgroundColor: prioridadColors[request.prioridad as keyof typeof prioridadColors].bg,
                                        color: prioridadColors[request.prioridad as keyof typeof prioridadColors].color
                                    }}>
                                        {request.prioridad.charAt(0).toUpperCase() + request.prioridad.slice(1)}
                                    </span>
                                </div>
                            </div>

                            <div style={{ 
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '20px',
                                marginBottom: '15px'
                            }}>
                                <div>
                                    <h5 style={{ margin: '0 0 8px 0', color: '#e74c3c' }}>Detalles Actuales:</h5>
                                    <p style={{ 
                                        margin: 0,
                                        padding: '10px',
                                        backgroundColor: '#ffeaa7',
                                        borderRadius: '5px',
                                        fontSize: '14px',
                                        border: '1px solid #fdcb6e'
                                    }}>
                                        {request.detallesActuales}
                                    </p>
                                </div>
                                
                                <div>
                                    <h5 style={{ margin: '0 0 8px 0', color: '#27ae60' }}>Detalles Solicitados:</h5>
                                    <p style={{ 
                                        margin: 0,
                                        padding: '10px',
                                        backgroundColor: '#a8e6cf',
                                        borderRadius: '5px',
                                        fontSize: '14px',
                                        border: '1px solid #81c784'
                                    }}>
                                        {request.detallesSolicitados}
                                    </p>
                                </div>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                                <h5 style={{ margin: '0 0 8px 0', color: '#3498db' }}>Motivo:</h5>
                                <p style={{ margin: 0, fontSize: '14px', color: '#2c3e50' }}>
                                    {request.motivoSolicitud}
                                </p>
                            </div>

                            {request.comentarios && (
                                <div style={{ marginBottom: '15px' }}>
                                    <h5 style={{ margin: '0 0 8px 0', color: '#9b59b6' }}>Comentarios:</h5>
                                    <p style={{ margin: 0, fontSize: '14px', color: '#2c3e50', fontStyle: 'italic' }}>
                                        {request.comentarios}
                                    </p>
                                </div>
                            )}

                            {request.estado === 'pendiente' ? (
                                <div style={{ 
                                    display: 'flex', 
                                    gap: '10px',
                                    paddingTop: '15px',
                                    borderTop: '1px solid #e9ecef'
                                }}>
                                    <button
                                        onClick={() => handleApprove(request.id)}
                                        style={{ 
                                            flex: 1,
                                            backgroundColor: '#27ae60',
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '5px'
                                        }}
                                    >
                                        <Check size={16} />
                                        Aprobar
                                    </button>
                                    
                                    <button
                                        onClick={() => handleReject(request.id)}
                                        style={{ 
                                            flex: 1,
                                            backgroundColor: '#e74c3c',
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '5px'
                                        }}
                                    >
                                        <X size={16} />
                                        Rechazar
                                    </button>
                                    
                                    <button
                                        onClick={() => handleViewDetails(request.id)}
                                        style={{ 
                                            backgroundColor: '#3498db',
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px 15px',
                                            borderRadius: '5px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Ver Detalles
                                    </button>
                                </div>
                            ) : (
                                <div style={{ 
                                    paddingTop: '15px',
                                    borderTop: '1px solid #e9ecef',
                                    fontSize: '12px',
                                    color: '#95a5a6'
                                }}>
                                    {request.fechaResolucion && request.resueltoLor && (
                                        <p style={{ margin: 0 }}>
                                            Resuelto por {request.resueltoLor} el {new Date(request.fechaResolucion).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};