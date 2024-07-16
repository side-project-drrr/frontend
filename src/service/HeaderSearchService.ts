import HttpClient from '../apis/HttpClient';
import { IHeaderSerchService } from '../../types/header/HeaderSearchService';

export async function getHeaderKeywordSearch({
    pageParam,
    size,
    searchValue,
}: IHeaderSerchService) {
    try {
        const res = await HttpClient.get(
            `api/v1/posts/title/keyword-search?page=${pageParam}&size=${size}&keyword=${searchValue}`,
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
