import { BiLogoGit } from 'react-icons/bi';
import Box from '@mui/material/Box';
import SocialLogin from '@monorepo/service/src/components/social/SocialLogin';
import { loginModalState } from '@monorepo/service/src/recoil/atom/loginModalState';
import Modal from '@mui/material/Modal';
import { BsPersonCircle } from 'react-icons/bs';
import { useRecoilState } from 'recoil';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '25%',
    height: '53%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px',
    dispaly: 'flex',
    justifyContent: 'space-around',
    flexdirection: 'column',
};

export const Login = () => {
    const [open, setOpen] = useRecoilState(loginModalState);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <BsPersonCircle aria-label="로그인" onClick={handleOpen} size={30} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Login"
                className="flex items-center justify-center"
            >
                <Box sx={style}>
                    <div className="flex flex-col items-center justify-between text-center">
                        <div className="border-b border-solid grow border-[#121212] w-full p-2 ">
                            <h1>
                                <BiLogoGit size={30} className="bg-red-500" />
                            </h1>
                        </div>
                        <div
                            className="flex text-black border-b border-solid grow border-[#121212] flex-wrap w-full p-8"
                            aria-label="이용 약관"
                        >
                            <p className="w-9/12">
                                지금 로그인하고 매일 새로운 기술블로그 소식을 전달받아보세요
                            </p>
                        </div>
                        <div className="flex items-center justify-around w-full gap-4 grow">
                            <div>
                                <SocialLogin state="kakao" />
                                <label className="text-black">카카오로 시작하기</label>
                            </div>
                            <div>
                                <SocialLogin state="github" />
                                <label className="text-black">깃헙으로 시작하기</label>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
};
