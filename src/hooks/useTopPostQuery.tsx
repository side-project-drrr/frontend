import { useQuery } from '@tanstack/react-query';
import HttpClient from '../apis/HttpClient';

export async function getTopPostItemService() {
    const COUNT = 5;
    const TYPE = 'VIEWS';
    try {
        const res = await HttpClient.get(`api/v1/posts/top/${TYPE}/${COUNT}`);
        console.log(res);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const useTopPostQuery = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['TopPost'],
        queryFn: getTopPostItemService,
    });
    return { data, isLoading };
};
