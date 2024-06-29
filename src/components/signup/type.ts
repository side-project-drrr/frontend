import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface ValueProps {
    email: string;
    nickname: string;
}

export interface ISignModalProps {
    onSignupNext: () => void;
}

export interface ISignFormProps {
    onSignupNext: () => void;
    onHandleClose: () => void;
}

export interface ISingupFormProps {
    onSignupNext: () => void;
    handleClose: () => void;
}

export interface IEmailProps {
    onEmailCertificationButton: () => void;
    onEmailAuthenticationChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onCount: number;
    onSetCount: Dispatch<SetStateAction<number>>;
    onNickNameValidationRender: () => void;
}
