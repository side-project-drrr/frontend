import HttpClient from '../apis/HttpClient';

interface Props {
    page: number;
    size: number;
    searchValue: string;
}

export async function getHeaderKeywordSearch({ page, size, searchValue }: Props) {
    try {
        const res = await HttpClient.get(
            `api/v1/posts/title/keyword-search?page=${page}&size=${size}&keyword=${searchValue}`,
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
