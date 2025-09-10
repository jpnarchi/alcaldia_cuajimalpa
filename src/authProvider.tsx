import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
    // called when the user attempts to log in
    async login({ username, password }) {
        // check for specific username and password
        if (username !== "A01781518" || password !== "TC2007B") {
            throw new Error("Invalid credentials, please try again");
        }
        localStorage.setItem("username", username);
        localStorage.setItem("role", "viewer"); // Set role based on user
        
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
        
        // Redirect to home page after logout
        window.location.href = "/";
    },
    // called when the API returns an error
    async checkError({ status }: { status: number }) {
        if (status === 401 || status === 403) {
            localStorage.removeItem("username");
            localStorage.removeItem("role");
            
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
        const role = localStorage.getItem("role") || "viewer";
        
        if (!username) {
            throw new Error("Not authenticated");
        }
        
        return {
            id: username,
            fullName: "Juan Pablo",
            username,
            role,
        };
    },
    // called to get user permissions
    async getPermissions() {
        const role = localStorage.getItem("role");
        return role ? { role } : null;
    },
};