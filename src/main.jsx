import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Login from "./pages/Login.jsx";
import Layout from "./components/Layout.jsx";
import Registrar from "./pages/Registrar.jsx";
import Inicio from "./pages/Inicio.jsx";
import Rutina from "./pages/Rutina.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registrar",
    element: <Registrar />,
  },
  {
    path: "/home",
    element: <Layout />,
    children: [
      {
        path: "ejercicios",
        element: <Inicio />,
      },
    ],
  },
  {
    path: "/rutinas/:musculo",
    element: <Rutina />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
