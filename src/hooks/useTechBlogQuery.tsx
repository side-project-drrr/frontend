import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserTechBlogService } from '../service/TechBlogService';

// 공통 인터페이스 정의
interface INextParamsTechBlogProps {
    content: [];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
        offset: number;
        pageNumber: number;
        pageSize: number;
        paged: boolean;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        unpaged: boolean;
    };
}

// useTechBlogQuery 훅
export const useTechBlogQuery = ({ categoryId }: { categoryId: number }) => {
    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, error } = useInfiniteQuery({
        queryKey: ['techBlog', categoryId],
        queryFn: async ({ pageParam = 0 }) => {
            const data = await getUserTechBlogService({ pageParam, size: 10, id: categoryId });

            return data;
        },
        initialPageParam: 0,
        getNextPageParam: (
            lastPage: INextParamsTechBlogProps,
            allPages: INextParamsTechBlogProps[],
        ) => {
            if (!lastPage.last) {
                return allPages.length;
            }
            return undefined;
        },
    });
    return { data, hasNextPage, fetchNextPage, isFetchingNextPage, error };
};
