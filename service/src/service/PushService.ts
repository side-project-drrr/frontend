import axios from 'axios';
import HttpClient from '../apis/HttpClient';

export async function subscribePush(subscription: any) {
    const jsonString = subscription.toJSON();
    const res = await HttpClient.post('api/v1/members/me/web-push/subscription', {
        endpoint: `${jsonString.endpoint}`,
        expirationTime: `${jsonString.expirationTime}`,
        p256dh: `${jsonString.keys.p256dh}`,
        auth: `${jsonString.keys.auth}`,
    });
    const data = res.data;
    return data;
}

export async function unSubscribePush() {
    const res = await axios.delete('api/v1/members/me/web-push/subscription');
    const data = res.data;
    return data;
}
