import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:5000/api/task',
    withCredentials: true, 
    timeout: 5000
});

export const fetch_addTask = async(data, IdUser) =>{
    try{
        const response = await api.post(`/addtask/${IdUser}`,data, { 
            headers: {
                'Content-Type': 'multipart/form-data'
            }}
        )
        return response.data
    }
    catch(error){
        console.error('Error create Task', error);
        throw error
    }
}
export const fetch_updateStatusTask = async(data, taskId) =>{
    try{
        const response = await api.patch(`/updatestatus/${taskId}`, data, { 
            headers: {
                'Content-Type': 'application/json'
            }}
        )
        return response.data
    }
    catch(error){
        console.error('Error create Task', error);
        throw error
    }
}
export const fetch_deleteTask = async(taskId) => {
    try{
        const response = await api.delete(`/deletetask/${taskId}`)
        return response.data
    }
    catch(error){
        console.error('Error create Task', error);
        throw error
    }
}