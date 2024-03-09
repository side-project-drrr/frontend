import { useNavigate, useSearchParams } from 'react-router-dom';
import { OAuth2Provider } from '../constants/auth.ts';
import { useCallback, useEffect } from 'react';
import requestOAuthProfile from '../service/auth/requestOAuthProfile.ts';
import signin from '../service/auth/post/Signin.ts';
import { useMemberInfoAction } from '../contexts/MemberProfileContext.tsx';
import Modal from '@mui/material/Modal';
import useModal from '../hooks/useModal.ts';
import SignupForm from '../components/signup/SignupForm.tsx';

const KAKAO_CODE = 'code';
const state = OAuth2Provider.KAKAO;

const SignupFormModal = () => {
    const { open, handleClose } = useModal(true);
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Login"
            className="flex items-center justify-center"
        >
            <SignupForm />
        </Modal>
    );
};
const KakaoAuthRedirectPage = () => {
    const [params] = useSearchParams();
    const code = params.get(KAKAO_CODE);
    const { refetchMemberInfo: fetchMemberProfile } = useMemberInfoAction();

    const navigate = useNavigate();

    if (code === null) {
        navigate('/');
        return;
    }

    const requestAuthToken = useCallback(async () => {
        const response = await requestOAuthProfile({ code, state });

        if (!response.isRegistered) return;

        const { accessToken, refreshToken } = await signin({ providerId: response.providerId });

        window.localStorage.setItem('accessToken', accessToken);
        window.localStorage.setItem('refreshToken', refreshToken);

        fetchMemberProfile();
        navigate('/');
    }, [code, navigate, fetchMemberProfile]);

    useEffect(() => {
        requestAuthToken();
    }, [requestAuthToken]);

    console.log(code);

    return <SignupFormModal />;
};

export default KakaoAuthRedirectPage;
