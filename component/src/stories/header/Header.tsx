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
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { profileModalOpen } from '@monorepo/service/src/recoil/atom/profileModalOpen';
import ChatBubble from '../ChatBubble/ChatBubble';
import { isSearchClickedState } from '@monorepo/service/src/recoil/atom/isSearchClickedState';
import { useEffect, useState } from 'react';
import { getHeaderKeywordSearch } from '@monorepo/service/src/service/HeaderSearchService';
import { HeaderSearchDataState } from '@monorepo/service/src/recoil/atom/HeaderSearchDataState';
import { PageState } from '@monorepo/service/src/recoil/atom/PageState';
import { Link, useNavigate } from 'react-router-dom';
import { getSearchListStorage } from '@monorepo/service/src/repository/SearchListRepository';

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
    const setIsSearchClicked = useSetRecoilState(isSearchClickedState);

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
    const [isSearchClicked, setIsSearchClicked] = useRecoilState(isSearchClickedState);
    const [searchValue, setSearchValue] = useState('');
    const [getSearchLocalResult, setGetSearchLocalResult] = useState<any[]>([]);

    const setTechBlogSearchData = useSetRecoilState(HeaderSearchDataState);
    const { darkMode, toggleDarkMode } = useDarkMode();
    const page = useRecoilValue(PageState);
    const setProfileOpen = useSetRecoilState(profileModalOpen);
    const KEY = 'search';

    const navigate = useNavigate();
    const size = 10;
    const sort = 'writtenAt';
    const direction = 'desc';
    const searchItem = getSearchListStorage(KEY);

    async function getKeywordSerchRender() {
        const keywordSearchData = await getHeaderKeywordSearch({
            page,
            size,
            sort,
            direction,
            searchValue,
        });
        setTechBlogSearchData(prev => [...prev, ...keywordSearchData.content]);
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            // 엔터 키를 눌렀을 때 실행할 동작
            const value = (e.target as HTMLInputElement).value;
            setTechBlogSearchData([]);
            getKeywordSerchRender();
            setGetSearchLocalResult(prev => [...prev, value]);
            setIsSearchClicked(false);
            navigate(`/search/${searchValue}`);
        }
    };

    const handleModalClose = () => {
        setProfileOpen(false);
    };

    const handleLogout = () => {
        removeProfileImgStorage();
        removeAuthStorage('accessToken');
        setProfileOpen(false); // 프로필 메뉴 닫기
    };

    const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    };

    useEffect(() => {
        getKeywordSerchRender();
    }, [page]);

    useEffect(() => {
        setGetSearchLocalResult(searchItem);
    }, []);

    return (
        <header className={`w-full flex justify-center `}>
            <div
                className="flex justify-between w-full max-w-screen-xl py-4"
                onClick={handleModalClose}
            >
                <div className="flex items-center">
                    <div className="mx-2 none">
                        <Link to="/" className="text-black bg-transparent dark:text-white">
                            <BiLogoGit size={40} aria-label="로고" />
                        </Link>
                    </div>

                    <InputTextField
                        type="text"
                        className="relative max-w-sm w-80"
                        variant="outlined"
                        label="검색"
                        aria-label="검색"
                        onClick={() => setIsSearchClicked(!isSearchClicked)}
                        onKeyDown={e => handleKeyPress(e)}
                        onChange={e => handleSearchValue(e)}
                        autoComplete="off"
                        value={searchValue}
                    />

                    {isSearchClicked && (
                        <ChatBubble
                            onSearchResult={getSearchLocalResult}
                            onSearchRender={getKeywordSerchRender}
                            onSetSearchResult={setGetSearchLocalResult}
                        />
                    )}
                </div>
                <div className="flex items-center">
                    <IconButton onClick={toggleDarkMode} size="large" color="inherit">
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
