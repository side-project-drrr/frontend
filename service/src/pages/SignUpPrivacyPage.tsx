import { ChangeEvent, useState, useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';

const msg = {
    email: '올바른 이메일 형식이 아닙니다.',
    not_email: '이메일을 입력해주세요.',
    gender: '성별을 체크해주세요.',
    name: '이름을 입력주세요.',
    birthday: '생년월일을 입력해주세요.',
    phone: '휴대전화번호를 입력해주세요',
};

export default function SignupPage() {
    const [emailValue, setEmailValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleEmailValue = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmailValue(value);
    };

    const validationEmailChecked = (value: string) => {
        let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
        if (value.length > 0) {
            regex.test(value) ? setErrorMsg('') : setErrorMsg(msg.email);
        }
    };

    useEffect(() => {
        validationEmailChecked(emailValue);
    }, [emailValue]);

    return (
        <div className="flex items-center justify-center flex-col gap-8 w-full">
            <div className="w-full flex items-center justify-center">
                <Input label="이름" className="max-w-md dark" size="lg" />
            </div>
            <div className="w-full flex items-center justify-center">
                <Input label="닉네임" size="lg" className="max-w-md dark" />
            </div>
            <div className="w-full flex items-center justify-center">
                <Input label="휴대전화번호" size="lg" className="max-w-md dark" />
            </div>
            <div className="w-full flex items-center justify-center flex-col gap-2">
                <Input
                    label="이메일"
                    size="lg"
                    className="max-w-md dark"
                    onChange={e => handleEmailValue(e)}
                />
                <p className="text-red-500">{errorMsg && errorMsg}</p>
            </div>
            <div className="w-full flex items-center justify-center">
                <Input label="생년월일" size="lg" className="max-w-md dark" />
            </div>
            <div className="w-full flex items-center justify-center">
                <Input label="성별" size="lg" className="max-w-md dark" />
            </div>
            <div className="w-full flex items-center justify-center">
                <Button className="max-w-md dark" size="lg" type="submit">
                    회원가입 완료
                </Button>
            </div>
        </div>
    );
}
