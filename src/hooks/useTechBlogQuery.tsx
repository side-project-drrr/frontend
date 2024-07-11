import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserTechBlogService } from '../service/TechBlogService';
import { TechBlogProps } from '../../types/TechBlogType';

// useTechBlogQuery 훅
export const useTechBlogQuery = ({ categoryId }: { categoryId: number }) => {
    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, error } = useInfiniteQuery({
        queryKey: ['techBlog', categoryId],
        queryFn: async ({ pageParam = 0 }) => {
            const data = await getUserTechBlogService({ pageParam, size: 10, id: categoryId });

            return data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage: TechBlogProps, allPages: TechBlogProps[]) => {
            if (!lastPage.last) {
                return allPages.length;
            }
            return undefined;
        },
    });
    return { data, hasNextPage, fetchNextPage, isFetchingNextPage, error };
};
