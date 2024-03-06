import styled from '@emotion/styled';
import { TextField, IconButton, Avatar, Button } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Login } from '@monorepo/component/src/stories/login/Login';
import { useDarkMode } from '@monorepo/service/src/ThemeContext/ThemeProvider';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { removeAuthStorage } from '@monorepo/service/src/repository/AuthRepository';
import {
    getProfileImgStorage,
    removeProfileImgStorage,
} from '@monorepo/service/src/repository/ProfileimgRepository';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { profileModalOpen } from '@monorepo/service/src/recoil/atom/profileModalOpen';
import { isLoggedInState } from '@monorepo/service/src/recoil/atom/isLoggedInState';
import darkLogo from '@monorepo/service/src/assets/darkLogo.webp';
import lightLogo from '@monorepo/service/src/assets/lightLogo.webp';
import { useEffect } from 'react';
import { getAuthStorage } from '@monorepo/service/src/repository/AuthRepository';


const InputTextField = styled(TextField)({
    '& label': {
        color: 'var(--sub-text)',
    },

    '& .MuiOutlinedInput-root': {
        color: 'var(--text)',
        '& fieldset': {
            borderRadius: 20,
            backgroundColor: 'transparent',
            borderColor: '#E4E4E7',
        },
    },
});

const buttonStyle = {
    color: 'black',
    padding: '4px',
    '&:focus': {
        outline: 'none',
    },
    '&:hover': {
        backgroundColor: 'transparent',
    },
};

interface IHandleProps {
    onLogout: () => void;
}

function AuthHeader({ onLogout }: IHandleProps) {
    const [profileOpen, setProfileOpen] = useRecoilState(profileModalOpen);
    const KEY = 'imgUrl';
    const img = getProfileImgStorage(KEY);
    let imgUrl;
    if (img !== null) {
        imgUrl = img;
    }
    const handleToggleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
        //e.stopPropagation을 통해  button에서 클릭했을때 profileDiv 영역을 관리 할 수 있게 됬다.
        //위 코드가 없을 경우 header 영역 밖을 클릭할 경우의 코드를 넣으면 profilediv 영역이 나타나지 않는다.
        e.stopPropagation();
        setProfileOpen(!profileOpen);
    };

    return (
        <div className="relative">
            {img ? (
                <Avatar alt="Avatar" src={imgUrl} onClick={e => handleToggleOpen(e)} />
            ) : (
                <Login />
            )}
            {profileOpen && (
                <div
                    className="w-[100px] h-[100px] bg-slate-50 flex justify-center items-center flex-col gap-4 right-0 mt-2 absolute z-10"
                    aria-label="프로필 메뉴"
                >
                    <Button className="text-black" style={buttonStyle}>
                        Profile
                    </Button>
                    <Button className="text-black " style={buttonStyle} onClick={onLogout}>
                        Logout
                    </Button>
                </div>
            )}
        </div>
    );
}

export default function Header() {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const setProfileOpen = useSetRecoilState(profileModalOpen);
    const [loggedIn, setLoggedIn] = useRecoilState(isLoggedInState);
    const TOKEN_KEY = 'accessToken';
    const token = getAuthStorage(TOKEN_KEY);

    const handleModalClose = () => {
        setProfileOpen(false);
    };

    const handleLogout = () => {
        removeProfileImgStorage();
        removeAuthStorage('accessToken');
        setProfileOpen(false); // 프로필 메뉴 닫기
        setLoggedIn(false);
    };

    useEffect(() => {
        if (token) {
            setLoggedIn(true);
        }
    }, [token]);

    return (
        <header className={`w-full flex justify-center`}>
            <div
                className="flex justify-between w-full max-w-screen-xl py-4"
                onClick={handleModalClose}
            >
                <div className="flex items-center">
                    <div className="mr-4 none">
                        {darkMode === 'light' ? (
                            <img src={lightLogo} alt="로고" />
                        ) : (
                            <img src={darkLogo} alt="로고" />
                        )}
                    </div>
                    <InputTextField
                        type="text"
                        variant="outlined"
                        aria-label="검색"
                        sx={{ width: '18rem' }}
                        placeholder="검색"
                        autoComplete="off"
                    />
                </div>
                <div className="flex items-center gap-1">
                    <IconButton onClick={toggleDarkMode} size="large" color="inherit">
                        {darkMode === 'dark' ? (
                            <LightModeOutlined />
                        ) : (
                            <DarkModeOutlined color="action" />
                        )}
                    </IconButton>
                    <NotificationsActiveIcon className="mr-3" />
                    {loggedIn ? <AuthHeader onLogout={handleLogout} /> : <Login />}
                </div>
            </div>
        </header>
    );
}
