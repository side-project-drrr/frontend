import SocialLogin from '../social/SocialLogin.tsx';
import { OAuth2ProviderType } from '../../types/Auth.type.ts';
import DrrrLogo from '../logo/DrrrLogo.tsx';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import { OAuth2ProviderText } from '../../constants/auth.ts';

interface OAuthProviderButtonProps {
    provider: OAuth2ProviderType;
}

const OAuthProviderButton = ({ provider }: OAuthProviderButtonProps) => {
    return (
        <div className="flex flex-col items-center">
            <SocialLogin state={provider} />
            <label className="text-black ">{OAuth2ProviderText[provider]}</label>
        </div>
    );
};
const SelectLoginTypeForm = () => {
    return (
        <Card>
            <CardContent>
                <DrrrLogo />
                <Divider />
                <p className="p-8 w-9/12 ">
                    지금 로그인하고 매일 새로운 기술블로그 소식을 전달받아보세요{' '}
                </p>
                <Divider />
                {/*<div className="flex items-center justify-around w-full gap-4 grow">*/}
                <div className="flex items-center w-full  justify-between">
                    <OAuthProviderButton provider="GITHUB" />
                    <OAuthProviderButton provider="KAKAO" />
                </div>
            </CardContent>
        </Card>
    );
};

export default SelectLoginTypeForm;
