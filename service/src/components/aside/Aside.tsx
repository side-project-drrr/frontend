import TopPost from '../layout/TopPost';
import Carousel from '../carousel/Carousel';
import TopKeywords from './TopKeywords';

const mocks = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content: '우아한형제들 PM(Product Manager)는 어떻게 일할까? .',
        bookmark: 1,
        views: 1000,
    },
    {
        id: 2,
        url: 'https://post-phinf.pstatic.net/MjAxOTAxMzFfMjIg/MDAxNTQ4OTA0NzQzNTYx.0uLd00hkhgDGcDJHjbnqgPOreMR4UtB6BGcfEifWMU4g.o6ccNO3a67MYbDlmdLPhOLRxhlmdtSfvuwxZqeLAtPkg.JPEG/%EC%82%AC%EC%A7%84_1.jpg?type=w800_q75',
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content: '우아한형제들 PM(Product Manager)는 어떻게 일까? .',
        bookmark: 1,
        views: 1000,
    },
    {
        id: 3,
        url: 'https://post-phinf.pstatic.net/MjAxOTAxMzFfMjIg/MDAxNTQ4OTA0NzQzNTYx.0uLd00hkhgDGcDJHjbnqgPOreMR4UtB6BGcfEifWMU4g.o6ccNO3a67MYbDlmdLPhOLRxhlmdtSfvuwxZqeLAtPkg.JPEG/%EC%82%AC%EC%A7%84_1.jpg?type=w800_q75',
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content: '우아한형제들 PM(Product Manager)는 어떻게 일할까? .',
        bookmark: 1,
        views: 1000,
    },
    {
        id: 4,
        url: 'https://cdn.pixabay.com/photo/2020/06/06/16/42/summer-5267305_1280.jpg',
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content: '우아한형제들 PM(Product Manager)는 어떻게 일할까? .',
        bookmark: 1,
        views: 1000,
    },
    {
        id: 5,
        url: 'https://png.pngtree.com/thumb_back/fh260/background/20220313/pngtree-photography-of-night-scenery-of-galaxy-starry-sky-image_1000896.jpg',
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content: '우아한형제들 PM(Product Manager)는 어떻게 일할까? .',
        bookmark: 1,
        views: 1000,
    },
];

export default function Aside() {
    return (
        <div className="flex flex-col justify-around w-full p-4 className">
            <div className="mb-4">
                <h2 className="font-bold text-lg my-2">추천 게시글</h2>
                <Carousel data={mocks} />
            </div>
            <hr></hr>
            <TopPost />
            <hr></hr>
            <div className="mt-2">
                <h2 className="font-bold text-lg">Top Keywords</h2>
            </div>

            <TopKeywords />
        </div>
    );
}
