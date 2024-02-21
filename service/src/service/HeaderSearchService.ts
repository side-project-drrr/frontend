import HttpClient from '../apis/HttpClient';

interface Props {
    page: number;
    size: number;
    sort: string;
    direction: string;
    searchValue: string;
}

export async function getHeaderKeywordSearch({ page, size, sort, direction, searchValue }: Props) {
    try {
        const res = await HttpClient.get(
            `api/v1/posts/title/keyword-search?page=${page}&size=${size}&sort=${sort}&direction=${direction}&keyword=${searchValue}`,
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
