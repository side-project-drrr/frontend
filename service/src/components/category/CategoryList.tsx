import { Button } from '@mui/base/Button';
import { CategoryProps } from '../modal/type';
import CategoryModal from '../modal/CategoryModal';

const mock = [
    { id: 1, content: 'Java' },
    { id: 2, content: 'Spring' },
    { id: 3, content: 'Javascript' },
];

export default function CategoryList({ onHandleModalOpen, onModalOpen, onClose }: CategoryProps) {
    return (
        <>
            <ul className="flex justify-around">
                <Button
                    className="bg-[#E6F1FE] text-[#006FEE] w-28 h-7 text-center text-xs flex items-center justify-center"
                    onClick={onHandleModalOpen}
                >
                    추가
                </Button>
                {mock.map(data => (
                    <li
                        key={data.id}
                        className="px-10 py-2 mx-5 text-xs text-[#E6F1FE] bg-blue-900 rounded-3xl flex-1"
                    >
                        {data.content}
                    </li>
                ))}
            </ul>
            <CategoryModal
                onClose={onClose}
                onModalOpen={onModalOpen}
                onHandleModalOpen={onHandleModalOpen}
            />
        </>
    );
}
