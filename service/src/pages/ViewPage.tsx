import { Box, Button, Chip, Typography, styled } from '@mui/material';
import darkLogo from '@monorepo/service/src/assets/darkLogo.webp';
import HttpClient from '../apis/HttpClient';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type postType = {
    id: number;
    title: String;
    techBlogCode: String;
    thumbnailUrl: String;
    aiSummary: String;
    writtenDate: String;
    viewCount: number;
    postLikeCount: number;
    author: String;
    url: String;
};

export const ViewPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState<postType>({});
    const StyledButton = styled(Button)({
        borderRadius: '15px',
    });

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await HttpClient.get(`/api/v1/posts/${postId}`);
                console.log(res);

                if (res.status === 200) {
                    setPost(res.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        const readPost = async () => {
            try {
                const res = await HttpClient.get(`/api/v1/members/me/past/read-post/${postId}`);

                if (!res.data.isRead) {
                    HttpClient.post(`/api/v1/members/me/read-post/${postId}`);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getPost();
        readPost();
    }, []);

    return (
        <Box>
            <Typography variant="h3" textAlign="center">
                {post.title}
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" paddingY="25px">
                <Typography variant="body2">{post.author}</Typography>
                <span className="px-2">|</span>
                <Typography variant="body2">{post.writtenDate}</Typography>
            </Box>
            <Box>
                {post.thumbnailUrl ? (
                    <Box
                        bgcolor="background.paper"
                        height="600px"
                        borderRadius="20px"
                        display={'flex'}
                        justifyContent={'center'}
                        overflow={'hidden'}
                    >
                        <img
                            src={`${post.thumbnailUrl}`}
                            alt={`${post.techBlogCode}`}
                            className="w-full h-auto"
                        />
                    </Box>
                ) : (
                    <Box
                        bgcolor="background.paper"
                        height="400px"
                        borderRadius="20px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <img src={darkLogo} alt="logo" />
                    </Box>
                )}

                <Typography variant="body1" paddingY="20px">
                    {post.aiSummary}
                </Typography>
                <Box display="flex" justifyContent="center">
                    <Chip label="1" />
                </Box>
            </Box>
            <Box textAlign="center" marginTop="20px">
                <StyledButton
                    variant="contained"
                    onClick={() => window.open(`${post.url}`, '_blank')}
                    rel="noopener noreferrer"
                    size="large"
                    color="secondary"
                >
                    <Typography variant="h5" color="#fff">
                        블로그로 이동하기
                    </Typography>
                </StyledButton>
            </Box>
        </Box>
    );
};
