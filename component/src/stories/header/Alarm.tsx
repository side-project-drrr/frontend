import {
    Badge,
    Box,
    MenuItem,
    Divider,
    Typography,
    ButtonBase,
    Popper,
    Fade,
    MenuList,
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import React, { useState } from 'react';

export const AlarmComponent = () => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [alarmList, setAlarmList] = useState(false);

    // 알림 여부 가져오는 api

    // 알림 팝업 함수
    const handleAlarmClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(previousOpen => !previousOpen);

        //알림 리스트 가져오는 api 호출
    };

    return (
        <>
            <Badge
                aria-describedby="alarm-popper"
                onClick={handleAlarmClick}
                badgeContent={'!'}
                color="secondary"
                className="mr-[10px]"
            >
                <NotificationsActiveIcon />
            </Badge>
            <Popper
                id="alarm-popper"
                anchorEl={anchorEl}
                open={open}
                placement="bottom-end"
                modifiers={[
                    {
                        name: 'offset',
                        options: {
                            offset: [30, 20],
                        },
                    },
                ]}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box
                            maxHeight={500}
                            width={350}
                            overflow="hidden"
                            bgcolor="background.paper"
                            p="15px"
                            border="1px solid primary.main"
                            borderRadius="20px"
                            boxShadow={4}
                        >
                            <Box width="100%" display="flex" flexDirection="row-reverse" px="15px">
                                <ButtonBase>
                                    <Typography variant="body2" py={'10px'}>
                                        더보기
                                    </Typography>
                                </ButtonBase>
                            </Box>
                            <MenuList>
                                {[1, 1, 1, 1, 1].map((data, idx) => (
                                    <>
                                        <MenuItem key={idx}>
                                            <Box display="flex" flexDirection="column" py="5px">
                                                <Typography variant="body1" mb="2px">
                                                    ...님이 좋아하실만한 기술 블로그!
                                                </Typography>
                                                <Typography variant="body2" color="#ABABAB">
                                                    2024.03.10 (금)
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                        <Divider />
                                    </>
                                ))}
                            </MenuList>
                        </Box>
                    </Fade>
                )}
            </Popper>
        </>
    );
};
