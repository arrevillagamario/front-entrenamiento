import { useState } from 'react';
import FrontBody from '../components/FrontBody'
import BackBody from '../components/BackBody'
const Inicio = () => {
  const [view, setView] = useState('front'); // Define el estado inicial como 'front'

  return (
    <div className="bg-gray-900 h-max flex flex-col items-center justify-center font-roboto">
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-6 text-center mt-5">
        Seleccione la vista del cuerpo
      </h1>

      <div className="">
        {/* Renderiza el componente correspondiente según el estado de 'view' */}
        {view === 'front' && <FrontBody />}
        {view === 'back' && <BackBody />}
      </div>

      <div className="space-x-4">
        <button
          onClick={() => setView('front')}
          className="bg-green-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
        >
          Vista Frontal
        </button>
        <button
          onClick={() => setView('back')}
          className="bg-green-500 text-white font-bold py-2 px-6 rounded-md hover:bg-green-600 transition duration-300"
        >
          Vista Trasera
        </button>
      </div>
    </div>
  );
};

export default Inicio;
