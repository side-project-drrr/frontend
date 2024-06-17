import HttpClient from '../apis/HttpClient';


interface IUserTechBlogCategory {
    pageParam: number;
    size: number;
    id?: number;
}

interface ITechBlogCategory {
    pageParam?: number;
    size: number;
}

export async function getTechBlogService({ pageParam = 0, size }: ITechBlogCategory) {
    try {
        const res = await HttpClient.get(`/api/v1/posts/all?page=${pageParam}&size=${size}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function getUserTechBlogService({ pageParam, size, id }: IUserTechBlogCategory) {
    try {
        const res = await HttpClient.get(
            `/api/v1/posts/categories/${id}?page=${pageParam}&size=${size}`,
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function postTechBlogLikeIncreasedService(postId: number) {
    try {
        const res = await HttpClient.post(`/api/v1/posts/${postId}/like`);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function postIncreasedViewsService(postId: string) {
    try {
        const res = await HttpClient.post(`/api/v1/view-post/${postId}`);
        return res;
    } catch (error) {
        console.error(error);
    }
}

export async function postIncreasedMemberViewsService(postId: string) {
    try {
        const res = await HttpClient.post(`/api/v1/members/read-post/${postId}`);
        return res;
    } catch (error) {
        console.error(error);
    }
}

export async function deletePostLikedService(postId: number) {
    try {
        const res = await HttpClient.delete(`/api/v1/posts/${postId}/like`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
