import { Box, Button, Typography, styled } from '@mui/material';
import darkLogo from '../assets/darkLogo.webp';
import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useViewQuery } from '../hooks/useViewQuery';

export const ViewPage = () => {
    const navigate = useNavigate();
    const { postId } = useParams<{ postId: string }>();
    const StyledButton = styled(Button)({
        borderRadius: '15px',
    });

    if (!postId) {
        alert('잘못된 접근입니다.');
        navigate('/');
    }

    const { data, error } = useViewQuery(postId!);

    if (error) return '에러가 발생했습니다.';

    return (
        data && (
            <Box>
                <Typography variant="h3" textAlign="center">
                    {data.title}
                </Typography>
                <Box display="flex" justifyContent="center" alignItems="center" paddingY="25px">
                    <Typography variant="body2">{data.author}</Typography>
                    <span className="px-2">|</span>
                    <Typography variant="body2">{data.writtenDate}</Typography>
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
                                data?.thumbnailUrl ? data.thumbnailUrl : darkLogo
                            })`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            backgroundSize: data.thumbnailUrl ? 'cover' : '50px',
                        }}
                    ></Box>

                    <Typography variant="body1" padding="20px">
                        {data.aiSummary.split('\r\n').map((line, idx) => (
                            <Fragment key={idx}>
                                {line}
                                <br />
                            </Fragment>
                        ))}
                    </Typography>
                </Box>
                <Box textAlign="center" marginTop="20px" paddingBottom="40px">
                    <StyledButton
                        variant="contained"
                        onClick={() => window.open(`${data.url}`, '_blank')}
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
