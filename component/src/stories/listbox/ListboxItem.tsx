import { getAuthStorage } from '@monorepo/service/src/repository/AuthRepository';
import { ItemProps } from './type';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTokenDecode } from '@monorepo/service/src/hooks/useTokenDecode';
import { postLikeTechBlogService } from '@monorepo/service/src/service/TechBlogService';
import { useState } from 'react';

export default function ListboxItem({ item }: ItemProps) {
    const [postLikeClicked, setPostLikeClicked] = useState(false);
    const TOKEN_KEY = 'accessToken';
    const getToken = getAuthStorage(TOKEN_KEY);
    const memberId = useTokenDecode(getToken);
    async function postLikeTechBlogRender(id: number) {
        await postLikeTechBlogService({ memberId, postId: id });
    }
    const handlePostLike = (id: number) => {
        postLikeTechBlogRender(id);
        setPostLikeClicked(true);
    };
    return (
        <>
            <div
                key={item.techBlogPostBasicInfoDto.id}
                className="relative flex flex-col justify-around w-10/12 gap-3 pl-6 text-black bg-white rounded-lg h-60"
            >
                <h1 className="text-base font-bold bold">{item.techBlogPostBasicInfoDto.title}</h1>
                <p className="w-10/12 text-xs">{item.techBlogPostBasicInfoDto.summary}</p>
                <ul className="flex gap-4 overflow-hidden">
                    {item.categoryDto?.map((item: any, index: number) =>
                        index < 5 ? (
                            <li key={item.id} id={item.id} className="text-sm">
                                #{item.name}
                            </li>
                        ) : (
                            <></>
                        ),
                    )}
                    {item.categoryDto?.length > 5 && <li className="text-sm">...</li>}
                </ul>
                <img
                    src={item.techBlogPostBasicInfoDto.thumbnailUrl}
                    alt="썸네일"
                    className="absolute flex justify-center w-40 rounded-2xl right-10 h-36"
                />
                <div className="flex justify-between w-3/12">
                    <span className="flex items-center justify-around text-xs text-center">
                        {postLikeClicked ? (
                            <FavoriteIcon
                                sx={{ fontSize: '20px' }}
                                onClick={() => handlePostLike(item.techBlogPostBasicInfoDto.id)}
                            />
                        ) : (
                            <FavoriteBorderIcon
                                sx={{ fontSize: '20px' }}
                                onClick={() => handlePostLike(item.techBlogPostBasicInfoDto.id)}
                            />
                        )}

                        {item.techBlogPostBasicInfoDto.postLike}
                    </span>
                    <span className="text-xs">
                        조회수: {item.techBlogPostBasicInfoDto.viewCount}
                    </span>
                </div>
            </div>
        </>
    );
}
