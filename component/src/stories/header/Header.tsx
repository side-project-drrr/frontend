/* eslint-disable react-hooks/rules-of-hooks */
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
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { profileModalOpen } from '@monorepo/service/src/recoil/atom/profileModalOpen';
import HeaderSearchMenu from '../ChatBubble/HeaderSearchMenu';
import { isSearchFocusedState } from '@monorepo/service/src/recoil/atom/isSearchFocusedState';
import { useEffect, useState } from 'react';
import { getHeaderKeywordSearch } from '@monorepo/service/src/service/HeaderSearchService';
import { HeaderSearchDataState } from '@monorepo/service/src/recoil/atom/HeaderSearchDataState';
import { PageState } from '@monorepo/service/src/recoil/atom/PageState';
import { Link, useNavigate } from 'react-router-dom';
import { getSearchListStorage } from '@monorepo/service/src/repository/SearchListRepository';
import useHandleKeyPress from '@monorepo/service/src/hooks/useHandleKeyPress';
import { isLoggedInState } from '@monorepo/service/src/recoil/atom/isLoggedInState';
import darkLogo from '@monorepo/service/src/assets/darkLogo.webp';
import lightLogo from '@monorepo/service/src/assets/lightLogo.webp';
import { getAuthStorage } from '@monorepo/service/src/repository/AuthRepository';
import { LogoutService } from '@monorepo/service/src/service/auth/SocialService';

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
    const setIsSearchClicked = useSetRecoilState(isSearchFocusedState);

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
        setIsSearchClicked(false);
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
    const [isSearchFocused, setIsSearchfouced] = useRecoilState(isSearchFocusedState);
    const [searchValue, setSearchValue] = useState('');
    const [getSearchLocalResult, setGetSearchLocalResult] = useState<any[]>([]);
    const [selectedSearchIndex, setSelectedSearchIndex] = useState<number>(-1);
    const setTechBlogSearchData = useSetRecoilState(HeaderSearchDataState);
    const [loggedIn, setLoggedIn] = useRecoilState(isLoggedInState);

    const { darkMode, toggleDarkMode } = useDarkMode();
    const page = useRecoilValue(PageState);
    const setProfileOpen = useSetRecoilState(profileModalOpen);
    const KEY = 'search';
    const navigate = useNavigate();
    const size = 10;
    const TOKEN_KEY = 'accessToken';
    const REFRESHTOKEN_KEY = 'refreshToken';
    const token = getAuthStorage(TOKEN_KEY);
    const refresh_Token = getAuthStorage(REFRESHTOKEN_KEY);

    const searchItem = getSearchListStorage(KEY);

    async function getKeywordSearchRender() {
        const keywordSearchData = await getHeaderKeywordSearch({
            page,
            size,
            searchValue,
        });
        setTechBlogSearchData(prev => [...prev, ...keywordSearchData.content]);
    }
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
                getKeywordSearchRender();
                setGetSearchLocalResult(prev => {
                    const uniqueValuesSet = new Set([...prev, value]);
                    const uniqueValuesArray = Array.from(uniqueValuesSet);
                    return uniqueValuesArray;
                });
                setIsSearchfouced(false);
                navigate(`/search/${searchValue}`);
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
        await getLogoutRender();
    };

    const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    useEffect(() => {
        getKeywordSearchRender();
    }, [page]);

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
    }, [token]);

    return (
        <header className={`w-full flex justify-center `}>
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
                        />
                        {isSearchFocused && (
                            <HeaderSearchMenu
                                onSearchResult={getSearchLocalResult}
                                onSetSearchResult={setGetSearchLocalResult}
                                onSetSearchValue={setSearchValue}
                                onSelectedSearchIndex={selectedSearchIndex}
                            />
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-1">
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
            </div>
        </header>
    );
}
