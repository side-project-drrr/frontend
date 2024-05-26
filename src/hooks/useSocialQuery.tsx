import { useQuery } from '@tanstack/react-query';
import HttpClient from '../apis/HttpClient';

const SocialService = async (code: string, state: string) => {
    try {
        const res = await HttpClient.get(`/api/v1/auth/oauth2/profile?code=${code}&state=${state}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const useSocialQuery = (code: string, state: string) => {
    return useQuery({
        queryKey: ['social', code, state],
        queryFn: () => SocialService(code || '', state),
        enabled: !!code && !!state,
    });
};
