import axios from 'axios';
import HttpClient from '../apis/HttpClient';

const BASE_URL = import.meta.env.VITE_APP_BACK_END_LOCAL;
const token = import.meta.env.VITE_APP_TOKEN;

export async function subscribePush(subscription: any) {
    const jsonString = subscription.toJSON();
    const res = HttpClient.post('/api/v1/subscription', {
        endpoint: `${jsonString.endpoint}`,
        expirationTime: `${jsonString.expirationTime}`,
        p256dh: `${jsonString.keys.p256dh}`,
        auth: `${jsonString.keys.auth}`,
    });
    const data = (await res).data;
    return data;
}

export async function deleteSubscribePush() {
    const res = axios.delete(`${BASE_URL}/api/v1/subscription`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const data = (await res).data;
    return data;
}
