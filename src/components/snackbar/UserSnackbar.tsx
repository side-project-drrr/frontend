import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { useRecoilState } from 'recoil';
import { snackbarOpenState } from '../../recoil/atom/snackbarOpenState';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
        <>
            {open ? (
                <Box sx={{ width: 600 }}>
                    <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        open={open}
                        onClose={handleClose}
                        message={text}
                        key={vertical + horizontal}
                        action={action}
                    />
                </Box>
            ) : (
                <></>
            )}
        </>
    );
}
