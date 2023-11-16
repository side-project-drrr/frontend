import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SocialServcie } from '../../../service/SocialService';

export default function GithubCallback() {
    const [didMount, setDidMount] = useState(false);

    const code = new URL(document.location.toString()).searchParams.get('code');

    const state = 'github';
    const navigate = useNavigate();

    const hadleGithubLogin = async () => {
        const data = await SocialServcie(code, state);
        if (data.isRegistered) {
            navigate('/', { state: data.providerId });
        } else {
            navigate('/signup', { state: data.providerId });
        }
    };

    useEffect(() => {
        setDidMount(true);
    }, []);

    useEffect(() => {
        if (didMount) {
            hadleGithubLogin();
        }
    }, [didMount]);

    return <div>로그인 중...</div>;
}
