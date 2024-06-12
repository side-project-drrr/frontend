import { Box, Typography } from '@mui/material';
import { useTopKeyWordQuery } from '../../hooks/useTopKeyWordQuery';

export default function TopKeywords() {
    const { data, isLoading } = useTopKeyWordQuery();

    if (isLoading) <div>loading..</div>;

    return (
        <Box
            borderBottom={1}
            borderColor="primary.main"
            width="100%"
            paddingBottom="30px"
            marginBottom="30px"
        >
            <Typography variant="h6" fontWeight="bold">
                가장 많이 검색된 기술
            </Typography>
            <div className="flex items-center w-full">
                <ul className="flex mt-3 gap-2 flex-wrap max-h-[130px] overflow-y-hidden">
                    {data &&
                        data?.map((topkeyword: { id: string; name: string }) => (
                            <li
                                key={topkeyword.id}
                                aria-label="top keyword item"
                                className=" whitespace-nowrap bg-[#F0F0F0] text-black dark:bg-[#444444] dark:text-white py-2 px-4 rounded-xl text-sm"
                            >
                                {topkeyword.name}
                            </li>
                        ))}
                </ul>
            </div>
        </Box>
    );
}
