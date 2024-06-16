import { useInfiniteQuery } from '@tanstack/react-query';
import { categorySearchService } from '../service/CategoryService';

export const useUserCategoryQuery = (categorySearchValue: string) => {
    const size = 20;
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['userCategory', size, categorySearchValue],
        queryFn: ({ pageParam = 0 }) =>
            categorySearchService({ keyword: categorySearchValue, pageParam, size }),
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
