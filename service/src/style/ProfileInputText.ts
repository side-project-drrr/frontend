import { TextField } from '@mui/material';
import styled from '@emotion/styled';

export const ProfileInputText = styled(TextField)({
    width: '80%',
    height: '43px',

    ' .MuiOutlinedInput-root': {
        color: '#7c7c7c',
        backgroundColor: '#F0F0F0',
        display: 'flex',
        justifyContent: 'center',
        outline: 'none',
        borderRadius: '20px',
        height: '43px',
    },
});
