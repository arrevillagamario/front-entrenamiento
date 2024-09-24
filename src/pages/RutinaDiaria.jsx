const RutinaDiaria = () => {
  const backgroundImage = "url('/path/to/your/background.jpg')"; // Aquí pones la URL de tu imagen de fondo

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-900 relative z-10" // Asegurando que el z-index no interfiera con el modal
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        filter: "blur(0px)",
      }}
    >
      <div className="w-full max-w-md p-4 bg-gray-800 bg-opacity-80 text-white rounded-lg shadow-lg">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-xl">
          <div className="bg-gray-800 bg-opacity-90 p-6 rounded-lg text-white">
            {/* Contenido del componente */}
            <div className="flex flex-col items-center space-y-4">
              {/* Título */}
              <h2 className="text-3xl font-bold text-green-400 mb-4 text-center">
                Rutina Diaria
              </h2>

              {/* Descripción */}
              <p className="text-lg text-gray-300 leading-relaxed text-center mb-4">
                Haz clic en el botón de abajo para ver tu rutina diaria
                personalizada.
              </p>

              {/* Botón para ver la rutina diaria */}
              <button className="w-full bg-green-500 text-white font-bold py-3 rounded-full hover:bg-green-600 transition duration-300">
                Ver Rutina Diaria
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RutinaDiaria;
