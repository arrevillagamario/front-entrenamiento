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
import Bienvenida from "./pages/Bienvenida.jsx";
import RutinaDiaria from "./pages/RutinaDiaria.jsx";
import Alimentacion from "./pages/Alimentacion.jsx";
import Firstroutine from "./pages/Firstroutine.jsx";
import Editar from "./components/Editar.jsx";
import ProtectedRoute from "./components/ProtectedRoute"; // Importamos el componente de protección
import Dailyroutine from "./pages/Dailyroutine.jsx";

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
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "ejercicios",
        element: <Inicio />,
      },
      {
        path: "rutina-diaria",
        element: <RutinaDiaria />,
      },
      {
        path: "alimentacion",
        element: <Alimentacion />,
      },
      {
        path: "editar",
        element: <Editar />,
      },
      {
        path: "rutina-ge",
        element: <Dailyroutine />,

      }
    ],
  },
  {
    path: "/rutinas/:musculo",
    element: (
      <ProtectedRoute>
        <Rutina />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home/rutina-general",
    element: (
      <ProtectedRoute>
        <Firstroutine />
      </ProtectedRoute>
    ),
  },
  {
    path: "/bienvenida",
    element: <Bienvenida />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
