import axios from 'axios'


const tokenName = 'user_uaeh_token';
const userName = 'user_name';


// eslint-disable-next-line no-unused-vars
const getLocalToken = () => {  
    return JSON.parse(localStorage.getItem(tokenName));  
};






export const getAllSolicitudes=() => {
    return axios.get('http://localhost:8000/api/solicitudes/')
};

export const createIncidencia = (formData) => {  
    return axios.post('http://localhost:8000/api/solicitudes/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }
    
    
    );

    
}

export const getSolicitudDetalle = (id) => {
    return axios.get(`http://localhost:8000/api/solicitudes/${id}`);
}

/*
export const createRegistro = (post) => {  
    return new Promise( (resolve, reject) => {  
        const instance = axios.create({  
            baseURL : 'http://localhost:8000/api/solicitudes/',  
            headers: {  
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + getLocalToken()  
            }  
        });  
 
        instance.post('',post)  
        .then(r => {   
            resolve(r.data);  
        }).catch(e => {  
            console.log(e);  
            reject(e.response);  
        });  
    }); 
}; */ 

export const getAllRoles = () => {

    return axios.get('http://localhost:8000/api/solicitudes/rol/');
};
export const getAllTipo = () => {
    return axios.get('http://localhost:8000/api/solicitudes/tipo/');
};

export const getExpediente = (id) => {
    return axios.get(`http://localhost:8000/api/solicitudes/${id}`);
}

export const getAllSedes = () => { 
    return axios.get('http://localhost:8000/api/sedes/');


}


export const login = (login) => {

    return new Promise((resolve, reject) => {  

        const instance = axios.create({  
              
            baseURL: 'http://localhost:8000/api/authentication',  
            // headers es lo necesario para hacer la petición  
            headers: {  
                'Content-Type': 'application/json'  
            },
             
        }); 
        instance.post('login/', login)  
            .then(r => {                  
                localStorage.setItem(tokenName, JSON.stringify(r.data.key)); 
                console.log(r.data)              
                resolve(r.data);  
            }).catch(e => {  
                console.log(e);  
                reject(e.response);  
            }); 

    });


}


/*
export const getAllSedes = () => {  
    return new Promise( (resolve, reject) => {  
        const instance = axios.create({  
            baseURL : 'http://localhost:8000/api/sedes/',  
            headers: {  
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + getLocalToken()  
            }  
        });  
 
        instance.get()  
        .then(r => {   
            resolve(r.data);  
        }).catch(e => {  
            console.log(e);  
            reject(e.response);  
        });  
    }); 
};
*/
export const logOut = () => {  
    return new Promise((resolve, reject) => {  
        const instance = axios.create({  
            baseURL: 'http://127.0.0.1:8000/api/authentication',  
            headers: {  
                'Content-Type': 'application/json'  
            }  
        });  

        instance.post('logout/', {})  
        .then(r => {  
            localStorage.removeItem(tokenName);  
            localStorage.removeItem(userName); 
            resolve(r.data);  
        }).catch(e => {  
            console.log(e);  
            reject(e.response);  
        }); 
    }); 
};


