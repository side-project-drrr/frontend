import HttpClient from '../apis/HttpClient';

export async function deleteUserService() {
    try {
        const res = await HttpClient.delete(`/api/v1/auth/members/me/deletion`);
        return res;
    } catch (error) {
        console.error(error);
    }
}

export async function updateMemberProfle(email: string | '', nickname: string | '') {
    try {
        const res = await HttpClient.post(`/api/v1/members/me/update-profile`, {
            nickname: nickname,
            email: email,
        });
        return res;
    } catch (error) {
        console.error(error);
    }
}
