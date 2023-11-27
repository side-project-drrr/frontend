import axios from 'axios';

export const SocialServcie = (code: string | null, state: string) => {
    console.log(code, state);
    try {
        const res = axios
            .get(`/auth/oauth2/profile?code=${code}&state=${state}`)
            .then(res => res.data);
        return res;
    } catch (error) {
        console.error(error);
    }
};
