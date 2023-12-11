const topContentsMock = [
    { id: 1, title: 'vercel 프로젝트 배포하기', url: 'https://www.naver.com' },
    { id: 2, title: '데이터 품질 이슈', url: 'https://www.naver.com' },
    { id: 3, title: '빅 데이터 1', url: 'https://www.naver.com' },
    { id: 4, title: '빅 데이터 2', url: 'https://www.naver.com' },
    { id: 5, title: '빅 데이터 3', url: 'https://www.naver.com' },
];

const TopPost = () => {
    return (
        <div className="my-4">
            <h2 className="font-bold text-lg">Top 5</h2>
            <ol>
                {topContentsMock.map((data, index) => (
                    <li key={data.id} className="py-2">
                        <span className="mr-3">{index + 1}.</span>
                        <a
                            className="hover:cursor-pointer text-inherit hover:text-inherit hover:underline "
                            href={data.url}
                        >
                            {data.title}
                        </a>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default TopPost;
