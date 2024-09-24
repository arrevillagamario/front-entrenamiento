import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Ejercicios = () => {
    const { musculo } = useParams();
    console.log(musculo);
  const [ejercicios, setEjercicios] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEjercicios = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/gemini/generate-routine/${musculo}`); 
        setEjercicios(response.data.ejercicios);
        setLoading(false); 
      } catch (error) {
        setError("Error al cargar los ejercicios");
        setLoading(false);
      }
    };

    fetchEjercicios();
  }, []);

 
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
          <circle cx="12" cy="2" r="0" fill="currentColor" transform="rotate(45 12 12)">
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

  // Mostrar error si ocurre un problema al obtener los datos
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-red-500 text-2xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-4 bg-gray-800 text-white rounded-lg shadow-lg">
        {currentExerciseIndex < ejercicios.length ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center">{ejercicios[currentExerciseIndex].nombre}</h2>
            <p className="text-sm">{ejercicios[currentExerciseIndex].descripcion}</p>
            <p className="text-sm font-semibold">{ejercicios[currentExerciseIndex].tiempo}</p>

            <button
              onClick={handleNextExercise}
              className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Siguiente Ejercicio
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold">¡Genial, ejercicio finalizado con éxito!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ejercicios;