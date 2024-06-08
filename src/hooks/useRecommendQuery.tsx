import { useQuery } from '@tanstack/react-query';
import HttpClient from '../apis/HttpClient';
import { useProfileState } from '../context/UserProfile';

export async function getRecommendTechBlogService() {
    const COUNT = 9;

    try {
        const res = await HttpClient.get(`/api/v1/members/me/post-recommendation/${COUNT}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const useRecommendQuery = () => {
    const { token } = useProfileState();

    const { data, isLoading } = useQuery({
        queryKey: ['recommend'],
        queryFn: getRecommendTechBlogService,
        enabled: !!token,
    });
    return { data, isLoading };
};
