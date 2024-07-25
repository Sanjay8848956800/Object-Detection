import axios from 'axios';
import { api } from '../Constants/Api';

const userInstance = axios.create({
    baseURL: api // Make sure to use `baseURL` instead of `baseUrl`
});

export default userInstance;
