export default function Aside() {
    return (
        <div className="flex flex-col p-4">
            <div className = "h-[30vh]">
                <h2 className = "font-bold text-lg">추천 게시글</h2>
            </div>
            <hr></hr>
            <div className = "h-[30vh] mt-4">
                <h2 className = "font-bold text-lg">Top 5</h2>
            </div>
            <hr></hr>
            <div className = "h-[30vh] mt-4">
                <h2 className = "font-bold text-lg">Top Keywords</h2>
            </div>
        </div>
    );
}
