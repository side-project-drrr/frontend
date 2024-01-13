export function setDarkModeState(value: string) {
    console.log(value);
    localStorage.setItem('theme', value);
}

export function getDarkModeState(value: string) {
    return localStorage.getItem(value);
}

export function removeDarkModeState() {
    localStorage.removeItem('theme');
}
