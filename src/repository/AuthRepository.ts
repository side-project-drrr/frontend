export function getAuthStorage(key: string) {
    return localStorage.getItem(key);
}

export function setAccessTokenStorage(accessToken_key: 'accessToken', accessTokenValue: string) {
    localStorage.setItem(accessToken_key, accessTokenValue);
}

export function setRefreshTokenStorage(refreshToken_key: 'refreshToken', refreshValue: string) {
    localStorage.setItem(refreshToken_key, refreshValue);
}

export function removeAuthStorage(key: string | null) {
    if (key !== null) {
        localStorage.removeItem(key);
    }
}
