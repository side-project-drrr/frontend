import { useFetch } from '../useFetch.ts';
import { getMe } from '../../service/member/GetMe.ts';

export const useMyProfile = () => {
    const data = useFetch(() => getMe(), {
        suspense: false,
        refetchInterval: 2000,
    });

    return data.result;
};
