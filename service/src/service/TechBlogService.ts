import HttpClient from '../apis/HttpClient';

interface ITechBlogCategory {
    page: number;
    size: number;
    sort: string;
    direction: string;
    id?: number;
}

interface IPostLikeProps {
    memberId: number;
    postId: number;
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

export async function postLikeTechBlogService({ memberId, postId }: IPostLikeProps) {
    try {
        const res = await HttpClient.post(`/api/v1/post/like`, {
            memberId: memberId,
            postId: postId,
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
