import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { BiLogoGit } from 'react-icons/bi';
import SocialKakao from '@monorepo/service/src/components/social/kakao/SocialKaKao';
import SocialGithub from '@monorepo/service/src/components/social/github/SocialGithub';
interface LoginProps {
    onOpen: () => void;
    isOpen: boolean;
    onOpenChange: () => void;
}

export const LoginPage = ({ isOpen, onOpenChange }: LoginProps) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                placement="top-center"
                className="w-96 h-96 dark"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {onClose => (
                        <>
                            <div className="flex flex-col items-center justify-between flex-1 text-center">
                                <ModalHeader className="text-black">
                                    <div aria-label="logo">
                                        <BiLogoGit size="30" />
                                    </div>
                                </ModalHeader>
                                <ModalBody>
                                    <div
                                        className="text-center text-black grow"
                                        aria-label="이용 약관"
                                    >
                                        <p>기타 설명</p>
                                    </div>
                                    <div className="flex items-center justify-around w-full gap-4 grow">
                                        <div>
                                            <SocialKakao />
                                            <label>카카오 로그인</label>
                                        </div>
                                        <div>
                                            <SocialGithub />
                                            <label>Github 로그인</label>
                                        </div>
                                    </div>
                                </ModalBody>
                            </div>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
