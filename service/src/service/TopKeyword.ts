import HttpClient from '../apis/HttpClient';

export async function getTopkeyword() {
    const res = await HttpClient.get('');
    return res.data;
}
