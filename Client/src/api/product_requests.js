import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:5000/api/product',
    withCredentials: true, 
    timeout: 5000,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export const fetch_addProduct = async (data) => {
    try{
        const response = await api.post('/addproduct', data)
        return response
    }
    catch(error) {
        console.error('Ошибка добавления продукта:', error.response?.data || error.message);
        throw error;
    }
};