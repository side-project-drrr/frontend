import { ChangeEvent, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

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
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                email: '',
            }));
        } else {
            setEmailElement(false);
            //백엔드 api로 이메일 보내기
            console.log(profileValue.email + '49번쨰 라인');
        }
    };
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmailCode(value);
    };
    const handleEmailAuthentication = () => {
        //백엔드로 코드 보내기
        console.log(emailCode);
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
        <div className="flex items-center justify-center flex-col gap-8 w-full">
            <div className="w-full flex items-center justify-center flex-col gap-2">
                <Input
                    label="이름"
                    className="max-w-md dark"
                    size="lg"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    name="name"
                />
                <p className="text-red-500">{errorMsg.name && errorMsg.name} </p>
            </div>
            <div className="w-full flex items-center justify-center flex-col gap-2">
                <Input
                    label="닉네임"
                    size="lg"
                    className="max-w-md dark"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    name="nickname"
                />
                <p className="text-red-500">{errorMsg.nickname && errorMsg.nickname}</p>
            </div>

            <div className="w-full flex items-center justify-center flex-col gap-2 ">
                <div className="w-full flex items-center justify-center gap-2 ">
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
                    <div className="w-full flex items-center justify-center gap-2 ">
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
            <div className="w-full flex items-center justify-center">
                <Button
                    className="max-w-md dark w-full"
                    size="lg"
                    onClick={() => handleSignup(profileValue)}
                >
                    회원가입 완료
                </Button>
            </div>
        </div>
    );
}
