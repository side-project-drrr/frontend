// 배열을 로컬 스토리지에 저장하는 함수
export function saveSearchListStorage(key: string, value: any[]) {
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

export const addSearchTerm = (term: string) => {
    const KEY = 'search';
    let searches = getSearchListStorage(KEY);

    searches = searches.filter((search: string) => search !== term);

    searches.unshift(term);

    if (searches.length > 5) {
        searches = searches.slice(0, 5);
    }
    saveSearchListStorage(KEY, searches);
};
