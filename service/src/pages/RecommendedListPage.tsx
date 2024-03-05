import { Box, Card, CardContent, CardHeader, Chip, Typography } from '@mui/material';
import HttpClient from '../apis/HttpClient';
import { useEffect, useState } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';

type recommendedItem = {
    category: { id: number; name: string }[];
    postInfo: {
        id: number;
        postLike: number;
        viewCount: number;
        title: string;
        summary: string;
    }[];
};

export const RecommendedListPage = () => {
    const [list, setList] = useState<recommendedItem[]>([]);

    async function onClick(id: number) {
        const res = await HttpClient.get(`api/v1/members/read-post/${id}`);
        console.log(res);
    }

    useEffect(() => {
        async function recommendedListApi() {
            const res = await HttpClient.get(`api/v1/members/me/post-recommendation/9`);
            setList((prevList: recommendedItem[]) => {
                const updatedList = res.data.map(
                    (newData: { categoryDto: {}; techBlogPostBasicInfoDto: {} }) => ({
                        category: newData.categoryDto,
                        postInfo: newData.techBlogPostBasicInfoDto,
                    }),
                );
                return [...prevList, ...updatedList];
            });
        }
        recommendedListApi();
    }, []);

    return (
        <div>
            <h1 className="text-center py-10">...님을 위한 추천 리스트</h1>
            <div
                className={`grid gap-3 ${
                    list.length > 5 ? 'lg:grid-cols-3 sm:grid-cols-2 grid-cols-1' : ''
                }`}
            >
                {list.length > 0
                    ? list.map((data, idx) => (
                          <Card
                              key={idx}
                              sx={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'space-between',
                                  borderRadius: '20px',
                                  backgroundColor: '#444',
                                  boxShadow: '4',
                                  padding: '20px',
                              }}
                              onClick={() => onClick(data.postInfo.id)}
                          >
                              <Box sx={{ marginBottom: '10px' }}>
                                  <Box sx={{ marginBottom: '20px' }}>
                                      <Typography variant="h5" className="line-clamp-1">
                                          {data.postInfo.title}
                                      </Typography>
                                  </Box>
                                  <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      className="line-clamp-3"
                                  >
                                      {data.postInfo.summary}
                                  </Typography>
                              </Box>
                              <Box>
                                  <div className="flex flex-wrap mt-3 h-[74px] overflow-y-hidden">
                                      {data.category.map((item, idx) => (
                                          <Chip
                                              key={idx}
                                              className="mr-2 mb-2"
                                              label={`#${item.name}`}
                                          />
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
                    : '추천 게시글이 없습니다.'}
            </div>
            {/* <div className="grid gap-2">
                {[1, 1, 1, 1].map((data, idx) => (
                    <Card key={idx}>
                        <CardHeader title="이것은 제목" />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                이것은 내용입니다.
                            </Typography>
                            <div>
                                <Chip label="#JAVA" />
                                <Chip label="#Spring" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div> */}
        </div>
    );
};
