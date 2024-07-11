import { atom } from 'recoil';
import { ISnackbarProps } from '../../../types/SnackbarState';

export const snackbarOpenState = atom<ISnackbarProps>({
    key: 'snackbarOpenState',
    default: { open: false, vertical: 'top', horizontal: 'center', text: 'over' },
});
