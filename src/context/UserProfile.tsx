import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { getUserInforMationService } from '../service/UserProfileService';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState } from '../recoil/atom/isLoggedInState';
import { ProfileType } from '../../types/ProfileType';

const userProfleContext = createContext<ProfileType>({
    userData: {},
    login: () => {},
    token: '',
});

export function UserProfileProvider({ children }: PropsWithChildren) {
    const [userData, setUserData] = useState({});
    const [token, setToken] = useState(localStorage.getItem('accessToken'));
    const setLoggin = useSetRecoilState(isLoggedInState);
    const login = (token: string) => {
        setToken(token);
    };

    async function userInforMationRender() {
        const userData = await getUserInforMationService();
        setUserData(userData);
    }

    useEffect(() => {
        if (token) {
            userInforMationRender();
        } else {
            setLoggin(false);
        }
    }, [token]);

    return (
        <userProfleContext.Provider value={{ userData, login, token }}>
            {children}
        </userProfleContext.Provider>
    );
}

export function useProfileState() {
    const context = useContext(userProfleContext);
    if (!context) {
        throw new Error('Cannot find UserProfileProvider');
    }
    return context;
}
