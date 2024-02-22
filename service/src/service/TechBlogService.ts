import HttpClient from '../apis/HttpClient';

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
            `/api/v1/posts/all?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
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
            `/api/v1/posts/categories/${id}?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
