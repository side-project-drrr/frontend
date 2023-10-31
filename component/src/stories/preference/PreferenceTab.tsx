import { useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import PreferenceModal from '../preferenceModal/PreferenceModal';
export default function PreferenceTab() {
    const [isModal, setIsModal] = useState<boolean>(false);

    return (
        <div className="flex justify-around items-center gap-4 w-full">
            <div>
                <button
                    className="border-none outline-none focus:outline-none"
                    onClick={() => setIsModal(!isModal)}
                >
                    <BsPlus size={30} />
                </button>
            </div>
            <div>
                <button className="w-[200px] h-[50px] text-center border-none outline-none focus:outline-none">
                    For you
                </button>
            </div>
            <div>
                <button className="w-[200px] h-[50px] text-center border-none outline-none focus:outline-none">
                    For you
                </button>
            </div>
            <div>
                <button className="w-[200px] h-[50px] text-center border-none outline-none focus:outline-none">
                    For you
                </button>
            </div>
            {isModal ? <PreferenceModal /> : <></>}
        </div>
    );
}
