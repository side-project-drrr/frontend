export type OAuth2ProviderType = 'GITHUB' | 'KAKAO';

interface Token {
    accessToken: string;
    refreshToken: string;
}

export interface SignupRequest {
    email: string;
    categoryIds: number[];
    nickname: string;
    provider: Lowercase<OAuth2ProviderType>;
    providerId: string;
    profileImageUrl: string;
}

export interface SignupResponse extends Token {}

export interface SigninRequest {
    providerId: string;
}

export interface SigninResponse extends Token {}

export interface Oauth2ProfileRequest {
    code: string;
    state: string;
}

export interface Oauth2ProfileResponse {
    providerId: string;
    profileImageUrl: string;
    isRegistered: boolean;
}
