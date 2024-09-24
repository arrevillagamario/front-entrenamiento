import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/home");
  };
  return (
    <div class="bg-gray-900 flex justify-center items-center h-screen">
      <div class="bg-black bg-opacity-80 p-10 rounded-lg w-96 text-center">
        <div class="mb-8">
          <img src="/img/logo.png" alt="Spotify Logo" class="mx-auto w-32" />
        </div>

        <div class="flex justify-around text-white mb-6">
          <Link to={"/"} class="font-bold border-b-2 border-green-500 pb-1">
            SIGN IN
          </Link>
          <Link to={"/registrar"} class="font-bold pb-1">
            SIGN UP
          </Link>
        </div>

        <form className="space-y-8">
          <input
            type="text"
            placeholder="Username"
            class="w-full p-3  rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            class="w-full p-3  rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={handleNavigation}
            type="submit"
            class="w-full bg-green-500 text-white font-bold py-3 rounded-full hover:bg-green-600 transition duration-300"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
