import { useLocation } from 'react-router-dom';
import Aside from '../components/aside/Aside';
import CategoryList from '../components/category/CategoryList';
import Button from '@mui/material/Button';

export default function MainPage() {
    // 백엔드에서 받아온 providerId 받아온 값
    const { state } = useLocation();
    console.log(state);

    return (
        <div className="box-border flex justify-between">
            <div className="flex flex-col justify-around w-[70%]">
                <div>
                    <CategoryList />
                </div>
                <div className="flex-auto block max-w-screen-md mt-8">
                    <Button variant="contained" className="h-[6.5vh] w-[5vw] p-[16px]">
                        검색
                    </Button>
                </div>
            </div>
            <aside className="block max-w-sm w-[30%]">
                <Aside />
            </aside>
        </div>
    );
}
