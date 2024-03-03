import { Card, CardContent, CardHeader, Chip, Typography } from '@mui/material';
import HttpClient from '../apis/HttpClient';
import { useEffect, useState } from 'react';
import { BiSolidLike } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';

export const RecommendedListPage = () => {
    const [list, setList] = useState([]);

    async function onClick(id: number) {
        const res = await HttpClient.get(`api/v1/members/read-post/${id}`);
        console.log(res);
    }

    useEffect(() => {
        async function recommendedListApi() {
            const res = await HttpClient.get(`api/v1/members/me/post-recommendation/9`);
            console.log(res);
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
                {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((data, idx) => (
                    <Card
                        key={idx}
                        sx={{ borderRadius: '20px', backgroundColor: '#444', boxShadow: '4' }}
                    >
                        <CardHeader title="이것은 제목" />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                이것은 내용입니다.
                            </Typography>
                            <div className="flex mt-3">
                                <Chip className="mr-2" label="#JAVA" />
                                <Chip label="#Spring" />
                            </div>
                            <div className="flex mt-2">
                                <span className="flex items-center mr-2">
                                    <BiSolidLike className="mr-1" /> 1000
                                </span>
                                <span className="flex items-center">
                                    <FaEye className="mr-1" /> 1000
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
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
