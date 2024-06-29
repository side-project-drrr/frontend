import HttpClient from '../apis/HttpClient';

export async function getRecommendTechBlogService() {
    const COUNT = 9;
    try {
        const res = await HttpClient.get(`/api/v1/members/me/post-recommendation/${COUNT}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}
