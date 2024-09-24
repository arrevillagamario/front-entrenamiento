import { Link } from "react-router-dom";
import { useEffect } from "react";

const Welcome = () => {
  useEffect(() => {
    // Agrega una clase para activar la animación al montar el componente
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll(".animate-fade");
      elements.forEach((el) => el.classList.add("fade-in"));
    }, 100);

    return () => clearTimeout(timeoutId); // Limpiar timeout al desmontar
  }, []);

  return (
    <div className="bg-gray-900 flex flex-col justify-center items-center h-screen text-center">
      <div className="bg-black bg-opacity-80 p-10 rounded-lg w-full max-w-4xl animate-fade">
        {/* Logo */}
        <div className="mb-8 animate-fade">
          <img src="/img/logo.png" alt="Logo" className="mx-auto w-32" />
        </div>

        {/* Mensaje de bienvenida */}
        <h1 className="text-4xl font-bold text-white mb-6 animate-fade">
          ¡Bienvenido/a a Tu Entrenador Personal!
        </h1>
        <p className="text-gray-400 text-lg mb-8 animate-fade">
          Empieza tu viaje hacia un cuerpo más fuerte y saludable. Elegimos el
          tipo de entrenamiento que mejor se ajusta a tus metas y
          caracteristicas.
        </p>

        {/* Botones de acción */}
        <div className="flex justify-center space-x-4">
          <Link
            to="/home/rutina-general"
            className="bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition duration-300 transform hover:scale-105 animate-fade"
          >
            Empezar Ejercicios
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
