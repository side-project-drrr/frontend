import { atom } from 'recoil';
export interface ISnackbarProps {
    open: boolean;
    vertical: 'top';
    horizontal: 'center';
    text: string;
}
export const snackbarOpenState = atom<ISnackbarProps>({
    key: 'snackbarOpenState',
    default: { open: false, vertical: 'top', horizontal: 'center', text: 'over' },
});
