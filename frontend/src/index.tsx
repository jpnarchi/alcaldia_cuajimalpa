import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { App } from "./App";
import { HeroSection } from "./components/HeroSection";
import Registrarse from "./register";
import "./styles/global.css";
import "./customStyles.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/admin/*" element={<App />} />
        <Route path="/login"/>
        <Route path="/register" element={<Registrarse />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
