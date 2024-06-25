import { Box, Chip, Link } from '@mui/material';
import { ItemProps } from './type';
import darkLogo from '../../assets/darkLogo.webp';
import { useProfileState } from '../../context/UserProfile';
import { loginModalState } from '../../recoil/atom/loginModalState';
import { useSetRecoilState } from 'recoil';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
    postIncreasedMemberViewsService,
    postIncreasedViewsService,
} from '../../service/TechBlogService';
import { useEffect, useState } from 'react';
import { techBlogDataState } from '../../recoil/atom/techBlogDataState';
import { useLikeCancelMutation, useLikedMutation } from '../../hooks/useLikedMutation';

export default function UserListBoxItem({ item, index }: ItemProps) {
    const { token } = useProfileState();
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const setModalOpen = useSetRecoilState(loginModalState);
    const setTechBlogData = useSetRecoilState(techBlogDataState);
    const liked = useLikedMutation();
    const likedCancel = useLikeCancelMutation();

    async function postIncreasedViewsRender(postId: string) {
        if (isLogin) {
            postIncreasedMemberViewsService(postId);
        } else {
            postIncreasedViewsService(postId);
        }
    }

    const handlePostLike = async (id: number) => {
        if (!item.hasMemberLikedPost) {
            liked.mutate(id);
            setTechBlogData(prev => {
                return prev.map(item => {
                    if (item.techBlogPostBasicInfoDto.id === id) {
                        return {
                            ...item,
                            techBlogPostBasicInfoDto: {
                                ...item.techBlogPostBasicInfoDto,
                                likeCount: item.techBlogPostBasicInfoDto.likeCount + 1, // 좋아요 수 증가
                            },
                            hasMemberLikedPost: true,
                        };
                    }
                    return item;
                });
            });
        } else {
            likedCancel.mutate(id);
            setTechBlogData(prev => {
                return prev.map(item => {
                    if (item.techBlogPostBasicInfoDto.id === id) {
                        return {
                            ...item,
                            techBlogPostBasicInfoDto: {
                                ...item.techBlogPostBasicInfoDto,
                                likeCount: item.techBlogPostBasicInfoDto.likeCount - 1, // 좋아요 수 증가
                            },
                            hasMemberLikedPost: false,
                        };
                    }
                    return item;
                });
            });
        }
    };
    const handleLinkClick = () => {
        if (token === null || token === '') {
            setModalOpen(true);
            return;
        }
    };
    useEffect(() => {
        if (token === null || token === '') setIsLogin(true);
    }, [token]);
    return (
        <>
            {!isLogin ? (
                <Box
                    key={index}
                    borderBottom={1}
                    borderColor="primary.main"
                    padding="30px 20px"
                    width="97%"
                    sx={(theme: any) => ({
                        [theme.breakpoints.down('sm')]: {
                            display: 'flex',
                            flexDirection: 'column',
                        },
                    })}
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
                        onClick={() => postIncreasedViewsRender(item.techBlogPostBasicInfoDto.id)}
                    >
                        <h1 className="w-full overflow-hidden text-xl font-bold bold whitespace-nowrap pl-4 text-ellipsis max-[600px]:text-xs max-[600px]:hidden">
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
                        <div className="flex items-center justify-between w-full pt-2 pb-2 max-[600px]:flex-col max-[600px]:w-full">
                            {item.techBlogPostBasicInfoDto.thumbnailUrl ? (
                                <Box
                                    sx={(theme: any) => ({
                                        minWidth: '140px',
                                        height: '140px',

                                        [theme.breakpoints.down('sm')]: {
                                            marginBottom: '20px',
                                            width: '100%',
                                        },
                                    })}
                                >
                                    <img
                                        src={item.techBlogPostBasicInfoDto.thumbnailUrl}
                                        alt="썸네일"
                                        className="flex justify-center w-40 rounded-2xl right-10 h-36 max-[600px]:w-full"
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
                                />
                            )}
                            <div className=" flex flex-col w-full overflow-hidden">
                                <h1 className="w-full overflow-hidden text-xl font-bold bold whitespace-nowrap pl-4 text-ellipsis max-[600px]:text-xs sm:hidden">
                                    {item.techBlogPostBasicInfoDto.title}
                                </h1>
                                <p className="text-base overflow-hidden text-ellipsis h-[130px] max-h-[140px] pl-4 pt-[10px] pb-[10px] max-[600px]:text-xs">
                                    {item.techBlogPostBasicInfoDto.summary.length > 0
                                        ? item.techBlogPostBasicInfoDto.summary
                                        : '해당 게시글은 설명이 없어요'}
                                </p>
                            </div>
                        </div>
                        <Box className="flex gap-2 w-full flex-wrap overflow-y-hidden h-[40px] mt-[20px]">
                            {item.categoryDto?.map((item: { id: string; name: string }) => (
                                <Chip
                                    key={item.id}
                                    id={item.id}
                                    label={`#${item.name}`}
                                    color="primary"
                                    className="px-4 py-1 text-sm rounded-xl"
                                    sx={(theme: any) => ({
                                        [theme.breakpoints.down('sm')]: { fontSize: '10px' },
                                    })}
                                />
                            ))}
                        </Box>
                    </Link>
                    <ul className="flex justify-around w-2/12 mt-[10px] items-center ">
                        <li className="flex items-center justify-center text-xs gap-2">
                            <ThumbUpIcon
                                onClick={() =>
                                    handlePostLike(Number(item.techBlogPostBasicInfoDto.id))
                                }
                                sx={
                                    item.hasMemberLikedPost
                                        ? { color: '#E6783A', fontSize: '18px' }
                                        : { color: '', fontSize: '18px' }
                                }
                            />
                            {item.techBlogPostBasicInfoDto.likeCount}
                        </li>
                        <li className="text-xs flex items-center gap-2">
                            <RemoveRedEyeIcon /> {item.techBlogPostBasicInfoDto.viewCount}
                        </li>
                    </ul>
                </Box>
            ) : (
                <Link
                    color="text.primary"
                    underline="none"
                    sx={{
                        '&:hover': {
                            color: 'text.primary',
                        },
                    }}
                    onClick={handleLinkClick}
                >
                    <Box
                        key={index}
                        borderBottom={1}
                        borderColor="primary.main"
                        padding="30px 20px"
                        className="relative flex flex-col justify-around"
                    >
                        <h1 className="w-full overflow-hidden text-xl font-bold bold whitespace-nowrap pl-4 text-ellipsis max-[600px]:text-xs max-[600px]:hidden">
                            {item.techBlogPostBasicInfoDto.title}
                        </h1>
                        <div className="flex items-center justify-between w-full pt-2 pb-2 max-[600px]:flex-col max-[600px]:w-full">
                            {item.techBlogPostBasicInfoDto.thumbnailUrl ? (
                                <Box
                                    sx={(theme: any) => ({
                                        minWidth: '140px',
                                        height: '140px',

                                        [theme.breakpoints.down('sm')]: {
                                            marginBottom: '20px',
                                            width: '100%',
                                        },
                                    })}
                                >
                                    <img
                                        src={item.techBlogPostBasicInfoDto.thumbnailUrl}
                                        alt="썸네일"
                                        className="flex justify-center w-40 rounded-2xl right-10 h-36 max-[600px]:w-full"
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
                                />
                            )}

                            <div className=" flex flex-col w-full overflow-hidden">
                                <p className="text-base overflow-hidden text-ellipsis h-[130px] max-h-[140px] pl-4 pt-[10px] pb-[10px] max-[600px]:text-xs">
                                    {item.techBlogPostBasicInfoDto.summary.length > 0
                                        ? item.techBlogPostBasicInfoDto.summary
                                        : '해당 게시글은 설명이 없어요'}
                                </p>
                            </div>
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
                        <ul className="flex justify-between w-2/12 mt-[10px] items-center">
                            <li className="flex items-center justify-center text-xs gap-2">
                                <ThumbUpIcon />
                                {item.techBlogPostBasicInfoDto.likeCount}
                            </li>
                            <li className="text-xs flex items-center gap-2">
                                <RemoveRedEyeIcon /> {item.techBlogPostBasicInfoDto.viewCount}
                            </li>
                        </ul>
                    </Box>
                </Link>
            )}
        </>
    );
}
