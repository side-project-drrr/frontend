import { ProfileInputText } from '../style/ProfileInputText';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { BsSend } from 'react-icons/bs';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userSecession } from '../recoil/atom/userSecession';
import Withdrawal from '../components/modal/Withdrawal';
import { buttonStyle } from '../style/buttonStyle';

const ProfilePage = () => {
    const [open, setOpen] = useState(false);
    const [emailOpen, setEmailOpen] = useState(false);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const [userSeceesionModal, setUserSecessionModal] = useRecoilState(userSecession);
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full gap-6 ">
                <h1>프로필 수정</h1>
                <div className="flex justify-center  p-10 border border-[#444444] h-[150px] w-[50%]">
                    <div className="flex items-center justify-between w-full">
                        <h3>닉네임 정보</h3>
                        {open ? (
                            <ProfileInputText
                                placeholder="닉네임 변경"
                                autoComplete="off"
                                name="닉네임"
                                aria-label="닉네임 변경"
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            color="primary"
                                            component="span"
                                            className="w-10 h-10"
                                        >
                                            <BsSend className="hover:text-[#E6783A]" />
                                        </IconButton>
                                    ),
                                }}
                            />
                        ) : (
                            <Button sx={buttonStyle} onClick={() => setOpen(!open)}>
                                닉네임 변경하기
                            </Button>
                        )}
                    </div>
                </div>
                <div className="flex justify-center  p-10 border border-[#444444] h-[220px] w-[50%] items-center">
                    <div className="flex flex-col items-center justify-between w-full">
                        <div className="flex items-center justify-between w-full ">
                            <h3>이메일 정보</h3>
                            {emailOpen ? (
                                <div className="flex flex-col w-[80%] gap-4 items-center mt-10">
                                    <ProfileInputText
                                        placeholder="이메일 변경"
                                        autoComplete="off"
                                        name="이메일"
                                        aria-label="이메일 변경"
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton
                                                    color="primary"
                                                    component="span"
                                                    className="w-10 h-10"
                                                >
                                                    <BsSend className="hover:text-[#E6783A]" />
                                                </IconButton>
                                            ),
                                        }}
                                    />

                                    <ProfileInputText
                                        name="이메일 인증"
                                        aria-label="이메일 인증 코드"
                                        placeholder="이메일 인증 코드"
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton
                                                    color="primary"
                                                    component="span"
                                                    className="w-10 h-10"
                                                >
                                                    <BsSend className="hover:text-[#E6783A]" />
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                    <Button sx={buttonStyle}>저장하기</Button>
                                </div>
                            ) : (
                                <Button sx={buttonStyle} onClick={() => setEmailOpen(!emailOpen)}>
                                    이메일 변경
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center  p-10 border border-[#444444] h-[100px] w-[50%] items-center">
                    <div className="flex items-center justify-between w-full gap-4">
                        <h3>알림 정보</h3>
                        <p className="text-sm">
                            구독 끊기
                            <Switch {...label} defaultChecked aria-label="DisplayMode Switch" />
                        </p>
                    </div>
                </div>
                <div className="flex justify-center  p-10 border border-[#444444] h-[100px] w-[50%] items-center">
                    <div className="flex items-center justify-between w-full">
                        <h3>회원 정보</h3>
                        <Button sx={buttonStyle} onClick={() => setUserSecessionModal(true)}>
                            회원 탈퇴
                        </Button>
                        {userSeceesionModal && <Withdrawal />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
