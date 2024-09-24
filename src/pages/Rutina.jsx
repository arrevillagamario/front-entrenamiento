import { useParams } from "react-router-dom";

const Rutina = () => {
  const { musculo } = useParams();
  return (
    <div>
      <h1>{musculo}</h1>
    </div>
  );
};

export default Rutina;
