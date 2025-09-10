import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminApp } from "./pages/AdminApp";
import { HomePage } from "./pages/HomePage";
import "./styles/variables.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
