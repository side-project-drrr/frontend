import { AxiosError } from 'axios';
import HttpClient from '../../apis/HttpClient';
import { IAuthProps, IAuthEmailProps, IAuthEmailVaildationProps } from './type';

export const SocialService = async (code: string | null, state: string) => {
    try {
        const res = await HttpClient.get(`/api/v1/auth/oauth2/profile?code=${code}&state=${state}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export async function SignInService(providerValue: string) {
    try {
        const res = await HttpClient.post(`/api/v1/auth/signin`, {
            providerId: `${providerValue}`,
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function SignUpService({
    email,
    categoryIds,
    nickName,
    provider,
    providerId,
    profileImageUrl,
}: IAuthProps) {
    try {
        const res = await HttpClient.post(`/api/v1/auth/signup`, {
            email: `${email}`,
            categoryIds: categoryIds.map(Number),
            nickname: `${nickName}`,
            provider: `${provider}`,
            providerId: `${providerId}`,
            profileImageUrl: `${profileImageUrl}`,
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function SignUpEmail({ providerId, email }: IAuthEmailProps) {
    try {
        const res = await HttpClient.post(`/api/v1/send-verification-email`, {
            email: `${email.email}`,
            providerId: `${providerId}`,
        });

        return res;
    } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) {
            console.log(error.response?.data);
        }
    }
}

export async function SignUpEmailValidation({
    providerId,
    verificationCode,
}: IAuthEmailVaildationProps) {
    try {
        const res = await HttpClient.post(`/api/v1/verify-email`, {
            providerId: `${providerId}`,
            verificationCode: `${verificationCode}`,
        });

        return res;
    } catch (error) {
        console.error(error);
    }
}

export async function LogoutService(accessToken: string, refreshToken: string) {
    try {
        const res = await HttpClient.post(`/api/v1/auth/signout`, {
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function reissuanceTokenService(accessToken: string, refreshToken: string) {
    try {
        const res = await HttpClient.post(`/api/v1/auth/access-token`, {
            accessToken: accessToken,
            refreshToken: refreshToken,
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function nickNameValidation(nickname: string) {
    try {
        const res = await HttpClient.get(`/api/v1/auth/check-nickname?nickname=${nickname}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
