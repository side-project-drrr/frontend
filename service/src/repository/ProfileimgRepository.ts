export function setProfileImgStorage(value: string) {
    sessionStorage.setItem('imgUrl', value);
}

export function getProfileImgStorage(key: string) {
    return sessionStorage.getItem(key);
}

export function removeProfileImgStorage() {
    sessionStorage.clear();
}
