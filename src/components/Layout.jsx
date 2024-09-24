import React from "react";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <div class="bg-gray-900">
        <nav class="bg-black bg-opacity-80 p-4">
          <div class="container mx-auto flex justify-between items-center">
            <div class="flex items-center">
              <img
                src="/img/logo.png
              "
                alt="Logo"
                class="w-10"
              />
              <span class="text-white text-xl font-bold ml-3">GymBot</span>
            </div>

            <div class="hidden md:flex space-x-6">
              <a
                href="#"
                class="text-white hover:text-green-500 transition duration-300"
              >
                Ejercicios
              </a>
              <a
                href="#"
                class="text-white hover:text-green-500 transition duration-300"
              >
                Alimentación
              </a>
              <a
                href="#"
                class="text-white hover:text-green-500 transition duration-300"
              >
                Consejos
              </a>
            </div>

            <div class="hidden md:block">
              <a
                href="#"
                class=" text-white font-bold py-2 px-4 rounded-full hover:bg-green-600 transition duration-300"
              >
                Perfil
              </a>
            </div>

            <div class="md:hidden flex items-center">
              <button class="text-white focus:outline-none">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </nav>

        <div class="md:hidden bg-black bg-opacity-80 p-4">
          <a href="#" class="block text-white mb-2 hover:text-green-500">
            Home
          </a>
          <a href="#" class="block text-white mb-2 hover:text-green-500">
            Features
          </a>
          <a href="#" class="block text-white mb-2 hover:text-green-500">
            Pricing
          </a>
          <a href="#" class="block text-white hover:text-green-500">
            Contact
          </a>
          <a
            href="#"
            class="block bg-green-500 text-white font-bold py-2 px-4 mt-4 rounded-full text-center hover:bg-green-600"
          >
            Sign Up
          </a>
        </div>
      </div>
      <Outlet className="bg-gray-900" />
    </>
  );
};

export default Layout;
