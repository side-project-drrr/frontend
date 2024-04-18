// import { http, HttpResponse } from 'msw';

export const handlers = [
    // http.get(`/auth/oauth2/profile`, async ({ request }) => {
    //     const data = { isRegistred: false, providerId: '1241231332112' };
    //     if (request.url) {
    //         return HttpResponse.json(data, { status: 200 });
    //     } else {
    //         throw new Error();
    //     }
    // }),
    //이메일 보내기
    // http.post(`/auth/email`, async ({ request }) => {
    //     const emailData: any = await request.json();
    //     if (emailData.providerId === '1234') {
    //         return HttpResponse.json({ status: 200 });
    //     } else {
    //         throw new Error();
    //     }
    // }),
    // 이메일 인증 번호 검증
    // http.post(`/auth/email/verification`, async ({ request }) => {
    //     const emailData: any = await request.json();
    //     const code = '4567';
    //     if (emailData.verificationCode === code) {
    //         return HttpResponse.json({ isVerified: true });
    //     } else {
    //         return HttpResponse.json({ isVerified: false });
    //     }
    // }),
    // 회원가입
    // http.post(`/auth/signup`, async ({ request }) => {
    //     const users = await request.json();
    //     if (users) {
    //         return HttpResponse.json({
    //             accessToken: '123445686123',
    //             refreshToken: '123448576y7hn7',
    //             status: 200,
    //         });
    //     } else {
    //         throw new Error();
    //     }
    // }),
    // 카테고리 불러오기
    // http.get(`/api/v1/categories`, () => {
    //     return HttpResponse.json(CategoryData);
    // }),
    // // 카테고리 등록
    // http.post(`/category/create`, async ({ request }) => {
    //     const ids = await request.json();
    //     if (ids) {
    //         return HttpResponse.json({ status: 200 });
    //     }
    // }),
    // // 카테고리 등록
    // http.get(`/api/v1/top/categories/6`, async () => {
    //     return HttpResponse.json([
    //         {
    //             id: 0,
    //             categoryName: 'Java',
    //         },
    //         {
    //             id: 1,
    //             categoryName: 'Javascript',
    //         },
    //         {
    //             id: 2,
    //             categoryName: 'Typescript',
    //         },
    //         {
    //             id: 3,
    //             categoryName: 'Spring',
    //         },
    //         {
    //             id: 4,
    //             categoryName: 'React',
    //         },
    //         {
    //             id: 5,
    //             categoryName: 'Ruby',
    //         },
    //     ]);
    // }),
    // 0,
];
