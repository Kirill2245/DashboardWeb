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

export const fetch_user = async (userId) => {
    try{
        const response = await api.get(`/userall/${userId}`)
        return response.data
    }
    catch(error) {
        console.error('Ошибка получения данных:', error.response?.data || error.message);
        throw error;
    }
};

export const fetch_productUser = async (userId) => {
    try{
        const response = await api.get(`/getproduct/${userId}`)
        return response.data
    }
    catch(error) {
        console.error('Ошибка получения данных:', error.response?.data || error.message);
        throw error;
    }
};

export const fetch_invoiceUser = async (userId) => {
    try{
        const response = await api.get(`/getinvoice/${userId}`)
        return response.data
    }
    catch(error) {
        console.error('Ошибка получения данных:', error.response?.data || error.message);
        throw error;
    }
}

export const fetch_recentOrders = async(userId) => {
    try{
        const response = await api.get(`/recentorders/${userId}`)
        return response.data
    }
    catch(error) {
        console.error('Error receiving data:', error.response?.data || error.message);
        throw error;
    }
}