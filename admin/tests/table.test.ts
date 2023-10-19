import { describe, expect, it } from 'vitest';
import { users } from '@monorepo/component/src/stories/table/data';
describe('블로그 작성자 혹은 제목으로 검색', () => {
    it('블로그 작성자로 검색했을때', () => {
        const searchFilteredList = users.filter(user => user.Writer?.includes('블로그 작성자'));
        expect(searchFilteredList).toStrictEqual([
            {
                id: 1,
                author: 'Tony Reichert',
                thumbnailUrl: 'CEO',
                title: 'Management',
                summary: 'active',
                urlSuffix: '29',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: 'tony.reichert@example.com',
                crawledDate: '2023-10-13',
                registrationCompleted: 'tony.reichert@example.com',
                displayName: 'tony.reichert@example.com',
                uniqueName: 'tony.reichert@example.com',
                Writer: '블로그 작성자',
                Stack: '네이버',
            },
            {
                id: 2,
                author: 'Park',
                thumbnailUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                title: 'title',
                summary: '이건 기술 블로그다.',
                urlSuffix: 'url',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: '1',
                crawledDate: '2023-10-15',
                registrationCompleted: false,
                displayName: '하이',
                uniqueName: '하이',
                Writer: '블로그 작성자',
                Stack: '네이버',
            },
            {
                id: 3,
                author: 'Tony Reichert',
                thumbnailUrl: 'CEO',
                title: 'Management',
                summary: 'active',
                urlSuffix: '29',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: 'tony.reichert@example.com',
                crawledDate: '2023-10-16',
                registrationCompleted: 'tony.reichert@example.com',
                displayName: 'tony.reichert@example.com',
                uniqueName: 'tony.reichert@example.com',
                Writer: '블로그 작성자',
                Stack: '네이버',
            },
            {
                id: 4,
                author: 'Park',
                thumbnailUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                title: 'title',
                summary: '이건 기술 블로그다.',
                urlSuffix: 'url',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: '1',
                crawledDate: '2023-10-17',
                registrationCompleted: false,
                displayName: '하이',
                uniqueName: '하이',
                Writer: '블로그 작성자',
                Stack: '배달의 민족',
            },
        ]);
    });
    it('제목으로 검색했을 때', () => {
        const titleFilteredList = users.filter(user => user.Writer?.includes('제목'));
        expect(titleFilteredList).toStrictEqual([
            {
                id: 5,
                author: 'Park',
                thumbnailUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                title: 'title',
                summary: '이건 기술 블로그다.',
                urlSuffix: 'url',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: '1',
                crawledDate: '2023-10-17',
                registrationCompleted: false,
                displayName: '하이',
                uniqueName: '하이',
                Writer: '제목',
                Stack: '카카오',
            },

            {
                id: 6,
                author: 'Park',
                thumbnailUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                title: 'title',
                summary: '이건 기술 블로그다.',
                urlSuffix: 'url',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: '1',
                crawledDate: '2023-10-17',
                registrationCompleted: false,
                displayName: '하이',
                Writer: '제목',
                uniqueName: '하이',
            },
            {
                id: 7,
                author: 'Tony Reichert',
                thumbnailUrl: 'CEO',
                title: 'Management',
                summary: 'active',
                urlSuffix: '29',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: 'tony.reichert@example.com',
                crawledDate: '2023-10-16',
                registrationCompleted: 'tony.reichert@example.com',
                displayName: 'tony.reichert@example.com',
                uniqueName: 'tony.reichert@example.com',
                Writer: '제목',
            },
            {
                id: 8,
                author: 'Tony Reichert',
                thumbnailUrl: 'CEO',
                title: 'Management',
                summary: 'active',
                urlSuffix: '29',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: 'tony.reichert@example.com',
                crawledDate: '2023-10-17',
                registrationCompleted: 'tony.reichert@example.com',
                displayName: 'tony.reichert@example.com',
                uniqueName: 'tony.reichert@example.com',
                Writer: '제목',
            },
        ]);
    });
    it('전체로 검색했을 때', () => {
        const totalFilteredList = users.filter(user => user.Writer?.toLowerCase().includes(''));
        expect(totalFilteredList).toStrictEqual(users);
    });
});

