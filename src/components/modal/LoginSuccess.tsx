import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRecoilState } from 'recoil';
import { loginSuccessState } from '../../recoil/atom/loginSuccessState';
import { FaCheckCircle } from 'react-icons/fa';
import Button from '@mui/material/Button';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    height: '380px',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px',
    dispaly: 'flex',
    justifyContent: 'space-around',
    flexdirection: 'column',
    color: 'black',
};

export const LoginSuccess = () => {
    const [open, setOpen] = useRecoilState(loginSuccessState);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="Login">
                <Box sx={style}>
                    <div className="flex flex-col items-center justify-between gap-8">
                        <FaCheckCircle size={80} color="green" />

                        <h3>회원가입 완료</h3>
                        <div className="flex flex-wrap items-center justify-center w-10/12">
                            <p>
                                매일 새로운 기술블로그 소식을{' '}
                                <p className="flex justify-center w-full">전달받아보세요</p>
                            </p>
                        </div>
                        <Button
                            sx={{ width: '100%', backgroundColor: '#f0f0f0' }}
                            onClick={handleClose}
                        >
                            확인
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};
