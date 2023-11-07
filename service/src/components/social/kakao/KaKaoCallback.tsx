import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
export default function KaKaoCallback() {
    const [searchParams] = useSearchParams();
    const params = searchParams.get('code');
    const grantType = 'authorization_code';
    const REST_API_KEY = import.meta.env.VITE_APP_KAKAO_REST_API_KEY; //REST API KEY
    const REDIRECT_URL = import.meta.env.VITE_APP_REDIRECT_URL; //Redirect URI
    async function profileFetching() {
        axios
            .post(
                `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URL}&code=${params}`,
                {},
                {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    },
                },
            )
            .then(res => {
                const { access_token } = res.data;
                if (access_token) {
                    axios
                        .post(
                            `https://kapi.kakao.com/v2/user/me`,
                            {},
                            {
                                headers: {
                                    Authorization: `Bearer ${access_token}`,
                                    'Content-type':
                                        'application/x-www-form-urlencoded;charset=utf-8',
                                },
                            },
                        )
                        .then(res => {
                            console.log(res);
                            console.log(res.data.kakao_account.profile.nickname);
                        });
                } else {
                    console.log('토큰이 존재 하지 않음');
                }
            });
    }

    useEffect(() => {
        profileFetching();
    }, [searchParams]);

    return <div></div>;
}
