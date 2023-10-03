import axios from 'axios'

export const getAllRegistros=() => {
    return axios.get('http://localhost:8000/registros/api/v1/registros/')
}