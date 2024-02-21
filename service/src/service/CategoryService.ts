import HttpClient from '../apis/HttpClient';

interface IGetCategory {
    page: number;
    size: number;
    sort: string;
    direction: string;
}

export async function getCategoryItem({ page, size, sort, direction }: IGetCategory) {
    try {
        const res = await HttpClient.get(
            `/api/v1/categories/all?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
        );
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

export async function AuthCategoryService(memberId: string) {
    console.log(memberId);
    try {
        const authCategoryData = await HttpClient.get(
            `/api/v1/members/me/category-preference?memberId=${memberId}`,
        );

        return authCategoryData.data;
    } catch (error) {
        console.error(error);
    }
}
