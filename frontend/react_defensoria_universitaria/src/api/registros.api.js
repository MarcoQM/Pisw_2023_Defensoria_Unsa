import axios from 'axios'


const tokenName = 'user_uaeh_token';
const userName = 'user_name';



// eslint-disable-next-line no-unused-vars
const getLocalToken = () => {
    return JSON.parse(localStorage.getItem(tokenName));
};


export const getAllSolicitudes = () => {
    return axios.get('http://localhost:8000/api/solicitudes/', {
        headers: {
            'Authorization': 'Token '+getLocalToken()
        }
    });
}


// export const getAllSolicitudes = () => {  
//     return new Promise( (resolve, reject) => {  
//         const instance = axios.create({  
//             baseURL : 'http://localhost:8000/api/solicitudes/',  
//             headers: {  
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Token '+getLocalToken() 
//            }  
//         });   
//         instance.get()  
//         .then(r => {   
//             resolve(r.data);  
//         }).catch(e => {  
//             console.log(e);  
//             reject(e.response)
//         });  
//     }); 
// };

export const createIncidencia = (formData) => {
    return axios.post('http://localhost:8000/api/solicitudes/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }


    );


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
};
/*export const getExpediente = (id, dni = false) => {
    // Utiliza un operador ternario para construir la URL en función de si se proporciona un DNI o un ID
    const apiUrl = dni
        ? `http://localhost:8000/api/solicitudes/?dni=${id}`
        : `http://localhost:8000/api/solicitudes/${dni}`;

    return axios.get(apiUrl);
};*/
export const getDni = (dni) => {
    return axios.get(`http://localhost:8000/api/solicitudes/${dni}`);
};


export const getAllSedes = () => {
    return axios.get('http://localhost:8000/api/sedes/');
}

// obtener tipo de solicitud por id
export const getTipoById = (id) => {
    return axios.get(`http://localhost:8000/api/solicitudes/tipo/${id}`);
}

export const getAllUsers = () => {
    return axios.get('http://localhost:8000/api/usuarios/');
}

export const getAllEstados = () => {
    return axios.get('http://127.0.0.1:8000/api/solicitudes/estados/');
}


export const login = (login) => {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: 'http://localhost:8000/api/authentication',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        instance.post('login/', login)
            .then(r => {
                // Guardar el token en localStorage
                localStorage.setItem(tokenName, JSON.stringify(r.data.key));

                // Obtener las cookies de la respuesta
                const cookies = r.headers['set-cookie'];
                if (cookies) {
                    // Iterar sobre las cookies y guardar las que necesitas
                    cookies.forEach(cookie => {
                        if (cookie.includes('csrftoken') || cookie.includes('sessionid')) {
                            document.cookie = cookie;
                            
                        }
                    });
                }
                console.log(r.data);
                resolve(r.data);
            })
            .catch(e => {
                console.log(e);
                reject(e.response);
            });
    });
};

/*

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


