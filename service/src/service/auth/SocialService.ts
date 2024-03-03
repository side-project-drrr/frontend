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
        return res.data;
    } catch (error) {
        console.error(error);
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
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
