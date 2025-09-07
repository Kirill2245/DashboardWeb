import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:5000/api/invoice',
    withCredentials: true, 
    timeout: 5000
});

export const fetch_updateInvoice = async (data,idInvoice) => {
    try{
        const response = await api.patch(`/updateInvoice/${idInvoice}`, data, { 
            headers: {
                'Content-Type': 'application/json'
            }}
        )
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

export const fetch_addInvoice = async(data, IdUser) =>{
    try{
        const response = await api.post(`/addinvoice/${IdUser}`,data, { 
            headers: {
                'Content-Type': 'multipart/form-data'
            }}
        )
        return response
    }
    catch(error){
        console.error('Error create Invoice', error);
        throw error
    }
}

export const fetch_searchInvoice = async(IdUser, idNameInvoice) => {
    try{
        const response = await api.get(`/searchinvoice/${idNameInvoice}/${IdUser}`)
        return response
    }
    catch(error){
        console.error('Error search invoice', error);
        throw error;
    }
}