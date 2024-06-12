import { useInfiniteQuery } from '@tanstack/react-query';
import { getTechBlogService } from '../service/TechBlogService';

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

export const useTechBlogQuery = () => {
    const size = 10;
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['techBlog', size],
        queryFn: ({ pageParam = 0 }) => getTechBlogService({ pageParam, size }),
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
