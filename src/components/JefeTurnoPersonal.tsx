import React from 'react';
import { Title, useGetIdentity } from 'react-admin';
import { Users, User, Phone, Mail, Clock, Shield } from 'lucide-react';

const mockPersonal = [
    {
        id: 1,
        nombre: 'Juan Pablo Narchi',
        puesto: 'Operador de Seguridad',
        turno: 'mañana',
        telefono: '+52 55 1234-5678',
        email: 'juan.narchi@cuajimalpa.gob.mx',
        estado: 'activo',
        horaIngreso: '08:00',
        horaSalida: '16:00'
    },
    {
        id: 2,
        nombre: 'María García',
        puesto: 'Jefe de Turno',
        turno: 'mañana',
        telefono: '+52 55 2345-6789',
        email: 'maria.garcia@cuajimalpa.gob.mx',
        estado: 'activo',
        horaIngreso: '07:30',
        horaSalida: '15:30'
    },
    {
        id: 3,
        nombre: 'Pedro Martínez',
        puesto: 'Operador de Vigilancia',
        turno: 'mañana',
        telefono: '+52 55 3456-7890',
        email: 'pedro.martinez@cuajimalpa.gob.mx',
        estado: 'activo',
        horaIngreso: '08:00',
        horaSalida: '16:00'
    },
    {
        id: 4,
        nombre: 'Carlos López',
        puesto: 'Jefe de Turno',
        turno: 'tarde',
        telefono: '+52 55 4567-8901',
        email: 'carlos.lopez@cuajimalpa.gob.mx',
        estado: 'activo',
        horaIngreso: '15:30',
        horaSalida: '23:30'
    },
    {
        id: 5,
        nombre: 'Ana Rodríguez',
        puesto: 'Operador de Seguridad',
        turno: 'tarde',
        telefono: '+52 55 5678-9012',
        email: 'ana.rodriguez@cuajimalpa.gob.mx',
        estado: 'activo',
        horaIngreso: '16:00',
        horaSalida: '00:00'
    }
];

export const JefeTurnoPersonal = () => {
    const { identity } = useGetIdentity();
    const userTurno = identity?.turno;
    
    // Filter personal by user's shift
    const personalTurno = mockPersonal.filter(persona => persona.turno === userTurno);

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                color: 'white',
                padding: '20px',
                borderRadius: '10px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Users size={24} />
                    <Title title={`Personal del Turno ${userTurno?.charAt(0).toUpperCase()}${userTurno?.slice(1)}`} />
                </div>
                <div style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    padding: '10px 15px',
                    borderRadius: '5px'
                }}>
                    <span style={{ fontSize: '14px' }}>
                        Total: {personalTurno.length} personas
                    </span>
                </div>
            </div>

            <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '20px'
            }}>
                {personalTurno.map((persona) => (
                    <div 
                        key={persona.id}
                        style={{ 
                            background: 'white',
                            borderRadius: '10px',
                            padding: '20px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            border: '1px solid #e9ecef'
                        }}
                    >
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: '15px',
                            paddingBottom: '15px',
                            borderBottom: '2px solid #f8f9fa'
                        }}>
                            <div style={{ 
                                backgroundColor: '#4ecdc4',
                                borderRadius: '50%',
                                padding: '10px',
                                marginRight: '15px'
                            }}>
                                <User size={20} color="white" />
                            </div>
                            <div>
                                <h3 style={{ 
                                    margin: 0, 
                                    color: '#2c3e50',
                                    fontSize: '16px',
                                    fontWeight: 'bold'
                                }}>
                                    {persona.nombre}
                                </h3>
                                <p style={{ 
                                    margin: 0, 
                                    color: '#7f8c8d',
                                    fontSize: '14px'
                                }}>
                                    {persona.puesto}
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Clock size={16} color="#34495e" />
                                <span style={{ fontSize: '14px', color: '#2c3e50' }}>
                                    {persona.horaIngreso} - {persona.horaSalida}
                                </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Phone size={16} color="#34495e" />
                                <span style={{ fontSize: '14px', color: '#2c3e50' }}>
                                    {persona.telefono}
                                </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Mail size={16} color="#34495e" />
                                <span style={{ fontSize: '14px', color: '#2c3e50' }}>
                                    {persona.email}
                                </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Shield size={16} color="#34495e" />
                                <span style={{ 
                                    fontSize: '12px',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    backgroundColor: persona.estado === 'activo' ? '#d4edda' : '#f8d7da',
                                    color: persona.estado === 'activo' ? '#155724' : '#721c24'
                                }}>
                                    {persona.estado === 'activo' ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {personalTurno.length === 0 && (
                <div style={{ 
                    textAlign: 'center',
                    padding: '40px',
                    background: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                    <Users size={48} color="#bdc3c7" />
                    <h3 style={{ color: '#7f8c8d', marginTop: '15px' }}>
                        No hay personal asignado a este turno
                    </h3>
                </div>
            )}
        </div>
    );
};