import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { modalOpenState } from '../../recoil/atom/modalOpenState';

import { IParentProps } from './type';
import { style } from '../../style/modalBox';

import SingUpForm from './SingUpForm';
import { useRecoilState } from 'recoil';

export default function SignUpModal({ onSignupNext }: IParentProps) {
    const [modalOpen, setModalOepn] = useRecoilState(modalOpenState);

    const handleClose = () => setModalOepn(false);
    return (
        <>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="Login"
                className="flex items-center justify-center "
            >
                <Box sx={{ ...style, width: '25%', height: '58%' }}>
                    <SingUpForm onSignupNext={onSignupNext} />
                </Box>
            </Modal>
        </>
    );
}
