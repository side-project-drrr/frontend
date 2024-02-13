import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { ICardItemsProps } from './type';
import kakao from '@monorepo/service/src/assets/kakao.webp';

export default function CardComponent({ item }: ICardItemsProps) {
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
                        //item.techBlogPostBasicInfoDto.thumbnailUrl
                        image={kakao}
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
                                좋아요: {item.techBlogPostBasicInfoDto.postLike}
                            </span>
                            <span>조회수: {item.techBlogPostBasicInfoDto.viewCount}</span>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
}
