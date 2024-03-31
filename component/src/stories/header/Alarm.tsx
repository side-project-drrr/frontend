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
    postCount: number;
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
    const [mark, setMark] = useState(false);

    // 알림 팝업 함수
    async function handleAlarmClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
        setOpen(previousOpen => !previousOpen);

        if (mark) {
            let dates = [];
            for (let list of alarmList) {
                dates.push(list.pushDate);
            }

            // 알림 열기 처리 api
            try {
                const res = await HttpClient.post('/api/v1/members/me/web-push/posts/open', {
                    pushDates: dates,
                });

                if (res.status === 200) {
                    setMark(false);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    // 알림 리스트 클릭 시
    async function handleAlarmListClick(date: String) {
        //알림 읽음 처리 api
        try {
            const res = await HttpClient.post(
                `/api/v1/members/me/web-push/posts/read?pushDate=${date}`,
            );

            if (res.status === 200) {
                navigate(`/alarm/list`, { state: { from: date, to: date } });
                setOpen(false);
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

                if (res.status === 200) {
                    if (res.data.length > 0) {
                        setAlarmList(res.data);

                        // 가장 최근 날짜를 오픈한 기록이 없다면
                        if (!res.data[0].openStatus) {
                            setMark(true);
                        }
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
                sx={{ cursor: alarmList.length > 0 ? 'pointer' : 'none' }}
            >
                <NotificationsActiveIcon />
            </Badge>

            {alarmList.length > 0 && (
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
                                width={350}
                                overflow="hidden"
                                bgcolor="background.paper"
                                py="15px"
                                border="1px solid primary.main"
                                borderRadius="20px"
                                boxShadow={4}
                            >
                                <Box
                                    width="100%"
                                    display="flex"
                                    flexDirection="row-reverse"
                                    px="30px"
                                >
                                    <Link href={'/alarm/list'}>
                                        <ButtonBase>
                                            <Typography variant="body2" color="text.primary">
                                                더보기
                                            </Typography>
                                        </ButtonBase>
                                    </Link>
                                </Box>
                                <MenuList>
                                    {alarmList.map((data, idx) => (
                                        <MenuItem
                                            key={idx}
                                            onClick={() => handleAlarmListClick(data.pushDate)}
                                            sx={{
                                                padding: '10px 30px',
                                                opacity: data.readStatus ? '.4' : '1',
                                            }}
                                        >
                                            <Box display="flex" flexDirection="column" py="10px">
                                                <Typography variant="body1" mb="2px">
                                                    ...님이 좋아하실만한 기술 블로그!
                                                </Typography>
                                                <Typography variant="body2" color="#ABABAB">
                                                    {data.pushDate}
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    sx={{
                                                        position: 'absolute',
                                                        right: '30px',
                                                        top: '50%',
                                                        transform: 'translate(0, -50%)',
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '50%',
                                                        backgroundColor: 'secondary.main',
                                                        textAlign: 'center',
                                                        lineHeight: '20px',
                                                        fontSize: '10px',
                                                    }}
                                                >
                                                    {data.postCount}
                                                </Typography>
                                            </Box>
                                        </MenuItem>
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
