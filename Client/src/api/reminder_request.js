import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:5000/api/reminder',
    withCredentials: true, 
    timeout: 5000
});
export const fetch_addReminder = async(data, userId) => {
    try{
        const response = await api.post(`/addreminder/${userId}`,data, { 
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