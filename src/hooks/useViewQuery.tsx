import { useQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../recoil/atom/isLoggedInState';
import {
    postIncreasedMemberViewsService,
    postIncreasedViewsService,
} from '../service/TechBlogService';
import { getPostApi, readPostApi } from '../service/ViewService';

type PostType = {
    id: number;
    title: String;
    techBlogCode: String;
    thumbnailUrl: String;
    aiSummary: String;
    writtenDate: String;
    viewCount: number;
    postLikeCount: number;
    author: String;
    url: String;
};

export const useViewQuery = (postId: string) => {
    const [loggedIn] = useRecoilState(isLoggedInState);

    const dataFormat = (resData: any) => {
        const regex = /\./g;
        const text = resData.aiSummary;
        const newText = text.replaceAll(regex, '.\r\n');
        resData.aiSummary = newText;

        const regexThumb = /\s+/g;
        const url = resData.thumbnailUrl;

        if (url) {
            const newUrl = url.replace(regexThumb, '%20');
            resData.thumbnailUrl = newUrl;
        }

        return resData;
    };

    const fetchPost = async (postId: string): Promise<PostType> => {
        const res = await getPostApi(postId);
        if (res.status === 200) {
            const newData: PostType = dataFormat(res.data);
            readPostApi(postId);

            if (loggedIn) {
                postIncreasedMemberViewsService(postId);
            } else {
                postIncreasedViewsService(postId);
            }

            return newData;
        }

        throw new Error('Failed to fetch post');
    };

    const { data, error } = useQuery<PostType, Error>({
        queryKey: ['post', postId],
        queryFn: () => fetchPost(postId!),
        enabled: !!postId,
    });

    return { data, error };
};
