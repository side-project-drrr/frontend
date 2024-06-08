import { TopKeywordProps } from '../components/aside/type';
import HttpClient from '../apis/HttpClient';
import { useQuery } from '@tanstack/react-query';

export async function getTopkeyword() {
    const COUNT = 6;
    try {
        const res = await HttpClient.get(`/api/v1/top/categories/${COUNT}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const useTopKeyWordQuery = () => {
    const { data, isLoading } = useQuery<TopKeywordProps[]>({
        queryKey: ['Topkeyword'],
        queryFn: getTopkeyword,
    });
    return { data, isLoading };
};
