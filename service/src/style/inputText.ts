import { TextField } from '@mui/material';
import { styled } from '@mui/material';

export const InputTextField = styled(TextField)({
    '& label': {
        color: '#000000',
    },

    '& .MuiOutlinedInput-root': {
        color: '#000000',
        '& fieldset': {
            borderRadius: 15,
            width: '24rem',
            backgroundColor: 'transparent',
            borderColor: '#E4E4E7',
            //height: '2.75rem',
        },
    },
});
