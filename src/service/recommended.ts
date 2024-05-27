import HttpClient from '../apis/HttpClient';

// 추천 게시글 리스트
export async function recommendedListApi() {
    const num = 9;
    const res = await HttpClient.get(`api/v1/members/me/post-recommendation/${num}`);
    return res;
}
