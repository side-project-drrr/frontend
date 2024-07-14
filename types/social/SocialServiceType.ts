export interface IAuthParents {
    providerId: string;
}

export interface IAuthProps extends IAuthParents {
    email: string;
    categoryIds: number[];
    nickName: string;
    provider: string | undefined;
    profileImageUrl: string | null;
}

export interface IAuthEmailProps extends IAuthParents {
    email: {
        email: string;
        nickname?: string;
    };
    isRegistered: boolean;
}

export interface IAuthEmailVaildationProps extends IAuthParents {
    verificationCode: string;
}
