import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { SocialService, SignInService } from '../../service/auth/SocialService';
import { modalOpenState } from '../../recoil/atom/modalOpenState';
import { providerIdState } from '../../recoil/atom/providerIdState';
import { setAuthStorage } from '../../repository/AuthRepository';

export default function SocialCallback() {
    const [didMount, setDidMount] = useState(false);

    const setProviderState = useSetRecoilState(providerIdState);
    const code = new URL(document.location.toString()).searchParams.get('code');
    const setModalOpen = useSetRecoilState(modalOpenState);
    const location = useLocation();
    const state = location.pathname.split('/')[1];
    const ACCESSTOKEN_KEY = 'accessToken';
    const REFRESHTOKEN_KEY = 'refreshToken';
    const navigate = useNavigate();

    async function socialLoginRender(isRegistered: string, providerId: string) {
        if (isRegistered) {
            const authData = await SignInService(providerId);
            setAuthStorage(
                ACCESSTOKEN_KEY,
                authData.accessToken,
                REFRESHTOKEN_KEY,
                authData.refreshToken,
            );
            setProviderState(providerId);
            navigate('/');
        } else {
            navigate('/');
            setProviderState(providerId);
            setModalOpen(true);
        }
    }

    const handleKakaoLogin = async () => {
        const data = await SocialService(code, state);
        socialLoginRender(data.isRegistered, data.providerId);
    };

    useEffect(() => {
        setDidMount(true);
    }, []);

    useEffect(() => {
        if (didMount) {
            handleKakaoLogin();
        }
    }, [didMount]);

    return <div>로그인 중...</div>;
}
