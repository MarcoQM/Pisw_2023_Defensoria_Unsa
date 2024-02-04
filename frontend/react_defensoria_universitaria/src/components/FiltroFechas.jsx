import{ useState } from 'react';

 // eslint-disable-next-line react/prop-types
 const FiltroFechas = ({  onFilterChange, onClearFilters }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filtersApplied, setFiltersApplied] = useState(false);

    const handleFilterChange = () => {
        onFilterChange({ startDate, endDate });
        setFiltersApplied(true);
    };

    const handleClearFilters = () => {
        setStartDate('');
        setEndDate('');
        onClearFilters();
        setFiltersApplied(false);
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
        <button 
            onClick={handleFilterChange} 
            className={`px-3 py-1 m-3 ${filtersApplied ? 'bg-gray-400' : 'bg-granate-900'} text-white bg-granate rounded`}
            disabled={filtersApplied}>
            Filtrar
        </button>
        <button 
            onClick={handleClearFilters} 
            className={`px-3 py-1 ml-2 text-white ${!filtersApplied ? 'bg-gray-400' : 'bg-granate-900'} rounded`}
            disabled={!filtersApplied}>
            Limpiar Filtros
        </button>
        </div>
    );
    };

export default FiltroFechas;