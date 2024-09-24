import { useState } from "react";
import axios from "axios";

const Alimentacion = () => {
  const [ingredient, setIngredient] = useState(""); // Estado para almacenar el ingrediente
  const [suggestions, setSuggestions] = useState([]); // Estado para almacenar las sugerencias
  const [error, setError] = useState(""); // Estado para manejar errores
  const [loading, setLoading] = useState(false); // Estado para manejar el cargado

  // Manejar el cambio en el input del ingrediente
  const handleIngredientChange = (e) => {
    setIngredient(e.target.value);
  };

  // Hacer la petición al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Envía correctamente el ingrediente en el cuerpo de la solicitud
      const response = await axios.post("http://localhost:3000/generatefood", {
        ingredient: ingredient, // Asegúrate de usar la clave correcta
      });

      // Suponemos que el backend devuelve un array con tres sugerencias
      setSuggestions(response.data.suggestions);
      setLoading(false);
    } catch (error) {
      console.error("Error al generar la comida:", error);
      setError(
        "Hubo un problema al generar las sugerencias. Inténtalo de nuevo."
      );
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-900 flex flex-col justify-center items-center h-screen text-center">
      <div className="bg-black bg-opacity-80 p-10 rounded-lg w-full max-w-4xl">
        {/* Título */}
        <h1 className="text-4xl font-bold text-white mb-6">
          Encuentra una comida saludable
        </h1>

        {/* Descripción */}
        <p className="text-gray-400 text-lg mb-8">
          Ingresa un ingrediente y descubre una comida saludable basada en ese
          ingrediente.
        </p>

        {/* Formulario para ingresar el ingrediente */}
        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            placeholder="Ingresa un ingrediente"
            value={ingredient}
            onChange={handleIngredientChange}
            className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-3 rounded-full hover:bg-green-600 transition duration-300"
          >
            Solicitar comida
          </button>
        </form>

        {/* Mostrando errores */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Mostrando el estado de carga */}
        {loading && (
          <div className="text-white mb-4">Generando sugerencias...</div>
        )}

        {/* Mapeo de las sugerencias de comida */}
        {suggestions.length > 0 && (
          <div className="text-white bg-gray-800 p-5 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Sugerencias:</h2>
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index} className="mb-2">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alimentacion;
