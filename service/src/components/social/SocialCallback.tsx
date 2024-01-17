import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { SocialService, SignInService } from '../../service/auth/SocialService';
import { modalOpenState } from '../../recoil/atom/modalOpenState';
import { providerIdState } from '../../recoil/atom/providerIdState';
import { setAuthStorage } from '../../repository/AuthRepository';

export default function SocialCallback() {
    const [didMount, setDidMount] = useState(false);

    //const setProviderState = useSetRecoilState(providerIdState);
    const [provider, setProvider] = useRecoilState(providerIdState);
    const code = new URL(document.location.toString()).searchParams.get('code');
    const setModalOpen = useSetRecoilState(modalOpenState);

    const location = useLocation();
    const state = location.pathname.split('/')[1];
    const ACCESSTOKEN_KEY = 'accessToken';
    const REFRESHTOKEN_KEY = 'refreshToken';
    const navigate = useNavigate();

    async function socialLoginRender(isRegistered: string) {
        if (isRegistered) {
            navigate('/');
            const authData = await SignInService(provider);
            setAuthStorage(
                ACCESSTOKEN_KEY,
                authData.accessToken,
                REFRESHTOKEN_KEY,
                authData.refreshToken,
            );
        } else {
            navigate('/');
            setModalOpen(true);
        }
    }

    const handleKakaoLogin = async () => {
        const data = await SocialService(code, state);
        setProvider(data.providerId);
        socialLoginRender(data.isRegistered);
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
