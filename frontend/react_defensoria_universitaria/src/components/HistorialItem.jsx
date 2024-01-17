import PropTypes from 'prop-types';
function ListItem({ date, estado, encargado, remitido, recomendacion }) {
    return (
        <li className="my-5 ms-8">            
                <div className="absolute w-3 h-3 bg-indigo-950 rounded-full mt-1.5 -start-1.5"></div>
            <time className="block mb-2 text-sm font-semibold leading-none text-gray-500">fecha: {date}</time>
            <p className="mb-1 text-sm font-norma"><span className='text-black font-semibold'>Estado: </span>{estado}</p>
            <p className="mb-1 text-sm font-normal"><span className='text-black font-semibold'>Encargado: </span>{encargado}</p>
            <p className="mb-1 text-sm font-normal"><span className='text-black font-semibold'>Remitido: </span>{remitido}</p>
            <p className="mb-1 text-sm font-normal"><span className='text-black font-semibold'>Recomendacion: </span>{recomendacion}</p>
        </li>
    );
}

ListItem.propTypes = {
    date: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
    encargado: PropTypes.string.isRequired,
    remitido: PropTypes.string.isRequired,
    recomendacion: PropTypes.string.isRequired,

};



export default ListItem;
