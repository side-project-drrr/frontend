import { BiLogoGit } from 'react-icons/bi';
import { Input, useDisclosure } from '@nextui-org/react';

import { LoginPage } from '../login/LoginPage';
import SocialKaKao from '@monorepo/service/src/components/social/kakao/SocialKaKao';

export default function NoAuthHeader() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <header className="flex items-center w-screen h-[57px] border-b-1 border-solid border-zinc-500">
            <div className="flex flex-1">
                <div className="none mr-2 ml-2">
                    <BiLogoGit size="40" />
                </div>
                <div className="grow">
                    <Input radius="lg" className="max-w-xs w-[400px]" placeholder="검색어 입력" />
                </div>
                <div>
                    <SocialKaKao />
                </div>
            </div>
            <LoginPage onOpen={onOpen} isOpen={isOpen} onOpenChange={onOpenChange} />
        </header>
    );
}
