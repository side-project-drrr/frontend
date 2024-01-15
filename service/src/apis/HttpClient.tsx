import axios from 'axios';

//const INITIAL_TOKEN = 'accessToken';
//const getToken = localStorage.getItem(INITIAL_TOKEN);

const baseURL = import.meta.env.VITE_HTTP_API_URL;

const HttpClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
HttpClient.interceptors.request.use(
    async config => {
        // const token = getToken;
        // if (token !== null) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    async error => {
        console.error('에러발생', error);
        return Promise.reject(error);
    },
);

HttpClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default HttpClient;
