import {Admin, Resource, CustomRoutes} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider"; // Backend real conectado a MongoDB
import authProvider from "./AuthProvider"; // AuthProvider conectado a MongoDB
// import { dummyDataProvider } from "./dummyDataProvider"; // Datos dummy para desarrollo
import { i18nProvider } from "./i18nProvider";
import { customTheme } from "./theme";
import {listarReporte, crearReporte, editarReporte, mostrarReporte} from  "./reportes";
import {Route} from "react-router-dom";
import { listarPerfil, crearPerfil, editarPerfil, mostrarHorario} from "./perfil";
import Registrarse from "./register";
import { listarFolio, crearFolio, editarFolio, mostrarFolio } from "./ver-folios";
import { listarEquipo, editarEquipo, mostrarEquipo } from "./equipo";
import { listarReporteEquipo, mostrarReporteEquipo } from "./reportes-mi-equipo";
import { listarUsuarios, crearUsuario, editarUsuario, mostrarUsuario, borrarUsuario} from "./usuarios";
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

export const App = () => {
  return (
    <Admin
      layout={Layout}
      dataProvider={dataProvider}
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
              name="perfiles"
              options={{ label: "Mi Perfil" }}
              list={listarPerfil}
              create={crearPerfil}
              edit={editarPerfil}
              show={mostrarHorario}
              icon={User}
            />

            {/* Recurso Folios - Solo Usuario puede crear */}
            {userRole === "usuario" && (
            <Resource
              name="folios"
              options={{ label: "Folios" }}
              list={listarFolio}
              create={crearFolio}
              //edit={userRole === "usuario" ? editarFolio : undefined}
              show={mostrarFolio}
              icon={FileText}
            />
            )}
            {/* Recurso Folios creados - Solo admin (solo ver) */}
            {(userRole === "admin") && (
              <Resource
                name="foliosCreados"
                options={{ label: "Folios Creados" }}
                list={listarReporte}
                show={mostrarReporte}
                icon={FolderOpen}
              />
            )}

            {/* Recurso Reportes de mi equipo - Solo jefe_turno */}
            {userRole === "jefe_turno" && (
              <Resource
                name="folios"
                options={{ label: "Reportes de mi equipo" }}
                list={listarReporteEquipo}
                show={mostrarReporteEquipo}
                icon={ClipboardList}
              />
            )}

            {/* Recurso Equipo - Solo jefe_turno y usuario */}
            {(userRole === "jefe_turno" || userRole === "usuario") && (
              <Resource
                name="equipoMiembros"
                options={{ label: "Equipo" }}
                list={listarEquipo}
                edit={editarEquipo}
                show={mostrarEquipo}
                icon={Users}
              />
            )}

            {/* Recurso Solicitudes de Modificación - Solo admin */}
            {userRole === "admin" && (
              <Resource
                name="solicitudesModificacion"
                options={{ label: "Solicitudes de Modificación" }}
                list={listarSolicitudes}
                edit={editarSolicitud}
                show={mostrarSolicitud}
                icon={FilePenLine}
              />
            )}

            {/* Recurso Usuarios - Solo admin */}
            {userRole === "admin" && (
              <Resource
                name="usuarios"
                options={{ label: "Usuarios" }}
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