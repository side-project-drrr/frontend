import { http, HttpResponse } from 'msw';

const user = [];

export const handlers = [
    // 할일 목록
    http.get('/signup', async ({ request }) => {
        const newUser = await request.json();
        user.push(newUser);
        return HttpResponse.json(newUser, { status: 200 });
    }),
];
