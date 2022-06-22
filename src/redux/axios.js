import axios from 'axios';

const instance = axios.create({
    baseURl: 'http://localhost:5000'
});

export default instance;