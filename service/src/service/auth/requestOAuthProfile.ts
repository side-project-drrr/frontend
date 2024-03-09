import { Oauth2ProfileRequest, Oauth2ProfileResponse } from '../../types/Auth.type.ts';
import httpClient from '../../apis/HttpClient.tsx';
import { API_ENDPOINTS } from '../../constants/api.ts';

const requestOAuthProfile = async (request: Oauth2ProfileRequest) => {
    return (
        await httpClient.get<Oauth2ProfileResponse>(API_ENDPOINTS.OAUTH2_PROFILE, {
            params: request,
        })
    ).data;
};

export default requestOAuthProfile;
