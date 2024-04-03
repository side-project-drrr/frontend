import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { useRecoilState } from 'recoil';
import { snackbarOpenState } from '../../recoil/atom/snackbarOpenState';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const message = {
    over: '카테고리는 10개 이상 선택할 수 없습니다.',
    under: '카테고리는 1개 이상 무조건 선택해야합니다.',
};

export default function UserSnackbar() {
    const [state, setState] = useRecoilState(snackbarOpenState);
    const { vertical, horizontal, open, text } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
    };
    const action = (
        <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <Box sx={{ width: 600 }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={text === 'over' ? message.over : message.under}
                key={vertical + horizontal}
                action={action}
            />
        </Box>
    );
}
