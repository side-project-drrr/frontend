import { http, HttpResponse } from 'msw';

export const handlers = [
    // 할일 목록
    http.get('/posts', () => {
        // Response resolver allows you to react to captured requests,
        // respond with mock responses or passthrough requests entirely.
        // For now, let's just print a message to the console.
        return HttpResponse.json({ id: 1 });
    }),
];
