import { Box, Card, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { recommendedListApi } from '../apis/recommended';

type recommendedItem = {
    category: { id: number; name: string }[];
    postInfo: {
        id: number;
        postLike: number;
        viewCount: number;
        title: string;
        summary: string;
    };
};

export const RecommendedListPage = () => {
    const [list, setList] = useState<recommendedItem[]>([]);
    // async function onClick(id: number) {
    //     // const res = await readPostApi(id);
    //     // 뷰 작업 후 페이지 이동 로직 추가
    // }

    useEffect(() => {
        async function recommendedList() {
            const res = await recommendedListApi();

            setList(() => {
                const updatedList = res.data.map(
                    (newData: { categoryDto: {}; techBlogPostBasicInfoDto: {} }) => ({
                        category: newData.categoryDto,
                        postInfo: newData.techBlogPostBasicInfoDto,
                    }),
                );
                return [...updatedList];
            });
        }
        recommendedList();
    }, []);

    return (
        <div>
            <h1 className="py-10 text-center">...님을 위한 추천 리스트</h1>
            <div
                className={`grid gap-3 ${
                    list.length > 5 ? 'lg:grid-cols-3 sm:grid-cols-2 grid-cols-1' : ''
                }`}
            >
                {list.length > 0 ? (
                    list.map(data => (
                        <Card
                            key={data.postInfo.id}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                borderRadius: '20px',
                                boxShadow: '4',
                                padding: '20px',
                            }}
                            //onClick={() => onClick(data.postInfo.id)}
                        >
                            <Box marginBottom="10px">
                                <Box marginBottom="10px">
                                    <Typography
                                        variant="h5"
                                        className="line-clamp-1"
                                        color="text.primary"
                                    >
                                        {data.postInfo.title}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="body2"
                                    color="text.primary"
                                    className="line-clamp-3"
                                >
                                    {data.postInfo.summary}
                                </Typography>
                            </Box>
                            <Box>
                                <div className="flex flex-wrap mt-3 max-h-[70px] overflow-y-hidden">
                                    {data.category.map(item => (
                                        <span
                                            key={`${data.postInfo.id}-${item.id}`}
                                            className="text-[14px] mr-[10px] mb-[2px]"
                                        >
                                            #{item.name}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex mt-3">
                                    <span className="flex items-center mr-3">
                                        <BiSolidLike className="mr-1" /> {data.postInfo.postLike}
                                    </span>
                                    <span className="flex items-center">
                                        <FaEye className="mr-1" /> {data.postInfo.viewCount}
                                    </span>
                                </div>
                            </Box>
                        </Card>
                    ))
                ) : (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                        textAlign="center"
                        py="20%"
                    >
                        <Typography variant="h4">추천 게시글이 없습니다. :(</Typography>
                    </Box>
                )}
            </div>
        </div>
    );
};
