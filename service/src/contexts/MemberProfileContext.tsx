import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { useFetch } from '../hooks/useFetch.ts';
import { getMe } from '../service/member/GetMe.ts';

interface MemberProfile {}

type Actions = {
    refetchMemberInfo: () => void;
    clearMemberInfo: () => void;
};
const MemberProfileContext = createContext<MemberProfile | null>(null);
const MemberProfileActionContext = createContext<Actions | null>(null);

const MemberProfileProvider = ({ children }: PropsWithChildren) => {
    const { result, clearResult, refetch } = useFetch(() => getMe(), {
        errorBoundary: false,
        enabled: localStorage.getItem('accessToken') !== null,
    });

    const actions = useMemo<Actions>(
        () => ({
            refetchMemberInfo: refetch,
            clearMemberInfo: () => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            },
        }),
        [clearResult, refetch],
    );

    return (
        <MemberProfileContext.Provider value={result}>
            <MemberProfileActionContext.Provider value={actions}>
                {children}
            </MemberProfileActionContext.Provider>
        </MemberProfileContext.Provider>
    );
};

export default MemberProfileProvider;

export const useMemberProfile = () => {
    const memberProfile = useContext(MemberProfileContext);

    return {
        memberProfile,
        isLoggedIn: !!memberProfile,
    };
};
export const useMemberInfoAction = () => {
    const value = useContext(MemberProfileActionContext);

    if (value === null) {
        throw new Error('MemberInfoAction 에러');
    }

    return value;
};
