export interface IAuthProps {
    email: string;
    categoryIds: number[];
    nickName: string;
    provider: string | undefined;
    providerId: string;
    profileImageUrl: string | null;
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
