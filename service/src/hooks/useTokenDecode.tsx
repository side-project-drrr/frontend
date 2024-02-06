import { getAuthStorage } from '../repository/AuthRepository';
import { Base64 } from 'js-base64';

const TOKEN_KEY = 'accessToken';

const token = getAuthStorage(TOKEN_KEY);
export function useTokenDecode() {
    if (token) {
        const payload = token.split('.')[1];
        const { id } = JSON.parse(Base64.decode(payload));
        return id;
    } else {
        // Handle the case where token is null (you may return a default value or throw an error)
        throw new Error('Token is null');
    }
}
