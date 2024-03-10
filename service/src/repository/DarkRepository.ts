export function setDarkModeSotrage(value: string) {
    localStorage.setItem('theme', value);
}

export function getDarkModeStorage(value: string) {
    return localStorage.getItem(value);
}

export function removeDarkModeStorage() {
    localStorage.removeItem('theme');
}
