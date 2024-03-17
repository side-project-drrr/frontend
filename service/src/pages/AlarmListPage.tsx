import ListboxItem from '@monorepo/component/src/stories/listbox/ListboxItem';
import { Box, styled } from '@mui/material';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const item = [
    {
        id: 1,
        techBlogPostBasicInfoDto: {
            id: 1,
            title: 'title1',
            summary: 'summary1',
            thumbnailUrl: 'thumbnailUrl1',
            postLike: 1,
            viewCount: 1,
        },
        categoryDto: [
            {
                id: 1,
                name: 'name1',
            },
        ],
    },
    {
        id: 2,
        techBlogPostBasicInfoDto: {
            id: 2,
            title: 'title2',
            summary: 'summary2',
            thumbnailUrl: 'thumbnailUrl2',
            postLike: 2,
            viewCount: 2,
        },
        categoryDto: [
            {
                id: 2,
                name: 'name2',
            },
        ],
    },
];

const StyledDatePicker = styled(DatePicker)(({ theme }: { theme: any }) => ({
    '& .MuiInputBase-root': {
        borderRadius: '15px',
        backgroundColor: theme.palette.primary.main,
    },
}));

export const AlarmListPage = () => {
    const [stDate, setStDate] = useState<Dayjs | null>(dayjs(new Date()));
    const [enDate, setEnDate] = useState<Dayjs | null>(dayjs(new Date()));

    return (
        <Box>
            <Box display="flex" alignItems="center" marginBottom={'30px'}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StyledDatePicker value={stDate} onChange={(date: any) => setStDate(date)} />
                    <span className="px-2">~</span>
                    <StyledDatePicker value={enDate} onChange={(date: any) => setEnDate(date)} />
                </LocalizationProvider>
            </Box>
            <Box>
                {item.map(data => (
                    <ListboxItem key={data.id} item={data} />
                ))}
            </Box>
        </Box>
    );
};
