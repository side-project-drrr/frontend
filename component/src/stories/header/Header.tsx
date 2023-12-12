import { BiLogoGit } from 'react-icons/bi';
import { Input } from '@nextui-org/react';
import { FiMail } from 'react-icons/fi';

export default function Header() {
    return (
        <header className="flex items-center w-screen h-[57px] border-b-1 border-solid border-zinc-500">
            <div className="flex flex-1">
                <div className="ml-2 mr-2 none">
                    <BiLogoGit size="40" />
                </div>
                <div className="grow">
                    <Input radius="lg" className="max-w-xs w-[400px]" placeholder="검색어 입력" />
                </div>
                <div className="flex justify-around w-28">
                    <FiMail size="40" />
                    <FiMail size="40" />
                </div>
            </div>
        </header>
    );
}
