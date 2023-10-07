import { Button } from '@nextui-org/react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
    handleCategoryMove: () => void;
    handleMainMove: () => void;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NavbarComponent({
    handleCategoryMove,
    handleMainMove,
    setSidebarOpen,
}: Props) {
    return (
        <aside className="flex justify-center h-screen bg-white">
            <div className="flex flex-col h-screen p-3  shadow w-full">
                <div className="w-full flex justify-center text-center mb-20 text-black">
                    <h4 onClick={handleMainMove}>Logo</h4>
                    <div className="relative" style={{ right: '-80px' }}>
                        <p onClick={() => setSidebarOpen(false)}>닫기</p>
                    </div>
                </div>
                <Button
                    className="border-none outline-none bg-transparent"
                    onClick={handleCategoryMove}
                >
                    카테고리 등록
                </Button>
            </div>
        </aside>
    );
}
