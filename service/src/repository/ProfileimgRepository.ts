export function setProfileImgStorage(value: string) {
    localStorage.setItem('imgUrl', value);
}

export function getProfileImgStorage(key: string) {
    return localStorage.getItem(key);
}

export function removeProfileImgStorage() {
    localStorage.clear();
}
