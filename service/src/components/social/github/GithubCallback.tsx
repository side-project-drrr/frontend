import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function GithubCallback() {
    const [didMount, setDidMount] = useState(false);

    const code = new URL(document.location.toString()).searchParams.get('code');

    const STATE = 'github';
    const navigate = useNavigate();

    useEffect(() => {
        setDidMount(true);
    }, []);

    useEffect(() => {
        if (didMount) {
            axios.get(`/auth/oauth2/profile?code=${code}&state=${STATE}`).then(res => {
                const data = res.data;
                if (data[0].isRegistred) {
                    navigate('/', { state: data[0].providerId });
                } else {
                    navigate('/signup');
                }
            });
        }
    }, [didMount]);

    return <div>로그인 중...</div>;
}
