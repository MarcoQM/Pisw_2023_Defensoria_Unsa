import axios from 'axios'

const tokenName = 'user_uaeh_token';

const getLocalToken = () => {  
    return JSON.parse(localStorage.getItem(tokenName));  
};  



export const getAllRegistros=() => {
    return axios.get('http://localhost:8000/api/solicitudes/')
};
export const createRegistro = (solicitudes_app) => {
    return axios.post('http://localhost:8000/api/solicitudes/',solicitudes_app);
};
export const getAllSedes = (token) => {   
    return axios.get('http://localhost:8000/api/sedes/',token);
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

    return new Promise((resolve, reject) => {  

        const instance = axios.create({  
              
            baseURL: 'http://localhost:8000/api/authentication',  
            // headers es lo necesario para hacer la petición  
            headers: {  
                'Content-Type': 'application/json'  
            }  
        }); 
        instance.post('login/', login)  
            .then(r => {                  
                localStorage.setItem(tokenName, JSON.stringify(r.data.key));               
                resolve(r.data);  
            }).catch(e => {  
                console.log(e);  
                reject(e.response);  
            }); 

    });

    //return axios.post('http://localhost:8000/api/authentication/login/',login);
}