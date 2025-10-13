import {Admin, Resource, CustomRoutes, AuthProvider, usePermissions} from "react-admin";
import { Layout } from "./Layout";
// import { dataProvider } from "./dataProvider"; // Backend real - comentado temporalmente
import { dummyDataProvider } from "./dummyDataProvider"; // Datos dummy para desarrollo
import { i18nProvider } from "./i18nProvider";
import { customTheme } from "./theme";
import {listarReporte, crearReporte, editarReporte, mostrarReporte} from  "./reportes";
import {Route} from "react-router-dom";
import { listarPerfil, crearPerfil, editarPerfil, mostrarHorario} from "./perfil";
import Registrarse from "./register";
import { listarFolio, crearFolio, editarFolio, mostrarFolio } from "./ver-folios";
import { listarEquipo, crearEquipo, editarEquipo, mostrarEquipo } from "./equipo";
import { listarReporteEquipo, crearReporteEquipo, editarReporteEquipo, mostrarReporteEquipo } from "./reportes-mi-equipo";
import { listarUsuarios, crearUsuario, editarUsuario, mostrarUsuario } from "./usuarios";
import { listarSolicitudes, editarSolicitud, mostrarSolicitud } from "./solicitud-modificaciones";

// Iconos de lucide-react
import {
  User,
  FileText,
  FolderOpen,
  ClipboardList,
  Users,
  FilePenLine,
  UserCog
} from "lucide-react";

// AuthProvider con bypass hardcodeado - admin/admin

// COMENTAR CUANDO SE TERMINE EL PROYECTO
// Usuarios de prueba con diferentes roles
const usersDemo = {
  admin: { password: "admin", role: "admin", fullName: "Administrador General" },
  jefe: { password: "jefe", role: "jefe_turno", fullName: "Jefe de Turno" },
  usuario: { password: "usuario", role: "usuario", fullName: "Usuario" },
};

const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    // Verificar usuario y contraseña
    const user = usersDemo[username as keyof typeof usersDemo];

    if (user && user.password === password) {
      sessionStorage.setItem("auth", "bypass-token");
      sessionStorage.setItem("identity", JSON.stringify({
        id: username,
        fullName: user.fullName
      }));
      sessionStorage.setItem("role", user.role);
      return Promise.resolve();
    }
    throw new Error("Usuario o contraseña incorrectos");
  },
  logout: () => {
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("identity");
    sessionStorage.removeItem("role");
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
      sessionStorage.removeItem("role");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getIdentity: () => {
    const identity = sessionStorage.getItem("identity");
    return identity ? Promise.resolve(JSON.parse(identity)) : Promise.reject();
  },
  getPermissions: () => {
    const role = sessionStorage.getItem("role");
    return Promise.resolve(role || "usuario");
  }
};

export const App = () => {
  return (
    <Admin
      layout={Layout}
      dataProvider={dummyDataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      theme={customTheme}
      basename="/admin"
    >
      {(permissions: any) => {
        const userRole = permissions;

        return (
          <>
            {/* Recurso Mi Perfil - Todos los roles */}
            <Resource
              name="Mi Perfil"
              list={listarPerfil}
              create={crearPerfil}
              edit={editarPerfil}
              show={mostrarHorario}
              icon={User}
            />

            {/* Recurso Folios - Todos los roles pueden ver/crear */}
            {userRole === "usuario" && (
            <Resource
              name="Folios"
              list={listarFolio}
              create={crearFolio}
              edit={userRole === "usuario" ? editarFolio : undefined}
              show={mostrarFolio}
              icon={FileText}
            />
            )}
            {/* Recurso Folios creados - Solo admin y jefe_turno */}
            {(userRole === "admin") && (
              <Resource
                name="Folios creados"
                list={listarReporte}
                create={crearReporte}
                edit={userRole === "admin" ? editarReporte : undefined}
                show={mostrarReporte}
                icon={FolderOpen}
              />
            )}

            {/* Recurso Reportes de mi equipo - Solo jefe_turno */}
            {userRole === "jefe_turno" && (
              <Resource
                name="Reportes de mi equipo"
                list={listarReporteEquipo}
                create={crearReporteEquipo}
                edit={editarReporteEquipo}
                show={mostrarReporteEquipo}
                icon={ClipboardList}
              />
            )}

            {/* Recurso Equipo - Solo jefe_turno */}
            {userRole === "jefe_turno" && (
              <Resource
                name="Equipo"
                list={listarEquipo}
                create={crearEquipo}
                edit={editarEquipo}
                show={mostrarEquipo}
                icon={Users}
              />
            )}

            {/* Recurso Solicitudes de Modificación - Solo admin */}
            {userRole === "admin" && (
              <Resource
                name="Solicitudes de Modificación"
                list={listarSolicitudes}
                edit={editarSolicitud}
                show={mostrarSolicitud}
                icon={FilePenLine}
              />
            )}

            {/* Recurso Usuarios - Solo admin */}
            {userRole === "admin" && (
              <Resource
                name="Usuarios"
                list={listarUsuarios}
                create={crearUsuario}
                edit={editarUsuario}
                show={mostrarUsuario}
                icon={UserCog}
              />
            )}

            <CustomRoutes>
              <Route path="/registrarse" element={<Registrarse />} />
            </CustomRoutes>
          </>
        );
      }}
    </Admin>
  );
};

// En folios creados que haya un boton para ver folio