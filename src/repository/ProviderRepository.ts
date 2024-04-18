export function setProvider(value: string) {
    localStorage.setItem('provider', value);
}

export function getProvider(value: string) {
    return localStorage.getItem(value);
}

export function removeProvider() {
    localStorage.removeItem('provider');
}
