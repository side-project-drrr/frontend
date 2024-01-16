import Aside from '../components/aside/Aside';
import CategoryList from '../components/category/CategoryList';
import { subscribe, unsubscribe } from '../webpush/main';
import SignUp from '../components/signup/SignUp';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalOpenState } from '../recoil/atom/modalOpenState';

export default function MainPage() {
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);

    const handleModalOpen = useSetRecoilState(modalOpenState);
    const handleSignupNext = () => {
        // 회원가입 모달에서 다음 버튼을 클릭했을 때 실행되는 로직
        // 여기서는 카테고리 모달을 열도록 함
        setCategoryModalOpen(true);
        handleModalOpen(false);
    };

    const handleCategoryModalClose = () => {
        // 카테고리 모달에서 닫기 버튼을 클릭했을 때 실행되는 로직
        // 여기서는 카테고리 모달을 닫음
        setCategoryModalOpen(false);
    };

    return (
        <div className="flex justify-between">
            <div className="flex flex-col">
                <div>
                    {isCategoryModalOpen && (
                        <CategoryList
                            onClose={handleCategoryModalClose}
                            onModalOpen={isCategoryModalOpen}
                            onHandleModalOpen={handleSignupNext}
                        />
                    )}
                </div>
                <div>
                    <button onClick={subscribe}>구독</button>
                    <button onClick={unsubscribe}>구독 취소</button>
                    <SignUp onSignupNext={handleSignupNext} />
                </div>
            </div>

            <aside className="block max-w-md ">
                <div className="w-[100%]">
                    <Aside />
                </div>
            </aside>
        </div>
    );
}
