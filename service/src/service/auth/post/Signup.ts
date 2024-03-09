import httpClient from '../../../apis/HttpClient.tsx';
import { API_ENDPOINTS } from '../../../constants/api.ts';

const signup = () => {
    httpClient.post(API_ENDPOINTS.SIGNUP);
};

export default signup;
