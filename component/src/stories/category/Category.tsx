import { useState } from 'react';

const categorys = [
    {
        id: '1',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'JAVASCRIPT',
        uqnique_name: 'JAVASCRIPT',
    },
    {
        id: '2',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'REACT',
        uqnique_name: 'REACT',
    },
    {
        id: '3',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'TYPESCRIPT',
        uqnique_name: 'TYPESCRIPT',
    },
    {
        id: '4',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'ANDROID',
        uqnique_name: 'ANDROID',
    },
    {
        id: '5',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'SPRINGBOOT',
        uqnique_name: 'SPRINGBOOT',
    },
    {
        id: '6',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'SPRING',
        uqnique_name: 'SPRING',
    },
    {
        id: '7',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'C',
        uqnique_name: 'C',
    },
    {
        id: '8',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'JAVA',
        uqnique_name: 'JAVA',
    },
    {
        id: '9',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'VUE',
        uqnique_name: 'VUE',
    },
    {
        id: '10',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'NEXT',
        uqnique_name: 'NEXT',
    },
    {
        id: '11',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'NODE',
        uqnique_name: 'NODE',
    },
    {
        id: '12',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'NUST',
        uqnique_name: 'NUST',
    },
    {
        id: '13',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'SWIFT',
        uqnique_name: 'SWIFT',
    },
    {
        id: '14',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'FIGMA',
        uqnique_name: 'FIGMA',
    },
    {
        id: '15',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'AWS',
        uqnique_name: 'AWS',
    },
    {
        id: '16',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'FLUTTER',
        uqnique_name: 'FLUTTER',
    },
];

export default function Category() {
    const [categoryList, setCategoryList] = useState<string[]>([]);

    const handleCategory = (e: React.MouseEvent<HTMLLIElement>) => {
        const id = e.currentTarget.id;
        setCategoryList(prevData => [...prevData, id]);
    };
    const categoryDeduplication = (value: string[]) => {
        const deduplicationItem = new Set(value);
        return Array.from(deduplicationItem);
    };
    const handleCategoryPost = () => {
        const categoryItem = categoryDeduplication(categoryList);
        console.log(categoryItem);
        console.log('api 호출');
    };
    return (
        <>
            <div className="flex flex-wrap max-w-3xl bg-white rounded p-2 justify-center border z-20 items-center text-center ">
                <ul className="w-11/12 flex border-b-2 border-solid">
                    <li className=" text-black pb-2.5">카테고리</li>
                </ul>
                <ul className="flex flex-wrap p-8 gap-4 w-11/12">
                    {categorys.map(category => (
                        <li
                            className={`text-black border border-solid p-4 rounded-3xl gap-2 cursor-pointer ${
                                categoryList.includes(category.id) ? 'bg-blue-500 text-white' : ''
                            }`}
                            key={category.id}
                            id={category.id}
                            onClick={handleCategory}
                        >
                            {category.display_name}
                        </li>
                    ))}
                </ul>
                <div className="flex justify-end w-full">
                    <button onClick={handleCategoryPost}>선택 완료</button>
                </div>
            </div>
        </>
    );
}
