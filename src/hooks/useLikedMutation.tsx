import { useMutation } from '@tanstack/react-query';
import {
    deletePostLikedService,
    postTechBlogLikeIncreasedService,
} from '../service/TechBlogService';

export const useLikedMutation = () => {
    return useMutation({
        mutationFn: postTechBlogLikeIncreasedService,
        onError(error) {
            console.error(error);
        },
    });
};

export const useLikeCancelMutation = () => {
    return useMutation({
        mutationFn: deletePostLikedService,
        onError(error) {
            console.error(error);
        },
    });
};
