import React, { useState, useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import { FileText, History, Edit, Users, Clock, BarChart3 } from 'lucide-react';

import { Layout } from "../Layout";
import { dataProvider } from "../dataProvider";
import { i18nProvider } from '../i18nProvider';
import { authProvider } from '../authProvider';
import { CustomLoginPage } from './CustomLoginPage';
import { GenerateReport } from './GenerateReport';
import { ReportHistory } from './ReportHistory';
import { RequestModification } from './RequestModification';
import { JefeTurnoReportHistory } from './JefeTurnoReportHistory';
import { JefeTurnoPersonal } from './JefeTurnoPersonal';
import { AdminReportHistory } from './AdminReportHistory';
import { AdminUserManagement } from './AdminUserManagement';
import { AdminModificationRequests } from './AdminModificationRequests';

export const AdminAppWrapper = () => {
    const [userRole, setUserRole] = useState<string>('usuario');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const checkRole = () => {
            const role = localStorage.getItem('role');
            if (role) {
                setUserRole(role);
                setIsReady(true);
            } else {
                // If no role, set default and mark as ready
                setUserRole('usuario');
                setIsReady(true);
            }
        };

        // Check immediately
        checkRole();

        // Listen for storage changes
        const handleStorageChange = () => {
            checkRole();
        };

        window.addEventListener('storage', handleStorageChange);

        // Also check periodically as localStorage changes don't always trigger events
        const interval = setInterval(checkRole, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    const getResourcesByRole = () => {
        const resources = [];

        // Recursos para USUARIO
        if (userRole === 'usuario') {
            resources.push(
                <Resource 
                    key="generate-report"
                    name="generate-report" 
                    list={GenerateReport} 
                    icon={FileText} 
                    options={{ label: 'Generar reporte' }}
                />,
                <Resource 
                    key="report-history"
                    name="report-history" 
                    list={ReportHistory} 
                    icon={History} 
                    options={{ label: 'Historial de reportes' }}
                />,
                <Resource 
                    key="request-modification"
                    name="request-modification" 
                    list={RequestModification} 
                    icon={Edit} 
                    options={{ label: 'Solicitar modificación' }}
                />
            );
        }

        // Recursos para JEFE DE TURNO
        if (userRole === 'jefe_turno') {
            resources.push(
                <Resource 
                    key="generate-report"
                    name="generate-report" 
                    list={GenerateReport} 
                    icon={FileText} 
                    options={{ label: 'Generar reporte' }}
                />,
                <Resource 
                    key="jefe-report-history"
                    name="jefe-report-history" 
                    list={JefeTurnoReportHistory} 
                    icon={Clock} 
                    options={{ label: 'Historial de Turno' }}
                />,
                <Resource 
                    key="jefe-personal"
                    name="jefe-personal" 
                    list={JefeTurnoPersonal} 
                    icon={Users} 
                    options={{ label: 'Personal de Turno' }}
                />,
                <Resource 
                    key="request-modification"
                    name="request-modification" 
                    list={RequestModification} 
                    icon={Edit} 
                    options={{ label: 'Solicitar modificación' }}
                />
            );
        }

        // Recursos para ADMINISTRADOR
        if (userRole === 'administrador') {
            resources.push(
                <Resource 
                    key="generate-report"
                    name="generate-report" 
                    list={GenerateReport} 
                    icon={FileText} 
                    options={{ label: 'Generar reporte' }}
                />,
                <Resource 
                    key="admin-report-history"
                    name="admin-report-history" 
                    list={AdminReportHistory} 
                    icon={BarChart3} 
                    options={{ label: 'Historial Completo' }}
                />,
                <Resource 
                    key="admin-users"
                    name="admin-users" 
                    list={AdminUserManagement} 
                    icon={Users} 
                    options={{ label: 'Gestión de Usuarios' }}
                />,
                <Resource 
                    key="admin-modifications"
                    name="admin-modifications" 
                    list={AdminModificationRequests} 
                    icon={Edit} 
                    options={{ label: 'Solicitudes de Modificación' }}
                />
            );
        }

        return resources;
    };

    // Add a key to force re-render when role changes
    return (
        <Admin 
            key={userRole} // This forces a complete re-render when role changes
            layout={Layout} 
            dataProvider={dataProvider} 
            authProvider={authProvider} 
            i18nProvider={i18nProvider}
            basename="/admin"
            loginPage={CustomLoginPage}
        > 
            {getResourcesByRole()}
        </Admin>
    );
};