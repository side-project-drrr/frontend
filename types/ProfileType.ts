export interface ProfileType {
    userData: any; // 사용자 정보의 타입에 따라 수정
    login: (token: string) => void;
    token: string | null;
}
