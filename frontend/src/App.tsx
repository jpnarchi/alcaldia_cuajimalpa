import {Admin,Resource, CustomRoutes, AuthProvider} from "react-admin";
import { Layout } from "./Layout";
// import { dataProvider } from "./dataProvider"; // Backend real - comentado temporalmente
import { dummyDataProvider } from "./dummyDataProvider"; // Datos dummy para desarrollo
import {listarReporte, crearReporte, editarReporte, mostrarReporte} from  "./reportes"
import {Route} from "react-router-dom"
import {listarHorarios, crearHorarios, editarHorarios, mostrarHorario} from "./horarios"
import Registrarse from "./register";
import { i18nProvider } from "./i18nProvider";
import { listarFolio, crearFolio, editarFolio, mostrarFolio } from "./ver-folios";

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
    dataProvider={dummyDataProvider}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
    basename="/admin"
  >
    <Resource
      name="Mi Perfil"
      list={listarHorarios} create={crearHorarios} edit={editarHorarios} show={mostrarHorario}
    />
    <Resource
      name="Crear folio"
      list={listarFolio} create={crearFolio} edit={editarFolio} show={mostrarFolio}
    />
    <Resource
      name="Folios creados"
      list={listarReporte} create={crearReporte} edit={editarReporte} show={mostrarReporte}
    />
    <CustomRoutes>
      <Route path="/registrarse" element={<Registrarse />}/>
    </CustomRoutes>
  </Admin>
);

// En folios creados que haya un boton para ver folio