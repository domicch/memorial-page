import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dad-page-default-rtdb.firebaseio.com/'
});

export default instance;