import kakao from '../../../assets/kakao.png';

export default function SocialKakao() {
    const REST_API_KEY = import.meta.env.VITE_APP_KAKAO_REST_API_KEY; //REST API KEY
    const REDIRECT_URL = import.meta.env.VITE_APP_REDIRECT_URL; //현 프로젝트에서는 백엔드에서 redirecturl 처리

    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code&state=kakao`;

    const handleLogin = () => {
        window.location.href = kakaoURL;
    };
    return (
        <div>
            <button
                onClick={handleLogin}
                className="border-none hover:border-none focus:border-none focus:outline-non"
            >
                <img src={kakao} alt="카카오 로그인" className="w-14 h-14" />
            </button>
        </div>
    );
}
