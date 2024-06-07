import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { SocialService, SignInService } from '../../service/auth/SocialService';
import { modalOpenState } from '../../recoil/atom/modalOpenState';
import { providerIdState } from '../../recoil/atom/providerIdState';
import { setAccessTokenStorage, setRefreshTokenStorage } from '../../repository/AuthRepository';
import { setProfileImgStorage } from '../../repository/ProfileimgRepository';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';
import { useProfileState } from '../../context/UserProfile';
import { subscribeUser } from '../../webpush/main';

export default function SocialCallback() {
    const setProviderIdState = useSetRecoilState(providerIdState);
    const code = new URL(document.location.toString()).searchParams.get('code');
    const setModalOpen = useSetRecoilState(modalOpenState);
    const location = useLocation();
    const state = location.pathname.split('/')[1];
    const ACCESSTOKEN_KEY = 'accessToken';
    const REFRESHTOKEN_KEY = 'refreshToken';
    const navigate = useNavigate();
    const setLoggedIn = useSetRecoilState(isLoggedInState);
    const { login, token } = useProfileState();
    const [didMount, setDidMount] = useState(false);

    async function socialLoginRender(
        isRegistered: string,
        providerId: string,
        profileImageUrl: string,
    ) {
        if (isRegistered) {
            const authData = await SignInService(providerId);
            setAccessTokenStorage(ACCESSTOKEN_KEY, authData.accessToken);
            setRefreshTokenStorage(REFRESHTOKEN_KEY, authData.refreshToken);
            login(authData.refreshToken);
            setProviderIdState(providerId);
            setProfileImgStorage(profileImageUrl);
            subscribeUser();
            setLoggedIn(true);
            navigate('/');
        } else {
            navigate('/');

            setProviderIdState(providerId);
            setProfileImgStorage(profileImageUrl);
            setModalOpen(true);
        }
    }

    const handleKakaoLogin = async () => {
        const data = await SocialService(code, state);

        if (data === undefined) navigate('/');
        else socialLoginRender(data.isRegistered, data.providerId, data.profileImageUrl);
    };

    useEffect(() => {
        setDidMount(true);
    }, []);

    useEffect(() => {
        if (didMount) handleKakaoLogin();
    }, [didMount]);
    useEffect(() => {
        if (token) subscribeUser();
    }, [token]);

    return <div>로그인 중...</div>;
}
