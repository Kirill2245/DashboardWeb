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
        const response = await api.patch('/updateInvoice', data)
        return response
    }
    catch(error) {
        console.error('Error update status invoice:', error.response?.data || error.message);
        throw error;
    }
};

export const fetch_deleteInvoice = async (idInvoice) => {
    try {
        const response = await api.delete(`/deleteinvoice/${idInvoice}`);
        return response;
    } catch(error) {
        console.error('Error delete invoice:', error);
        throw error;
    }
}

export const fetch_electInvoice = async (idInvoice) => {
    try {
        const response = await api.patch(`/electInvoice/${idInvoice}`);
        return response;
    } catch(error) {
        console.error('Error delete invoice:', error);
        throw error;
    }
}