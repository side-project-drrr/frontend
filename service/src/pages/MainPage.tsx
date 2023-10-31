import Aside from '../components/aside/Aside';

export default function MainPage() {
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
