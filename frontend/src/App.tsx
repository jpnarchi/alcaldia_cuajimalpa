import {Admin,Resource, CustomRoutes, AuthProvider} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import {listarReporte, crearReporte, editarReporte} from "./reportes"
import {Route} from "react-router-dom"
import {listarHorarios, crearHorarios, editarHorarios} from "./horarios"
import Registrarse from "./register";

// AuthProvider con bypass hardcodeado - admin/admin 

// COMENTAR CUANDO SE TERMINE EL PROYECTO
const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    // Bypass hardcodeado
    if (username === "admin" && password === "admin") {
      sessionStorage.setItem("auth", "bypass-token");
      sessionStorage.setItem("identity", JSON.stringify({ id: "1", fullName: "Administrador" }));
      return Promise.resolve();
    }
    throw new Error("Usuario o contraseña incorrectos");
  },
  logout: () => {
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("identity");
    return Promise.resolve();
  },
  checkAuth: () => {
    return sessionStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      sessionStorage.removeItem("auth");
      sessionStorage.removeItem("identity");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getIdentity: () => {
    const identity = sessionStorage.getItem("identity");
    return identity ? Promise.resolve(JSON.parse(identity)) : Promise.reject();
  },
  getPermissions: () => Promise.resolve()
};

export const App = () => (
  <Admin 
    layout={Layout} 
    dataProvider={dataProvider} 
    authProvider={authProvider}
    basename="/admin"
  >
    <Resource
      name="horarios"
      list={listarHorarios} create={crearHorarios} edit={editarHorarios} 
    />
    <Resource
      name="reportes"
      list={listarReporte} create={crearReporte} edit={editarReporte} 
    />
    <CustomRoutes>
      <Route path="/registrarse" element={<Registrarse />}/>
    </CustomRoutes>
  </Admin>
);
