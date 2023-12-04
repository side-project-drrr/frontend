const mock = [
    { id: 1, content: 'Java' },
    { id: 2, content: 'Spring' },
    { id: 3, content: 'Javascript' },
];

export default function CategoryList() {
    return (
        <ul className="flex justify-around ">
            {mock.map(data => (
                <li key={data.id} className="px-10 py-2 mx-5 text-xs bg-blue-900 rounded-3xl">
                    {data.content}
                </li>
            ))}
        </ul>
    );
}
