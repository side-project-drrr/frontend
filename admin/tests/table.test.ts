import { describe, expect, it } from 'vitest';
import { users } from '@monorepo/component/src/stories/table/data';
describe('vitest 테스트', () => {
    it('1 더하기 1', () => {
        const num = 1;

        const total = num + 2;
        expect(total).toBe(3);
    });
});

describe('블로그 작성자 혹은 제목으로 검색', () => {
    const userArr = [...users];
    it.only('블로그 작성자 일때', () => {
        const searchfilter = userArr.filter(user => user.Writer?.includes('블로그 작성자'));
        expect(searchfilter).toStrictEqual([
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
});
