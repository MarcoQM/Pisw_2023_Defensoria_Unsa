import{ useState } from 'react';

 // eslint-disable-next-line react/prop-types
 const FiltroFechas = ({ onFilterChange }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilterChange = () => {
        onFilterChange({ startDate, endDate });
    };

    return (
        <div className="my-4">
        <label className="mr-2">Desde:</label>
        <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mr-2 px-2 py-1 border rounded"
        />
        <label className="mr-2">A:</label>
        <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mr-2 px-2 py-1 border rounded"
        />
        <button onClick={handleFilterChange} className="px-3 py-1 bg-blue-500 text-white  bg-granate rounded">
            Filtrar
        </button>
        </div>
    );
    };

export default FiltroFechas;