import React, { useState } from 'react';
import { Title } from 'react-admin';
import { Users, UserCheck, UserX, Shield, Clock, Mail, Phone } from 'lucide-react';

const mockAllUsers = [
    {
        id: 1,
        username: 'A01781518',
        nombre: 'Juan Pablo Narchi',
        email: 'juan.narchi@cuajimalpa.gob.mx',
        telefono: '+52 55 1234-5678',
        role: 'usuario',
        turno: 'mañana',
        estado: 'activo',
        ultimoAcceso: '2024-01-17T10:30:00Z',
        fechaCreacion: '2024-01-01T08:00:00Z'
    },
    {
        id: 2,
        username: 'J12345678',
        nombre: 'María García',
        email: 'maria.garcia@cuajimalpa.gob.mx',
        telefono: '+52 55 2345-6789',
        role: 'jefe_turno',
        turno: 'mañana',
        estado: 'activo',
        ultimoAcceso: '2024-01-17T09:15:00Z',
        fechaCreacion: '2024-01-01T08:00:00Z'
    },
    {
        id: 3,
        username: 'J87654321',
        nombre: 'Carlos López',
        email: 'carlos.lopez@cuajimalpa.gob.mx',
        telefono: '+52 55 4567-8901',
        role: 'jefe_turno',
        turno: 'tarde',
        estado: 'activo',
        ultimoAcceso: '2024-01-16T20:45:00Z',
        fechaCreacion: '2024-01-01T08:00:00Z'
    },
    {
        id: 4,
        username: 'A99999999',
        nombre: 'Ana Rodríguez',
        email: 'ana.rodriguez@cuajimalpa.gob.mx',
        telefono: '+52 55 5678-9012',
        role: 'administrador',
        turno: null,
        estado: 'activo',
        ultimoAcceso: '2024-01-17T11:00:00Z',
        fechaCreacion: '2024-01-01T08:00:00Z'
    },
    {
        id: 5,
        username: 'U11111111',
        nombre: 'Pedro Martínez',
        email: 'pedro.martinez@cuajimalpa.gob.mx',
        telefono: '+52 55 3456-7890',
        role: 'usuario',
        turno: 'mañana',
        estado: 'activo',
        ultimoAcceso: '2024-01-17T08:30:00Z',
        fechaCreacion: '2024-01-05T08:00:00Z'
    },
    {
        id: 6,
        username: 'U22222222',
        nombre: 'Luis Fernández',
        email: 'luis.fernandez@cuajimalpa.gob.mx',
        telefono: '+52 55 6789-0123',
        role: 'usuario',
        turno: 'tarde',
        estado: 'inactivo',
        ultimoAcceso: '2024-01-10T16:20:00Z',
        fechaCreacion: '2024-01-01T08:00:00Z'
    }
];

const roleLabels = {
    'usuario': 'Usuario',
    'jefe_turno': 'Jefe de Turno',
    'administrador': 'Administrador'
};

const roleColors = {
    'usuario': { bg: '#e3f2fd', color: '#1976d2' },
    'jefe_turno': { bg: '#fff3e0', color: '#f57c00' },
    'administrador': { bg: '#fce4ec', color: '#c2185b' }
};

