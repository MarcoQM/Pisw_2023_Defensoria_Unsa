import PropTypes from 'prop-types';
function ListItem({ date, estado, encargado, descripcion, estado_descripcion, remitido, recomendacion }) {

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'Recibido':
                return 'text-orange-500';
            case 'Admitido':
                return 'text-green-500';
            case 'Por subsanar':
                return 'text-yellow-500';
            case 'Inadmisible':
                return 'text-red-500';
            case 'En proceso':
                return 'text-blue-500';
            case 'Finalizado':
                return 'text-green-900';
            default:
                return 'text-gray-500';
        }
    }
    return (
        <li className="my-5 ms-8">
            <div className="absolute w-3 h-3 bg-indigo-950 rounded-full mt-1.5 -start-1.5">
            </div>
            <h4 className={`${getEstadoColor(estado)} text-lg font-bold`}>{estado}</h4>
            <time className="block mb-2 text-sm font-semibold leading-none text-gray-500">fecha: {date}</time>
            {
                estado !== 'Recibido' && (
                    <>
                        <p className="mb-1 text-sm font-normal"><span className='text-black font-semibold'>Encargado: </span>{encargado}</p>
                        <p className="mb-1 text-sm font-normal"><span className='text-black font-semibold'>Descripcion del proceso: </span>{descripcion}</p>
                        <p className="mb-1 text-sm font-normal"><span className='text-black font-semibold'>Estado: </span>{estado_descripcion}</p>
                        <p className="mb-1 text-sm font-normal"><span className='text-black font-semibold'>Remitido: </span>{remitido}</p>
                        <p className="mb-1 text-sm font-normal"><span className='text-black font-semibold'>Recomendacion: </span>{recomendacion}</p>
                    </>
                )
            }

        </li>
    );
}

ListItem.propTypes = {
    date: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    estado_descripcion: PropTypes.string.isRequired,
    encargado: PropTypes.string.isRequired,
    remitido: PropTypes.string.isRequired,
    recomendacion: PropTypes.string.isRequired,

};



export default ListItem;
