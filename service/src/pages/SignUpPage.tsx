import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import axios from 'axios';

const msg = {
    email: '올바른 이메일 형식이 아닙니다.',
    name: '이름을 입력주세요.',
    nickname: '닉네임을 입력해주세요',
};

interface ValueProps {
    email: string;
    name: string;
    nickname: string;
}

export default function SignUpPage() {
    const [errorMsg, setErrorMsg] = useState({
        name: '',
        nickname: '',
        email: '',
    });
    const [profileValue, setProfileValue] = useState<ValueProps>({
        name: '',
        nickname: '',
        email: '',
    });
    const [emailElement, setEmailElement] = useState(false);
    const [emailCode, setEmailCode] = useState('');
    const navigate = useNavigate();

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
            setEmailElement(true);
            //백엔드 api로 이메일 보내기
            axios.post('/auth/email', {
                providerId: '1234',
                email: `${profileValue.email}`,
            });
        } else {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                email: errorMsg.email,
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
                if (res.data.isVerified) navigate('/');
            });
    };

    const handleSignup = (profileValue: ValueProps) => {
        if (profileValue.name === '') {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                name: msg.name,
            }));
        }
        if (profileValue.nickname === '') {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                nickname: msg.nickname,
            }));
            return;
        } else {
            //그렇지 않다면 api 호출
            console.log('api 호출');
            navigate('/signup/category');
        }
    };
    return (
        <div className="flex flex-col items-center justify-center w-full gap-8">
            <div className="flex flex-col items-center justify-center w-full gap-2">
                <Input
                    label="이름"
                    className="max-w-md dark"
                    size="lg"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    name="name"
                />
                <p className="text-red-500">{errorMsg.name && errorMsg.name} </p>
            </div>
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
