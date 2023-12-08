import Carousel from '../carousel/Carousel';

const mocks = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D',
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content: '우아한형제들 PM(Product Manager)는 어떻게 일할까? .',
    },
    {
        id: 2,
        url: 'https://post-phinf.pstatic.net/MjAxOTAxMzFfMjIg/MDAxNTQ4OTA0NzQzNTYx.0uLd00hkhgDGcDJHjbnqgPOreMR4UtB6BGcfEifWMU4g.o6ccNO3a67MYbDlmdLPhOLRxhlmdtSfvuwxZqeLAtPkg.JPEG/%EC%82%AC%EC%A7%84_1.jpg?type=w800_q75',
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content: '우아한형제들 PM(Product Manager)는 어떻게 일할까? .',
    },
    {
        id: 3,
        url: 'https://post-phinf.pstatic.net/MjAxOTAxMzFfMjIg/MDAxNTQ4OTA0NzQzNTYx.0uLd00hkhgDGcDJHjbnqgPOreMR4UtB6BGcfEifWMU4g.o6ccNO3a67MYbDlmdLPhOLRxhlmdtSfvuwxZqeLAtPkg.JPEG/%EC%82%AC%EC%A7%84_1.jpg?type=w800_q75',
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content: '우아한형제들 PM(Product Manager)는 어떻게 일할까? .',
    },
    {
        id: 4,
        url: 'https://cdn.pixabay.com/photo/2020/06/06/16/42/summer-5267305_1280.jpg',
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content: '우아한형제들 PM(Product Manager)는 어떻게 일할까? .',
    },
    {
        id: 5,
        url: 'https://png.pngtree.com/thumb_back/fh260/background/20220313/pngtree-photography-of-night-scenery-of-galaxy-starry-sky-image_1000896.jpg',
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content: '우아한형제들 PM(Product Manager)는 어떻게 일할까? .',
    },
];

export default function Aside() {
    return (
        <div className="w-[60%]">
            <h3 aria-label="추천 게시글">추천 게시글</h3>
            <Carousel data={mocks} />
            <div>
                <h3>Top 5</h3>
            </div>
        </div>
    );
}
