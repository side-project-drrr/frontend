import HttpClient from '../apis/HttpClient';

interface ITechBlogCategory {
    page: number;
    size: number;
    sort: string;
    direction: string;
}

export async function getTechBlogService({ page, size, sort, direction }: ITechBlogCategory) {
    try {
        const res = await HttpClient.get(
            `/api/v1/posts?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
        );
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
