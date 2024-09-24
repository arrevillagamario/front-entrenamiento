import { useState, useEffect } from "react";
import axios from "axios"; // Importa Axios

const Editar = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    weight: "",
    height: "",
    age: "",
    goal: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userData = JSON.parse(localStorage.getItem("userData"));
  const id = parseInt(userData.user_id);

  // Simulamos la obtención de los datos del usuario al cargar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/find/${id}`);
        setUser(response.data);
      } catch (error) {
        setError("Error al cargar los datos del usuario");
      }
    };
    fetchUserData();
  }, [id]);

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  // Enviar los datos actualizados a la API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user); // Mostrar los datos del usuario en la consola para depurar
      const response = await axios.put(`http://localhost:3000/user/update`, {
        user_id: id,
        weight: parseFloat(user.weight),
        height: parseFloat(user.height),
        age: parseInt(user.age),
        goal: user.goal,
      });

      if (response.status === 200) {
        setSuccess("Usuario actualizado exitosamente");
        setError("");
      }
    } catch (error) {
      setError("Hubo un error al actualizar la información del usuario");
    }
  };

  return (
    <div className="bg-gray-900 flex justify-center items-center h-screen">
      <div className="bg-black bg-opacity-80 p-10 rounded-lg w-full max-w-4xl text-center">
        {error && (
          <p className="error-message bg-red-600 text-white font-semibold py-5 mb-2">
            {error}
          </p>
        )}
        {success && (
          <p className="success-message bg-green-500 text-white font-semibold py-5">
            {success}
          </p>
        )}

        <h2 className="text-white text-2xl mb-6">Editar Información del Usuario</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              value={user.first_name}
              className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400"
              disabled // No se puede editar
            />
            <input
              type="text"
              name="last_name"
              value={user.last_name}
              className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400"
              disabled // No se puede editar
            />
            <input
              type="email"
              name="email"
              value={user.email}
              className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400"
              disabled // No se puede editar
            />
            <input
              type="number"
              name="age"
              value={user.age}
              onChange={handleChange} // Permitir editar la edad
              className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="number"
              name="weight"
              placeholder="Peso (kg)"
              onChange={handleChange}
              value={user.weight}
              className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="number"
              name="height"
              placeholder="Altura (mt Ej: 1.80)"
              onChange={handleChange}
              value={user.height}
              className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <select
              name="goal"
              onChange={handleChange} // Permitir editar la meta (objetivo)
              value={user.goal}
              className="w-full p-3 rounded-full bg-gray-700 text-white"
              required
            >
              <option value="Perder peso">Perder peso</option>
              <option value="Ganar masa muscular">Ganar masa muscular</option>
              <option value="Mejorar resistencia">Mejorar resistencia</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-3 rounded-full hover:bg-green-600 transition duration-300 mt-6"
          >
            Actualizar Información
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editar;
