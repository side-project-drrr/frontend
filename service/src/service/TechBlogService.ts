import HttpClient from '../apis/HttpClient';
import { getAuthStorage } from '../repository/AuthRepository';

interface ITechBlogCategory {
    page: number;
    size: number;
    sort: string;
    direction: string;
    id?: number;
}

export async function getTechBlogService({ page, size, sort, direction }: ITechBlogCategory) {
    try {
        const res = await HttpClient.get(
            `/api/v1/posts?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getUserTechBlogService({
    page,
    size,
    sort,
    direction,
    id,
}: ITechBlogCategory) {
    try {
        const res = await HttpClient.get(
            `/api/v1/posts/category/${id}?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getRecommendTechBlogService(memberId: string) {
    try {
        const TOKEN_KEY = 'accessToken';
        const token = getAuthStorage(TOKEN_KEY);
        console.log(token);

        const res = await HttpClient.get(`/api/v1/recommendation/posts?${memberId}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}