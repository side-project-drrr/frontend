/* eslint-disable react-hooks/rules-of-hooks */
import styled from '@emotion/styled';
import { TextField, IconButton, Avatar, Button } from '@mui/material';

import { Login } from '../../stories/login/Login';
import { useDarkMode } from '../../ThemeContext/ThemeProvider';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { removeAuthStorage } from '../../repository/AuthRepository';
import {
    getProfileImgStorage,
    removeProfileImgStorage,
} from '../../repository/ProfileimgRepository';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { profileHeaderMenu } from '../../recoil/atom/profileHeaderMenu';
import HeaderSearchMenu from '../ChatBubble/HeaderSearchMenu';
import { isSearchFocusedState } from '../../recoil/atom/isSearchFocusedState';
import { useEffect, useState } from 'react';
import { HeaderSearchDataState } from '../../recoil/atom/HeaderSearchDataState';
import { Link, useNavigate } from 'react-router-dom';
import { addSearchTerm, getSearchListStorage } from '../../repository/SearchListRepository';
import useHandleKeyPress from '../../hooks/useHandleKeyPress';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';
import darkLogo from '../../assets/darkLogo.webp';
import lightLogo from '../../assets/lightLogo.webp';
import { getAuthStorage } from '../../repository/AuthRepository';
import { LogoutService } from '../../service/auth/SocialService';
import { AlarmComponent } from './Alarm';
import { useProfileState } from '../../context/UserProfile';

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
    const [profileHeaderMenuOpen, setProfileHeaderMenuOpen] = useRecoilState(profileHeaderMenu);
    const setIsSearchClicked = useSetRecoilState(isSearchFocusedState);
    const KEY = 'imgUrl';
    const img = getProfileImgStorage(KEY);

    const navigate = useNavigate();
    let imgUrl;
    if (img !== null) {
        imgUrl = img;
    }
    const handleToggleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
        //e.stopPropagation을 통해  button에서 클릭했을때 profileDiv 영역을 관리 할 수 있게 됬다.
        //위 코드가 없을 경우 header 영역 밖을 클릭할 경우의 코드를 넣으면 profilediv 영역이 나타나지 않는다.
        e.stopPropagation();
        setProfileHeaderMenuOpen(!profileHeaderMenuOpen);
        setIsSearchClicked(false);
    };

    return (
        <div className="relative">
            {img ? (
                <Avatar alt="Avatar" src={imgUrl} onClick={(e: any) => handleToggleOpen(e)} />
            ) : (
                <Login />
            )}
            {profileHeaderMenuOpen && (
                <div
                    className="w-[100px] h-[100px] bg-slate-50 flex justify-center items-center flex-col gap-4 right-0 mt-2 absolute z-10"
                    aria-label="프로필 메뉴"
                >
                    <Button
                        className="text-black"
                        style={buttonStyle}
                        onClick={() => navigate('profile')}
                    >
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
    const [isSearchFocused, setIsSearchfouced] = useRecoilState(isSearchFocusedState);
    const [searchValue, setSearchValue] = useState<string>('');
    const [getSearchLocalResult, setGetSearchLocalResult] = useState<any[]>([]);
    const [selectedSearchIndex, setSelectedSearchIndex] = useState<number>(-1);
    const setTechBlogSearchData = useSetRecoilState(HeaderSearchDataState);
    const [loggedIn, setLoggedIn] = useRecoilState(isLoggedInState);
    const { darkMode, toggleDarkMode } = useDarkMode();
    const setProfileOpen = useSetRecoilState(profileHeaderMenu);
    const KEY = 'search';
    const navigate = useNavigate();

    const REFRESHTOKEN_KEY = 'refreshToken';
    const refresh_Token = getAuthStorage(REFRESHTOKEN_KEY);
    const { login, token } = useProfileState();
    const searchItem = getSearchListStorage(KEY);

    async function getLogoutRender() {
        if (token && refresh_Token) {
            await LogoutService(token, refresh_Token);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const value = (e.target as HTMLInputElement).value;
        const key = e.key;
        if (value !== '' && searchValue !== '') {
            if (e.key === 'Enter') {
                // 엔터 키를 눌렀을 때 실행할 동작
                setTechBlogSearchData([]);
                setGetSearchLocalResult(prev => {
                    const uniqueValuesSet = new Set([...prev, value]);
                    const uniqueValuesArray = Array.from(uniqueValuesSet);
                    if (uniqueValuesArray.length > 5) {
                        addSearchTerm(value);
                    }

                    return uniqueValuesArray;
                });
                setIsSearchfouced(false);
                navigate(`/search?keyword=${searchValue}`, { state: value });
            }
        }

        useHandleKeyPress({
            key,
            e,
            getSearchLocalResult,
            setSearchValue,
            selectedSearchIndex,
            setSelectedSearchIndex,
        });
    };
    const handleInputFocused = () => {
        setIsSearchfouced(!isSearchFocused);
    };

    const handleModalClose = () => {
        setProfileOpen(false);
    };

    const handleLogout = async () => {
        removeProfileImgStorage();
        removeAuthStorage('accessToken');
        setProfileOpen(false); // 프로필 메뉴 닫기
        setLoggedIn(false);
        login('');
        navigate(`/`);
        await getLogoutRender();
    };

    const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    useEffect(() => {
        setGetSearchLocalResult(searchItem);
    }, []);

    useEffect(() => {
        if (selectedSearchIndex === -1) setSearchValue('');
    }, [selectedSearchIndex]);

    useEffect(() => {
        if (token) {
            setLoggedIn(true);
        }
    }, [token, login]);

    return (
        <header className={`w-full flex justify-center px-[10px]`}>
            <div
                className="flex justify-between w-full max-w-screen-xl py-4"
                onClick={handleModalClose}
            >
                <div className="flex items-center">
                    <div className="mr-4 none">
                        <Link to="/" onClick={() => setSearchValue('')}>
                            {darkMode === 'light' ? (
                                <img src={lightLogo} alt="로고" />
                            ) : (
                                <img src={darkLogo} alt="로고" />
                            )}
                        </Link>
                    </div>
                    <div>
                        <InputTextField
                            type="text"
                            className="relative max-w-sm w-80"
                            aria-label="검색"
                            onFocus={handleInputFocused}
                            onKeyDown={e => handleKeyPress(e)}
                            onChange={e => handleSearchValue(e)}
                            autoComplete="off"
                            value={searchValue}
                            placeholder="검색"
                            sx={theme => ({
                                [theme.breakpoints.down('sm')]: { width: '200px' },
                            })}
                            inputProps={{ maxLength: 10 }}
                        />
                        {isSearchFocused && (
                            <HeaderSearchMenu
                                onSetSearchValue={setSearchValue}
                                onSelectedSearchIndex={selectedSearchIndex}
                            />
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                        <IconButton
                            onClick={toggleDarkMode}
                            size="large"
                            color="inherit"
                            sx={{
                                '&:focus': {
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    outline: 'none',
                                },
                            }}
                        >
                            {darkMode === 'dark' ? (
                                <LightModeOutlined
                                    sx={theme => ({
                                        [theme.breakpoints.down('sm')]: { display: 'none' },
                                    })}
                                />
                            ) : (
                                <DarkModeOutlined
                                    color="action"
                                    sx={theme => ({
                                        [theme.breakpoints.down('sm')]: { display: 'none' },
                                    })}
                                />
                            )}
                        </IconButton>
                        <AlarmComponent />
                        {loggedIn ? <AuthHeader onLogout={handleLogout} /> : <Login />}
                    </div>
                </div>
            </div>
        </header>
    );
}
