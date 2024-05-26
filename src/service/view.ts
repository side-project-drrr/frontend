import HttpClient from '../apis/HttpClient';

// 포스트 호출
export async function getPostApi(postId: string) {
    const res = await HttpClient.get(`/api/v1/posts/${postId}`);
    return res;
}

// 포스트 읽음 처리
export async function readPostApi(postId: string) {
    const res = await HttpClient.get(`/api/v1/members/me/past/read-post/${postId}`);

    if (!res.data.isRead) {
        HttpClient.post(`/api/v1/members/me/read-post/${postId}`);
    }
}
