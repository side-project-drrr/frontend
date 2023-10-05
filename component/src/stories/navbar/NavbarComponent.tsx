import { Button } from '@nextui-org/react';

interface Props {
    handleCategoryMove: () => void;
    handleMainMove: () => void;
}

export default function NavbarComponent({ handleCategoryMove, handleMainMove }: Props) {
    return (
        <aside className="flex justify-center h-screen bg-white">
            <div className="flex flex-col h-screen p-3  shadow w-full">
                <div className="w-full flex justify-center text-center mb-20 text-black">
                    <h4 onClick={handleMainMove}>Logo(여기 클릭 시 Main이동)</h4>
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
