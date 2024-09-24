import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RutinaGeneral = () => {
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [ejercicios, setEjercicios] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [error, setError] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));

        if (!userData) {
          setError("No se encontraron datos del usuario.");
          setLoading(false);
          return;
        }

        const newUserData = {
          name: userData.first_name,
          weight: userData.weight,
          height: userData.height,
          age: userData.age,
          objetive: userData.goal,
          user_id: userData.user_id,
        };

        const response = await axios.post(
          "http://localhost:3000/routine/new-routine",
          newUserData
        );

        if (response.data && response.data.routine_json) {
          setMensaje(response.data.routine_json.mensaje);
          setEjercicios(response.data.routine_json.ejercicios);
        } else {
          setError("No se encontraron ejercicios en la respuesta.");
        }
        setLoading(false);
      } catch (error) {
        setError("Hubo un error al generar la rutina.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStart = () => {
    setShowWelcome(false); // Cambiar para mostrar los ejercicios
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < ejercicios.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    } else {
      navigate("/home/ejercicios");
    }
  };

  const handleGoHome = (evt) => {
    evt.preventDefault();
    navigate("/home/ejercicios");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <h2 className="text-2xl">
          Generando la rutina perfecta en base a tus datos...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (showWelcome) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
          <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg text-white">
            <h2 className="text-3xl font-bold mb-4 text-green-400 text-center">
              Hola, {JSON.parse(localStorage.getItem("userData")).first_name}.
            </h2>
            <p className="text-lg text-gray-300 text-center mb-4">
  ¡Bienvenido de nuevo! Es hora de comenzar tu rutina diaria de ejercicios. 
  Basado en tus datos (peso: {JSON.parse(localStorage.getItem("userData")).weight} kg; 
  altura: {JSON.parse(localStorage.getItem("userData")).height} m; 
  edad: {JSON.parse(localStorage.getItem("userData")).age} años), 
  tienes una rutina de {ejercicios.length} ejercicios para ayudarte a 
  {JSON.parse(localStorage.getItem("userData")).goal}. ¡Vamos a ponernos en forma juntos!
</p>

            <button
              onClick={handleStart}
              className="w-full bg-green-500 text-white font-bold py-3 rounded-full hover:bg-green-600 transition duration-300 transform hover:scale-105"
            >
              Comenzar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
        <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg text-white">
          {currentExerciseIndex < ejercicios.length ? (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-green-400">
                {ejercicios[currentExerciseIndex].nombre}
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed text-center mb-4">
                {ejercicios[currentExerciseIndex].descripcion ||
                  "Descripción no disponible."}
              </p>
              <p className="text-lg font-semibold text-white mb-4 text-center">
                Tiempo estimado: {ejercicios[currentExerciseIndex].tiempo}
              </p>
              <button
                onClick={handleNextExercise}
                className="w-full bg-green-500 text-white font-bold py-3 rounded-full hover:bg-green-600 transition duration-300 transform hover:scale-105"
              >
                Siguiente Ejercicio
              </button>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-green-400">
                ¡Genial, bien hecho, sigue así!
              </h2>
              <button
                onClick={handleGoHome}
                className="w-full bg-blue-500 text-white font-bold py-3 rounded-full hover:bg-blue-600 transition duration-300 transform hover:scale-105"
              >
                Volver al inicio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RutinaGeneral;
