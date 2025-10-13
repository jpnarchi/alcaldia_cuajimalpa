import {AuthProvider} from "react-admin";

const authProvider:AuthProvider={
    login: async({username, password})=>{
        const request=new Request("http://127.0.0.1:3000/login",{
            method:"POST",
            body: JSON.stringify({"username":username, "password":password}),
            headers: new Headers({"Content-Type":"application/json"})
        });
        try{
            const res=await fetch(request);
            if(res.status<200 || res.status>=300){
                throw new Error(res.statusText);
            }
            const auth=await res.json();
            localStorage.setItem("token", auth.token);
            sessionStorage.setItem("auth", auth.token);
            sessionStorage.setItem("identity", JSON.stringify({"id":auth.id, "fullName":auth.nombre}));

            // Obtener el rol del usuario desde la colección usuarios
            const userRequest = new Request(`http://127.0.0.1:3000/usuarios?username=${username}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authentication": auth.token
                })
            });

            const userRes = await fetch(userRequest);
            if (userRes.ok) {
                const users = await userRes.json();
                if (users.length > 0) {
                    sessionStorage.setItem("role", users[0].role);
                }
            }

            return Promise.resolve();
        }catch{
            throw new Error("Error en usuario o password");
        }
    },
    logout: ()=>{
        localStorage.removeItem("token");
        sessionStorage.removeItem("auth");
        sessionStorage.removeItem("identity");
        sessionStorage.removeItem("role");
        return Promise.resolve();
    },
    checkAuth: ()=>{return sessionStorage.getItem("auth")?Promise.resolve():Promise.reject()},
    checkError: (error)=>{
        const status=error.status;
        if(status==401 || status==403){
            localStorage.removeItem("token");
            sessionStorage.removeItem("auth");
            sessionStorage.removeItem("identity");
            sessionStorage.removeItem("role");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getIdentity: ()=>{
        const identity = sessionStorage.getItem("identity");
        return identity ? Promise.resolve(JSON.parse(identity)) : Promise.reject();
    },
    getPermissions: ()=>{
        const role = sessionStorage.getItem("role");
        return Promise.resolve(role || "usuario");
    }
};

export default authProvider;