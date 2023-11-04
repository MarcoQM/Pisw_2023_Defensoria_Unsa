import axios from 'axios'



export const getAllRegistros=() => {
    return axios.get('http://localhost:8000/api/solicitudes/')
};
export const createRegistro = (solicitudes_app) => {
    return axios.post('http://localhost:8000/api/solicitudes/',solicitudes_app);
};
export const getAllSedes = () => {
    return axios.get('http://localhost:8000/api/sedes/');
};
export const getAllRoles = () => {
    return axios.get('http://localhost:8000/api/solicitudes/rol/');
};
export const getAllTipo = () => {
    return axios.get('http://localhost:8000/api/solicitudes/tipo/');
};

export const getExpediente = (id) => {
    return axios.get(`http://localhost:8000/api/solicitudes/${id}`);
}

export const login = (login) => {
    return axios.post('http://localhost:8000/api/authentication/login/',login);
}