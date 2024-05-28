import HttpClient from '../apis/HttpClient';

export const alarmReadApi = async (dates: String[]) => {
    const res = await HttpClient.post('/api/v1/members/me/web-push/posts/open', {
        pushDates: dates,
    });

    return res;
};

export const alarmOpenApi = async (date: String) => {
    const res = await HttpClient.post(`/api/v1/members/me/web-push/posts/read?pushDate=${date}`);

    return res;
};

export const getPushDataApi = async (memberId: string) => {
    const num = 7;
    const res = await HttpClient.get(
        `/api/v1/members/me/web-push/posts/count/${num}?memberId=${memberId}`,
    );

    return res;
};

export const getListApi = async (from: String, to: String) => {
    const res = await HttpClient.get(
        `/api/v1/members/me/web-push/posts/date?from=${from}&to=${to}`,
    );

    return res;
};
