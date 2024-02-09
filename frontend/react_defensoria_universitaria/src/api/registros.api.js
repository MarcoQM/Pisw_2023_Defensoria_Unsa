import axios from 'axios'

const host = 'http://127.0.0.1:8000';
//const host = 'http://vps-3870710-x.dattaweb.com:8000';
//const host = 'http://vps-3870710-x.dattaweb.com:8000';
const tokenName = 'user_uaeh_token';
const userName = 'user_name';



// eslint-disable-next-line no-unused-vars
const getLocalToken = () => {
    return JSON.parse(localStorage.getItem(tokenName));
};

export const getAllSolicitudes = () => {
    return axios.get(`${host}/api/solicitudes/`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getLocalToken()
        }
    });
}

export const getAllUsuarios = () => {
    return axios.get((`${host}/api/usuarios/`), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getLocalToken()
        }
    });
}

export const getDetalleUsuario = (id) => {
    return axios.get((`${host}/api/usuarios/${id}`), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getLocalToken()
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
    return axios.post(`${host}/api/solicitudes/`, formData, {
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

    return axios.get(`${host}/api/solicitudes/rol/`);
};
export const getAllTipo = () => {
    return axios.get(`${host}/api/solicitudes/tipo/`);
};

export const getSolicitud = (id) => {
    return axios.get(`${host}/api/solicitudes/${id}`);
};

export const getExpediente = (formData) => {
    return axios.post(`${host}/api/solicitudes/expediente/`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );
}

export const deleteSolicitud = (id) => {
    return axios.delete(`http://localhost:8000/api/solicitudes/${id}`);
};
export const updateSolicitud = (id, solicitudes) => {
    return axios.put(`${host}/api/solicitudes/${id}`, solicitudes, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + getLocalToken()
            
        },
    }


    );

}
/*export const updateSolicitud=(id, solicitudes)=>{
    return axios.put(`http://localhost:8000/api/solicitudes/${id}`,solicitudes);

};*/
/*export const getExpediente = (id, dni = false) => {
    // Utiliza un operador ternario para construir la URL en función de si se proporciona un DNI o un ID
    const apiUrl = dni
        ? `http://localhost:8000/api/solicitudes/?dni=${id}`
        : `http://localhost:8000/api/solicitudes/${dni}`;

    return axios.get(apiUrl);
};*/
export const getDni = (dni) => {
    return axios.get(`${host}/api/solicitudes/${dni}`);
};


export const getAllSedes = () => {
    return axios.get(`${host}/api/sedes/`);
}

// obtener tipo de solicitud por id
export const getTipoById = (id) => {
    return axios.get(`${host}/api/solicitudes/tipo/${id}`);
}

export const getAllUsers = () => {
    return axios.get(`${host}/api/usuarios/`);
}



export const getAllEstados = () => {
    return axios.get(`${host}/api/solicitudes/estados/`, {
        headers: {
            'Authorization': `Token ${getLocalToken()}`
        }
    });
}
export const getProcesosById = (id) => {
    return axios.get(`${host}/api/procesos/solicitud/${id}`, {
        headers: {
            'Authorization': `Token ${getLocalToken()}`
        }
    });
}

export const createProceso = (proceso) => {
    return axios.post(`${host}/api/procesos/`, proceso, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Token ${getLocalToken()}`,
        }
    });
}

export const getDataGraficoCircular = () => {
    return axios.get(`${host}/api/resumen_ts/gCircular`);
}

export const getDataGraficoLineas = () => {
    return axios.get(`${host}/api/resumen_ts/gFechas`);
}

export const getDataGraficoBarras = () => {
    return axios.get(`${host}/api/resumen_ts/gBarras`);
}

export const getDataResumenTarjetas = () => {
    return axios.get(`${host}/api/resumen_ts/resumen`);
}

export const getDataResumenReporte = () => {
    return axios.get(`${host}/api/resumen_ts/resumenReporte`);
}

export const login = (login) => {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: `${host}/api/authentication`,
            // headers es lo necesario para hacer la petición  
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
            baseURL: `${host}/api/authentication`,
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


export const enviarEmailConfirmacion = async (email) => {
    // eslint-disable-next-line no-useless-catch
    try {
        // Realizar la solicitud GET para obtener el token CSRF de Django
        const response = await axios.get(`${host}/api/obtenerToken/`);
        // Extraer el token CSRF de la respuesta
        const csrfToken = response.data.csrf_token;
        //console.log(csrfToken)
        // Configurar los encabezados de la solicitud
        const headers = {
            'Content-Type': 'application/json',
        };
        // Configurar las cookies de la solicitud
        document.cookie = `csrftoken=${csrfToken};`;
        axios.defaults.withCredentials = true;
        const hostname = window.location.hostname;
        let port = window.location.port;
        const protocol = window.location.protocol;
        if(port == ''){
            port = 0;
        }
        // Realizar la solicitud POST a la API de confirmación de correo electrónico
        //console.log(`${host}/api/emailConfirmacion/${protocol}/${hostname}/${port}/`);
        const responseEmail = await axios.post(`${host}/api/emailConfirmacion/${protocol}/${hostname}/${port}/`, { email }, { headers });
        // Verificar si la respuesta contiene el mensaje
        if (responseEmail.data && responseEmail.data.Mensaje) {
            return responseEmail.data.Mensaje;
        } else {
            throw responseEmail.data.Error;
        }
    } catch (error) {
        throw error; // Propaga el error para ser manejado por el componente
    }
};
export const restablecerContrasenia = async (uid,token,contrasenia) => {
    // eslint-disable-next-line no-useless-catch
    try {
        // Realizar la solicitud GET para obtener el token CSRF de Django
        const response = await axios.get(`${host}/api/obtenerToken/`);
        const v_contrasenia = contrasenia;
        // Extraer el token CSRF de la respuesta
        const csrfToken = response.data.csrf_token;
        console.log(csrfToken)
        // Configurar los encabezados de la solicitud
        const headers = {
            'Content-Type': 'application/json',
        };
        // Configurar las cookies de la solicitud
        document.cookie = `csrftoken=${csrfToken};`;
        axios.defaults.withCredentials = true;
        // Realizar la solicitud POST a la API de confirmación de correo electrónico
        const responseEmail = await axios.post(`${host}/api/restablecer/${uid}/${token}/`, { contrasenia,v_contrasenia }, { headers });
        // Verificar si la respuesta contiene el mensaje
        if (responseEmail.data && responseEmail.data.message) {
            return responseEmail.data.message;
        } else {
            return 'Esperando';
        }
    } catch (error) {
        throw error; // Propaga el error para ser manejado por el componente
    }
};