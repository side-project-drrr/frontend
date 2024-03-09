import { SigninRequest, SigninResponse } from '../../../types/Auth.type.ts';
import httpClient from '../../../apis/HttpClient.tsx';
import { API_ENDPOINTS } from '../../../constants/api.ts';

const signin = async (request: SigninRequest) => {
    return (await httpClient.post<SigninResponse>(API_ENDPOINTS.SIGNIN, request)).data;
};

export default signin;
