import TopPost from './TopPost';
import TopKeywords from './TopKeywords';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';
import { useRecoilValue } from 'recoil';

import Recommend from '../../components/recommend/Recommend';
import { Box, Typography } from '@mui/material';
import { useTopPostQuery } from '../../hooks/useTopPostQuery';

export default function Aside() {
    const loggedIn = useRecoilValue(isLoggedInState);

    const { data, isLoading } = useTopPostQuery();

    if (isLoading) <div>loading...</div>;

    return (
        <div className="flex flex-col justify-around w-full ">
            {loggedIn && <Recommend />}
            <TopKeywords />
            <Box>
                <Typography variant="h6" fontWeight="bold">
                    가장 많이 읽은 글
                </Typography>
                <Box
                    borderBottom={1}
                    borderColor="primary.main"
                    className="flex flex-col w-full mb-4"
                >
                    {data?.map((value: any) => (
                        <TopPost item={value} key={value.techBlogPostBasicInfoDto.id} />
                    ))}
                </Box>
            </Box>
        </div>
    );
}
