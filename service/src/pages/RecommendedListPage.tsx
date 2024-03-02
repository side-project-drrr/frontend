import { Card, CardContent, CardHeader, Chip, Typography } from '@mui/material';

export const RecommendedListPage = () => {
    return (
        <div>
            <h1 className="text-center py-10">...님을 위한 추천 리스트</h1>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((data, idx) => (
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
            </div>
        </div>
    );
};
