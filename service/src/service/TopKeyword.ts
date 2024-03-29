import HttpClient from '../apis/HttpClient';

export async function getTopkeyword() {
    const COUNT = 6;
    const res = await HttpClient.get(`/api/v1/top/categories/${COUNT}`);
    return res.data;
}
