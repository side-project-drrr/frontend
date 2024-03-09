import { Box, Button, Card, Chip, Stack, TextField } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver.tsx';
import { useState } from 'react';

let i = 100;
const SelectCategoryForm = () => {
    const [arr, setArr] = useState<string[]>([]);

    const addNewArray = () => {
        setArr(arr => {
            return [...arr, ...new Array(i).fill(0).map((i, index) => index + '')];
        });
        i += 100;
    };
    const setObservationTarget = useIntersectionObserver(addNewArray);

    return (
        <Card>
            <CardContent>
                <Typography>선호카테고리 등록</Typography>

                <Divider />

                <br />
                <TextField placeholder="검색" variant="outlined" aria-label="검색창" />

                <Box
                    display={'flex'}
                    flexWrap={'wrap'}
                    height={400}
                    width={400}
                    sx={{
                        overflowY: 'scroll',
                    }}
                >
                    {arr.map((i, index) => (
                        <Chip label="1234" key={index} />
                    ))}

                    <div ref={setObservationTarget}></div>
                </Box>

                <Button>선택</Button>
            </CardContent>
        </Card>
    );
};
const SignupForm = () => {
    return (
        <Card className="w-[500px]">
            <CardContent>
                <div className="flex flex-col items-center center w-full gap-2 ">
                    <h1 className="pb-3 text-base">시작하기</h1>
                </div>
                <Divider />
                <div className="flex text-black grow flex-wrap w-full p-5" aria-label="이용 약관">
                    <p className="w-9/12">
                        지금 로그인하고 매일 새로운 기술블로그 소식을 전달받아보세요
                    </p>
                </div>
                <Divider />

                <br />
                <Stack spacing={2}>
                    <TextField />
                    <TextField />
                    <TextField />
                    <Button>확인</Button>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default SelectCategoryForm;
