import { useSetRecoilState } from 'recoil';
import HttpClient from '../apis/HttpClient';
import { IAuthProps } from '../service/auth/type';
import { useMutation } from '@tanstack/react-query';
import { loginSuccessState } from '../recoil/atom/loginSuccessState';
import { useProfileState } from '../context/UserProfile';
import { setAccessTokenStorage, setRefreshTokenStorage } from '../repository/AuthRepository';

export async function SignUpService({
    email,
    categoryIds,
    nickName,
    provider,
    providerId,
    profileImageUrl,
}: IAuthProps) {
    try {
        const res = await HttpClient.post(`/api/v1/auth/signup`, {
            email: `${email}`,
            categoryIds: categoryIds.map(Number),
            nickname: `${nickName}`,
            provider: `${provider}`,
            providerId: `${providerId}`,
            profileImageUrl: `${profileImageUrl}`,
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

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
