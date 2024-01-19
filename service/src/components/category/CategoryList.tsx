import { useState } from 'react';
import { Button } from '@mui/base/Button';
import AddIcon from '@mui/icons-material/Add';
import CategoryModal from '../modal/CategoryModal';

const mock = [
    { id: 1, content: 'Java' },
    { id: 2, content: 'Spring' },
    { id: 3, content: 'Javascript' },
    { id: 3, content: 'Javascript' },
    { id: 3, content: 'Javascript' },
    { id: 3, content: 'Javascript' },
    { id: 3, content: 'Javascript' },
];

export default function CategoryList() {
    const [open, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <ul className="flex items-center justify-around flex-1 w-10/12 mt-5">
                <Button
                    className="bg-[#E6F1FE] text-[#006FEE] w-14 h-7 text-center text-xs flex items-center justify-center"
                    onClick={handleOpen}
                >
                    <AddIcon />
                </Button>
                {mock.map(data => (
                    <li
                        key={data.id}
                        className="flex-1 py-2 mx-5 text-xs text-[#E6F1FE] bg-blue-900 rounded-3xl text-center"
                    >
                        {data.content}
                    </li>
                ))}
            </ul>
            <CategoryModal handleClose={handleClose} onModalOpen={open} />
        </>
    );
}
