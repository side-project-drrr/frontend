import { useSetRecoilState } from 'recoil';
import github from '../../assets/github.webp';
import kakao from '../../assets/kakao.webp';
import { setProvider } from '../../repository/ProviderRepository';
import { IProps } from './type';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';

export default function SocialLogin({ state }: IProps) {
    const GITHUB_CLIENT_ID = import.meta.env.VITE_APP_GITGUB_CLIENT_ID; //REST API KEY
    const GITHUB_REDIRECT_URL = import.meta.env.VITE_APP_GITHUB_REDIRECT_URL; //REDIRECT_URL
    const KAKAO_REST_API_KEY = import.meta.env.VITE_APP_KAKAO_REST_API_KEY; //REST API KEY
    const KAKAO_REDIRECT_URL = import.meta.env.VITE_APP_KAKAO_REDIRECT_URL; //현 프로젝트에서는 백엔드에서 REDIRECT_URL 처리
    const setLoggedIn = useSetRecoilState(isLoggedInState);

    const handleLogin = () => {
        if (state === 'github') {
            const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_url=${GITHUB_REDIRECT_URL}`;
            setProvider('github');
            setLoggedIn(true);
            locationUrl(url);
        } else {
            const url = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
            setProvider('kakao');
            setLoggedIn(true);
            locationUrl(url);
        }
    };

    const locationUrl = (url: string) => {
        window.location.assign(url);
    };
    const imgState = state === 'github' ? github : kakao;

    return (
        <div>
            <button
                className="bg-transparent border-none hover:border-none focus:border-none focus:outline-none"
                onClick={handleLogin}
            >
                <picture>
                    <source
                        srcSet={imgState}
                        type="image/webp"
                        className="box-border shadow-lg w-28 rounded-xl shadow-gray-700"
                    />
                    <img
                        src={imgState}
                        alt="kakao login"
                        className="box-border shadow-lg w-28 rounded-xl shadow-gray-700"
                    />
                </picture>
            </button>
        </div>
    );
}
