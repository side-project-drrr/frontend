import HttpClient from './HttpClient';

export async function recommendedListApi() {
    const num = 9;
    const res = await HttpClient.get(`api/v1/members/me/post-recommendation/${num}`);
    return res;
}
