import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SocialServcie } from '../../service/SocialService';

export default function KaKaoCallback() {
    const [didMount, setDidMount] = useState(false);

    const code = new URL(document.location.toString()).searchParams.get('code');
    const state = 'kakao';
    const navigate = useNavigate();

    const hadleKakaoLogin = async () => {
        const data = await SocialServcie(code, state);
        if (data[0].isRegistred) {
            navigate('/', { state: data[0].providerId });
        } else {
            navigate('/signup', { state: data[0].providerId });
        }
    };

    useEffect(() => {
        setDidMount(true);
    }, []);

    useEffect(() => {
        if (didMount) {
            hadleKakaoLogin();
        }
    }, [didMount]);

    return <div>로그인 중...</div>;
}
