export interface IAuthProps {
    email: string;
    categoryIds: string[];
    nickName: string;
    provider: string | undefined;
    providerId: string;
}

export interface IAuthEmailProps {
    providerId: string;
    email: {
        email: string;
        nickname?: string;
    };
}

export interface IAuthEmailVaildationProps {
    providerId: string;
    verificationCode: string;
}
