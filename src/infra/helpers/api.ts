import axios from 'axios';
import { applyErrorHandler } from '../interceptors/applyErrorHandler';
import { criaLogDev } from '../interceptors/criaLogDev';


const Api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': 'true',
    }
});

applyErrorHandler(Api);

criaLogDev(Api, 'ApiGeral');

export default Api;



