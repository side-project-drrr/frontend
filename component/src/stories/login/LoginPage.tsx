import { Button, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { BiLogoGit } from 'react-icons/bi';

interface LoginProps {
    kakaoText?: string;
    googleText?: string;
    onOpen: () => void;
    isOpen: boolean;
    onOpenChange: () => void;
}

export const LoginPage = ({
    kakaoText = 'KAKAO',
    googleText = 'GOOGLE',
    onOpen,
    isOpen,
    onOpenChange,
}: LoginProps) => {
    return (
        <>
            <Modal
                isOpen={isOpen}
                placement="top-center"
                className="w-96 h-96"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {onClose => (
                        <>
                            <div className="flex flex-col items-center text-center justify-between">
                                <ModalHeader className="text-black">
                                    <div aria-label="logo">
                                        <BiLogoGit size="30" />
                                    </div>
                                </ModalHeader>
                                <ModalBody>
                                    <div className="text-center text-black " aria-label="이용 약관">
                                        <p>기타 설명</p>
                                    </div>
                                    <div>
                                        <Button className="bg-yellow-400 text-white" size="lg">
                                            {kakaoText}로 시작하기
                                        </Button>
                                    </div>
                                    <div>
                                        <Button size="lg" className="bg-gray-100 text-black">
                                            {googleText}로 시작하기
                                        </Button>
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
