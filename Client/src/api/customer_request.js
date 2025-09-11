import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:5000/api/customer',
    withCredentials: true, 
    timeout: 5000
});
export const fetch_addCustomer = async(data, userId) => {
    try{
        const response = await api.post(`/addcustomer/${userId}`,data, { 
            headers: {
                'Content-Type': 'multipart/form-data'
            }}
        )
        return response.data
    }
    catch(error) {
        console.error('Error adding data:', error.response?.data || error.message);
        throw error;
    }
}