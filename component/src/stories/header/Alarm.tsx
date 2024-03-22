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
    Link,
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import React, { useEffect, useState } from 'react';
import HttpClient from '@monorepo/service/src/apis/HttpClient';
import { getAuthStorage } from '@monorepo/service/src/repository/AuthRepository';
import { useTokenDecode } from '@monorepo/service/src/hooks/useTokenDecode';
import { useNavigate } from 'react-router-dom';

type alarmType = {
    openStatus: Boolean;
    readStatus: Boolean;
    postCount: Number;
    pushDate: String;
};

// 날짜 변수 선언
const currentDate = new Date();
const sevenDaysAgoDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
const today = currentDate.toISOString().slice(0, 10);
const sevenDaysAgo = sevenDaysAgoDate.toISOString().slice(0, 10);

export const AlarmComponent = () => {
    const TOKEN_KEY = 'accessToken';
    const getToken = getAuthStorage(TOKEN_KEY);
    const memberId = useTokenDecode(getToken);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [alarmList, setAlarmList] = useState<alarmType[]>([]);
    const [mark, setMark] = useState(true);

    // 알림 팝업 함수
    async function handleAlarmClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
        setOpen(previousOpen => !previousOpen);

        // 알림 열기 처리 api
        try {
            const res = await HttpClient.post(`/api/v1/members/me/web-push/posts/open`);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }

    // 알림 리스트 클릭 시
    async function handleAlarmListClick(date: String) {
        //알림 읽음 처리 api
        try {
            const res = await HttpClient.post(`/api/v1/members/me/web-push/posts/read`, {
                params: {
                    pushDate: date,
                },
            });
            console.log(res);
            if (res.status === 200) {
                navigate(`/alarm/list?from=${date}&to=${date}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function getAlarmList() {
            try {
                const res = await HttpClient.get(`/api/v1/members/me/web-push/posts/count/7`, {
                    params: {
                        memberId: memberId,
                    },
                });
                console.log(res);
                if (res.status === 200) {
                    if (res.data.length > 0) {
                        setAlarmList(res.data);

                        // 가장 최근 날짜를 오픈한 기록이 있다면
                        if (res.data[0].openStatus) {
                            setMark(false);
                        }
                    } else {
                        setMark(false);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        memberId && getAlarmList();
    }, []);

    return (
        <>
            <Badge
                aria-describedby="alarm-popper"
                onClick={handleAlarmClick}
                badgeContent={'!'}
                color="secondary"
                className="mr-[10px]"
                invisible={!mark}
            >
                <NotificationsActiveIcon />
            </Badge>

            {mark && (
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
                                <Box
                                    width="100%"
                                    display="flex"
                                    flexDirection="row-reverse"
                                    px="15px"
                                >
                                    <Link href={`/alarm/list?from=${sevenDaysAgo}&to=${today}`}>
                                        <ButtonBase>
                                            <Typography variant="body2" py={'10px'}>
                                                더보기
                                            </Typography>
                                        </ButtonBase>
                                    </Link>
                                </Box>
                                <MenuList>
                                    {alarmList.map((data, idx) => (
                                        <>
                                            <MenuItem
                                                key={idx}
                                                onClick={() => handleAlarmListClick(data.pushDate)}
                                            >
                                                <Box display="flex" flexDirection="column" py="5px">
                                                    <Typography variant="body1" mb="2px">
                                                        ...님이 좋아하실만한 기술 블로그!
                                                    </Typography>
                                                    <Typography variant="body2" color="#ABABAB">
                                                        {data.pushDate}
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
            )}
        </>
    );
};
