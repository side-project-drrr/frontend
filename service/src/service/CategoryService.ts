import HttpClient from '../apis/HttpClient';

export async function getCategoryItem() {
    try {
        const res = await HttpClient.get('/api/v1/categories');
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
