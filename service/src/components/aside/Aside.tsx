import TopPost from '../layout/TopPost';

export default function Aside() {
    return (
        <div className="flex flex-col p-4">
            <div>
                <h2 className="font-bold text-lg">추천 게시글</h2>
            </div>
            <hr></hr>
            <TopPost />
            <hr></hr>
            <div className="mt-4">
                <h2 className="font-bold text-lg">Top Keywords</h2>
            </div>
        </div>
    );
}
