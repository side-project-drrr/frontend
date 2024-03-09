export function getAuthStorage(key: string) {
    return localStorage.getItem(key);
}

export function getAccessToken() {
    return localStorage.getItem('access_token');
}

export function setAuthStorage(
    accessToken_key: string,
    accessTokenValue: string,
    refreshToken_key: string,
    refreshValue: string,
) {
    localStorage.setItem(accessToken_key, accessTokenValue);
    localStorage.setItem(refreshToken_key, refreshValue);
}

export function removeAuthStorage(key: string | null) {
    if (key !== null) {
        localStorage.removeItem(key);
    }
}
