import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:5000/api/event',
    withCredentials: true, 
    timeout: 5000
});
export const fetch_addEvent = async(data, userId) => {
    try{
        const response = await api.post(`/addevent/${userId}`,data, { 
            headers: {
                'Content-Type': 'application/json'
            }}
        )
        return response.data
    }
    catch(error) {
        console.error('Error adding data:', error.response?.data || error.message);
        throw error;
    }
}