import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:5000/api/users',
    withCredentials: true, 
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const fetch_login = async (data) => {
    try {
        const response = await api.post('/login', data); 
        return response.data;
    } catch(error) {
        console.error('Ошибка при авторизации:', error.response?.data || error.message);
        throw error;
    }
};

export const fetch_signUp = async (data) => {
    try{
        const response = await api.post('/signup', data)
        return response.data
    }
    catch(error) {
        console.error('Ошибка при авторизации:', error.response?.data || error.message);
        throw error;
    }
};

export const fetch_user = async (data) => {
    try{
        const response = await api.post('/userall', data)
        return response.data
    }
    catch(error) {
        console.error('Ошибка получения данных:', error.response?.data || error.message);
        throw error;
    }
};

export const fetch_productUser = async (data) => {
    try{
        const response = await api.post('/getproduct', data)
        return response.data
    }
    catch(error) {
        console.error('Ошибка получения данных:', error.response?.data || error.message);
        throw error;
    }
};

export const fetch_invoiceUser = async (data) => {
    try{
        const response = await api.post('/getinvoice', data)
        return response.data
    }
    catch(error) {
        console.error('Ошибка получения данных:', error.response?.data || error.message);
        throw error;
    }
}