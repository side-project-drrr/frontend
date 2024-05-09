import { useEffect, useState } from 'react';

import { getRecommendTechBlogService } from '../../service/TechBlogService';
import { IRandomDataProps } from './type';

import darkLogo from '../../assets/darkLogo.webp';
import { Box, Link, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useProfileState } from '../../context/UserProfile';

export default function Recommend() {
    const [recommendData, setRecommendData] = useState([]);
    const [randomRecommendData, setRandomRecommendData] = useState<IRandomDataProps>();
    const { token } = useProfileState();
    async function getRecommenedDataRender() {
        const recommendBlogData = await getRecommendTechBlogService();

        if (recommendBlogData?.status === 200) setRecommendData(recommendBlogData.data);
    }

    useEffect(() => {
        if (token) getRecommenedDataRender();
    }, [token]);

    useEffect(() => {
        if (recommendData.length > 0) {
            const randomIndex = Math.floor(Math.random() * recommendData.length);
            setRandomRecommendData(recommendData[randomIndex]);
        }
    }, [recommendData]);

    return (
        <Box
            className="flex flex-col justify-around"
            borderBottom={1}
            borderColor="primary.main"
            paddingBottom="30px"
            marginBottom="30px"
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                marginBottom="10px"
            >
                <Typography variant="h6" fontWeight="bold">
                    추천 게시글
                </Typography>
                <Link
                    href="/recommend/list"
                    color="text.primary"
                    underline="none"
                    sx={{
                        '&:hover': {
                            color: 'text.primary', // hover 시 변경할 색상 설정
                        },
                    }}
                >
                    <p className="text-xs bg-transparent">더보기</p>
                </Link>
            </Box>
            {randomRecommendData ? (
                <div
                    className="relative flex items-center w-full"
                    key={randomRecommendData?.techBlogPostBasicInfoDto?.id}
                >
                    <Box
                        minWidth="80px"
                        minHeight="80px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="20px"
                        bgcolor="background.paper"
                        sx={{
                            backgroundImage: `url(${
                                randomRecommendData?.techBlogPostBasicInfoDto?.thumbnailUrl
                                    ? randomRecommendData.techBlogPostBasicInfoDto.thumbnailUrl
                                    : darkLogo
                            })`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            backgroundSize: randomRecommendData?.techBlogPostBasicInfoDto
                                ?.thumbnailUrl
                                ? 'cover'
                                : '50%',
                        }}
                    />

                    <div>
                        <Link
                            href={`/view/${randomRecommendData?.techBlogPostBasicInfoDto?.id}`}
                            color="text.primary"
                            underline="none"
                            sx={{
                                '&:hover': {
                                    color: 'text.primary',
                                },
                            }}
                        >
                            {randomRecommendData?.techBlogPostBasicInfoDto?.title}
                        </Link>
                        <Typography variant="body2" color="text.secondary">
                            <span className="flex items-center gap-2">
                                <ThumbUpIcon sx={{ fontSize: '15px' }} />
                                {randomRecommendData.techBlogPostBasicInfoDto.likeCount}
                                <RemoveRedEyeIcon sx={{ fontSize: '15px' }} />
                                {randomRecommendData.techBlogPostBasicInfoDto.viewCount}
                            </span>
                        </Typography>
                    </div>
                </div>
            ) : (
                <>
                    <p>추천 게시글이 없습니다.</p>
                </>
            )}
        </Box>
    );
}
