import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:5000/api/chat',
    withCredentials: true, 
    timeout: 5000
});
export const fetch_searchChats= async(data, userId) => {
    try{
        const response = await api.post(`/search/${userId}`,data, { 
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