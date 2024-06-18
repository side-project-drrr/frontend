import { useInfiniteQuery } from '@tanstack/react-query';
import { getTechBlogService, getUserTechBlogService } from '../service/TechBlogService';
import { RefObject, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { techBlogDataState } from '../recoil/atom/techBlogDataState';
import { userFilterTechBlogState } from '../recoil/atom/userFilterTechBlogState';

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
export const useTechBlogQuery = ({
    observerElem,
    categoryId,
}: {
    observerElem: RefObject<HTMLDivElement> | null;
    categoryId: number;
}) => {
    const observerTechBlog = useRef<IntersectionObserver | null>(null);
    const setTechBlogData = useSetRecoilState(techBlogDataState);

    const size = 10;
    const { data, hasNextPage, fetchNextPage, error, refetch } = useInfiniteQuery({
        queryKey: ['techBlog', size],
        queryFn: async ({ pageParam = 0 }) => {
            const data = await getTechBlogService({ pageParam, size });
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
        enabled: categoryId === 0,
    });

    useEffect(() => {
        if (data) {
            const allPosts = data.pages.flatMap(page => page.content);
            setTechBlogData(allPosts);
        }
    }, [data, setTechBlogData]);

    useEffect(() => {
        if (!observerElem?.current) return;

        observerTechBlog.current = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.5 },
        );

        observerTechBlog.current.observe(observerElem.current);

        return () => observerTechBlog.current?.disconnect();
    }, [fetchNextPage, hasNextPage, observerElem]);

    return { error, refetch };
};

// useUserTechBlogQuery 훅
export const useUserTechBlogQuery = ({
    categoryId,
    observerElem,
}: {
    categoryId: number;
    observerElem: RefObject<HTMLDivElement> | null;
}) => {
    const observerUserTech = useRef<IntersectionObserver | null>(null);
    const setFilterTechBlogData = useSetRecoilState(userFilterTechBlogState);

    const size = 10;
    const { data, hasNextPage, error, fetchNextPage, refetch } = useInfiniteQuery({
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
        enabled: categoryId !== 0,
    });

    useEffect(() => {
        if (data) {
            const allPosts = data.pages.flatMap(page => page.content);
            setFilterTechBlogData(allPosts);
        }
    }, [data, setFilterTechBlogData]);

    useEffect(() => {
        if (!observerElem?.current) return;

        observerUserTech.current = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.5 },
        );

        observerUserTech.current.observe(observerElem.current);

        return () => observerUserTech.current?.disconnect();
    }, [fetchNextPage, hasNextPage, observerElem]);

    return { error, refetch };
};

// useConditionalTechBlogQuery 훅
// export const useConditionalTechBlogQuery = ({
//     categoryId,
//     observerElem,
// }: {
//     categoryId: number;
//     observerElem: RefObject<HTMLDivElement> | null;
// }) => {
//     const setTechBlogData = useSetRecoilState(techBlogDataState);
//     const setFilterTechBlogData = useSetRecoilState(userFilterTechBlogState);

//     useEffect(() => {
//         if (categoryId === 0) {
//             const { refetch } = useTechBlogQuery({ observerElem });
//             return () => {
//                 refetch();
//             };
//         } else {
//             const { refetch } = useUserTechBlogQuery({ categoryId, observerElem });
//             return () => {
//                 refetch();
//             };
//         }
//     }, [categoryId, observerElem, setTechBlogData, setFilterTechBlogData]);

//     return null; // 실제로 반환할 값이 없으므로 null을 반환합니다.
// };
