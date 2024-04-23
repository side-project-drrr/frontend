import IconButton from '@mui/material/IconButton';
import { InputTextField } from '../../style/inputText';
import { useEffect } from 'react';
import { IEmailProps } from './type';
import { ChangeEvent } from 'react';
import { BsSend } from 'react-icons/bs';

export default function SignUpInputForm({
    onEmailCertificationButton,
    onEmailAuthenticationChange,
    onInputChange,
    onCount,
    onSetCount,
    onNickNameValidationRender,
}: IEmailProps) {
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const id = setTimeout(() => {
            if (onCount > 0) {
                onSetCount(prevCount => prevCount - 1);
            }
        }, 1000);

        return () => clearTimeout(id);
    }, [onCount, onSetCount]);

    return (
        <>
            <div className="flex flex-col items-center justify-around w-full gap-2 ">
                <div className="flex items-center justify-center w-full mt-5">
                    <InputTextField
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                        aria-label="닉네임"
                        placeholder="닉네임"
                        name="nickname"
                        autoComplete="off"
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    color="primary"
                                    component="span"
                                    className="w-10 h-10"
                                    onClick={onNickNameValidationRender}
                                >
                                    <BsSend className="hover:text-[#E6783A]" />
                                </IconButton>
                            ),
                        }}
                    />
                </div>

                <div className="flex items-center justify-center w-full gap-2 ">
                    <InputTextField
                        variant="outlined"
                        aria-label="이메일"
                        placeholder="이메일"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    color="primary"
                                    component="span"
                                    className="w-10 h-10"
                                    onClick={onEmailCertificationButton}
                                >
                                    <BsSend className="hover:text-[#E6783A]" />
                                </IconButton>
                            ),
                        }}
                        autoComplete="off"
                        name="email"
                    />
                </div>
                <div className="relative flex flex-col w-full gap-4 ">
                    <div className="flex items-center justify-center w-full gap-2 ">
                        <InputTextField
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                onEmailAuthenticationChange(e)
                            }
                            placeholder="인증 코드"
                            aria-label="인증 코드"
                            sx={{ width: '75%' }}
                            autoComplete="off"
                        />
                        <p className="text-black top-2.5 absolute right-0 mr-14">
                            {formatTime(onCount)}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
