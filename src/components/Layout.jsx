import React, { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal

  // Función para mostrar el modal
  const handleLogoutClick = () => {
    setShowModal(true);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    // Elimina el token del localStorage o de donde lo guardes
    localStorage.removeItem("userData");
    // Redirige al usuario a la página de login
    navigate("/");
    setShowModal(false); // Cierra el modal después de cerrar sesión
  };

  // Función para cerrar el modal sin cerrar sesión
  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-gray-900">
        <nav className="bg-black bg-opacity-80 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <img src="/img/logo.png" alt="Logo" className="w-10" />
              <span className="text-white text-xl font-bold ml-3">GymBot</span>
            </div>

            <div className="hidden md:flex space-x-6">
              <Link
                to={"/home/ejercicios"}
                href="#"
                className="text-white hover:text-green-500 transition duration-300"
              >
                Ejercicios
              </Link>
              <Link
                to={"/home/alimentacion"}
                href="#"
                className="text-white hover:text-green-500 transition duration-300"
              >
                Alimentación
              </Link>
              <Link
                to={"/home/rutina-diaria"}
                className="text-white hover:text-green-500 transition duration-300"
              >
                Rutina diaria
              </Link>
            </div>

            <div className="hidden md:flex space-x-6 items-center">
              {/* Botón de perfil */}
              <a
                href="#"
                className="text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition duration-300"
              >
                Perfil
              </a>
              {/* Botón de logout con modal */}
              <button
                onClick={handleLogoutClick}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button className="text-white focus:outline-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>

        <div className="md:hidden bg-black bg-opacity-80 p-4">
          <a href="#" className="block text-white mb-2 hover:text-green-500">
            Home
          </a>
          <a href="#" className="block text-white mb-2 hover:text-green-500">
            Features
          </a>
          <a href="#" className="block text-white mb-2 hover:text-green-500">
            Pricing
          </a>
          <a href="#" className="block text-white hover:text-green-500">
            Contact
          </a>
          <button
            onClick={handleLogoutClick}
            className="block bg-red-500 text-white font-bold py-2 px-4 mt-4 rounded-full text-center hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">¿Estás seguro?</h2>
            <p className="text-gray-700 mb-4">
              ¿Realmente deseas cerrar sesión?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
              >
                Sí, cerrar sesión
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <Outlet className="bg-gray-900" />
    </>
  );
};

export default Layout;
