import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const RutinaDiaria = () => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const backgroundImage = "url('/path/to/your/background.jpg')"; // URL de tu imagen de fondo

  useEffect(() => {
    const lastPressTime = localStorage.getItem("lastPressTime");
    if (lastPressTime) {
      const timeElapsed = Date.now() - parseInt(lastPressTime);
      // Si han pasado menos de 60 segundos
      if (timeElapsed < 60000) {
        setButtonDisabled(true);
        const remainingTime = 60 - Math.floor(timeElapsed / 1000);
        setMessage(`Lo siento, ya has hecho el ejercicio del día. Regresa en ${remainingTime} segundos.`);
      }
    }
  }, []);

  const handleButtonClick = () => {
    const currentTime = Date.now();
    const lastPressTime = localStorage.getItem("lastPressTime");

    if (lastPressTime) {
      const timeElapsed = currentTime - parseInt(lastPressTime);
      // Validar si han pasado menos de 60 segundos
      if (timeElapsed < 60000) {
        const remainingTime = 60 - Math.floor(timeElapsed / 1000);
        setMessage(`Lo siento, ya has hecho el ejercicio del día. Regresa en ${remainingTime} segundos.`);
        return; // No redirigir si no ha pasado el tiempo
      }
    }

    // Guardar el tiempo actual y redirigir
    localStorage.setItem("lastPressTime", currentTime);
    navigate("/home/rutina-ge");
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-900 relative z-10"
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        filter: "blur(0px)",
      }}
    >
      <div className="w-full max-w-md p-4 bg-gray-800 bg-opacity-80 text-white rounded-lg shadow-lg">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-xl">
          <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg text-white">
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-3xl font-bold text-green-400 mb-4 text-center">
                Rutina Diaria
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed text-center mb-4">
                Haz clic en el botón de abajo para ver tu rutina diaria
                personalizada.
              </p>

              <button
                onClick={handleButtonClick}
                className={`w-full bg-green-500 text-white font-bold py-3 rounded-full hover:bg-green-600 transition duration-300 ${buttonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={buttonDisabled}
              >
                Ver Rutina Diaria
              </button>

              {message && (
                <p className="text-red-500 text-center mt-4">{message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RutinaDiaria;
