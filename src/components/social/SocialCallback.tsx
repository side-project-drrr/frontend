import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { modalOpenState } from '../../recoil/atom/modalOpenState';
import { providerIdState } from '../../recoil/atom/providerIdState';
import { setProfileImgStorage } from '../../repository/ProfileimgRepository';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';
import { useProfileState } from '../../context/UserProfile';
import { subscribeUser } from '../../webpush/main';
import { ISocial } from './type';
import { useSocialQuery } from '../../hooks/useSocialQuery';
import { useSocialMutation } from '../../hooks/useSocialMutation';

export default function SocialCallback() {
    const setProviderIdState = useSetRecoilState(providerIdState);
    const code = new URL(document.location.toString()).searchParams.get('code');
    const setModalOpen = useSetRecoilState(modalOpenState);
    const location = useLocation();
    const state = location.pathname.split('/')[1];

    const navigate = useNavigate();
    const setLoggedIn = useSetRecoilState(isLoggedInState);
    const { login } = useProfileState();

    const { data } = useSocialQuery(code || '', state);

    const authData = useSocialMutation();
    async function socialLoginRender(
        isRegistered: boolean,
        providerId: string,
        profileImageUrl: string,
    ) {
        if (isRegistered) {
            authData.mutate(providerId);
            setProviderIdState(providerId);
            setProfileImgStorage(profileImageUrl);
            setLoggedIn(true);
            subscribeUser();
            subscribeUser();
            navigate('/');
        } else {
            navigate('/');
            subscribeUser();
            subscribeUser();
            setProviderIdState(providerId);
            setProfileImgStorage(profileImageUrl);
            setModalOpen(true);
        }
    }

    const handleKakaoLogin = async (data: ISocial) => {
        socialLoginRender(data.isRegistered, data.providerId, data.profileImageUrl);
    };

    useEffect(() => {
        if (data) handleKakaoLogin(data);
    }, [data]);

    useEffect(() => {
        if (authData.data) login(authData.data.accessToken);
    }, [authData.data]);

    return <div>로그인 중...</div>;
}
