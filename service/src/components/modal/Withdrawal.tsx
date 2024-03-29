import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRecoilState } from 'recoil';

import { ProfileInputText } from '../../style/ProfileInputText';
import ModalTitle from '@monorepo/component/src/stories/modalTitle/ModalTitle';
import { userSecession } from '../../recoil/atom/userSecession';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '22.6%',
    height: '438px',
    bgcolor: '#FFFFFF',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px',
    dispaly: 'flex',
    justifyContent: 'space-around',
    flexdirection: 'column',
};

const buttonStyle = {
    color: '#2c2c2c',
    padding: '4px',
    backgroundColor: '#D5D5D5',

    width: '80%',
    '&:focus': {
        outline: 'none',
    },
    '&:hover': {
        backgroundColor: '#E6783A',
        color: 'white',
    },
};

export const Withdrawal = () => {
    const [open, setOpen] = useRecoilState(userSecession);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Login"
                className="flex items-center justify-center "
            >
                <Box sx={style}>
                    <div className="flex flex-col items-center justify-between gap-8">
                        <ModalTitle onHangleCloseClick={handleClose} state="profile" />
                        <ProfileInputText placeholder="닉네임" autoComplete="off" />
                        <Button sx={buttonStyle}>회원 탈퇴</Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default Withdrawal;
