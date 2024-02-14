import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { ICardItemsProps } from './type';
import { getAuthStorage } from '@monorepo/service/src/repository/AuthRepository';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTokenDecode } from '@monorepo/service/src/hooks/useTokenDecode';
import { postLikeTechBlogService } from '@monorepo/service/src/service/TechBlogService';
import { useState } from 'react';

export default function CardComponent({ item }: ICardItemsProps) {
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
            <Card
                sx={{
                    maxWidth: 380,
                    minWidth: 380,
                    marginTop: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: 350,
                    maxHeight: 350,
                }}
                key={item.techBlogPostBasicInfoDto.id}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        width="400"
                        image={item.techBlogPostBasicInfoDto.thumbnailUrl}
                        alt="썸네일"
                        style={{ height: '250px' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.techBlogPostBasicInfoDto.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ width: '50%', display: 'flex', flexWrap: 'wrap' }}
                        >
                            {item.techBlogPostBasicInfoDto.summary}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.categoryDto?.map((item: any, index: number) =>
                                index < 3 ? (
                                    <span key={item.id} id={item.id} className="mr-2 text-xs">
                                        #{item.name}
                                    </span>
                                ) : (
                                    <></>
                                ),
                            )}
                            {item.categoryDto?.length > 3 && <span className="text-sm">...</span>}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span className="mr-2 text-xs">
                                {postLikeClicked ? (
                                    <FavoriteIcon
                                        sx={{ fontSize: '20px' }}
                                        onClick={() =>
                                            handlePostLike(item.techBlogPostBasicInfoDto.id)
                                        }
                                    />
                                ) : (
                                    <FavoriteBorderIcon
                                        sx={{ fontSize: '20px' }}
                                        onClick={() =>
                                            handlePostLike(item.techBlogPostBasicInfoDto.id)
                                        }
                                    />
                                )}
                                {item.techBlogPostBasicInfoDto.postLike}
                            </span>
                            <span>조회수: {item.techBlogPostBasicInfoDto.viewCount}</span>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
}
