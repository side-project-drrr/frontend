import { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from '@mui/base/Button';

import { userInformationState } from '../../recoil/atom/userInformationState';
import { SignUpEmail, SignUpEmailValidation } from '../../service/auth/SocialService';
import { providerIdState } from '../../recoil/atom/providerIdState';
import useDebounce from '../../hooks/useDebounce';
import { ValueProps, IParentProps } from './type';
import EmailInput from './EmailInput';

const msg = {
    email: '올바른 이메일 형식이 아닙니다.',
    nickname: '닉네임을 입력해주세요',
    emailsuccess: '이메일 인증이 완료되었습니다.',
    emailfailed: '이메일 인증이 실패하였습니다.',
};

export default function SingUpForm({ onSignupNext }: IParentProps) {
    const [profileValue, setProfileValue] = useRecoilState(userInformationState);
    const [emailCodeValue, setEmailCodeValue] = useState('');
    const [errorMsg, setErrorMsg] = useState({
        nickname: '',
        email: '',
    });

    const [count, setCount] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const providerId = useRecoilValue(providerIdState);
    const debouncedInputValue = useDebounce(emailCodeValue, { delay: 500 });

    async function emailVaildationRender() {
        if (emailCodeValue !== '') {
            const emailStatusData = await SignUpEmailValidation({
                providerId,
                verificationCode: emailCodeValue,
            });
            if (emailStatusData.isVerified) {
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
                setButtonDisabled(false);
            }
        }
    }

    const handleNextClick = () => {
        onSignupNext();
    };

    const handleEmailCertificationButton = async () => {
        const emailValidationState = validationEmailChecked(profileValue.email);
        if (emailValidationState === undefined) {
            setErrorMsg({
                nickname: '',
                email: '',
            });
            setCount(180);
            emailCodeRender();
        } else {
            setErrorMsg(prevErrorMsg => ({
                ...prevErrorMsg,
                email: msg.email,
            }));
        }
    };
    const handleEmailAuthenticationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmailCodeValue(value);
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

    async function emailCodeRender() {
        await SignUpEmail({ providerId, email: { email: profileValue.email } });
    }

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

    useEffect(() => {
        emailVaildationRender();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedInputValue]);
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full gap-2 ">
                <div className="border-b border-solid grow border-[#121212] w-full text-black ">
                    <h1 className="pb-3 text-base">시작하기</h1>
                </div>
                <div
                    className="flex text-black border-b border-solid grow border-[#121212] flex-wrap w-full p-5"
                    aria-label="이용 약관"
                >
                    <p className="w-9/12">
                        지금 로그인하고 매일 새로운 기술블로그 소식을 전달받아보세요
                    </p>
                </div>
                <EmailInput
                    onEmailCertificationButton={handleEmailCertificationButton}
                    onEmailAuthenticationChange={handleEmailAuthenticationChange}
                    onInputChange={handleInputChange}
                    onCount={count}
                    onSetCount={setCount}
                />
                <p className="text-sm text-red-500">{errorMsg.email && errorMsg.email}</p>
                <p className="text-sm text-red-500">{errorMsg.nickname && errorMsg.nickname}</p>
                <Button
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
        </>
    );
}
