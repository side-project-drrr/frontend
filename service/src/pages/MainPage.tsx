import { useLocation } from 'react-router-dom';
import Aside from '../components/aside/Aside';

export default function MainPage() {
    // 백엔드에서 받아온 providerId 받아온 값
    const { state } = useLocation();
    console.log(state);

    return (
        <div className="flex justify-evenly box-border">
            <div className="max-w-screen-md  block flex-auto ">
                <div>mainpage</div>
            </div>
            <aside className="max-w-sm block">
                <Aside />
            </aside>
        </div>
    );
}
