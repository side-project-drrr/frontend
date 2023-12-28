import { useState } from 'react';
import { Button } from '@mui/base/Button';

import CategoryModal from '../modal/CategoryModal';

const mock = [
    { id: 1, content: 'Java' },
    { id: 2, content: 'Spring' },
    { id: 3, content: 'Javascript' },
];

export default function CategoryList() {
    const [open, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <ul className="flex justify-around">
                <Button
                    className="bg-[#E6F1FE] text-[#006FEE] w-28 h-7 text-center text-xs flex items-center justify-center"
                    onClick={handleOpen}
                >
                    추가
                </Button>
                {mock.map(data => (
                    <li key={data.id} className="px-10 py-2 mx-5 text-xs bg-blue-900 rounded-3xl">
                        {data.content}
                    </li>
                ))}
            </ul>
            <CategoryModal handleClose={handleClose} onModalOpen={open} />
        </>
    );
}
