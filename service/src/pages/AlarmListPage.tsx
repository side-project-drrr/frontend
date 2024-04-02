import ListboxItem from '@monorepo/component/src/stories/listbox/ListboxItem';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useLocation } from 'react-router-dom';
import { ItemProps } from '@monorepo/component/src/stories/listbox/type';
import { getListApi } from '@monorepo/component/src/stories/api/alarm';

const StyledDatePicker = styled(DatePicker)(({ theme }: { theme: any }) => ({
    '& .MuiInputBase-root': {
        borderRadius: '15px',
        backgroundColor: theme.palette.primary.main,
    },
}));

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

export const AlarmListPage = () => {
    const { from, to } = useLocation().state;
    const [stDate, setStDate] = useState<string>(getSevenDaysAgoDate());
    const [enDate, setEnDate] = useState<string>(getCurrentDate());
    const [list, setList] = useState<ItemProps[]>([]);

    // 리스트 호출
    async function getList() {
        const res = await getListApi(stDate, enDate);

        if (res.status === 200) {
            setList(res.data);
        }
    }

    useEffect(() => {
        getList();
    }, [stDate, enDate]);

    useEffect(() => {
        if (from && to) {
            setStDate(from);
            setEnDate(to);
        }
    }, [from, to]);

    return (
        <Box>
            <Box display="flex" alignItems="center" marginBottom={'30px'}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StyledDatePicker
                        value={dayjs(stDate)}
                        onChange={(date: Dayjs) => setStDate(date.toISOString().slice(0, 10))}
                    />
                    <span className="px-2">~</span>
                    <StyledDatePicker
                        value={dayjs(enDate)}
                        onChange={(date: any) => setEnDate(date.toISOString().slice(0, 10))}
                    />
                </LocalizationProvider>
            </Box>
            <Box>
                {list &&
                    list.map((data: any) => (
                        <ListboxItem key={data.techBlogPostBasicInfoDto.id} item={data} />
                    ))}
            </Box>
        </Box>
    );
};
