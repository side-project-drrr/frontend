import HttpClient from '../apis/HttpClient';

export async function getCategoryItem() {
    const res = await HttpClient.get('/api/v1/categories');
    return res.data;
}

export async function createCategory(activeCategoriesData: string[]) {
    console.log(activeCategoriesData);
    const res = await HttpClient.post('/category/create', { categoryIds: activeCategoriesData });
    return res.data;
}
