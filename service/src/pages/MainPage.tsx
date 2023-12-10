import { useLocation } from 'react-router-dom';
import Aside from '../components/aside/Aside';
import CategoryList from '../components/category/CategoryList';

export default function MainPage() {
    // 백엔드에서 받아온 providerId 받아온 값
    const { state } = useLocation();
    console.log(state);

    return (
        <div className="flex justify-between bg-[#1C1D21]">
            <div className="flex flex-col justify-around bg-red-500">
                <div>
                    <CategoryList />
                </div>
                <div className="flex-auto block max-w-screen-md mt-8 w-full ">
                    <div>mainpage</div>
                </div>
            </div>
            <aside className="block max-w-md bg-red-500">
                <div className="w-[100%]">
                    <Aside />
                </div>
            </aside>
        </div>
    );
}
