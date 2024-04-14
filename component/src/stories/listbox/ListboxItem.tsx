import { Box, Chip, Link } from '@mui/material';
import { ItemProps } from './type';
import darkLogo from '@monorepo/service/src/assets/darkLogo.webp';
import { useProfileState } from '@monorepo/service/src/context/UserProfile';
import { loginModalState } from '@monorepo/service/src/recoil/atom/loginModalState';
import { useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

export default function ListboxItem({ item, index }: ItemProps) {
    const { token } = useProfileState();
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const setModalOpen = useSetRecoilState(loginModalState);
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
                    <Box
                        key={index}
                        borderBottom={1}
                        borderColor="primary.main"
                        padding="30px 20px"
                        width="97%"
                        sx={theme => ({
                            [theme.breakpoints.down('sm')]: {
                                display: 'flex',
                                flexDirection: 'column',
                            },
                        })}
                    >
                        <h1 className="w-full overflow-hidden text-xl font-bold bold whitespace-nowrap pl-4 text-ellipsis max-[600px]:text-xs max-[600px]:hidden">
                            {item.techBlogPostBasicInfoDto.title}
                        </h1>
                        <div className="flex items-center justify-between w-full pt-2 pb-2 max-[600px]:flex-col max-[600px]:w-full">
                            {item.techBlogPostBasicInfoDto.thumbnailUrl ? (
                                <Box
                                    sx={theme => ({
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
                                    sx={theme => ({
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
                                    })}
                                />
                            )}
                            <div className=" flex flex-col w-full overflow-hidden">
                                <h1 className="w-full overflow-hidden text-xl font-bold bold whitespace-nowrap pl-4 text-ellipsis max-[600px]:text-xs sm:hidden">
                                    {item.techBlogPostBasicInfoDto.title}
                                </h1>
                                <p className="text-base overflow-hidden text-ellipsis h-[130px] max-h-[140px] pl-4 pt-[10px] pb-[10px] max-[600px]:text-xs">
                                    {item.techBlogPostBasicInfoDto.summary}
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
                                    sx={theme => ({
                                        [theme.breakpoints.down('sm')]: { fontSize: '10px' },
                                    })}
                                />
                            ))}
                        </Box>
                        <div className="flex justify-between w-[150px] mt-[10px]">
                            <span className="flex items-center justify-around text-xs text-center">
                                좋아요: {item.techBlogPostBasicInfoDto.postLike}
                            </span>
                            <span className="text-xs">
                                조회수: {item.techBlogPostBasicInfoDto.viewCount}
                            </span>
                        </div>
                    </Box>
                </Link>
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
                        <h1 className="w-full overflow-hidden text-xl font-bold bold whitespace-nowrap text-ellipsis mb-[20px]">
                            {item.techBlogPostBasicInfoDto.title}
                        </h1>
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
                        <div className="flex mt-[10px] w-[150px] justify-between">
                            <span className="flex items-center justify-around text-xs text-center">
                                좋아요: {item.techBlogPostBasicInfoDto.postLike}
                            </span>
                            <span className="text-xs">
                                조회수: {item.techBlogPostBasicInfoDto.viewCount}
                            </span>
                        </div>
                    </Box>
                </Link>
            )}
        </>
    );
}
