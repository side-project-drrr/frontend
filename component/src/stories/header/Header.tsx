import { BiLogoGit } from 'react-icons/bi';
import { Input } from '@nextui-org/react';
import { FiMail } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';

export default function Header() {
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
                    <FiMail size="30" />
                </div>
                <div>
                    <Dropdown>
                        <DropdownTrigger>
                            <AiOutlineUserAdd size="30" />
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
                    </Dropdown>
                </div>
            </div>
        </header>
    );
}
