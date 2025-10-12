import { useGetIdentity } from 'react-admin';

export const useUserRole = () => {
    const { identity, isLoading } = useGetIdentity();
    
    return {
        role: identity?.role || 'usuario',
        isLoading,
        identity
    };
};