describe('기술 블로그 그룹으로 검색했을 때', () => {
    const Stack = ['', '네이버', '카카오', '배달의 민족', 'Toss'];
    it('전체', () => {
        const entireStack = Stack[0];
        const entireStackList = users.filter(user => user.Stack.includes(entireStack));
        expect(entireStackList).toStrictEqual(users);
    });
    it('네이버', () => {
        const naverStack = Stack[1];
        const naverStackList = users.filter(user => user.Stack.includes(naverStack));
        expect(naverStackList).toStrictEqual([
            {
                id: 1,
                author: 'Tony Reichert',
                thumbnailUrl: 'CEO',
                title: 'Management',
                summary: 'active',
                urlSuffix: '29',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: 'tony.reichert@example.com',
                crawledDate: '2023-10-13',
                registrationCompleted: 'tony.reichert@example.com',
                displayName: 'tony.reichert@example.com',
                uniqueName: 'tony.reichert@example.com',
                Writer: '블로그 작성자',
                Stack: '네이버',
            },
            {
                id: 2,
                author: 'Park',
                thumbnailUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                title: 'title',
                summary: '이건 기술 블로그다.',
                urlSuffix: 'url',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: '1',
                crawledDate: '2023-10-15',
                registrationCompleted: false,
                displayName: '하이',
                uniqueName: '하이',
                Writer: '블로그 작성자',
                Stack: '네이버',
            },
            {
                id: 3,
                author: 'Tony Reichert',
                thumbnailUrl: 'CEO',
                title: 'Management',
                summary: 'active',
                urlSuffix: '29',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: 'tony.reichert@example.com',
                crawledDate: '2023-10-16',
                registrationCompleted: 'tony.reichert@example.com',
                displayName: 'tony.reichert@example.com',
                uniqueName: 'tony.reichert@example.com',
                Writer: '블로그 작성자',
                Stack: '네이버',
            },
        ]);
    });
    it('카카오', () => {
        const kakaoStack = Stack[2];
        const kakaoStackList = users.filter(user =>
            user.Stack.toLowerCase().includes(kakaoStack.toLowerCase()),
        );
        expect(kakaoStackList).toStrictEqual([
            {
                id: 5,
                author: 'Park',
                thumbnailUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                title: 'title',
                summary: '이건 기술 블로그다.',
                urlSuffix: 'url',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: '1',
                crawledDate: '2023-10-17',
                registrationCompleted: false,
                displayName: '하이',
                uniqueName: '하이',
                Writer: '제목',
                Stack: '카카오',
            },
        ]);
    });
    it('배달의 민족', () => {
        const deliveryStack = Stack[3];
        const deliveryStackList = users.filter(user =>
            user.Stack.toLowerCase().includes(deliveryStack.toLowerCase()),
        );
        expect(deliveryStackList).toStrictEqual([
            {
                id: 4,
                author: 'Park',
                thumbnailUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                title: 'title',
                summary: '이건 기술 블로그다.',
                urlSuffix: 'url',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: '1',
                crawledDate: '2023-10-17',
                registrationCompleted: false,
                displayName: '하이',
                uniqueName: '하이',
                Writer: '블로그 작성자',
                Stack: '배달의 민족',
            },
            {
                id: 6,
                author: 'Park',
                thumbnailUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                title: 'title',
                summary: '이건 기술 블로그다.',
                urlSuffix: 'url',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: '1',
                crawledDate: '2023-10-17',
                registrationCompleted: false,
                displayName: '하이',
                Writer: '제목',
                uniqueName: '하이',
                Stack: '배달의 민족',
            },
            {
                id: 8,
                author: 'Tony Reichert',
                thumbnailUrl: 'CEO',
                title: 'Management',
                summary: 'active',
                urlSuffix: '29',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: 'tony.reichert@example.com',
                crawledDate: '2023-10-17',
                registrationCompleted: 'tony.reichert@example.com',
                displayName: 'tony.reichert@example.com',
                uniqueName: 'tony.reichert@example.com',
                Writer: '제목',
                Stack: '배달의 민족',
            },
        ]);
    });
    it.only('Toss', () => {
        const tossStack = Stack[4];
        const tossStackList = users.filter(user =>
            user.Stack.toLowerCase().includes(tossStack.toLowerCase()),
        );
        expect(tossStackList).toStrictEqual([
            {
                id: 7,
                author: 'Tony Reichert',
                thumbnailUrl: 'CEO',
                title: 'Management',
                summary: 'active',
                urlSuffix: '29',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: 'tony.reichert@example.com',
                crawledDate: '2023-10-16',
                registrationCompleted: 'tony.reichert@example.com',
                displayName: 'tony.reichert@example.com',
                uniqueName: 'tony.reichert@example.com',
                Writer: '제목',
                Stack: 'TOSS',
            },
            {
                id: 9,
                author: 'Tony Reichert',
                thumbnailUrl: 'CEO',
                title: 'Management',
                summary: 'active',
                urlSuffix: '29',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: 'tony.reichert@example.com',
                crawledDate: '2023-10-17',
                registrationCompleted: 'tony.reichert@example.com',
                displayName: 'tony.reichert@example.com',
                Writer: '테스트',
                Stack: 'TOSS',
            },
            {
                id: 10,
                author: 'Tony Reichert',
                thumbnailUrl: 'CEO',
                title: 'Management',
                summary: 'active',
                urlSuffix: '29',
                url: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                techBlogCode: 'tony.reichert@example.com',
                crawledDate: '2023-10-17',
                registrationCompleted: 'tony.reichert@example.com',
                displayName: 'tony.reichert@example.com',
                uniqueName: 'tony.reichert@example.com',
                Writer: '테스트',
                Stack: 'TOSS',
            },
        ]);
    });
});
