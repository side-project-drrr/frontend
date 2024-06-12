import { useSetRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { loginSuccessState } from '../recoil/atom/loginSuccessState';
import { useProfileState } from '../context/UserProfile';
import { setAccessTokenStorage, setRefreshTokenStorage } from '../repository/AuthRepository';
import { SignUpService } from '../service/auth/SocialService';

export const useSignUpMutation = () => {
    const setLoginSucess = useSetRecoilState(loginSuccessState);
    const { login } = useProfileState();
    const ACCESSTOKEN_KEY = 'accessToken';
    const REFRESHTOKEN_KEY = 'refreshToken';
    return useMutation({
        mutationFn: SignUpService,
        onSuccess(data) {
            if (data.accessToken.length > 0) {
                setLoginSucess(true);
                login(data.accessToken);
                setAccessTokenStorage(ACCESSTOKEN_KEY, data.accessToken);
                setRefreshTokenStorage(REFRESHTOKEN_KEY, data.refreshToken);
            }
        },
        onError(data) {
            console.error(data);
        },
    });
};
