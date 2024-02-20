import HttpClient from '../apis/HttpClient';

export async function getTopPostItemService() {
    const COUNT = 5;
    const TOP = 'VIEWS';
    try {
        const res = await HttpClient.get(`api/v1/post/top/${COUNT}/${TOP}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