export const AdminUserManagement = () => {
    const [filtroRole, setFiltroRole] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroTurno, setFiltroTurno] = useState('');

    const usuariosFiltrados = mockAllUsers.filter(user => {
        return (filtroRole === '' || user.role === filtroRole) &&
               (filtroEstado === '' || user.estado === filtroEstado) &&
               (filtroTurno === '' || user.turno === filtroTurno);
    });

    const estadisticas = {
        total: mockAllUsers.length,
        activos: mockAllUsers.filter(u => u.estado === 'activo').length,
        inactivos: mockAllUsers.filter(u => u.estado === 'inactivo').length,
        roles: {
            usuario: mockAllUsers.filter(u => u.role === 'usuario').length,
            jefe_turno: mockAllUsers.filter(u => u.role === 'jefe_turno').length,
            administrador: mockAllUsers.filter(u => u.role === 'administrador').length
        }
    };

    const toggleUserStatus = (userId: number) => {
        alert(`Cambiar estado del usuario con ID: ${userId}`);
    };

    const editUser = (userId: number) => {
        alert(`Editar usuario con ID: ${userId}`);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
                color: 'white',
                padding: '20px',
                borderRadius: '10px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Users size={24} />
                    <Title title="Gestión de Usuarios (Administrador)" />
                </div>
                <div style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    padding: '10px 15px',
                    borderRadius: '5px'
                }}>
                    <span style={{ fontSize: '14px' }}>
                        Total: {mockAllUsers.length} usuarios
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
                    <Users size={24} color="#3498db" style={{ marginBottom: '10px' }} />
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
                    <UserCheck size={24} color="#27ae60" style={{ marginBottom: '10px' }} />
                    <h3 style={{ color: '#27ae60', margin: '0 0 5px 0' }}>Activos</h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>
                        {estadisticas.activos}
                    </p>
                </div>

                <div style={{ 
                    background: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                }}>
                    <UserX size={24} color="#e74c3c" style={{ marginBottom: '10px' }} />
                    <h3 style={{ color: '#e74c3c', margin: '0 0 5px 0' }}>Inactivos</h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>
                        {estadisticas.inactivos}
                    </p>
                </div>

                <div style={{ 
                    background: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center'
                }}>
                    <Shield size={24} color="#f39c12" style={{ marginBottom: '10px' }} />
                    <h3 style={{ color: '#f39c12', margin: '0 0 5px 0' }}>Jefes</h3>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>
                        {estadisticas.roles.jefe_turno}
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
                            Rol:
                        </label>
                        <select 
                            value={filtroRole}
                            onChange={(e) => setFiltroRole(e.target.value)}
                            style={{ 
                                padding: '8px 12px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '14px'
                            }}
                        >
                            <option value="">Todos los roles</option>
                            <option value="usuario">Usuario</option>
                            <option value="jefe_turno">Jefe de Turno</option>
                            <option value="administrador">Administrador</option>
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
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
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
                            setFiltroRole('');
                            setFiltroEstado('');
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

            {/* Lista de usuarios */}
            <div style={{ 
                background: 'white',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <h3 style={{ color: '#667eea', marginBottom: '15px' }}>
                    Usuarios ({usuariosFiltrados.length} de {mockAllUsers.length})
                </h3>

                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                    gap: '20px'
                }}>
                    {usuariosFiltrados.map((user) => (
                        <div 
                            key={user.id}
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
                                        {user.nombre}
                                    </h4>
                                    <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#7f8c8d' }}>
                                        @{user.username}
                                    </p>
                                    <span style={{ 
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        backgroundColor: roleColors[user.role as keyof typeof roleColors].bg,
                                        color: roleColors[user.role as keyof typeof roleColors].color
                                    }}>
                                        {roleLabels[user.role as keyof typeof roleLabels]}
                                    </span>
                                </div>
                                
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <span style={{ 
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        backgroundColor: user.estado === 'activo' ? '#d4edda' : '#f8d7da',
                                        color: user.estado === 'activo' ? '#155724' : '#721c24'
                                    }}>
                                        {user.estado === 'activo' ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Mail size={14} color="#7f8c8d" />
                                    <span>{user.email}</span>
                                </div>
                                
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Phone size={14} color="#7f8c8d" />
                                    <span>{user.telefono}</span>
                                </div>
                                
                                {user.turno && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Clock size={14} color="#7f8c8d" />
                                        <span>Turno: {user.turno}</span>
                                    </div>
                                )}
                                
                                <div style={{ fontSize: '12px', color: '#95a5a6', marginTop: '5px' }}>
                                    Último acceso: {new Date(user.ultimoAcceso).toLocaleString()}
                                </div>
                            </div>

                            <div style={{ 
                                display: 'flex', 
                                gap: '10px', 
                                marginTop: '15px',
                                paddingTop: '15px',
                                borderTop: '1px solid #e9ecef'
                            }}>
                                <button
                                    onClick={() => editUser(user.id)}
                                    style={{ 
                                        flex: 1,
                                        backgroundColor: '#3498db',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }}
                                >
                                    Editar
                                </button>
                                
                                <button
                                    onClick={() => toggleUserStatus(user.id)}
                                    style={{ 
                                        flex: 1,
                                        backgroundColor: user.estado === 'activo' ? '#e74c3c' : '#27ae60',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }}
                                >
                                    {user.estado === 'activo' ? 'Desactivar' : 'Activar'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};