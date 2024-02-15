import styled from '@emotion/styled';
import { TextField, IconButton, Avatar, Button } from '@mui/material';
import { BiLogoGit } from 'react-icons/bi';
import { CiBellOn } from 'react-icons/ci';
import { Login } from '@monorepo/component/src/stories/login/Login';
import { useDarkMode } from '@monorepo/service/src/ThemeContext/ThemeProvider';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { getAuthStorage, removeAuthStorage } from '@monorepo/service/src/repository/AuthRepository';
import {
    getProfileImgStorage,
    removeProfileImgStorage,
} from '@monorepo/service/src/repository/ProfileimgRepository';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { profileModalOpen } from '@monorepo/service/src/recoil/atom/profileModalOpen';
import { isLoggedInState } from '@monorepo/service/src/recoil/atom/isLoggedInState';
import { useLayoutEffect } from 'react';

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

const buttonStyle = {
    color: 'black',
    width: '100%',
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
                    className="absolute w-[100px] h-[100px] bg-slate-50 flex justify-center items-center flex-col gap-4 right-0 mt-2"
                    aria-label="프로필 메뉴"
                >
                    <Button className="text-black" style={buttonStyle}>
                        Profile
                    </Button>
                    <Button className="text-black" style={buttonStyle} onClick={() => onLogout()}>
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

    useLayoutEffect(() => {
        if (token) {
            setLoggedIn(true);
        }
    }, [loggedIn]);

    const handleLogout = () => {
        removeProfileImgStorage();
        removeAuthStorage('accessToken');
        setProfileOpen(false); // 프로필 메뉴 닫기
        setLoggedIn(false);
    };

    return (
        <header
            className={`flex w-screen h-[57px] border-b-2 border-solid border-zinc-500 items-center mt-5 pb-4 `}
        >
            <div className="flex items-center flex-1 mx-10 " onClick={handleModalClose}>
                <div className="flex items-center flex-1 ">
                    <div className="mx-2 none ">
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
                <div className="flex items-center justify-around w-1/12 ">
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
                    {loggedIn ? <AuthHeader onLogout={handleLogout} /> : <Login />}
                </div>
            </div>
        </header>
    );
}
