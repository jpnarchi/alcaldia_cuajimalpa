import React, { useState } from 'react';
import { Title } from 'react-admin';
import { Download, FileText, BarChart3, Filter, Users } from 'lucide-react';

const mockAllReports = [
    {
        id: 1,
        folio: 'RPT-2024-001',
        fecha: '2024-01-15T10:30:00Z',
        operador: 'Juan Pablo Narchi',
        turno: 'mañana',
        tipo: 'Incidente',
        descripcion: 'Reporte de seguridad en área común',
        estado: 'completado',
        prioridad: 'alta'
    },
    {
        id: 2,
        folio: 'RPT-2024-002',
        fecha: '2024-01-15T14:20:00Z',
        operador: 'María García',
        turno: 'mañana',
        tipo: 'Mantenimiento',
        descripcion: 'Revisión de equipos de vigilancia',
        estado: 'en_proceso',
        prioridad: 'media'
    },
    {
        id: 3,
        folio: 'RPT-2024-003',
        fecha: '2024-01-15T16:45:00Z',
        operador: 'Carlos López',
        turno: 'tarde',
        tipo: 'Emergencia',
        descripcion: 'Activación de protocolo de emergencia',
        estado: 'completado',
        prioridad: 'alta'
    },
    {
        id: 4,
        folio: 'RPT-2024-004',
        fecha: '2024-01-16T09:15:00Z',
        operador: 'Ana Rodríguez',
        turno: 'mañana',
        tipo: 'Rutina',
        descripcion: 'Inspección rutinaria de instalaciones',
        estado: 'completado',
        prioridad: 'baja'
    },
    {
        id: 5,
        folio: 'RPT-2024-005',
        fecha: '2024-01-16T18:30:00Z',
        operador: 'Pedro Martínez',
        turno: 'tarde',
        tipo: 'Incidente',
        descripcion: 'Reporte de actividad sospechosa',
        estado: 'en_proceso',
        prioridad: 'alta'
    },
    {
        id: 6,
        folio: 'RPT-2024-006',
        fecha: '2024-01-17T11:45:00Z',
        operador: 'Luis Fernández',
        turno: 'mañana',
        tipo: 'Mantenimiento',
        descripcion: 'Cambio de baterías en sensores',
        estado: 'completado',
        prioridad: 'media'
    }
];

const estadoChoices = [
    { id: 'completado', name: 'Completado' },
    { id: 'en_proceso', name: 'En Proceso' },
    { id: 'pendiente', name: 'Pendiente' }
];

const prioridadChoices = [
    { id: 'alta', name: 'Alta' },
    { id: 'media', name: 'Media' },
    { id: 'baja', name: 'Baja' }
];

export const AdminReportHistory = () => {
    const [filtroTurno, setFiltroTurno] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');

    const reportesFiltrados = mockAllReports.filter(report => {
        return (filtroTurno === '' || report.turno === filtroTurno) &&
               (filtroEstado === '' || report.estado === filtroEstado);
    });

    const estadisticas = {
        total: mockAllReports.length,
        completados: mockAllReports.filter(r => r.estado === 'completado').length,
        enProceso: mockAllReports.filter(r => r.estado === 'en_proceso').length,
        alta: mockAllReports.filter(r => r.prioridad === 'alta').length,
        turnos: {
            mañana: mockAllReports.filter(r => r.turno === 'mañana').length,
            tarde: mockAllReports.filter(r => r.turno === 'tarde').length
        }
    };

    const handleExportPDF = () => {
        alert('Exportando todos los reportes a PDF...');
    };

    const handleExportExcel = () => {
        alert('Exportando todos los reportes a Excel...');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                color: 'white',
                padding: '20px',
                borderRadius: '10px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BarChart3 size={24} />
                    <Title title="Historial Completo de Reportes (Administrador)" />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={handleExportPDF}
                        style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            border: 'none',
                            padding: '10px 15px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}
                    >
                        <Download size={16} />
                        PDF
                    </button>
                    <button
                        onClick={handleExportExcel}
                        style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            border: 'none',
                            padding: '10px 15px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}
                    >
                        <FileText size={16} />
                        Excel
                    </button>
                </div>
            </div>

            {/* Estadísticas */}
            <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
                    <h3 style={{ color: '#3498db', margin: '0 0 10px 0' }}>Total Reportes</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>
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
                    <h3 style={{ color: '#27ae60', margin: '0 0 10px 0' }}>Completados</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>
                        {estadisticas.completados}
                    </p>
                </div>

                <div style={{ 
                    background: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#f39c12', margin: '0 0 10px 0' }}>En Proceso</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>
                        {estadisticas.enProceso}
                    </p>
                </div>

                <div style={{ 
                    background: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#e74c3c', margin: '0 0 10px 0' }}>Alta Prioridad</h3>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>
                        {estadisticas.alta}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                    <Filter size={20} color="#667eea" />
                    <h3 style={{ margin: 0, color: '#667eea' }}>Filtros</h3>
                </div>
                
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
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
                            <option value="completado">Completado</option>
                            <option value="en_proceso">En Proceso</option>
                            <option value="pendiente">Pendiente</option>
                        </select>
                    </div>

                    <button
                        onClick={() => {
                            setFiltroTurno('');
                            setFiltroEstado('');
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

            {/* Tabla de reportes */}
            <div style={{ 
                background: 'white',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <h3 style={{ color: '#667eea', marginBottom: '15px' }}>
                    Reportes ({reportesFiltrados.length} de {mockAllReports.length})
                </h3>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Folio</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Fecha</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Operador</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Turno</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Tipo</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Descripción</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Estado</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Prioridad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportesFiltrados.map((report) => (
                                <tr key={report.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                                    <td style={{ padding: '12px' }}>{report.folio}</td>
                                    <td style={{ padding: '12px' }}>
                                        {new Date(report.fecha).toLocaleString()}
                                    </td>
                                    <td style={{ padding: '12px' }}>{report.operador}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ 
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            backgroundColor: report.turno === 'mañana' ? '#fff3cd' : '#d1ecf1',
                                            color: report.turno === 'mañana' ? '#856404' : '#0c5460',
                                            fontSize: '12px'
                                        }}>
                                            {report.turno.charAt(0).toUpperCase() + report.turno.slice(1)}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ 
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            backgroundColor: '#e3f2fd',
                                            color: '#1976d2',
                                            fontSize: '12px'
                                        }}>
                                            {report.tipo}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', maxWidth: '200px' }}>
                                        {report.descripcion}
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ 
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            backgroundColor: report.estado === 'completado' ? '#e8f5e8' : '#fff3cd',
                                            color: report.estado === 'completado' ? '#2e7d32' : '#b8860b',
                                            fontSize: '12px'
                                        }}>
                                            {estadoChoices.find(choice => choice.id === report.estado)?.name}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ 
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            backgroundColor: report.prioridad === 'alta' ? '#ffebee' : 
                                                            report.prioridad === 'media' ? '#fff8e1' : '#f3e5f5',
                                            color: report.prioridad === 'alta' ? '#c62828' : 
                                                   report.prioridad === 'media' ? '#f57c00' : '#7b1fa2',
                                            fontSize: '12px'
                                        }}>
                                            {prioridadChoices.find(choice => choice.id === report.prioridad)?.name}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};