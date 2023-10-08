import axios from 'axios'

export const getAllRegistros=() => {
    return axios.get('http://localhost:8000/api/solicitudes/')
};
export const createRegistro = (solicitudes_app) => {
    return axios.post('http://localhost:8000/api/solicitudes/',solicitudes_app);
};
export const getAllSedes = () => {
    return axios.post('http://localhost:8000/api/solicitudes/',solicitudes_app);
};