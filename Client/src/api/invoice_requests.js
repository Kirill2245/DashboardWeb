import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:5000/api/invoice',
    withCredentials: true, 
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const fetch_updateInvoice = async (data) => {
    try{
        const response = await api.post('/updateInvoice', data)
        return response
    }
    catch(error) {
        console.error('Ошибка обновления invoice:', error.response?.data || error.message);
        throw error;
    }
};
