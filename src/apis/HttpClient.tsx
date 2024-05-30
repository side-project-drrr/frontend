import axios from 'axios';
import { reissuanceTokenService } from '../service/auth/SocialService';
import {
    getAuthStorage,
    removeAuthStorage,
    setAccessTokenStorage,
} from '../repository/AuthRepository';
let baseURL = import.meta.env.VITE_APP_API_URL_DEV;

if (process.env.NODE_ENV === 'production') {
    baseURL = import.meta.env.VITE_APP_API_URL_PROD;
}

const HttpClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
HttpClient.interceptors.request.use(
    async config => {
        const INITIAL_TOKEN = 'accessToken';
        const INITIAL_REFRESH_TOKEN = 'refreshToken';
        const getToken = getAuthStorage(INITIAL_TOKEN);
        const getTokenfresh = getAuthStorage(INITIAL_REFRESH_TOKEN);
        const token = getToken;

        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers['Refresh-Token'] = `Bearer ${getTokenfresh}`;
        }
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

    async error => {
        const {
            config,
            response: { status, data },
        } = error;
        const INITIAL_TOKEN = 'accessToken';
        const REFRESHTOKEN_TOKEN = 'refreshToken';
        const accessToken = getAuthStorage(INITIAL_TOKEN);
        const refreshToken = getAuthStorage(REFRESHTOKEN_TOKEN);
        const IMG_URL = 'imgUrl';
        const PROVIDER = 'provider';
        //토큰이 만료되을 때
        if (status === 401 && data.code === 6501) {
            if (data.message === 'Access Token 재발급이 필요합니다.') {
                const originRequest = config;

                if (!!accessToken && !!refreshToken) {
                    const newAccessToken = await reissuanceTokenService(accessToken, refreshToken);
                    //리프레시 토큰 요청이 성공할 때
                    if (newAccessToken) {
                        setAccessTokenStorage(INITIAL_TOKEN, newAccessToken.accessToken);
                        //진행중이던 요청 이어서하기
                        axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                        axios.defaults.headers.common['Refresh-Token'] = `Bearer ${refreshToken}`;
                        originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        originRequest.headers['Refresh-Token'] = `Bearer ${refreshToken}`;
                        return HttpClient(error.config);
                        //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
                    } else if (newAccessToken.status === 404) {
                        alert('다시 로그인 해주세요.');
                        window.location.replace('/');
                    }
                }
            }
        } else if (status === 401 && data.code === 6502) {
            removeAuthStorage(INITIAL_TOKEN);
            removeAuthStorage(REFRESHTOKEN_TOKEN);
            removeAuthStorage(IMG_URL);
            removeAuthStorage(PROVIDER);
            window.location.replace('/');
        } else if (status === 429) {
            window.location.replace('/error');
        }
    },
);

export default HttpClient;
