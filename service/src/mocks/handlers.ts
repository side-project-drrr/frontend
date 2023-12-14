import { http, HttpResponse } from 'msw';

import { CategoryData } from './CategoryData';

export const handlers = [
    // 할일 목록
    http.get(`/auth/oauth2/profile`, async ({ request }) => {
        const data = { isRegistred: false, providerId: '1241231332112' };

        if (request.url) {
            return HttpResponse.json(data, { status: 200 });
        } else {
            throw new Error();
        }
    }),
    //이메일 보내기
    http.post(`/auth/email`, async ({ request }) => {
        const emailData: any = await request.json();
        if (emailData.providerId === '1234') {
            return HttpResponse.json({ status: 200 });
        } else {
            throw new Error();
        }
    }),

    // 이메일 인증 번호 검증
    http.post(`/auth/email/verification`, async ({ request }) => {
        const emailData: any = await request.json();
        const code = '4567';
        if (emailData.verificationCode === code) {
            return HttpResponse.json({ isVerified: true });
        } else {
            return HttpResponse.json({ isVerified: false });
        }
    }),

    // 회원가입
    http.post(`/auth/signup`, async ({ request }) => {
        const users = await request.json();
        if (users) {
            return HttpResponse.json({
                accessToken: '123445686123',
                refreshToken: '123448576y7hn7',
                status: 200,
            });
        } else {
            throw new Error();
        }
    }),
    // 카테고리 불러오기
    http.get(`/categoryList`, () => {
        return HttpResponse.json(CategoryData);
    }),
    // 카테고리 등록
    http.post(`/category/create`, async ({ request }) => {
        const ids = await request.json();
        if (ids) {
            return HttpResponse.json({ status: 200 });
        }
    }),
];
