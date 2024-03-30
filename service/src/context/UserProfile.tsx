import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { getUserInforMationService } from '../service/UserProfileService';

interface IProfileProps {
    id: number;
    email: 'string';
    nickname: 'string';
    profileImageUrl: 'string';
    provider: 'string';
    providerId: 'string';
}

const userProfleContext = createContext({});

export function UserProfileProvider({ children }: PropsWithChildren) {
    const [userData, setUserData] = useState<IProfileProps | {}>({});
    async function userInforMationRender() {
        const userData = await getUserInforMationService();
        setUserData(userData);
    }
    useEffect(() => {
        userInforMationRender();
    }, []);
    return <userProfleContext.Provider value={userData}>{children}</userProfleContext.Provider>;
}

export function useProfileState() {
    const context = useContext(userProfleContext);
    if (!context) {
        throw new Error('Cannot find UserProfileProvider');
    }
    return context;
}
