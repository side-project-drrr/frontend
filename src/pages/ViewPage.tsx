import { Box, Button, Chip, Typography, styled } from '@mui/material';
import darkLogo from '../assets/darkLogo.webp';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostApi, readPostApi } from '../apis/view';

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

const ViewPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState<postType>();
    const StyledButton = styled(Button)({
        borderRadius: '15px',
    });

    useEffect(() => {
        const getPost = async () => {
            if (postId) {
                const res = await getPostApi(postId);
                if (res.status === 200) {
                    const regex = /\./g;
                    const text = res.data.aiSummary;
                    const newText = text.replaceAll(regex, '.\r\n');
                    res.data.aiSummary = newText;

                    const regexThumb = /\s+/g;
                    const url = res.data.thumbnailUrl;
                    const newUrl = url.replace(regexThumb, '%20');

                    if (url) {
                        res.data.thumbnailUrl = newUrl;
                    }
                    setPost(res.data);
                }
            }
        };
        getPost();
        postId && readPostApi(postId);
    }, [postId]);

    return (
        post && (
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
                    <Box
                        bgcolor="background.paper"
                        borderRadius="20px"
                        margin="0 auto"
                        sx={{
                            width: {
                                xs: '100%',
                                md: '80%',
                            },
                            height: {
                                xs: '200px',
                                md: '400px',
                            },
                            backgroundImage: `url(${
                                post?.thumbnailUrl ? post.thumbnailUrl : darkLogo
                            })`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            backgroundSize: post.thumbnailUrl ? 'cover' : '50%',
                        }}
                    ></Box>

                    <Typography variant="body1" padding="20px">
                        {post.aiSummary.split('\r\n').map((line, idx) => (
                            <Fragment key={idx}>
                                {line}
                                <br />
                            </Fragment>
                        ))}
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
                    >
                        <Typography variant="h5">블로그로 이동하기</Typography>
                    </StyledButton>
                </Box>
            </Box>
        )
    );
};

export default ViewPage;
