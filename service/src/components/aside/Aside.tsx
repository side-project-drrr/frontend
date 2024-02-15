import TopPost from './TopPost';
import Carousel from '../carousel/Carousel';
import TopKeywords from './TopKeywords';
import { recommendState } from '../../recoil/atom/recommendState';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';

export default function Aside() {
    const loggedIn = useRecoilValue(isLoggedInState);

    const recommendData = useRecoilValue(recommendState);
    return (
        <div className="flex flex-col justify-around w-full p-4 my-10">
            {loggedIn && (
                <>
                    <div className="mb-4">
                        <h2 className="my-2 text-lg font-bold">추천 게시글</h2>
                        <Carousel data={recommendData} />
                    </div>
                    <hr />
                </>
            )}
            <TopPost />
            <hr />
            <TopKeywords />
        </div>
    );
}
