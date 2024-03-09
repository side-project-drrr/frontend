import { OAuth2ProviderType } from '../types/Auth.type.ts';

export const OAuth2Provider: Record<OAuth2ProviderType, string> = {
    GITHUB: 'github',
    KAKAO: 'kakao',
} as const;

export const OAuth2ProviderText: Record<OAuth2ProviderType, string> = {
    KAKAO: '카카오로 시작하기',
    GITHUB: '깃허브로 시작하기',
};
