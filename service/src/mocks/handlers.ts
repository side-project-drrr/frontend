import { http, HttpResponse } from 'msw';

const data = [{ isRegistred: true, providerId: '1241231332112' }];

export const handlers = [
    // 할일 목록
    http.get(`/auth/oauth2/profile`, async ({ request }) => {
        if (request.url) {
            console.log(request);
            return HttpResponse.json(data, { status: 200 });
        } else {
            throw new Error();
        }
    }),
];
