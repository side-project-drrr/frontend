import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ICardItemsProps } from './type';
import { Box, Link } from '@mui/material';
import { loginModalState } from '../../recoil/atom/loginModalState';
import { useEffect, useState } from 'react';
import { useProfileState } from '../../context/UserProfile';
import { useSetRecoilState } from 'recoil';
import {
    postIncreasedMemberViewsService,
    postIncreasedViewsService,
} from '../../service/TechBlogService';
import darkLogo from '../../assets/darkLogo.webp';

export default function CardComponent({ item, index }: ICardItemsProps) {
    const { token } = useProfileState();
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const setModalOpen = useSetRecoilState(loginModalState);

    async function postIncreasedViewsRender(postId: string) {
        if (isLogin) {
            postIncreasedMemberViewsService(postId);
        } else {
            postIncreasedViewsService(postId);
        }
    }

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
                        maxWidth: '49%',
                        minWidth: '49%',
                    }}
                    onClick={() => postIncreasedViewsRender(item.techBlogPostBasicInfoDto.id)}
                >
                    <Card
                        sx={{
                            marginTop: '15px',
                            borderRadius: '20px',
                        }}
                        key={index}
                        id={item.techBlogPostBasicInfoDto.id}
                    >
                        <div className="px-6 pt-6">
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItem: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: '170px',
                                    backgroundColor: 'rgb(158, 158, 158)',
                                    borderRadius: '20px',
                                    backgroundImage: `url(${item.techBlogPostBasicInfoDto.thumbnailUrl ? item.techBlogPostBasicInfoDto.thumbnailUrl : darkLogo})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center center',
                                    backgroundSize: `${item.techBlogPostBasicInfoDto.thumbnailUrl ? '100%' : '10%'}`,
                                }}
                            />
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    padding: '0',
                                }}
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
                                        postIncreasedViewsRender(item.techBlogPostBasicInfoDto.id)
                                    }
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        color="text.primary"
                                        sx={{
                                            fontSize: '20px',
                                            width: '100%',
                                            marginBottom: '1rem',
                                            textOverflow: 'ellipsis',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            marginTop: '1.8rem',
                                        }}
                                    >
                                        {item.techBlogPostBasicInfoDto.title}
                                    </Typography>
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
                                    <Typography
                                        variant="body2"
                                        color="text.primary"
                                        sx={{
                                            width: '100%',
                                            display: 'block',
                                            overflow: 'hidden',
                                            height: '6.5rem',
                                            marginBottom: '1.5rem',
                                            lineHeight: '1.25',
                                        }}
                                    >
                                        {item.techBlogPostBasicInfoDto.summary}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.primary"
                                        sx={{
                                            paddingBottom: '1rem',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowarp',
                                            lineHeight: '1.25',
                                        }}
                                    >
                                        <ul className="flex flex-wrap w-full overflow-y-hidden h-[30px] ">
                                            {item.categoryDto?.map((item: any) => (
                                                <li
                                                    key={item.id}
                                                    id={item.id}
                                                    className="mr-2 text-xs"
                                                >
                                                    #{item.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary"></Typography>
                                </Link>
                            </CardContent>
                        </div>
                    </Card>
                </Link>
            ) : (
                <Link
                    color="text.primary"
                    underline="none"
                    sx={{
                        '&:hover': {
                            color: 'text.primary',
                        },
                        maxWidth: '49%',
                        minWidth: '49%',
                    }}
                    onClick={handleLinkClick}
                >
                    <Card
                        sx={{
                            marginTop: '15px',
                            borderRadius: '20px',
                        }}
                        key={index}
                        id={item.techBlogPostBasicInfoDto.id}
                    >
                        <div className="px-6 pt-6">
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItem: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: '170px',
                                    backgroundColor: 'rgb(158, 158, 158)',
                                    borderRadius: '20px',
                                    backgroundImage: `url(${item.techBlogPostBasicInfoDto.thumbnailUrl ? item.techBlogPostBasicInfoDto.thumbnailUrl : darkLogo})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center center',
                                    backgroundSize: `${item.techBlogPostBasicInfoDto.thumbnailUrl ? '100%' : '10%'}`,
                                }}
                            />
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    padding: '0',
                                }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    color="text.primary"
                                    sx={{
                                        fontSize: '20px',
                                        width: '100%',
                                        marginBottom: '1rem',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        marginTop: '1.8rem',
                                    }}
                                >
                                    {item.techBlogPostBasicInfoDto.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.primary"
                                    sx={{
                                        width: '100%',
                                        display: 'block',
                                        overflow: 'hidden',
                                        height: '6.5rem',
                                        marginBottom: '1.5rem',
                                        lineHeight: '1.25',
                                    }}
                                >
                                    {item.techBlogPostBasicInfoDto.summary}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.primary"
                                    sx={{
                                        paddingBottom: '1rem',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowarp',
                                        lineHeight: '1.25',
                                    }}
                                >
                                    <ul className="flex flex-wrap w-full overflow-y-hidden h-[30px] ">
                                        {item.categoryDto?.map((item: any) => (
                                            <li key={item.id} id={item.id} className="mr-2 text-xs">
                                                #{item.name}
                                            </li>
                                        ))}
                                    </ul>
                                </Typography>
                                <Typography variant="body2" color="text.secondary"></Typography>
                            </CardContent>
                        </div>
                    </Card>
                </Link>
            )}
        </>
    );
}
