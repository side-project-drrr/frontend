import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useRecoilState } from 'recoil';

import { ProfileUserInputText } from '../../style/ProfileInputText';
import ModalTitle from '@monorepo/component/src/stories/modalTitle/ModalTitle';
import { userSecession } from '../../recoil/atom/userSecession';
import Button from '@mui/material/Button';
import { useProfileState } from '../../context/UserProfile';
import { useState } from 'react';
import { deleteUserService } from '../../service/ProfileService';
import { removeAuthStorage } from '../../repository/AuthRepository';
import { useNavigate } from 'react-router-dom';

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
    const [buttonState, setButtonState] = useState(false);
    const { userData } = useProfileState();

    const navigate = useNavigate();
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = e.target.value;
        if (userData && 'nickname' in userData) {
            if (value === userData.nickname) {
                setButtonState(true);
            } else {
                setButtonState(false);
            }
        } else {
            setButtonState(false);
        }
    };
    async function handleDeleteUserRender() {
        const data = await deleteUserService();
        if (data !== undefined) {
            if (data.status === 200) {
                removeAuthStorage('accessToken');
                removeAuthStorage('refreshToken');
                removeAuthStorage('imgUrl');
                navigate('/');
            }
        }
    }
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
                        <ProfileUserInputText
                            placeholder="닉네임"
                            autoComplete="off"
                            onChange={e => handleInputChange(e)}
                        />
                        <Button
                            sx={buttonStyle}
                            disabled={!buttonState}
                            onClick={handleDeleteUserRender}
                        >
                            회원 탈퇴
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default Withdrawal;
