import { Box } from '@mui/material';
import { IListBoxProps } from './type';
import UserListBoxItem from './UserListBoxItem';
import { useEffect, useRef, useState } from 'react';
import { getUserTechBlogService } from '../../service/TechBlogService';

export default function UserListBox({ onCategoryId }: IListBoxProps) {
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const [filterTechBlogData, setFilterTechBlogData] = useState<any[]>([]);
    const hasMoreRef = useRef(hasMore); // Ref to store hasMore state

    const observationTarget = useRef(null);
    const size = 10;

    const onIntersect = async (entries: any, observer: any) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasMoreRef.current) {
            observer.unobserve(entry.target);
            setPage(prev => prev + 1);
        }
    };

    async function userFilterTechBlogRender(id: number, page: number) {
        const userFilterTechBlogData = await getUserTechBlogService({
            page,
            size,
            id,
        });
        if (userFilterTechBlogData.last) {
            setHasMore(true);
        } else {
            setHasMore(false);
        }
        setFilterTechBlogData(prev => [...prev, ...userFilterTechBlogData.content]);
        if (userFilterTechBlogData.content.length > 0 && !userFilterTechBlogData.last) {
            if (observationTarget.current) {
                observer.observe(observationTarget.current);
            }
        }
    }

    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });

    useEffect(() => {
        if (onCategoryId !== 0 && onCategoryId) {
            // Reset data and page, then fetch data for the new category
            setFilterTechBlogData([]);
            setHasMore(false);
            setPage(0);

            // Fetch data for the new category with page 0
        }
    }, [onCategoryId, page]);

    useEffect(() => {
        if (onCategoryId !== 0 && onCategoryId && page > 0) {
            userFilterTechBlogRender(onCategoryId, page);
        }
    }, [page]);

    useEffect(() => {
        hasMoreRef.current = hasMore;
    }, [hasMore]);

    useEffect(() => {
        return () => {
            observer.disconnect();
        };
    }, [observer]);

    return (
        <>
            <Box>
                {filterTechBlogData.map((item: any, index: number) => (
                    <UserListBoxItem key={index} item={item} index={index} />
                ))}
            </Box>

            {!hasMore ? <div ref={observationTarget}>Loading..</div> : <></>}
        </>
    );
}
