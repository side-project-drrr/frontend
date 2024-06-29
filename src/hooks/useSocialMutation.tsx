import { QueryClient, useMutation } from '@tanstack/react-query';
import HttpClient from '../apis/HttpClient';
import { setAccessTokenStorage, setRefreshTokenStorage } from '../repository/AuthRepository';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState } from '../recoil/atom/isLoggedInState';

export async function SignInService(providerValue: string) {
    try {
        const res = await HttpClient.post(`/api/v1/auth/signin`, {
            providerId: `${providerValue}`,
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const useSocialMutation = () => {
    const setLoggined = useSetRecoilState(isLoggedInState);
    const ACCESSTOKEN_KEY = 'accessToken';
    const REFRESHTOKEN_KEY = 'refreshToken';
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: SignInService,
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['social'] }); // 이 key에 해당하는 쿼리가 무효화!
            setAccessTokenStorage(ACCESSTOKEN_KEY, data.accessToken);
            setRefreshTokenStorage(REFRESHTOKEN_KEY, data.refreshToken);

            setLoggined(true);
        },
    });
};
