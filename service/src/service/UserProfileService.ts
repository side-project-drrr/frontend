import HttpClient from '../apis/HttpClient';

export async function getUserInforMationService() {
    try {
        const res = await HttpClient.get(`/api/v1/members/me`);
        return res.data;
    } catch (err) {
        console.error(err);
    }
}
