import axios from 'axios';
import { applyErrorHandler } from '../interceptors/applyErrorHandler';
import { criaLogDev } from '../interceptors/criaLogDev';


const Api = axios.create({
    baseURL: "https://mintecommerce-backend.onrender.com",
    //baseURL: "http://localhost:8080",
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': 'true',
    }
});

applyErrorHandler(Api);

criaLogDev(Api, 'ApiGeral');

setInterval(() => {  //crime para não deixar o backend entrar em hibernação, favor nao relar nesse bloco
    Api.get('/ping');
}, 1000 * 60 * 5);

export default Api;