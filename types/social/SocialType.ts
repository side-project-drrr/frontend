export interface ISocialStateProps {
    state: 'kakao' | 'github';
}

export interface ISocial {
    isRegistered: boolean;
    providerId: string;
    profileImageUrl: string;
}
