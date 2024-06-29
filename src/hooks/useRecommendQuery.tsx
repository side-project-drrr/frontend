import { useQuery } from '@tanstack/react-query';
import { useProfileState } from '../context/UserProfile';
import { getRecommendTechBlogService } from '../service/RecommendService';

export const useRecommendQuery = () => {
    const { token } = useProfileState();

    const { data, isLoading } = useQuery({
        queryKey: ['recommend'],
        queryFn: getRecommendTechBlogService,
        enabled: !!token,
    });
    return { data, isLoading };
};
