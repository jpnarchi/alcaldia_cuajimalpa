import { AuthProvider } from "react-admin";

// Mock users with different roles
const mockUsers = {
    "A01781518": { password: "TC2007B", role: "usuario", name: "Juan Pablo Narchi", turno: "mañana" },
    "J12345678": { password: "jefe123", role: "jefe_turno", name: "María García", turno: "mañana" },
    "J87654321": { password: "jefe456", role: "jefe_turno", name: "Carlos López", turno: "tarde" },
    "A99999999": { password: "admin123", role: "administrador", name: "Ana Rodríguez", turno: null },
};

export const authProvider: AuthProvider = {
    // called when the user attempts to log in
    async login({ username, password }) {
        const user = mockUsers[username as keyof typeof mockUsers];
        
        if (!user || user.password !== password) {
            throw new Error("Invalid credentials, please try again");
        }
        
        localStorage.setItem("username", username);
        localStorage.setItem("role", user.role);
        localStorage.setItem("name", user.name);
        if (user.turno) {
            localStorage.setItem("turno", user.turno);
        }
        
        // Force redirect to admin dashboard
        setTimeout(() => {
            window.location.href = "/admin";
        }, 100);
        
        return Promise.resolve();
    },
    // called when the user clicks on the logout button
    async logout() {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("turno");
        
        // Redirect to home page after logout
        window.location.href = "/";
    },
    // called when the API returns an error
    async checkError({ status }: { status: number }) {
        if (status === 401 || status === 403) {
            localStorage.removeItem("username");
            localStorage.removeItem("role");
            localStorage.removeItem("name");
            localStorage.removeItem("turno");
            
            // Redirect to login page on authentication error
            window.location.href = "/admin/login";
            throw new Error("Session expired");
        }
    },
    // called when the user navigates to a new location, to check for authentication
    async checkAuth() {
        const username = localStorage.getItem("username");
        if (!username) {
            throw new Error("Authentication required");
        }
        return Promise.resolve();
    },
    // called when the user profile is requested
    async getIdentity() {
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role") || "usuario";
        const name = localStorage.getItem("name") || "Usuario";
        const turno = localStorage.getItem("turno");
        
        if (!username) {
            throw new Error("Not authenticated");
        }
        
        return {
            id: username,
            fullName: name,
            username,
            role,
            turno,
        };
    },
    // called to get user permissions
    async getPermissions() {
        const role = localStorage.getItem("role");
        return role ? { role } : null;
    },
};