import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Importa Axios

const Registrar = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    weight: "", // Inicializamos como decimal
    height: "", // Inicializamos como decimal
    age: "", // Inicializamos como número entero
    goal: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Hacer la conversión necesaria dependiendo del campo
    if (name === "weight" || name === "height") {
      setUser({ ...user, [name]: parseFloat(value) }); // Para weight y height, convierte a float
    } else if (name === "age") {
      setUser({ ...user, [name]: parseInt(value, 10) }); // Para age, convierte a entero
    } else {
      setUser({ ...user, [name]: value }); // Para otros campos, deja el valor como string
    }
  };

  // Enviar los datos a la API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user); // Mostrar los datos del usuario en la consola para depurar
      const response = await axios.post("http://localhost:3000/user/create", {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        weight: parseFloat(user.weight),
        height: parseFloat(user.height),
        age: parseInt(user.age, 10),
        goal: user.goal,
      });

      if (response.status === 201) {
        setSuccess("Usuario registrado exitosamente");
        setError("");

        // Guardar la respuesta en localStorage
        localStorage.setItem("user", JSON.stringify(response.data));

        setTimeout(() => {
          navigate("/"); // Redirige a la página principal después de 2 segundos
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("El correo ya existe");
      } else {
        setError("Hubo un error al registrar el usuario");
      }
    }
  };

  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 flex justify-center items-center h-screen">
      <div className="bg-black bg-opacity-80 p-10 rounded-lg w-full max-w-4xl text-center">
        <div className="mb-2">
          <img src="/img/logo.png" alt="Logo" className="mx-auto w-24" />
        </div>
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
        <div className="flex justify-around text-white mb-6">
          <Link to={"/"} className="font-bold pb-1">
            SIGN IN
          </Link>
          <Link
            to={"/registrar"}
            className="font-bold border-b-2 border-green-500 pb-1"
          >
            SIGN UP
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              placeholder="Nombre"
              onChange={handleChange}
              value={user.first_name}
              className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Apellido"
              onChange={handleChange}
              value={user.last_name}
              className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={user.email}
              className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={user.password}
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
            <input
              type="number"
              name="age"
              placeholder="Edad"
              onChange={handleChange}
              value={user.age}
              className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <select
              name="goal"
              value={user.goal}
              onChange={handleChange}
              className="w-full p-3 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="" disabled>
                Selecciona tu meta
              </option>
              <option value="Perder peso">Perder peso</option>
              <option value="Ganar masa muscular">Ganar masa muscular</option>
              <option value="Mejorar resistencia">Mejorar resistencia</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-3 rounded-full hover:bg-green-600 transition duration-300 mt-6"
          >
            SIGN UP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registrar;
