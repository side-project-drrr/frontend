export interface CategoryProps {
    onModalOpen: boolean;
    onClose: () => void;
    onHandleModalOpen?: () => void;
}

export interface UserCategoryProps {
    onModalOpen: boolean;
    onClose: () => void;
    onHandleModalOpen?: () => void;
    userGetCategoryRender: () => void;
}
