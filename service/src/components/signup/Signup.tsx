import { ChangeEvent, useEffect, useState } from 'react';
//import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Button } from '@mui/base/Button';
import { useRecoilState, useRecoilValue } from 'recoil';

import { IParentProps, ValueProps } from './type';
import { style } from '../../style/modalBox';
import { InputTextField } from '../../style/inputText';

import { modalOpenState } from '../../recoil/atom/modalOpenState';
import IconButton from '@mui/material/IconButton';
import send from '../../assets/send.webp';
import { userInformationState } from '../../recoil/atom/userInformationState';
import { SignUpEmail } from '../../service/auth/SocialService';
import { providerIdState } from '../../recoil/atom/providerIdState';
//import { SignUpEmailValidation } from '../../service/auth/SocialService';

const msg = {
    email: '올바른 이메일 형식이 아닙니다.',
    nickname: '닉네임을 입력해주세요',
    emailsuccess: '이메일 인증이 완료되었습니다.',
    emailfailed: '이메일 인증이 실패하였습니다.',
};

export default function SignUp({ onSignupNext }: IParentProps) {
    const [errorMsg, setErrorMsg] = useState({
        nickname: '',
        email: '',
    });

    const [count, setCount] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    // const navigate = useNavigate();
    const [modalOpen, setModalOepn] = useRecoilState(modalOpenState);
    const [profileValue, setProfileValue] = useRecoilState(userInformationState);
    const providerId = useRecoilValue(providerIdState);

    // async function handleEmailVaildationRender(value: string) {
    //const emailCodeData = SignUpEmailValidation(providerId, value);
    //     console.log(emailCodeData);
    // }

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
    const handleEmailCertificationButton = async () => {
        const emailValidationState = validationEmailChecked(profileValue.email);
        if (emailValidationState === undefined) {
            setErrorMsg({
                nickname: '',
                email: '',
            });

            setCount(180);
            const data = await SignUpEmail({ providerId, email: { email: profileValue.email } });
            console.log(data + '인증코드');
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

    const handleNextClick = () => {
        onSignupNext();
    };

    const handleClose = () => setModalOepn(false);
    return (
        <>
            <Modal
                open={modalOpen}
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
                                <label className="relative border-none">
                                    <InputTextField
                                        className="h-12 rounded-1xl w-96"
                                        variant="outlined"
                                        aria-label="이메일"
                                        placeholder="이메일"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(e)
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton
                                                    color="primary"
                                                    component="span"
                                                    className="w-10 h-10"
                                                    onClick={handleEmailCertificationButton}
                                                >
                                                    <img
                                                        className="absolute w-11 h-10 bg-center bg-cover border-none shadow-md bg-[#0070F0] bg-send shadow-black focus:border-none rounded-lg"
                                                        src={send}
                                                        alt="이메일 인증 요청"
                                                    />
                                                </IconButton>
                                            ),
                                        }}
                                        name="email"
                                    ></InputTextField>
                                </label>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-center w-full gap-2 ">
                                    <label className="relative border-none">
                                        <InputTextField
                                            className="h-12 rounded-1xl w-96 "
                                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                handleEmailAuthenticationChange(e)
                                            }
                                            placeholder="인증 코드"
                                            aria-label="인증 코드"
                                        />
                                        <p className="absolute text-black top-4 right-4">
                                            {formatTime(count)}
                                        </p>
                                    </label>
                                </div>

                                <p className="text-sm text-red-500">
                                    {errorMsg.email && errorMsg.email}
                                </p>
                                <p className="text-sm text-red-500">
                                    {errorMsg.nickname && errorMsg.nickname}
                                </p>
                            </div>
                        </div>

                        <Button
                            //className="h-12 text-white rounded-1xl w-96 bg-bg-blue"
                            onClick={() => {
                                handleSignup(profileValue);
                                handleNextClick();
                            }}
                            aria-label="다음"
                            disabled={!buttonDisabled}
                            slotProps={{
                                root: () => ({
                                    className: `bg-blue-500 w-full text-white rounded-1xl h-12`,
                                }),
                            }}
                        >
                            다음
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
