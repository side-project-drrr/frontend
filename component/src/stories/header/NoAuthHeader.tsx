import { BiLogoGit } from 'react-icons/bi';
import { Input, Button, useDisclosure } from '@nextui-org/react';
import { LoginPage } from '../login/LoginPage';

export default function NoAuthHeader() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <header>
            <div className="flex w-96  items-center justify-around	">
                <div>
                    <BiLogoGit size="30" />
                </div>
                <div>
                    <Input
                        isClearable
                        radius="lg"
                        classNames={{
                            label: 'text-black/50 dark:text-white/90',
                            input: ['bg-transparent', 'text-black/90 dark:text-black/90'],
                            innerWrapper: 'bg-transparent',
                            inputWrapper: ['shadow-xl', 'bg-default-200/50', 'dark:bg-default/60'],
                        }}
                        placeholder="검색어 입력"
                    />
                </div>
                <div>
                    <Button size="md" onPress={onOpen}>
                        Login
                    </Button>
                </div>
            </div>
            <LoginPage onOpen={onOpen} isOpen={isOpen} onOpenChange={onOpenChange} />
        </header>
    );
}
