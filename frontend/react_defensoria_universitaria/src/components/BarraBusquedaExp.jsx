import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const BarraBusquedaExp = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = () => {
    onSearchChange(searchTerm);
  };

  return (
    <div className="my-4">
      <label className="mr-2">Ingrese el Código de Expediente:</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mr-2 px-2 py-1 border rounded"
      />
      <button onClick={handleSearchChange} className="px-3 py-1 bg-blue-500 text-white bg-granate rounded">
        Buscar
      </button>
    </div>
  );
};

export default BarraBusquedaExp;