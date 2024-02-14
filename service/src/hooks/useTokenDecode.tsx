import { Base64 } from 'js-base64';

export function useTokenDecode(token: string | null) {
    if (token !== null) {
        const payload = token.split('.')[1];
        const { id } = JSON.parse(Base64.decode(payload));
        return id;
    }
}
