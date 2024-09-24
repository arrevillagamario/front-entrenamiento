import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Ejercicios = () => {
  const navigate = useNavigate();
  const { musculo } = useParams();
  console.log(musculo);
  const [ejercicios, setEjercicios] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapea músculos a sus respectivas imágenes de fondo
  const backgroundImages = {
    bicep: "url('/img/bicep.avif')",
    tricep: "url('/img/tricep.avif')",
    trapecio: "url('/img/trapecio.jpg')",
    pecho: "url('/img/pecho.avif')",
    cuadricep: "url('/img/piernas.jpg')",
    femoral: "url('/img/piernas.jpg')",
    gluteos: "url('/img/bicep.avif')",
    antebrazo: "url('/img/antebrazo.avif')",
    hombro: "url('/img/hombro.jpg')",
    abdomen: "url('/img/abdomen.jpg')",
    pantorrilla: "url('/img/pantorilla.avif')",
    espalda: "url('/img/espalda.jpg')",

    // Agrega más según sea necesario
  };

  // Selecciona la imagen de fondo basada en el músculo o un valor por defecto
  const backgroundImage = backgroundImages[musculo] || `/img/${musculo}`;

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/gemini/generate-routine/${musculo}`
        );
        setEjercicios(response.data.ejercicios);
        setLoading(false);
      } catch (error) {
        setError("Error al cargar los ejercicios");
        setLoading(false);
      }
    };

    fetchEjercicios();
  }, [musculo]);

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/home/ejercicios");
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < ejercicios.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      setCurrentExerciseIndex(ejercicios.length);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="white"
          className="animate-spin"
        >
          <circle cx="12" cy="2" r="0" fill="currentColor">
            <animate
              attributeName="r"
              begin="0"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          <circle
            cx="12"
            cy="2"
            r="0"
            fill="currentColor"
            transform="rotate(45 12 12)"
          >
            <animate
              attributeName="r"
              begin="0.125s"
              calcMode="spline"
              dur="1s"
              keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
              repeatCount="indefinite"
              values="0;2;0;0"
            />
          </circle>
          {/* Repite el mismo patrón para las demás secciones del SVG */}
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-red-500 text-2xl">{error}</p>
      </div>
    );
  }

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-900"
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        filter: "blur(0px)", // Si quieres aplicar un leve desenfoque, ajusta el valor aquí
      }}
    >
      <div className="w-full max-w-md p-4 bg-gray-800 bg-opacity-80 text-white rounded-lg shadow-lg">
        {currentExerciseIndex < ejercicios.length ? (
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
            <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg text-white">
              {/* Contenido del ejercicio */}
              <div className="flex flex-col items-center space-y-4">
                {/* Título del ejercicio */}
                <h2 className="text-3xl font-bold text-green-400 mb-4 text-center">
                  {ejercicios[currentExerciseIndex].nombre}
                </h2>

                {/* Descripción del ejercicio */}
                <p className="text-lg text-gray-300 leading-relaxed text-center mb-4">
                  {ejercicios[currentExerciseIndex].descripcion ||
                    "Descripción no disponible."}
                </p>

                {/* Tiempo del ejercicio */}
                <p className="text-lg font-semibold text-white mb-4">
                  Tiempo estimado: {ejercicios[currentExerciseIndex].tiempo}
                </p>

                {/* Botón para pasar al siguiente ejercicio */}
                <button
                  onClick={handleNextExercise}
                  className="w-full bg-green-500 text-white font-bold py-3 rounded-full hover:bg-green-600 transition duration-300 transform hover:scale-105"
                >
                  Siguiente Ejercicio
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center ">
            <div className="max-w-md w-full bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg text-white">
                <div className="flex flex-col items-center">
                  {/* Icono de celebración o éxito */}
                  <div className="mb-4 text-green-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-16 h-16"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2l4-4M7 17l2-2l5 5M12 4L9 7l2 2l4-4"
                      />
                    </svg>
                  </div>

                  {/* Título */}
                  <h2 className="text-3xl font-bold mb-4">
                    ¡Ejercicio completado!
                  </h2>

                  {/* Texto informativo */}
                  <p className="text-lg text-gray-300 mb-4">
                    ¡Has terminado todos los ejercicios con éxito! ¡Sigue
                    adelante y mantente motivado!
                  </p>

                  {/* Botón de acción (Opcional) */}
                  <button
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 hover:bg-green-600 hover:scale-105"
                    onClick={handleNavigate}
                  >
                    Volver al inicio
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ejercicios;
