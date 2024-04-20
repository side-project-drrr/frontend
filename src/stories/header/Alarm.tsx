import {
    Badge,
    Box,
    MenuItem,
    Typography,
    ButtonBase,
    Popper,
    Fade,
    MenuList,
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import React, { useEffect, useState } from 'react';
import { getAuthStorage } from '../../repository/AuthRepository';
import { useTokenDecode } from '../../hooks/useTokenDecode';
import { useNavigate } from 'react-router-dom';
import { useProfileState } from '../../context/UserProfile';
import { alarmOpenApi, alarmReadApi, getPushDataApi } from '../../apis/alarm';

type alarmType = {
    openStatus: Boolean;
    readStatus: Boolean;
    postCount: number;
    pushDate: String;
};

// 현재 날짜를 가져오는 함수
function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 만듭니다.
    const day = currentDate.getDate().toString().padStart(2, '0'); // 일자를 두 자리로 만듭니다.
    return `${year}-${month}-${day}`;
}

// 7일 전 날짜를 가져오는 함수
function getSevenDaysAgoDate() {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 현재 시간에서 7일을 빼고 새로운 날짜 객체 생성
    const year = sevenDaysAgo.getFullYear();
    const month = (sevenDaysAgo.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 만듭니다.
    const day = sevenDaysAgo.getDate().toString().padStart(2, '0'); // 일자를 두 자리로 만듭니다.
    return `${year}-${month}-${day}`;
}

export const AlarmComponent = () => {
    const TOKEN_KEY = 'accessToken';
    const getToken = getAuthStorage(TOKEN_KEY);
    const memberId = useTokenDecode(getToken);
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [alarmList, setAlarmList] = useState<alarmType[]>([]);
    const [mark, setMark] = useState(false);
    const { userData } = useProfileState();

    const readMore = () => {
        navigate(`/alarm/list`, { state: { from: getSevenDaysAgoDate(), to: getCurrentDate() } });
    };

    // 알림 팝업 함수
    async function handleAlarmClick(event: React.MouseEvent<HTMLButtonElement>) {
        setAnchorEl(event.currentTarget);
        setOpen(previousOpen => !previousOpen);

        if (mark) {
            let dates = [];
            for (let list of alarmList) {
                dates.push(list.pushDate);
            }

            const res = await alarmReadApi(dates);

            if (res.status === 200) {
                setMark(false);
            }
        }
    }

    // 알림 리스트 클릭 시
    async function handleAlarmListClick(date: String) {
        //알림 읽음 처리 api
        const res = await alarmOpenApi(date);

        if (res.status === 200) {
            navigate(`/alarm/list`, { state: { from: date, to: date } });
            setOpen(false);
            getAlarmList();
        }
    }

    async function getAlarmList() {
        const res = await getPushDataApi(memberId);

        if (res.status === 200) {
            if (res.data.length > 0) {
                setAlarmList(res.data);

                // 가장 최근 날짜를 오픈한 기록이 없다면
                if (!res.data[0].openStatus) {
                    setMark(true);
                }
            }
        }
    }

    useEffect(() => {
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
                                    <ButtonBase onClick={readMore}>
                                        <Typography variant="body2" color="text.primary">
                                            더보기
                                        </Typography>
                                    </ButtonBase>
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
                                                    {userData.nickname}님이 좋아하실만한 기술
                                                    블로그!
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
