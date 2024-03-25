import axios from 'axios';

const BASE_URL = import.meta.env.VITE_APP_BACK_END_LOCAL;
const token = import.meta.env.VITE_APP_TOKEN;

export async function subscribePush(subscription: any) {
    const jsonString = subscription.toJSON();
    const res = axios.post(
        `${BASE_URL}/api/v1/members/me/web-push/subscription`,
        {
            endpoint: `${jsonString.endpoint}`,
            expirationTime: `${jsonString.expirationTime}`,
            p256dh: `${jsonString.keys.p256dh}`,
            auth: `${jsonString.keys.auth}`,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    );
    const data = (await res).data;
    return data;
}

export async function unSubscribePush() {
    const res = axios.delete(`${BASE_URL}/api/v1/members/me/web-push/subscription`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    const data = (await res).data;
    return data;
}
