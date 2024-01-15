export interface IAuthProps {
    email: string;
    categoryIds: string[];
    nickName: string;
    provider: string;
    providerId: string;
}

export interface IAuthEmailProps {
    providerId: string;
    email: string;
}

export interface IAuthEmailVaildationProps {
    providerId: string;
    verificationCode: string;
}
