import { Admin, Resource } from 'react-admin';
import { FileText, History, Edit } from 'lucide-react';

import { Layout } from "../Layout";
import { dataProvider } from "../dataProvider";
import { i18nProvider } from '../i18nProvider';
import { authProvider } from '../authProvider';
import { CustomLoginPage } from '../components/CustomLoginPage';
import { GenerateReport } from '../components/GenerateReport';
import { ReportHistory } from '../components/ReportHistory';
import { RequestModification } from '../components/RequestModification';

export const AdminApp = () => (
    <Admin 
        layout={Layout} 
        dataProvider={dataProvider} 
        authProvider={authProvider} 
        i18nProvider={i18nProvider}
        basename="/admin"
        loginPage={CustomLoginPage}
    > 
        <Resource 
            name="generate-report" 
            list={GenerateReport} 
            icon={FileText} 
            options={{ label: 'Generar reporte' }}
        />
        <Resource 
            name="report-history" 
            list={ReportHistory} 
            icon={History} 
            options={{ label: 'Historial de reportes' }}
        />
        <Resource 
            name="request-modification" 
            list={RequestModification} 
            icon={Edit} 
            options={{ label: 'Solicitar modificación' }}
        />
    </Admin>
);