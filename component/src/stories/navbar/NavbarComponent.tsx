import { Button } from '@nextui-org/react';

export default function NavbarComponent() {
    return (
        <nav className="flex justify-center h-screen ">
            <div className="flex flex-col h-screen p-3  shadow w-60 ">
                <div className="w-full flex justify-center text-center mb-20">
                    <h4>Sidebar</h4>
                </div>
                <Button className="border-none outline-none bg-transparent">카테고리 등록</Button>
            </div>
        </nav>
    );
}
