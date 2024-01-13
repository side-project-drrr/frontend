import styled from '@emotion/styled';
import { TextField, IconButton } from '@mui/material';
import { BiLogoGit } from 'react-icons/bi';
import { CiBellOn } from 'react-icons/ci';
import { Login } from '@monorepo/component/src/stories/login/Login';
import { useDarkMode } from '@monorepo/service/src/ThemeContext/ThemeProvider';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

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
        },
    },
});

export default function Header() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <header
            className={`flex w-screen h-[57px] border-b-2 border-solid border-zinc-500 items-center mt-5 pb-4`}
        >
            <div className="flex items-center flex-1 mx-10 ">
                <div className="flex items-center flex-1">
                    <div className="mx-2 none">
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
                </div>
                <div className="flex items-center justify-around w-1/12">
                    <IconButton
                        onClick={toggleDarkMode}
                        sx={{
                            p: 1,
                        }}
                        size="large"
                        color="inherit"
                    >
                        {darkMode === 'dark' ? (
                            <LightModeOutlined />
                        ) : (
                            <DarkModeOutlined color="action" />
                        )}
                    </IconButton>
                    <CiBellOn size={26} aria-label="알림" />
                    <Login />
                </div>
            </div>
        </header>
    );
}
