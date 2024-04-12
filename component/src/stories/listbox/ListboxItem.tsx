import { Box, Chip, Link } from '@mui/material';
import { ItemProps } from './type';
import darkLogo from '@monorepo/service/src/assets/darkLogo.webp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
    deletePostLikedService,
    getPostLikedService,
    postIncreasedViewsService,
    postTechBlogLikeService,
} from '@monorepo/service/src/service/TechBlogService';

import { useEffect, useState } from 'react';

export default function ListboxItem({ item }: ItemProps) {
    const [uniqueValues, setUniqueValues] = useState(new Set());

    async function deleteTechBlogLikedRender(postId: number) {
        await deletePostLikedService(postId);
    }

    async function getPostLikedRender() {
        const postLiked = await getPostLikedService();
        const postIds = new Set<String>(postLiked.postIds);
        setUniqueValues(postIds);
    }

    async function postIncreasedViewsRender(postId: number) {
        await postIncreasedViewsService(postId);
    }

    async function postTechBlogLike(postId: number) {
        if (uniqueValues.has(postId)) {
            await deleteTechBlogLikedRender(postId);
            setUniqueValues((prevUniqueValues: any) => {
                const newUniqueValues = new Set(prevUniqueValues);
                newUniqueValues.delete(postId);
                return newUniqueValues;
            });
        } else {
            const postLikeClickData = await postTechBlogLikeService(postId);
            if (postLikeClickData !== undefined) {
                if (postLikeClickData.status === 200) {
                    setUniqueValues((prevUniqueValues: any) => {
                        const newUniqueValues = new Set(prevUniqueValues);
                        newUniqueValues.add(postId);
                        return newUniqueValues;
                    });
                }
            }
        }
    }

    const handlePostLike = (id: number) => {
        postTechBlogLike(id);
    };

    useEffect(() => {
        getPostLikedRender();
    }, []);

    return (
        <>
            <Box
                key={item.techBlogPostBasicInfoDto.id}
                borderBottom={1}
                borderColor="primary.main"
                padding="30px 20px"
                className="relative flex flex-col justify-around"
            >
                <Link
                    href={`${item.techBlogPostBasicInfoDto.url}`}
                    target="_blank"
                    color="text.primary"
                    underline="none"
                    sx={{
                        '&:hover': {
                            color: 'text.primary',
                        },
                    }}
                    onClick={() =>
                        postIncreasedViewsRender(Number(item.techBlogPostBasicInfoDto.id))
                    }
                >
                    <h1 className="w-full overflow-hidden text-xl font-bold bold whitespace-nowrap text-ellipsis mb-[20px]">
                        {item.techBlogPostBasicInfoDto.title}
                    </h1>
                </Link>
                <Link
                    href={`/view/${item.techBlogPostBasicInfoDto.id}`}
                    color="text.primary"
                    underline="none"
                    sx={{
                        '&:hover': {
                            color: 'text.primary',
                        },
                    }}
                >
                    <div className="flex items-center justify-between w-full">
                        <p className="text-base overflow-hidden text-ellipsis h-[140px] max-h-[140px] mr-[20px]">
                            {item.techBlogPostBasicInfoDto.summary}
                        </p>

                        {item.techBlogPostBasicInfoDto.thumbnailUrl ? (
                            <Box sx={{ minWidth: '140px', height: '140px' }}>
                                <img
                                    src={item.techBlogPostBasicInfoDto.thumbnailUrl}
                                    alt="썸네일"
                                    className="flex justify-center w-40 rounded-2xl right-10 h-36"
                                />
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItem: 'center',
                                    justifyContent: 'center',
                                    minWidth: '140px',
                                    height: '140px',
                                    backgroundColor: 'rgb(158, 158, 158)',
                                    borderRadius: '20px',
                                    backgroundImage: `url(${darkLogo})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center center',
                                    backgroundSize: '30%',
                                }}
                            ></Box>
                        )}
                    </div>
                    <Box className="flex gap-2 w-full flex-wrap overflow-y-hidden h-[40px] mt-[20px]">
                        {item.categoryDto?.map((item: { id: string; name: string }) => (
                            <Chip
                                key={item.id}
                                id={item.id}
                                label={`#${item.name}`}
                                color="primary"
                                className="px-4 py-1 text-sm rounded-xl"
                            />
                        ))}
                    </Box>
                </Link>
                <ul className="flex justify-between w-2/12 mt-[10px] items-center">
                    <li className="flex items-center justify-center text-xs ">
                        <ThumbUpIcon
                            onClick={() => handlePostLike(Number(item.techBlogPostBasicInfoDto.id))}
                            sx={
                                uniqueValues.has(item.techBlogPostBasicInfoDto.id)
                                    ? { color: '#E6783A', fontSize: '18px' }
                                    : { color: '', fontSize: '18px' }
                            }
                        />
                        <span className="flex items-center ml-2">
                            {item.techBlogPostBasicInfoDto.postLike}
                        </span>
                    </li>
                    <li className="text-xs ">
                        <RemoveRedEyeIcon /> {item.techBlogPostBasicInfoDto.viewCount}
                    </li>
                </ul>
            </Box>
        </>
    );
}
