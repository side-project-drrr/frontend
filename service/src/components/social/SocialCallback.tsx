import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { SocialServcie } from '../../service/SocialService';
//import SignUpPage from '../../pages/SignUpPage';

export default function SocialCallback() {
    const [didMount, setDidMount] = useState(false);

    const code = new URL(document.location.toString()).searchParams.get('code');

    const location = useLocation();
    const state = location.pathname.split('/')[1];

    const navigate = useNavigate();

    const handleKakaoLogin = async () => {
        const data = await SocialServcie(code, state);
        console.log(data);
        if (data.isRegistered) {
            navigate('/');
        } else {
            navigate('/');

            navigate('/signup', { state: { providerId: data.providerId, state } });
        }
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
