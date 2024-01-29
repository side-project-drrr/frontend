import CardComponent from './CardComponent';

const items = [
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
        thumbnailUrl: '',
    },
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
        thumbnailUrl: '',
    },
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
        thumbnailUrl: '',
    },
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
        thumbnailUrl: '',
    },
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
        thumbnailUrl: '',
    },
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
        thumbnailUrl: '',
    },
];

export default function CardList() {
    return (
        <>
            <CardComponent items={items} />
        </>
    );
}
