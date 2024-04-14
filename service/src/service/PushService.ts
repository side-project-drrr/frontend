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
    const res = await HttpClient.delete('api/v1/members/me/web-push/subscription');
    const data = res.data;
    return data;
}

export async function subscribeTestService() {
    const date = '2024-04-03';

    const res = await HttpClient.post(`api/v1/members/me/web-push/test?date=${date}`, [1, 2]);
    const data = res.data;
    return data;
}
