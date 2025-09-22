import React, { useState } from 'react';
import { 
    List, 
    Datagrid, 
    TextField, 
    DateField, 
    SelectField, 
    Title,
    Button,
    useGetIdentity
} from 'react-admin';
import { Download, FileText, Clock } from 'lucide-react';

const mockReports = [
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

const tipoChoices = [
    { id: 'Incidente', name: 'Incidente' },
    { id: 'Mantenimiento', name: 'Mantenimiento' },
    { id: 'Emergencia', name: 'Emergencia' },
    { id: 'Rutina', name: 'Rutina' }
];

export const JefeTurnoReportHistory = () => {
    const { identity } = useGetIdentity();
    const userTurno = identity?.turno;
    
    // Filter reports by user's shift
    const filteredReports = mockReports.filter(report => report.turno === userTurno);

    const handleExportPDF = () => {
        alert('Exportando reportes de turno a PDF...');
    };

    const handleExportExcel = () => {
        alert('Exportando reportes de turno a Excel...');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '20px',
                borderRadius: '10px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Clock size={24} />
                    <Title title={`Historial de Reportes - Turno ${userTurno?.charAt(0).toUpperCase()}${userTurno?.slice(1)}`} />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                        onClick={handleExportPDF}
                        label="Exportar PDF"
                        style={{ 
                            backgroundColor: '#ff6b6b',
                            color: 'white',
                            border: 'none',
                            padding: '10px 15px',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        <Download size={16} style={{ marginRight: '5px' }} />
                    </Button>
                    <Button
                        onClick={handleExportExcel}
                        label="Exportar Excel"
                        style={{ 
                            backgroundColor: '#4ecdc4',
                            color: 'white',
                            border: 'none',
                            padding: '10px 15px',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        <FileText size={16} style={{ marginRight: '5px' }} />
                    </Button>
                </div>
            </div>

            <div style={{ 
                background: 'white',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <div style={{ marginBottom: '15px' }}>
                    <h3 style={{ color: '#667eea', marginBottom: '5px' }}>
                        Reportes del Turno {userTurno?.charAt(0).toUpperCase()}{userTurno?.slice(1)}
                    </h3>
                    <p style={{ color: '#666', margin: 0 }}>
                        Total de reportes: {filteredReports.length}
                    </p>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Folio</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Fecha</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Operador</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Tipo</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Descripción</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Estado</th>
                                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #e9ecef' }}>Prioridad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReports.map((report) => (
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