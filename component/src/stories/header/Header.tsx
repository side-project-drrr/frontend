import styled from '@emotion/styled';
import { TextField, IconButton, Avatar, Button } from '@mui/material';
import { BiLogoGit } from 'react-icons/bi';
import { CiBellOn } from 'react-icons/ci';
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

interface IHeaderProps {
    authToken: string | null;
}

export default function Header({ authToken }: IHeaderProps) {
    const { darkMode, toggleDarkMode } = useDarkMode();
    const setProfileOpen = useSetRecoilState(profileModalOpen);
    const handleModalClose = () => {
        setProfileOpen(false);
    };

    const handleLogout = () => {
        removeProfileImgStorage();
        removeAuthStorage('accessToken');
        setProfileOpen(false); // 프로필 메뉴 닫기
    };

    return (
        <header
            className={`flex flex-col items-center w-screen`}
        >
            <div className="w-full max-w-screen-xl py-4 flex items-center justify-between" onClick={handleModalClose}>
                <div className="flex items-center">
                    <div className="mr-2 none">
                        <BiLogoGit size={40} aria-label="로고" />
                    </div>
                    <InputTextField
                        type="text"
                        variant="outlined"
                        label="검색"
                        aria-label="검색"
                    />
                </div>
                <div className="flex items-center">
                    <IconButton
                        onClick={toggleDarkMode}
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
                    {authToken ? <AuthHeader onLogout={handleLogout} /> : <Login />}
                </div>
            </div>
        </header>
    );
}
