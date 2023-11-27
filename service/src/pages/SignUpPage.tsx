import { ChangeEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import axios from 'axios';

const msg = {
    email: '올바른 이메일 형식이 아닙니다.',
    nickname: '닉네임을 입력해주세요',
    emailsuccess: '이메일 인증이 완료되었습니다.',
    emailfailed: '이메일 인증이 실패하였습니다.',
};

interface ValueProps {
    email: string;
    nickname: string;
}

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
    const handleEmailTextValue = () => {
        const emailValidationState = validationEmailChecked(profileValue.email);
        if (emailValidationState === undefined) {
            setErrorMsg({
                nickname: '',
                email: '',
            });
            setEmailElement(true);
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

    const handleEmailAuthentication = () => {
        //백엔드로 코드 보내기
        axios
            .post('/auth/email/check', {
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
    return (
        <div className="flex flex-col items-center justify-center w-full gap-8">
            <div className="flex flex-col items-center justify-center w-full gap-2">
                <Input
                    label="닉네임"
                    size="lg"
                    className="max-w-md dark"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    name="nickname"
                />
                <p className="text-red-500">{errorMsg.nickname && errorMsg.nickname}</p>
            </div>

            <div className="flex flex-col items-center justify-center w-full gap-2 ">
                <div className="flex items-center justify-center w-full gap-2 ">
                    <Input
                        label="이메일"
                        size="lg"
                        className="max-w-md dark"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                        name="email"
                    />
                    <Button className="max-w-md dark" size="lg" onClick={handleEmailTextValue}>
                        인증요청
                    </Button>
                </div>
                {emailElement && (
                    <div className="flex items-center justify-center w-full gap-2 ">
                        <Input
                            size="lg"
                            className="max-w-md dark"
                            label="인증번호"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleEmailChange(e)}
                        />
                        <Button
                            size="lg"
                            className="max-w-md dark"
                            onClick={handleEmailAuthentication}
                        >
                            인증완료
                        </Button>
                    </div>
                )}

                <p className="text-red-500">{errorMsg.email && errorMsg.email}</p>
            </div>
            <div className="flex items-center justify-center w-full">
                <Button
                    className="w-full max-w-md dark"
                    size="lg"
                    onClick={() => handleSignup(profileValue)}
                >
                    회원가입 완료
                </Button>
            </div>
        </div>
    );
}
