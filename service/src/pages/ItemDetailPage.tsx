export default function ItemDetailPage() {
    return (
        <div className="flex flex-col text-center itmes-center">
            <div className="flex items-center justify-center text-center"></div>
            <div className="w-full">
                <h1 className="w-full">썸네일 제목은 아직 정하지 못했습니다.</h1>
            </div>
            <div>
                <div>
                    <p>오늘의 메뉴는 참치,김치,김치,밥,김치,밥,김치,밥</p>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <ol className="flex gap-4">
                    <li>tag</li>
                    <li>tag</li>
                    <li>tag</li>
                    <li>tag</li>
                    <li>tag</li>
                </ol>
            </div>
            <div className="flex items-center justify-center gap-4">
                <p>조회수</p>
                <button>좋아요</button>
            </div>
        </div>
    );
}
