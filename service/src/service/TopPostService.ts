import HttpClient from '../apis/HttpClient';

export async function getTopPostItemService() {
    const COUNT = 5;
    const TYPE = 'VIEWS';
    try {
        const res = await HttpClient.get(`api/v1/posts/top/${TYPE}/${COUNT}`);

        return res.data;
    } catch (error) {
        console.error(error);
    }
}
