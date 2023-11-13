import github from '../../../assets/github.png';

export default function SocialKakao() {
    const CLIENT_ID = import.meta.env.VITE_APP_GITGUB_CLIENT_ID; //REST API KEY
    const REDIRECT_URL = import.meta.env.VITE_APP_REDIRECT_URL; //REST API KEY
    // oauth 요청 URL
    const githubURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_url=${REDIRECT_URL}`;

    const handleLogin = () => {
        window.location.assign(githubURL);
    };
    return (
        <div>
            <button
                onClick={handleLogin}
                className="border-none hover:border-none focus:border-none focus:outline-non"
            >
                <img src={github} alt="Github" className="w-14 h-14" />
            </button>
        </div>
    );
}
