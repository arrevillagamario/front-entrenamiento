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
          user_id: userData.user_id
        };

        const response = await axios.post("http://localhost:3000/routine/first-routine", newUserData);

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
      navigate("/home");
    }
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <h2 className="text-2xl">Generando la rutina perfecta en base a tus datos...</h2>
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
    // Mostrar la tarjeta de bienvenida
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Hola, {JSON.parse(localStorage.getItem("userData")).first_name}.</h2>
          <p className="text-lg">
            ¡Enhorabuena por embarcarte en este nuevo camino! En base a tus datos (peso: {JSON.parse(localStorage.getItem("userData")).weight} kg;
            altura: {JSON.parse(localStorage.getItem("userData")).height} m; edad: {JSON.parse(localStorage.getItem("userData")).age} años),
            aquí tienes una rutina de {ejercicios.length} ejercicios para ayudarte a {JSON.parse(localStorage.getItem("userData")).goal}.
          </p>
          <button
            onClick={handleStart}
            className="w-full bg-green-500 text-white font-bold py-2 rounded-lg mt-4 hover:bg-green-600 transition duration-300"
          >
            Comenzar
          </button>
        </div>
      </div>
    );
  }

  // Mostrar los ejercicios uno a uno
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
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
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">¡Genial, bien hecho, sigue así!</h2>
            <button
              onClick={handleGoHome}
              className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Volver al inicio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RutinaGeneral;
