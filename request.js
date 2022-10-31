import axios from 'axios';
import { SERVER_URL } from './server.js';

export const sendRequest = () => {
    return axios.get(SERVER_URL);
};
