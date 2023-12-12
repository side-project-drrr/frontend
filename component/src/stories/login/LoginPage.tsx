import { BiLogoGit } from 'react-icons/bi';

import SocialLogin from '@monorepo/service/src/components/social/SocialLogin';
// interface LoginProps {
//     onOpen: () => void;
//     isOpen: boolean;
//     onOpenChange: () => void;
// }
export const LoginPage = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-between flex-1 text-center">
                <div className="text-black">
                    <div aria-label="logo">
                        <BiLogoGit size="30" />
                    </div>
                </div>
                <div className="text-center text-black grow" aria-label="이용 약관">
                    <p>기타 설명</p>
                </div>
                <div className="flex items-center justify-around w-full gap-4 grow">
                    <div>
                        <SocialLogin state="kakao" />
                        <label>카카오 로그인</label>
                    </div>
                    <div>
                        <SocialLogin state="github" />
                        <label>Github 로그인</label>
                    </div>
                </div>
            </div>
        </>
    );
};
