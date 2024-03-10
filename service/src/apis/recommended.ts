import HttpClient from './HttpClient';

// 추천 게시글 리스트
export async function recommendedListApi() {
    const res = await HttpClient.get(`api/v1/members/me/post-recommendation/9`);
    return res;
}

// 포스트 읽음 처리
export async function readPostApi(id: number) {
    const res = await HttpClient.get(`api/v1/members/read-post/${id}`);
    return res;
}
