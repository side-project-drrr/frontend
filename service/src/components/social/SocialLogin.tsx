//import { useSetRecoilState } from 'recoil';

import github from '../../assets/github.webp';
import kakao from '../../assets/kakao.webp';
//import { providerState } from '../../recoil/atom/providerstate';
import { IProps } from './type';

export default function SocialLogin({ state }: IProps) {
    const GITHUB_CLIENT_ID = import.meta.env.VITE_APP_GITGUB_CLIENT_ID; //REST API KEY
    const GITHUB_REDIRECT_URL = import.meta.env.VITE_APP_GITHUB_REDIRECT_URL; //REDIRECT_URL
    const KAKAO_REST_API_KEY = import.meta.env.VITE_APP_KAKAO_REST_API_KEY; //REST API KEY
    const KAKAO_REDIRECT_URL = import.meta.env.VITE_APP_KAKAO_REDIRECT_URL; //현 프로젝트에서는 백엔드에서 REDIRECT_URL 처리
    //const setProvider = useSetRecoilState(providerState);

    const handleLogin = () => {
        if (state === 'github') {
            const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_url=${GITHUB_REDIRECT_URL}`;
            localStorage.setItem('provider', 'github');
            locationUrl(url);
        } else {
            const url = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
            localStorage.setItem('provider', 'kakako');
            locationUrl(url);
        }
    };

    const locationUrl = (url: string) => {
        window.location.assign(url);
    };
    console.log(456);
    return (
        <div>
            <button
                onClick={handleLogin}
                className="bg-transparent border-none hover:border-none focus:border-none focus:outline-none"
            >
                {state === 'github' ? (
                    <picture>
                        <source
                            srcSet={github}
                            type="image/webp"
                            className="w-32 shadow-md rounded-xl shadow-black"
                        />
                        <img
                            src={github}
                            alt="github login"
                            className="w-32 shadow-md rounded-xl shadow-black "
                        />
                    </picture>
                ) : (
                    <picture>
                        <source
                            srcSet={kakao}
                            type="image/webp"
                            className="w-32 shadow-md rounded-xl shadow-black "
                        />
                        <img
                            src={kakao}
                            alt="kakao login"
                            className="w-32 shadow-md rounded-xl shadow-black"
                        />
                    </picture>
                )}
            </button>
        </div>
    );
}
