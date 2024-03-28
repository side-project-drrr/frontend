import HttpClient from './HttpClient';

// 추천 게시글 리스트
export async function recommendedListApi() {
    const num = 9;
    const res = await HttpClient.get(`api/v1/members/me/post-recommendation/${num}`);
    return res;
}

// 포스트 읽음 처리
export async function readPostApi(id: number) {
    const res = await HttpClient.post(`api/v1/members/me/read-post/${id}`);
    return res;
}
