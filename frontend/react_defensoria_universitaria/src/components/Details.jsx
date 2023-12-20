import PropTypes  from "prop-types";

function Details ({ title, text })  {
    return (
        <div className='m-2'>
            <h4 className="text-gray-500 font-semibold text-sm">{title}</h4>
            <p className="text-black font-semibold text-sm">{text}</p>
        </div>
    );
}

Details.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};


export default Details;



