import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email: login.email,
        password: login.password,
      });

      localStorage.setItem("userData", JSON.stringify(response.data));

      if (response.status === 200) {
        setSuccessMessage("Login successful!");
        setErrorMessage("");
        navigate("/home/ejercicios");
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gray-900 flex justify-center items-center h-screen">
      <div className="bg-black bg-opacity-80 p-10 rounded-lg w-96 text-center">
        <div className="mb-8">
          <img src="/img/logo.png" alt="Logo" className="mx-auto w-32" />
        </div>

        <div className="flex justify-around text-white mb-6">
          <Link to={"/"} className="font-bold border-b-2 border-green-500 pb-1">
            SIGN IN
          </Link>
          <Link to={"/registrar"} className="font-bold pb-1">
            SIGN UP
          </Link>
        </div>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <form className="space-y-8" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={login.email}
            className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={login.password}
            className="w-full p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-3 rounded-full hover:bg-green-600 transition duration-300"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
