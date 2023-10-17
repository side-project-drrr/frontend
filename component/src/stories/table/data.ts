const columns = [
    { name: 'id', uid: 'id' },
    { name: 'author', uid: 'author' },
    { name: 'thumbnailUrl', uid: 'thumbnailUrl' },
    { name: 'title', uid: 'title' },
    { name: 'summary', uid: 'summary' },
    { name: 'urlSuffix', uid: 'urlSuffix' },
    { name: 'url', uid: 'url' },
    { name: 'techBlogCode', uid: 'techBlogCode' },
    { name: 'crawledDate', uid: 'crawledDate' },
    { name: 'registrationCompleted', uid: 'registrationCompleted' },
    { name: 'displayName', uid: 'displayName' },
    { name: 'uniqueName', uid: 'uniqueName' },
    { name: 'Writer', uid: 'Writer' },
    { name: 'Stack', uid: 'Stack' },
];

const users = [
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
    },
];

export { columns, users };
