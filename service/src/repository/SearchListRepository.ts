// 배열을 로컬 스토리지에 저장하는 함수
export function saveSearchListStorage(key: string, value: any[]) {
    console.log(value);
    localStorage.setItem(key, JSON.stringify(value));
}

// 로컬 스토리지에서 배열을 가져오는 함수
export function getSearchListStorage(key: string) {
    const arrayString = localStorage.getItem(key);
    if (arrayString !== null) {
        return JSON.parse(arrayString);
    } else {
        return [];
    }
}

export function removeSearchListStorage(key: string) {
    localStorage.removeItem(key);
}
