import { useState } from 'react';
import FrontBody from '../components/FrontBody'
import BackBody from '../components/BackBody'
const Inicio = () => {
  const [view, setView] = useState('front'); // Define el estado inicial como 'front'

  return (
    <div style={{ 
      backgroundColor: '#111828', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontFamily: 'Roboto, sans-serif' // Aplicando la nueva fuente
    }}>
      <h1 style={{ 
        color: '#ffffff', 
        fontSize: '3rem',  // Aumentando el tamaño del texto
        fontFamily: 'Roboto, sans-serif' // Fuente diferente para el título
      }}>
        Seleccione la vista del cuerpo
      </h1>

      <div>
        {/* Renderiza el componente correspondiente según el estado de 'view' */}
        {view === 'front' && <FrontBody />}
        {view === 'back' && <BackBody />}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setView('front')} style={buttonStyle}>Vista Frontal</button>
        <button onClick={() => setView('back')} style={buttonStyle}>Vista Trasera</button>
      </div>
    </div>
  );
};

// Estilo para los botones
const buttonStyle = {
  backgroundColor: '#23c55e',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  margin: '0 10px',
  cursor: 'pointer',
  borderRadius: '5px',
  fontSize: '18px',  // Ajuste en el tamaño del texto de los botones
  fontFamily: 'Roboto, sans-serif' // Fuente para los botones
};

export default Inicio;
