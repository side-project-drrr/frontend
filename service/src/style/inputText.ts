import { TextField } from '@mui/material';
import { styled } from '@mui/material';

export const InputTextField = styled(TextField)({
    '& label': {
        color: 'black',
    },

    '& .MuiOutlinedInput-root': {
        color: 'black',
        '& fieldset': {
            borderRadius: 15,
            width: '100%',
            backgroundColor: 'transparent',
            borderColor: '#E4E4E7',
        },
    },
});
