import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroUser from "./components/CadastroUser";
import Listar_User from "./components/Listar_User";
import Update_User from "./components/Update_User"; // Importar Update_User

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/cadastroUser" element={<CadastroUser />}></Route>
        <Route path="/listarUser" element={<Listar_User />}></Route>
        {/* Rota para listar os usuários */}
        <Route path="/updateUser/:id" element={<Update_User />}></Route>{" "}
        {/* Rota para atualizar o usuário */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
