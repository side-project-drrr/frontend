import { ProfileInputText, ProfileEmailInputText } from '../style/ProfileInputText';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { BsSend } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userSecession } from '../recoil/atom/userSecession';
import Withdrawal from '../components/modal/Withdrawal';
import { buttonStyle } from '../style/buttonStyle';
import { useProfileState } from '../context/UserProfile';
import { updateMemberProfle } from '../service/ProfileService';
import { msg } from '../constants/message';
import { SignUpEmail, SignUpEmailValidation } from '../service/auth/SocialService';
import { snackbarOpenState } from '../recoil/atom/snackbarOpenState';
import UserSnackbar from '../components/snackbar/UserSnackbar';

const ProfilePage = () => {
    const [open, setOpen] = useState(false);
    const [emailOpen, setEmailOpen] = useState(false);
    const [profileValue, setProfileValue] = useState({
        email: '',
        nickname: '',
        emailChecked: '',
    });
    const [errorMsg, setErrorMsg] = useState({
        email: '',
    });
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const [userSeceesionModal, setUserSecessionModal] = useRecoilState(userSecession);
    const [buttonState, setButtonState] = useState(false);
    const { userData } = useProfileState();
    const [snackbarOpen, setSnackbarOpen] = useRecoilState(snackbarOpenState);

    async function updateProfileInformationRender() {
        const data = await updateMemberProfle(profileValue.email, profileValue.nickname);
        if (data !== undefined) {
            if (data.status === 200) {
                setSnackbarOpen({
                    open: true,
                    vertical: 'top',
                    horizontal: 'center',
                    text: msg.nickNameUpdateSuccess,
                });
                setOpen(false);
                setEmailOpen(false);
            }
        } else {
            setSnackbarOpen({
                open: true,
                vertical: 'top',
                horizontal: 'center',
                text: msg.nickNameEmailUpdateFalied,
            });
            setOpen(false);
            setEmailOpen(false);
            setButtonState(false);
        }
    }
    async function emailCodeRender() {
        const validationData = await SignUpEmail({
            email: { email: profileValue.email },
            providerId: userData.providerId,
        });
        if (validationData?.status !== 200)
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                email: msg.emailDuplicate,
            }));
    }

    const handleEmailCertificationButton = () => {
        const emailValidationState = validationEmailChecked(profileValue.email);
        if (emailValidationState === undefined) {
            setErrorMsg({
                email: '',
            });

            emailCodeRender();
        } else {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                email: msg.email,
            }));
        }
    };

    async function emailVaildationRender() {
        if (profileValue.email !== '') {
            const emailStatusData = await SignUpEmailValidation({
                providerId: userData.providerId,
                verificationCode: profileValue.emailChecked,
            });
            if (emailStatusData !== undefined) {
                if (emailStatusData.data.isVerified) {
                    setErrorMsg(prevErrorMsg => ({
                        ...prevErrorMsg,
                        email: msg.emailSuccess,
                    }));
                    setButtonState(true);
                } else {
                    setErrorMsg(prevErrorMsg => ({
                        ...prevErrorMsg,
                        email: msg.emailFailed,
                    }));
                    setButtonState(false);
                }
            }
        }
    }
    const validationEmailChecked = (value: string) => {
        let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
        if (!regex.test(value)) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                email: msg.email,
            }));
            return false;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileValue(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        setProfileValue({ email: userData.email, nickname: userData.nickname, emailChecked: '' });
    }, [userData]);

    return (
        <>
            <div className="flex items-center justify-center w-full gap-6">
                <div className="flex flex-col items-center justify-center w-full gap-4 mt-10">
                    <h1>프로필 수정</h1>
                    <div className="flex justify-center  p-10 border border-[#444444] h-[150px] w-[50%] ">
                        <div className="flex items-center justify-between w-full">
                            <h3>닉네임 정보</h3>
                            {open ? (
                                <ProfileInputText
                                    placeholder="닉네임 변경"
                                    autoComplete="off"
                                    name="nickname"
                                    aria-label="닉네임 변경"
                                    value={profileValue.nickname}
                                    onChange={e => handleInputChange(e)}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                color="primary"
                                                component="span"
                                                className="w-10 h-10"
                                                onClick={updateProfileInformationRender}
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
                    <div className="flex justify-center  p-10 border border-[#444444] h-[250px] w-[50%] items-center">
                        <div className="flex flex-col items-center justify-between w-full">
                            <div className="flex items-center justify-between w-full">
                                <h3>이메일 정보</h3>
                                {emailOpen ? (
                                    <div className="flex flex-col w-[75%] gap-4 mt-10 justify-end items-end">
                                        <ProfileEmailInputText
                                            placeholder="이메일 변경"
                                            autoComplete="off"
                                            name="email"
                                            aria-label="이메일 변경"
                                            value={profileValue.email}
                                            onChange={e => handleInputChange(e)}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton
                                                        color="primary"
                                                        component="span"
                                                        className="w-10 h-10"
                                                        onClick={handleEmailCertificationButton}
                                                    >
                                                        <BsSend className="hover:text-[#E6783A]" />
                                                    </IconButton>
                                                ),
                                            }}
                                        />

                                        <ProfileEmailInputText
                                            name="emailChecked"
                                            aria-label="이메일 인증 코드"
                                            placeholder="이메일 인증 코드"
                                            onChange={e => handleInputChange(e)}
                                            InputProps={{
                                                endAdornment: (
                                                    <IconButton
                                                        color="primary"
                                                        component="span"
                                                        className="w-10 h-10"
                                                        onClick={emailVaildationRender}
                                                    >
                                                        <p className="flex">
                                                            <BsSend className="hover:text-[#E6783A]" />
                                                        </p>
                                                    </IconButton>
                                                ),
                                            }}
                                        />
                                        <p>{errorMsg.email}</p>
                                        <Button
                                            sx={buttonStyle}
                                            onClick={updateProfileInformationRender}
                                            disabled={!buttonState}
                                        >
                                            저장하기
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        sx={buttonStyle}
                                        onClick={() => setEmailOpen(!emailOpen)}
                                    >
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
            </div>
            {snackbarOpen && <UserSnackbar />}
        </>
    );
};

export default ProfilePage;
