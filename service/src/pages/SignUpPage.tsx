import { ChangeEvent, useState, useEffect } from 'react';
import { Button, Input } from '@nextui-org/react';

const msg = {
    email: '올바른 이메일 형식이 아닙니다.',
    gender: '성별을 체크해주세요.',
    name: '이름을 입력주세요.',
    birthday: '생년월일을 입력해주세요.',
    phone: '휴대전화번호를 입력해주세요',
    nickname: '닉네임을 입력해주세요',
};

interface ValueProps {
    gender: string;
    email: string;
    birthday: string;
    name: string;
    phone: string;
    nickname: string;
}
export default function SignupPage() {
    const [errorMsg, setErrorMsg] = useState({
        gender: '',
        name: '',
        nickname: '',
        email: '',
        birthday: '',
        phone: '',
    });
    const [profileValue, setProfileValue] = useState<ValueProps>({
        gender: '',
        name: '',
        nickname: '',
        email: '',
        birthday: '',
        phone: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileValue(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };
    const validationEmailChecked = (value: string) => {
        let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
        if (regex.test(value)) {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                email: msg.email,
            }));
        }
    };

    // const isEmpty = (value: string) => value === '';
    // const isAnyFieldEmpty = Object.values(profileValue).some(isEmpty);

    const handleSignup = (profileValue: ValueProps) => {
        //메세지들이 떠있는지 확인한 후 return
        if (profileValue.birthday === '') {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                birthday: msg.birthday,
            }));
        }
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
        }
        if (profileValue.gender === '') {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                gender: msg.gender,
            }));
        }
        if (profileValue.phone === '') {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                phone: msg.phone,
            }));
            return;
        } else {
            //그렇지 않다면 api 호출
            console.log('api 호출');
        }
    };
    useEffect(() => {
        validationEmailChecked(profileValue.email);
    }, [profileValue.email]);

    return (
        <div className="flex items-center justify-center flex-col gap-8 w-full">
            <div className="w-full flex items-center justify-center flex-col gap-2">
                <Input
                    label="이름"
                    className="max-w-md dark"
                    size="lg"
                    onChange={e => handleInputChange(e)}
                    name="name"
                />
                <p className="text-red-500">{errorMsg.name && errorMsg.name} </p>
            </div>
            <div className="w-full flex items-center justify-center flex-col gap-2">
                <Input
                    label="닉네임"
                    size="lg"
                    className="max-w-md dark"
                    onChange={e => handleInputChange(e)}
                    name="nickname"
                />
                <p className="text-red-500">{errorMsg.nickname && errorMsg.nickname}</p>
            </div>
            <div className="w-full flex items-center justify-center flex-col gap-2">
                <Input
                    label="휴대전화번호"
                    size="lg"
                    className="max-w-md dark"
                    onChange={e => handleInputChange(e)}
                    name="phone"
                />
                <p className="text-red-500">{errorMsg.phone && errorMsg.phone} </p>
            </div>
            <div className="w-full flex items-center justify-center flex-col gap-2">
                <Input
                    label="이메일"
                    size="lg"
                    className="max-w-md dark"
                    onChange={e => handleInputChange(e)}
                    name="email"
                />
                <p className="text-red-500">{errorMsg.email && errorMsg.email}</p>
            </div>
            <div className="w-full flex items-center justify-center flex-col gap-2">
                <Input
                    label="생년월일"
                    size="lg"
                    className="max-w-md dark"
                    onChange={e => handleInputChange(e)}
                    name="birthday"
                />
                <p className="text-red-500 mt-5">{errorMsg.birthday && errorMsg.birthday}</p>
            </div>
            <div className="w-full flex items-center flex-col justify-around h-full">
                <ul className="flex text-center items-center w-2/5 justify-around flex-1 ">
                    <li>
                        <input
                            type="radio"
                            value="MAN"
                            id="MAN"
                            className="hidden peer"
                            name="gender"
                            onChange={e => handleInputChange(e)}
                        />
                        <label
                            htmlFor="MAN"
                            className="inline-flex items-center justify-between w-[200px] p-5 text-gray-500  border border-gray-200 rounded-lg cursor-pointer dark:hover:text-blue-500 dark:border-blue-500 dark:peer-checked:text-blue-100 peer-checked:border-blue-500 peer-checked:text-blue-600 hover:text-blue-500  dark:text-blue-500"
                        >
                            남자
                        </label>
                    </li>
                    <li className="flex flex-col">
                        <input
                            type="radio"
                            value="WOMAN"
                            id="WOMAN"
                            className="hidden peer"
                            name="gender"
                            onChange={e => handleInputChange(e)}
                        />
                        <label
                            htmlFor="WOMAN"
                            className="inline-flex items-center justify-between w-[200px] p-5 text-gray-500  border border-gray-200 rounded-lg cursor-pointer dark:hover:text-blue-500 dark:border-blue-500 dark:peer-checked:text-blue-100 peer-checked:border-blue-500 peer-checked:text-blue-600 hover:text-blue-500  dark:text-blue-500 "
                        >
                            여자
                        </label>
                    </li>
                </ul>
                <p className="text-red-500 mt-5">{errorMsg.gender && errorMsg.gender}</p>
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
