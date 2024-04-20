import { useEffect, useState } from 'react';

import { getRecommendTechBlogService } from '../../service/TechBlogService';
import { IRandomDataProps } from './type';

import darkLogo from '../../assets/darkLogo.webp';
import { getAuthStorage } from '../../repository/AuthRepository';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../../components/errors/ErrorFallback';
import { Box, Link, Typography } from '@mui/material';

export default function Recommend() {
    const [recommendData, setRecommendData] = useState([]);
    const token = getAuthStorage('accessToken');
    const [randomRecommendData, setRandomRecommendData] = useState<IRandomDataProps>();

    if (!token) throw new Error('재시도');

    async function getRecommenedDataRender() {
        const recommendBlogData = await getRecommendTechBlogService();

        if (recommendBlogData?.status === 200) setRecommendData(recommendBlogData.data);
    }

    useEffect(() => {
        getRecommenedDataRender();
    }, []);

    useEffect(() => {
        if (recommendData.length > 0) {
            const randomIndex = Math.floor(Math.random() * recommendData.length);
            setRandomRecommendData(recommendData[randomIndex]?.techBlogPostBasicInfoDto);
        }
    }, [recommendData]);

    return (
        <ErrorBoundary fallbackRender={ErrorFallback}>
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
                    <p className="text-xs bg-transparent">
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
                            더보기
                        </Link>
                    </p>
                </Box>
                {randomRecommendData ? (
                    <div className="relative flex items-center w-full" key={randomRecommendData.id}>
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
                                    randomRecommendData.thumbnailUrl
                                        ? randomRecommendData.thumbnailUrl
                                        : darkLogo
                                })`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center',
                                backgroundSize: randomRecommendData.thumbnailUrl ? 'cover' : '50%',
                            }}
                        />

                        <Typography variant="body2" paddingLeft="10px">
                            <Link
                                href={`/view/${randomRecommendData.id}`}
                                color="text.primary"
                                underline="none"
                                sx={{
                                    '&:hover': {
                                        color: 'text.primary',
                                    },
                                }}
                            >
                                {randomRecommendData.title}
                            </Link>
                        </Typography>
                    </div>
                ) : (
                    <>
                        <p>추천 게시글이 없습니다.</p>
                    </>
                )}
            </Box>
        </ErrorBoundary>
    );
}
