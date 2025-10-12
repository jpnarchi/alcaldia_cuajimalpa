import { usePermissions, Loading } from 'react-admin';
import { ReactNode } from 'react';

interface RoleGuardProps {
    allowedRoles: string[];
    children: ReactNode;
    fallback?: ReactNode;
}

export const RoleGuard = ({ allowedRoles, children, fallback = null }: RoleGuardProps) => {
    const { permissions, isLoading } = usePermissions();

    if (isLoading) {
        return <Loading />;
    }

    const userRole = permissions?.role;
    
    if (!userRole || !allowedRoles.includes(userRole)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};