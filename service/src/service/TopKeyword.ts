import HttpClient from '../apis/HttpClient';

export async function getTopkeyword() {
    const res = await HttpClient.get('');
    return res.data;
}

export async function getKeyword() {
    const res = await HttpClient.get('/api/v1/categories');
    return res.data;
}
