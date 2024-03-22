import ListboxItem from '@monorepo/component/src/stories/listbox/ListboxItem';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useParams } from 'react-router-dom';
import HttpClient from '../apis/HttpClient';

type itemType = {
    id: number;
    techBlogPostBasicInfoDto: {
        id: number;
        title: String;
        summary: String;
        thumbnailUrl: String;
        postLike: number;
        viewCount: number;
    };
    categoryDto: [
        {
            id: number;
            name: String;
        },
    ];
};

const StyledDatePicker = styled(DatePicker)(({ theme }: { theme: any }) => ({
    '& .MuiInputBase-root': {
        borderRadius: '15px',
        backgroundColor: theme.palette.primary.main,
    },
}));

export const AlarmListPage = () => {
    const { from, to } = useParams();
    const [stDate, setStDate] = useState<Dayjs | null>(dayjs(new Date()));
    const [enDate, setEnDate] = useState<Dayjs | null>(dayjs(new Date()));
    const [list, setList] = useState<itemType[]>([]);

    async function getList(from: string, to: string) {
        try {
            const res = await HttpClient.get(`/api/v1/members/me/web-push/posts/date`, {
                params: {
                    from: from,
                    to: to,
                },
            });

            console.log(res);
            if (res.status === 200) {
                setList(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (from && to) {
            setStDate(dayjs(from));
            setEnDate(dayjs(to));

            getList(from, to);
        } else {
            console.log(stDate);
            console.log(enDate);
        }
    }, [from, to]);

    return (
        <Box>
            <Box display="flex" alignItems="center" marginBottom={'30px'}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StyledDatePicker value={stDate} onChange={(date: any) => setStDate(date)} />
                    <span className="px-2">~</span>
                    <StyledDatePicker value={enDate} onChange={(date: any) => setEnDate(date)} />
                </LocalizationProvider>
            </Box>
            <Box>{list && list.map(data => <ListboxItem key={data.id} item={data} />)}</Box>
        </Box>
    );
};
