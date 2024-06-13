import { useInfiniteQuery } from '@tanstack/react-query';
import { getHeaderKeywordSearch } from '../service/HeaderSearchService';

export const useHeaderSearchQuery = (searchValue: string) => {
    const size = 10;
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['search', size, searchValue],
        queryFn: ({ pageParam = 0 }) => getHeaderKeywordSearch({ pageParam, size, searchValue }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage.last) {
                return allPages.length;
            }
            return undefined;
        },
    });
    return { data, isFetchingNextPage, hasNextPage, fetchNextPage };
};
