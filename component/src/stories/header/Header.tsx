import styled from '@emotion/styled';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextField } from '@mui/material';
import { BiLogoGit } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { CiBellOn } from 'react-icons/ci';

const InputTextField = styled(TextField)({
    '& label': {
        color: 'var(--sub-text)',
    },

    '& .MuiOutlinedInput-root': {
        color: 'var(--text)',
        '& fieldset': {
            borderRadius: 20,
            width: '24rem',
            backgroundColor: 'transparent',
            borderColor: '#E4E4E7',
            //height: '2.75rem',
        },
    },
});

const MaterialUISwitch = styled(Switch)(() => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            // '& + .MuiSwitch-track': {
            //     opacity: 1,
            //     backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            // },
        },
    },
    '& .MuiSwitch-thumb': {
        //backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        //backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

export default function Header() {
    return (
        <header className="flex w-screen h-[57px] border-b-1 border-solid border-zinc-500 items-center ">
            <div className="flex items-center flex-1 mx-10">
                <div className="ml-2 mr-2 none">
                    <BiLogoGit size={40} aria-label="로고" />
                </div>
                <div className="grow">
                    <InputTextField
                        type="text"
                        className="max-w-xs"
                        variant="outlined"
                        label="검색"
                        aria-label="검색"
                    />
                </div>
                <FormGroup>
                    <FormControlLabel
                        control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
                        label="switch"
                    />
                </FormGroup>
                <div>
                    <CiBellOn size={26} aria-label="알림" />
                </div>
                <div className="mr-2 bg-transparent border-transparent dark">
                    <button className="mr-2 bg-transparent border-transparent dark hover:border-transparent">
                        <BsPersonCircle aria-label="로그인" />
                    </button>
                </div>
            </div>
        </header>
    );
}
