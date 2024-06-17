import HttpClient from '../apis/HttpClient';

interface Props {
    pageParam: number;
    size: number;
    searchValue: string;
}

export async function getHeaderKeywordSearch({ pageParam, size, searchValue }: Props) {
    try {
        const res = await HttpClient.get(
            `api/v1/posts/title/keyword-search?page=${pageParam}&size=${size}&keyword=${searchValue}`,
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
