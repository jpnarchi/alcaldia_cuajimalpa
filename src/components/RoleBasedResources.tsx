import React from 'react';
import { Resource, Loading } from 'react-admin';
import { FileText, History, Edit, Users, Clock, BarChart3 } from 'lucide-react';
import { useUserRole } from '../hooks/useUserRole';
import { GenerateReport } from './GenerateReport';
import { ReportHistory } from './ReportHistory';
import { RequestModification } from './RequestModification';
import { JefeTurnoReportHistory } from './JefeTurnoReportHistory';
import { JefeTurnoPersonal } from './JefeTurnoPersonal';
import { AdminReportHistory } from './AdminReportHistory';
import { AdminUserManagement } from './AdminUserManagement';
import { AdminModificationRequests } from './AdminModificationRequests';

export const RoleBasedResources = () => {
    const { role, isLoading } = useUserRole();

    if (isLoading) {
        return <Loading />;
    }

    const resources = [];

    // Recursos para USUARIO
    if (role === 'usuario') {
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
    if (role === 'jefe_turno') {
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
    if (role === 'administrador') {
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

    return <>{resources}</>;
};