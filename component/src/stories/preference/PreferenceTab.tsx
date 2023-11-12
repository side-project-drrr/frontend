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
    // CheckboxGroup,
    // Checkbox,
} from '@nextui-org/react';
import { useCallback, useState } from 'react';

const categorys = [
    {
        id: '1',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'JAVASCRIPT',
        uqnique_name: 'JAVASCRIPT',
    },
    {
        id: '2',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'REACT',
        uqnique_name: 'REACT',
    },
    {
        id: '3',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'TYPESCRIPT',
        uqnique_name: 'TYPESCRIPT',
    },
    {
        id: '4',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'ANDROID',
        uqnique_name: 'ANDROID',
    },
    {
        id: '5',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'SPRINGBOOT',
        uqnique_name: 'SPRINGBOOT',
    },
    {
        id: '6',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'SPRING',
        uqnique_name: 'SPRING',
    },
    {
        id: '7',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'C',
        uqnique_name: 'C',
    },
    {
        id: '8',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'JAVA',
        uqnique_name: 'JAVA',
    },
    {
        id: '9',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'VUE',
        uqnique_name: 'VUE',
    },
    {
        id: '10',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'NEXT',
        uqnique_name: 'NEXT',
    },
    {
        id: '11',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'NODE',
        uqnique_name: 'NODE',
    },
    {
        id: '12',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'NUST',
        uqnique_name: 'NUST',
    },
    {
        id: '13',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'SWIFT',
        uqnique_name: 'SWIFT',
    },
    {
        id: '14',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'FIGMA',
        uqnique_name: 'FIGMA',
    },
    {
        id: '15',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'AWS',
        uqnique_name: 'AWS',
    },
    {
        id: '16',
        create_at: '2022-10-13',
        updated_at: '2023-11-09',
        display_name: 'FLUTTER',
        uqnique_name: 'FLUTTER',
    },
];

export default function PreferenceTab() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [nextPage, setNextPage] = useState(1);
    const [categoryItems, setCategoryItems] = useState<string[]>([]);
    const [categoryValue, setCategoryValue] = useState<string[]>([]);
    const nextPageReset = () => setNextPage(1);

    const onCheckedItem = useCallback(
        (checked: boolean, item: string, value: string) => {
            if (checked) {
                setCategoryItems(prev => [...prev, item]);
                setCategoryValue(prev => [...prev, value]);
            } else if (!checked) {
                setCategoryItems(categoryItems.filter(el => el !== item));
            }
        },
        [categoryItems],
    );
    const handleCategoryValidation = () => {
        //카테고리가 한개도 선택되어 있지 않다면 return
        console.log(categoryItems);
        console.log('api 호출');
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
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    size="3xl"
                    classNames={{
                        backdrop:
                            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20 dark',
                    }}
                >
                    <ModalContent className="dark">
                        <ModalHeader className="flex justify-center gap-8 dark items-center">
                            <div
                                className={
                                    ' w-[15px] h-[15px] rounded-[50px] border-white border-solid border' +
                                    (nextPage === 1 ? ' bg-yellow-50' : '')
                                }
                                onClick={nextPageReset}
                            />
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
                                        <ul className="overflow-y-auto h-[200px]">
                                            {categorys.map(category => (
                                                <li key={category.id}>
                                                    <input
                                                        id={category.id}
                                                        value={category.display_name}
                                                        onChange={e => {
                                                            onCheckedItem(
                                                                e.target.checked,
                                                                e.target.id,
                                                                e.target.value,
                                                            );
                                                        }}
                                                        type="checkbox"
                                                    />
                                                    {category.display_name}
                                                </li>
                                            ))}
                                        </ul>
                                        <div>{categoryValue.join(' ')}</div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={handleCategoryValidation}>
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
