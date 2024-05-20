import TopPost from './TopPost';
import TopKeywords from './TopKeywords';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';
import { useRecoilValue } from 'recoil';

import Recommend from '../../components/recommend/Recommend';
import { useEffect, useState } from 'react';
import { getTopPostItemService } from '../../service/TopPostService';
import { Box, Typography } from '@mui/material';

export default function Aside() {
    const [topContent, setTopContent] = useState([]);

    const loggedIn = useRecoilValue(isLoggedInState);

    async function getTopContentRender() {
        const topContentData = await getTopPostItemService();
        setTopContent(topContentData);
    }
    useEffect(() => {
        getTopContentRender();
    }, []);

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
                    {topContent.map((value: any) => (
                        <TopPost item={value} key={value.techBlogPostBasicInfoDto.id} />
                    ))}
                </Box>
            </Box>
        </div>
    );
}
