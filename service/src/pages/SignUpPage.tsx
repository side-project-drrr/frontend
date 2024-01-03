import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from '@mui/base/Button';
import TextField from '@mui/material/TextField';
import { ValueProps } from './type';
import { style } from '../style/modalBox';
import send from '../assets/send-2.png';

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
    const [emailElement, setEmailElement] = useState(false);
    const [emailCode, setEmailCode] = useState('');
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    //console.log(location);
    //  const modalOpen = location.state.open;
    // const handleClose = () => {
    //     location.state.setOpen(false);
    // };

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
    const handleEmailTextValue = () => {
        const emailValidationState = validationEmailChecked(profileValue.email);
        if (emailValidationState === undefined) {
            setErrorMsg({
                nickname: '',
                email: '',
            });
            setEmailElement(true);
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
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmailCode(value);
    };
    console.log(handleEmailTextValue);
    const handleEmailAuthentication = () => {
        //백엔드로 코드 보내기
        axios
            .post('/auth/email/verification', {
                providerId: '1234',
                verificationCode: `${emailCode}`,
            })
            .then(res => {
                if (res.data.isVerified) {
                    setErrorMsg(prevErrorMsg => ({
                        ...prevErrorMsg,
                        email: msg.emailsuccess,
                    }));
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
                {/* //className="flex flex-col items-center justify-center w-full gap-8" */}
                <Box sx={{ ...style, width: '25%', height: '53%' }}>
                    <div className="flex flex-col items-center justify-center w-full gap-2">
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
                        <div className="flex flex-col items-center gap-4">
                            <div>
                                <TextField
                                    className="h-12 bg-center bg-repeat bg-cover rounded-1xl w-96 bg-send bg-bg-send "
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        handleInputChange(e)
                                    }
                                    aria-label="닉네임"
                                    placeholder="닉네임"
                                    name="nickname"
                                />
                                <p className="text-red-500">
                                    {errorMsg.nickname && errorMsg.nickname}
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center w-full gap-2 ">
                                <div className="flex items-center justify-center w-full gap-2 ">
                                    <TextField
                                        className="h-12 bg-center bg-repeat bg-cover rounded-1xl w-96 bg-send bg-bg-send "
                                        variant="outlined"
                                        aria-label="이메일"
                                        placeholder="이메일"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(e)
                                        }
                                        name="email"
                                    />
                                </div>
                                {emailElement && (
                                    <div className="flex items-center justify-center w-full gap-2 ">
                                        <TextField
                                            className="max-w-md dark"
                                            InputProps={{
                                                startAdornment: (
                                                    <img
                                                        src={send}
                                                        alt="아이콘"
                                                        style={{ height: '20px', width: '20px' }}
                                                    />
                                                ),
                                            }}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                handleEmailChange(e)
                                            }
                                        />
                                        <Button
                                            className="max-w-md dark"
                                            onClick={handleEmailAuthentication}
                                        >
                                            인증완료
                                        </Button>
                                        {formatTime(count)}
                                    </div>
                                )}

                                <p className="text-red-500">{errorMsg.email && errorMsg.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <Button
                                className="w-full max-w-md dark"
                                onClick={() => handleSignup(profileValue)}
                            >
                                회원가입 완료
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
