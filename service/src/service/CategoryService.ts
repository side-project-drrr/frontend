import HttpClient from '../apis/HttpClient';

interface IGetCategory {
    page: number;
    size: number;
}

export async function getCategoryItem({ page, size }: IGetCategory) {
    try {
        const res = await HttpClient.get(`/api/v1/categories/all?page=${page}&size=${size}`);

        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function putUserCategoryItem(stringConvertNumberActiveData: number[]) {
    try {
        const res = await HttpClient.put(`/api/v1/members/me/modify/category-preference`, {
            categoryIds: stringConvertNumberActiveData,
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function AuthCategoryService() {
    try {
        const authCategoryData = await HttpClient.get(`/api/v1/members/me/category-preference`);

        return authCategoryData.data;
    } catch (error) {
        console.error(error);
    }
}
