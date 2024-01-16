import HttpClient from '../apis/HttpClient';

export async function getCategoryItem() {
    const res = await HttpClient.get('/api/v1/categories');
    return res.data;
}
