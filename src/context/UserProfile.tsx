import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { getUserInforMationService } from '../service/UserProfileService';

interface IUserProfileContext {
    userData: any; // 사용자 정보의 타입에 따라 수정
    login: (token: string) => void;
    token: string | null;
}

const userProfleContext = createContext<IUserProfileContext>({
    userData: {},
    login: () => {},
    token: '',
});

export function UserProfileProvider({ children }: PropsWithChildren) {
    const [userData, setUserData] = useState({});
    const [token, setToken] = useState(localStorage.getItem('accessToken'));

    const login = (token: string) => {
        setToken(token);
    };

    async function userInforMationRender() {
        const userData = await getUserInforMationService();

        setUserData(userData);
    }

    useEffect(() => {
        if (token) userInforMationRender();
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
