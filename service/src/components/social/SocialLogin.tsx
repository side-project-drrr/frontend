import { useSetRecoilState } from 'recoil';
import github from '../../assets/github.webp';
import kakao from '../../assets/kakao.webp';
import { getUrlByProvider, setProvider } from '../../repository/ProviderRepository';
import { IProps } from './type';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';
import { OAuth2Provider } from '../../constants/auth';

export default function SocialLogin({ state }: IProps) {
    const setLoggedIn = useSetRecoilState(isLoggedInState);
    const handleLogin = () => {
        const url = getUrlByProvider(state);
        setLoggedIn(true);
        setProvider(OAuth2Provider[state]);
        locationUrl(url);
    };

    const computedImageSet = state === 'GITHUB' ? github : kakao;

    const locationUrl = (url: string) => {
        window.location.assign(url);
    };

    return (
        <div>
            <button
                className="bg-transparent border-none hover:border-none focus:border-none focus:outline-none"
                onClick={handleLogin}
            >
                <picture>
                    <source
                        srcSet={computedImageSet}
                        type="image/webp"
                        className="w-32 shadow-md rounded-xl shadow-black"
                    />
                    <img
                        src={computedImageSet}
                        alt={state + 'login'}
                        className="w-32 shadow-md rounded-xl shadow-black "
                    />
                </picture>
            </button>
        </div>
    );
}
