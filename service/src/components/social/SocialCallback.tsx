import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { SignInService, SocialService } from '../../service/auth/SocialService';
import { modalOpenState } from '../../recoil/atom/modalOpenState';
import { useSetRecoilState } from 'recoil';

export default function SocialCallback() {
    const [didMount, setDidMount] = useState(false);
    const code = new URL(document.location.toString()).searchParams.get('code');
    const setModalOpen = useSetRecoilState(modalOpenState);

    const location = useLocation();
    const state = location.pathname.split('/')[1];

    const navigate = useNavigate();

    const handleKakaoLogin = async () => {
        const data = await SocialService(code, state);
        if (data.statusCode === 202) {
            await SignInService(data.providerId);
        }
        if (!data.isRegistered) {
            setModalOpen(true);
        }
        navigate('/');
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
