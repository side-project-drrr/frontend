import send from '../../assets/send.webp';
import IconButton from '@mui/material/IconButton';
import { InputTextField } from '../../style/inputText';
import { useEffect } from 'react';
import { IEmailProps } from './type';
import { ChangeEvent } from 'react';
export default function EmailInput({
    onEmailCertificationButton,
    onEmailAuthenticationChange,
    onInputChange,
    onCount,
    onSetCount,
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
            <div className="flex flex-col items-center justify-around h-[30vh] ">
                <div>
                    <InputTextField
                        className="h-12 rounded-1xl w-96"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
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
                            onChange={(e: ChangeEvent<HTMLInputElement>) => onInputChange(e)}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        color="primary"
                                        component="span"
                                        className="w-10 h-10"
                                        onClick={onEmailCertificationButton}
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
                                    onEmailAuthenticationChange(e)
                                }
                                placeholder="인증 코드"
                                aria-label="인증 코드"
                                inputProps={{ maxLength: 6 }}
                            />
                            <p className="absolute text-black top-4 right-4">
                                {formatTime(onCount)}
                            </p>
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}
