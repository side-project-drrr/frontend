import { IconButton, Modal } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useMemberProfile } from '../../../contexts/MemberProfileContext.tsx';
import { useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import SelectLoginTypeForm from '../../selectLoginTypeForm/SelectLoginTypeForm.tsx';

const HeaderMenu = () => {
    const { isLoggedIn } = useMemberProfile();

    return (
        <div className="flex items-center gap-1">
            <IconButton size="large" color="inherit"></IconButton>
            <span>{isLoggedIn ? 'true' : 'false'}</span>

            {isLoggedIn ? <NotificationsActiveIcon className="mr-3" /> : <Login />}
        </div>
    );
};

export const Login = () => {
    const [open, setOpen] = useState(true);
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
                <SelectLoginTypeForm />
                {/*<ModalContent>*/}
                {/*    <div className="flex flex-col items-center justify-between text-center">*/}
                {/*        <div className="border-b border-solid grow border-[#121212] w-full p-2 ">*/}
                {/*            <h1>*/}
                {/*                <BiLogoGit size={30} className="bg-red-500" />*/}
                {/*            </h1>*/}
                {/*        </div>*/}
                {/*        <div*/}
                {/*            className="flex text-black border-b border-solid grow border-[#121212] flex-wrap w-full p-8"*/}
                {/*            aria-label="이용 약관"*/}
                {/*        >*/}
                {/*            <p className="w-9/12">*/}
                {/*                지금 로그인하고 매일 새로운 기술블로그 소식을 전달받아보세요*/}
                {/*            </p>*/}
                {/*        </div>*/}
                {/*        <div className="flex items-center justify-around w-full gap-4 grow">*/}
                {/*            <div>*/}
                {/*                <SocialLogin state="kakao" />*/}
                {/*                <label className="text-black">카카오로 시작하기</label>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <SocialLogin state="github" />*/}
                {/*                <label className="text-black">깃헙으로 시작하기</label>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</ModalContent>*/}
            </Modal>
        </>
    );
};

export default HeaderMenu;
