import HttpClient from '../apis/HttpClient';

interface ITechBlogCategory {
    page: number;
    size: number;

    id?: number;
}

export async function getTechBlogService({ page, size }: ITechBlogCategory) {
    try {
        const res = await HttpClient.get(`/api/v1/posts/all?page=${page}&size=${size}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getUserTechBlogService({
    page,
    size,

    id,
}: ITechBlogCategory) {
    try {
        const res = await HttpClient.get(
            `/api/v1/posts/categories/${id}?page=${page}&size=${size}`,
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getRecommendTechBlogService() {
    const COUNT = 9;

    try {
        const res = await HttpClient.get(`/api/v1/members/me/post-recommendation/${COUNT}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
