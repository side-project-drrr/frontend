import { BsPlus } from 'react-icons/bs';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    CheckboxGroup,
    Checkbox,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function PreferenceTab() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [nextPage, setNextPage] = useState(1);
    const [checkState, setCheckState] = useState(false);
    const nextPageReset = () => setNextPage(1);
    useEffect(() => {}, [checkState]);
    const handleCheckout = (checkState: boolean) => {
        if (!checkState) {
            alert('기술 스택을 1개 이상 설정해야합니다.');
        } else {
            setCheckState(false);
            setNextPage(prev => prev + 1);
        }
    };
    return (
        <div className="flex justify-around items-center gap-4 w-full">
            <div>
                <Button
                    onPress={onOpen}
                    className="dark border-none outline-none focus:outline-none w-[100px] h-[50px] bg-transparent"
                >
                    <BsPlus size={40} />
                </Button>
                <Modal
                    //backdrop="opaque"
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    classNames={{
                        backdrop:
                            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 dark',
                    }}
                >
                    <ModalContent className="dark">
                        <ModalHeader className="flex justify-center gap-8 dark items-center">
                            {/* w-[10px] h-[10px] rounded-[50px] border-white border-solid border  */}
                            <div
                                className={
                                    ' w-[15px] h-[15px] rounded-[50px] border-white border-solid border' +
                                    (nextPage === 1 ? ' bg-yellow-50' : '')
                                }
                                onClick={nextPageReset}
                            ></div>
                            <div
                                className={
                                    ' w-[15px] h-[15px] rounded-[50px] border-white border-solid border' +
                                    (nextPage !== 1 ? ' bg-yellow-50' : '')
                                }
                            ></div>
                        </ModalHeader>
                        {nextPage === 1 ? (
                            <>
                                <ModalBody>
                                    <div className="grow">
                                        <Input radius="lg" placeholder="검색어 입력" />
                                    </div>
                                    <div>
                                        <CheckboxGroup
                                            className="overflow-y-auto h-[200px]"
                                            label="기술 스택 리스트"
                                            onChange={() => setCheckState(true)}
                                        >
                                            <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
                                            <Checkbox value="sydney">Sydney</Checkbox>
                                            <Checkbox value="san-francisco">San Francisco</Checkbox>
                                            <Checkbox value="london">London</Checkbox>
                                            <Checkbox value="tokyo">Tokyo</Checkbox>
                                            <Checkbox value="tokyo">Tokyo</Checkbox>
                                            <Checkbox value="tokyo">Tokyo</Checkbox>
                                        </CheckboxGroup>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="primary"
                                        onClick={() => {
                                            handleCheckout(checkState);
                                        }}
                                    >
                                        다음
                                    </Button>
                                </ModalFooter>
                            </>
                        ) : (
                            <>
                                <ModalBody>
                                    <div className="grow">
                                        <Input radius="lg" placeholder="직책" />
                                    </div>
                                    <div>
                                        <Input radius="lg" placeholder="경력" />
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="primary"
                                        className="w-full"
                                        onPress={onOpenChange}
                                        onClick={nextPageReset}
                                    >
                                        완료
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
            <div>
                <Button className="w-[200px] h-[50px] text-center border-none outline-none focus:outline-none dark">
                    For you
                </Button>
            </div>
            <div>
                <Button className="w-[200px] h-[50px] text-center border-none outline-none focus:outline-none dark">
                    For you
                </Button>
            </div>
            <div>
                <Button className="w-[200px] h-[50px] text-center border-none outline-none focus:outline-none dark">
                    For you
                </Button>
            </div>
        </div>
    );
}
