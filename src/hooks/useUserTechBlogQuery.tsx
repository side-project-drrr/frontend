import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserTechBlogService } from '../service/TechBlogService';

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

export const useUserTechBlogQuery = (categoryId: number) => {
    const size = 10;
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['techBlog', size, categoryId],
        queryFn: ({ pageParam = 0 }) => getUserTechBlogService({ pageParam, size, id: categoryId }),
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
    return { data, hasNextPage, isFetchingNextPage, fetchNextPage };
};
