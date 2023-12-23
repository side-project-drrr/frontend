import github from '../../assets/github.png';
import kakao from '../../assets/kakao.png';

interface Props {
    state: string;
}

export default function TestLogin({ state }: Props) {
    const GITHUB_CLIENT_ID = import.meta.env.VITE_APP_GITGUB_CLIENT_ID; //REST API KEY
    const GITHUB_REDIRECT_URL = import.meta.env.VITE_APP_GITHUB_REDIRECT_URL; //REDIRECT_URL
    const KAKAO_REST_API_KEY = import.meta.env.VITE_APP_KAKAO_REST_API_KEY; //REST API KEY
    const KAKAO_REDIRECT_URL = import.meta.env.VITE_APP_KAKAO_REDIRECT_URL; //현 프로젝트에서는 백엔드에서 REDIRECT_URL 처리

    const handleLogin = () => {
        if (state === 'github') {
            const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_url=${GITHUB_REDIRECT_URL}`;
            locationUrl(url);
        } else {
            const url = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URL}&response_type=code`;
            locationUrl(url);
        }
    };

    const locationUrl = (url: string) => {
        window.location.assign(url);
    };

    return (
        <div>
            <button
                onClick={handleLogin}
                className="bg-transparent border-none hover:border-none focus:border-none focus:outline-none "
            >
                {state === 'github' ? (
                    <img src={github} alt="Github" className="w-32 rounded-xl " />
                ) : (
                    <img src={kakao} alt="카카오 로그인" className="w-32 rounded-xl " />
                )}
            </button>
        </div>
    );
}
