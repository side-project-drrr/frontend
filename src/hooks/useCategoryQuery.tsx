import { useInfiniteQuery } from '@tanstack/react-query';
import { categorySearchService } from '../service/CategoryService';
import { ICategoryPropsB } from '../../types/CategoryType';

export const useCategoryQuery = (categorySearchValue: string) => {
    const size = 20;
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['search', size, categorySearchValue],
        queryFn: ({ pageParam = 0 }) =>
            categorySearchService({ keyword: categorySearchValue, pageParam, size }),
        initialPageParam: 0,
        getNextPageParam: (lastPage: any, allPages: ICategoryPropsB[]) => {
            if (!lastPage.last) {
                return allPages.length;
            }
            return undefined;
        },
    });
    return { data, isFetchingNextPage, hasNextPage, fetchNextPage };
};
