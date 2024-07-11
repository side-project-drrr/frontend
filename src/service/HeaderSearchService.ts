import HttpClient from '../apis/HttpClient';
import { HeaderSerch } from '../../types/HeaderSearchService';

export async function getHeaderKeywordSearch({ pageParam, size, searchValue }: HeaderSerch) {
    try {
        const res = await HttpClient.get(
            `api/v1/posts/title/keyword-search?page=${pageParam}&size=${size}&keyword=${searchValue}`,
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
