import { OAuth2ProviderType } from './Auth.type.ts';

export interface MemberProfile {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string;
    provider: Lowercase<OAuth2ProviderType>;
    providerId: string;
}

export interface MembersMeResponse extends MemberProfile {}
