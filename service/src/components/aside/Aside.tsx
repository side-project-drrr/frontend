import TopPost from './TopPost';
import TopKeywords from './TopKeywords';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';
import { useRecoilValue } from 'recoil';

import Recommend from '../recommend/Recommend';

export default function Aside() {
    const loggedIn = useRecoilValue(isLoggedInState);
    return (
        <div className="flex flex-col justify-around w-full p-4 my-10">
            {loggedIn && <Recommend />}

            <TopPost />
            <hr />
            <TopKeywords />
        </div>
    );
}
