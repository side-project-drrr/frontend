import type { OAuth2ProviderType } from '../types/Auth.type.ts';

const GITHUB_CLIENT_ID = import.meta.env.VITE_APP_GITGUB_CLIENT_ID; //REST API KEY
const GITHUB_REDIRECT_URL = import.meta.env.VITE_APP_GITHUB_REDIRECT_URL; //REDIRECT_URL
const KAKAO_REST_API_KEY = import.meta.env.VITE_APP_KAKAO_REST_API_KEY; //REST API KEY
const KAKAO_REDIRECT_URL = import.meta.env.VITE_APP_KAKAO_REDIRECT_URL; //현 프로젝트에서는 백엔드에서 REDIRECT_URL 처리
export function setProvider(value: string) {
    localStorage.setItem('provider', value);
}

export function getProvider(value: string) {
    return localStorage.getItem(value);
}

export function removeProvider() {
    localStorage.removeItem('provider');
}

export const getUrlByProvider = (provider: OAuth2ProviderType) => {
    if (provider === 'GITHUB') {
        return `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_url=${GITHUB_REDIRECT_URL}`;
    }
    if (provider === 'KAKAO') {
        return `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
    }

    throw new Error('존재하지 않는 provider');
};
