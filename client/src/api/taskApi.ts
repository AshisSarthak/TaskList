import axios from 'axios';

// endpoint root
const root = "http://localhost:3001";
export default class TaskAPI {
    static get() {
        return axios.get(`${root}/api/todos`);
    }
    static add(task: any) {
        return axios.post(`${root}/api/add-todo`, task);
    }
}