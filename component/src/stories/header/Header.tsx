import { BiLogoGit } from 'react-icons/bi';
import { Input } from '@nextui-org/react';
import { FiMail } from 'react-icons/fi';

// import { AiOutlineUserAdd } from 'react-icons/ai';
// import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';

export default function Header() {
    return (
        <header className="flex items-center w-screen h-[57px] border-b-1 border-solid border-zinc-500">
            <div className="flex flex-1">
                <div className="none mr-2 ml-2">
                    <BiLogoGit size="40" />
                </div>
                <div className="grow">
                    <Input radius="lg" className="max-w-xs w-[400px]" placeholder="검색어 입력" />
                </div>
                <div className="flex justify-around w-28">
                    <FiMail size="40" />
                    <FiMail size="40" />
                </div>

                {/* <Dropdown>
                        <DropdownTrigger>
                            <AiOutlineUserAdd size="40" />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                            <DropdownItem key="new" color="secondary">
                                프로필
                            </DropdownItem>
                            <DropdownItem key="copy" color="secondary">
                                개인정보 수정
                            </DropdownItem>
                            <DropdownItem key="edit" color="secondary">
                                로그아웃
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown> */}
            </div>
        </header>
    );
}
