import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from '@mui/base/Button';
import { ValueProps } from './type';
import { style } from '../style/modalBox';
import { InputTextField } from '../style/inputText';
const msg = {
    email: '올바른 이메일 형식이 아닙니다.',
    nickname: '닉네임을 입력해주세요',
    emailsuccess: '이메일 인증이 완료되었습니다.',
    emailfailed: '이메일 인증이 실패하였습니다.',
};

export default function SignUpPage() {
    const [errorMsg, setErrorMsg] = useState({
        nickname: '',
        email: '',
    });
    const [profileValue, setProfileValue] = useState<ValueProps>({
        nickname: '',
        email: '',
    });
    const [count, setCount] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileValue(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
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
    const handleEmailCertificationButton = () => {
        const emailValidationState = validationEmailChecked(profileValue.email);
        if (emailValidationState === undefined) {
            setErrorMsg({
                nickname: '',
                email: '',
            });

            setCount(180);
            //백엔드 api로 이메일 보내기
            axios.post('/auth/email', {
                providerId: '1234',
                email: `${profileValue.email}`,
            });
        } else {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                email: msg.email,
            }));
        }
    };
    const handleEmailAuthenticationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        //백엔드로 코드 보내기
        axios
            .post('/auth/email/verification', {
                providerId: '1234',
                verificationCode: `${value}`,
            })
            .then(res => {
                if (res.data.isVerified) {
                    setErrorMsg(prevErrorMsg => ({
                        ...prevErrorMsg,
                        email: msg.emailsuccess,
                    }));
                    setButtonDisabled(true);
                } else {
                    setErrorMsg(prevErrorMsg => ({
                        ...prevErrorMsg,
                        email: msg.emailfailed,
                    }));
                }
            });
    };

    const handleSignup = (profileValue: ValueProps) => {
        if (errorMsg.email === msg.emailfailed || profileValue.email === '') {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                email: msg.email,
            }));
            return;
        }
        if (profileValue.nickname === '') {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                nickname: msg.nickname,
            }));
            return;
        } else {
            //그렇지 않다면 api 호출
            axios
                .post('/auth/signup', {
                    email: `${profileValue.email}`,
                    categoryIds: [1],
                    nickname: `${profileValue.nickname}`,
                    provider: `${location.state.state}`,
                    providerId: `${location.state.providerId}`,
                })
                .then(res => {
                    localStorage.setItem('accessToken', res.data.accessToken);
                    localStorage.setItem('refreshToken', res.data.refreshToken);
                    navigate('/');
                });
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const id = setInterval(() => {
            setCount(count => count - 1);
        }, 1000);

        if (count === 0) {
            clearInterval(id);
        }
        return () => clearInterval(id);
    }, [count]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Button onClick={handleOpen}>open</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Login"
                className="flex items-center justify-center "
            >
                <Box sx={{ ...style, width: '25%', height: '58%' }}>
                    <div className="flex flex-col items-center justify-center w-full gap-2 ">
                        <div className="border-b border-solid grow border-[#121212] w-full text-black ">
                            <h1 className="pb-3 text-base">시작하기</h1>
                        </div>
                        <div
                            className="flex text-black border-b border-solid grow border-[#121212] flex-wrap w-full p-8"
                            aria-label="이용 약관"
                        >
                            <p className="w-9/12">
                                지금 로그인하고 매일 새로운 기술블로그 소식을 전달받아보세요
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-around h-[30vh] ">
                            <div>
                                <InputTextField
                                    className="h-12 rounded-1xl w-96"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange(e)
                                    }
                                    aria-label="닉네임"
                                    placeholder="닉네임"
                                    name="nickname"
                                />
                            </div>

                            <div className="flex items-center justify-center w-full gap-2 ">
                                <label className="border-none relative">
                                    <InputTextField
                                        className="h-12 rounded-1xl w-96"
                                        variant="outlined"
                                        aria-label="이메일"
                                        placeholder="이메일"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(e)
                                        }
                                        name="email"
                                    />
                                    <button
                                        className="absolute top-2 right-2 bg-bg-blue bg-send bg-cover bg-center	w-4 h-10  border-none shadow-black shadow-md focus:border-none"
                                        aria-label="이메일 인증 요청"
                                        onClick={handleEmailCertificationButton}
                                    />
                                </label>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-center w-full gap-2 ">
                                    <label className="border-none relative">
                                        <InputTextField
                                            className="h-12 rounded-1xl w-96 "
                                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                handleEmailAuthenticationChange(e)
                                            }
                                            placeholder="인증 코드"
                                            aria-label="인증 코드"
                                        />
                                        <p className="absolute top-4 right-4 text-black">
                                            {formatTime(count)}
                                        </p>
                                    </label>
                                </div>

                                <p className="text-red-500 text-sm">
                                    {errorMsg.email && errorMsg.email}
                                </p>
                                <p className="text-red-500 text-sm">
                                    {errorMsg.nickname && errorMsg.nickname}
                                </p>
                            </div>
                        </div>

                        <Button
                            className="h-12 rounded-1xl w-96  bg-bg-blue text-white"
                            onClick={() => handleSignup(profileValue)}
                            aria-label="다음"
                            disabled={!buttonDisabled}
                        >
                            다음
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
