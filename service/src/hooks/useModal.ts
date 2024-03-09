import { useState } from 'react';

interface IUseModal {
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
}

const useModal = (defaultValue = false): IUseModal => {
    const [open, setOpen] = useState<boolean>(defaultValue);

    const handleOpen = () => setOpen(() => true);
    const handleClose = () => setOpen(() => false);

    return {
        open,
        handleOpen,
        handleClose,
    };
};

export default useModal;
