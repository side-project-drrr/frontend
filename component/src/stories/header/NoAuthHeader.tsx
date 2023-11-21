import { BiLogoGit } from 'react-icons/bi';
import { Button, Input, useDisclosure } from '@nextui-org/react';
import { LoginPage } from '../login/LoginPage';

export default function NoAuthHeader() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <header className="flex items-center w-screen h-[57px] border-b-1 border-solid border-zinc-500">
            <div className="flex flex-1">
                <div className="ml-2 mr-2 none">
                    <BiLogoGit size="40" />
                </div>
                <div className="grow">
                    <Input radius="lg" className="max-w-xs w-[400px]" placeholder="검색어 입력" />
                </div>
                <div className="mr-2 dark">
                    <Button onPress={onOpen}>로그인</Button>
                </div>
            </div>
            <LoginPage onOpen={onOpen} isOpen={isOpen} onOpenChange={onOpenChange} />
        </header>
    );
}
