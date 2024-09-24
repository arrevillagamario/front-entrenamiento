import { useState } from "react";
import axios from "axios";

const Alimentacion = () => {
  const [ingrediente, setIngredient] = useState(""); // Estado para almacenar el ingrediente
  const [recipes, setRecipes] = useState([]); // Estado para almacenar las recetas
  const [error, setError] = useState(""); // Estado para manejar errores
  const [loading, setLoading] = useState(false); // Estado para manejar el cargado

  // Manejar el cambio en el input del ingrediente
  const handleIngredientChange = (e) => {
    setIngredient(e.target.value); // Actualizar el estado con el valor del input
  };

  // Hacer la petición al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Asegúrate de enviar el ingrediente correctamente
      const response = await axios.post(
        "http://localhost:3000/gemini/generate-food",
        {
          ingrediente: ingrediente, // Enviar el ingrediente capturado en el estado
        }
      );

      // Suponemos que el backend devuelve un array de recetas en el campo `receta`
      setRecipes(response.data.receta);
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
    <div className="bg-gray-900 flex flex-col justify-center items-center pt-10 text-center">
      <div className="bg-black bg-opacity-80 p-10 rounded-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-6">
          Encuentra una comida saludable
        </h1>

        <p className="text-gray-400 text-lg mb-8">
          Ingresa un ingrediente y descubre una comida saludable basada en ese
          ingrediente.
        </p>

        <form onSubmit={handleSubmit} className="mb-8">
          <input
            type="text"
            placeholder="Ingresa un ingrediente"
            value={ingrediente}
            onChange={handleIngredientChange} // Vincula el input con el estado
            className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-3 rounded-full hover:bg-green-600 transition duration-300"
          >
            Solicitar comida
          </button>
        </form>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {loading && (
          <div className="text-white mb-4">Generando sugerencias...</div>
        )}

        {/* Mostrar las recetas */}
        {recipes.length > 0 && (
          <div className="text-white bg-gray-800 p-5 rounded-lg space-y-8">
            <h2 className="text-2xl font-semibold mb-4">Recetas:</h2>
            {recipes.map((recipe, index) => (
              <div key={index} className="mb-8 border-b border-gray-700 pb-6">
                <h3 className="text-xl font-bold mb-4">{recipe.nombre}</h3>

                <div className="mb-4">
                  <p className="text-lg font-semibold mb-2">Ingredientes:</p>
                  <p className="whitespace-pre-line leading-relaxed text-gray-300">
                    {typeof recipe.ingredientes === "string"
                      ? recipe.ingredientes.trim()
                      : "Ingredientes no disponibles"}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-lg font-semibold mb-2">Preparación:</p>
                  <p className="whitespace-pre-line leading-relaxed text-gray-300">
                    {typeof recipe.preparacion === "string"
                      ? recipe.preparacion.trim()
                      : "Preparación no disponible"}
                  </p>
                </div>

                <div>
                  <p className="text-lg font-semibold mb-2">
                    Valores Nutricionales:
                  </p>
                  <p className="whitespace-pre-line leading-relaxed text-gray-300">
                    {typeof recipe.valoresNutricionales === "string"
                      ? recipe.valoresNutricionales.trim()
                      : "Valores nutricionales no disponibles"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alimentacion;
