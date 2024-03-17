import { Avatar, Box, Button, Chip, Typography, styled } from '@mui/material';
import darkLogo from '@monorepo/service/src/assets/darkLogo.webp';

export const ViewPage = () => {
    const StyledButton = styled(Button)({
        borderRadius: '15px',
    });
    return (
        <Box>
            <Typography variant="h3" textAlign="center">
                제목
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" paddingY="25px">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <span className="px-2">|</span>
                <span className="px-2">|</span>
                <Typography variant="body2">날짜</Typography>
            </Box>
            <Box>
                <Box bgcolor="background.paper" className="h-[400px]">
                    <img src={darkLogo} alt="" />
                </Box>
                <Typography variant="body1" paddingY="20px">
                    내용
                </Typography>
                <Box display="flex" justifyContent="center">
                    <Chip label="1" />
                </Box>
            </Box>
            <Box textAlign="center" marginTop="20px">
                <StyledButton variant="contained" href={'#'} size="large" color="secondary">
                    <Typography variant="h5" color="#fff">
                        블로그로 이동하기
                    </Typography>
                </StyledButton>
            </Box>
        </Box>
    );
};
