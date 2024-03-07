import { atom } from 'recoil';

const localStorageEffect =
    (key: string) =>
    ({ setSelf, onSet }: any) => {
        const savedValue = localStorage.getItem(key);
        // setSelf -> Callbacks to set or reset the value of the atom.
        if (savedValue != null) {
            setSelf(savedValue);
        }

        // onSet -> Subscribe to changes in the atom value.
        onSet((newValue: any, _: any, isReset: boolean) => {
            isReset
                ? localStorage.removeItem(key)
                : localStorage.setItem(key, JSON.stringify(newValue));
        });
    };

export const localStorageState = atom({
    key: 'localStorageState',
    default: '',
    effects: [localStorageEffect('accessToken')],
});
