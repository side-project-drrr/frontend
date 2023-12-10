import { BiLogoGit } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';

export default function NoAuthHeader() {
    //const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <header className="flex items-center w-screen h-[57px] border-b-1 border-solid border-zinc-500 ">
            <div className="flex flex-1 mx-10 ">
                <div className="ml-2 mr-2 none">
                    <BiLogoGit size="40" />
                </div>
                <div className="grow">
                    <input type="text" className="max-w-xs w-[400px]" placeholder="검색어 입력" />
                </div>
                <div className="mr-2 bg-transparent border-transparent dark">
                    <button className="mr-2 bg-transparent border-transparent dark hover:border-transparent">
                        <BsPersonCircle />
                    </button>
                </div>
            </div>
        </header>
    );
}
