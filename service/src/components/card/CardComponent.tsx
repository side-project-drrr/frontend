import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ICardItemsProps } from './type';

export default function CardComponent({ item }: ICardItemsProps) {
    return (
        <>
            <Card
                sx={{
                    maxWidth: '49%',
                    minWidth: '49%',
                    marginTop: '15px',
                    backgroundColor: '#444444',
                    borderRadius: '20px',
                }}
                key={item.techBlogPostBasicInfoDto.id}
            >
                <div className="px-6 pt-6">
                    <CardMedia
                        component="img"
                        image={item.techBlogPostBasicInfoDto.thumbnailUrl}
                        alt="썸네일"
                        sx={{ height: '175px', width: '100%', borderRadius: '20px' }}
                    />
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: '0',
                        }}
                    >
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{
                                fontSize: '20px',
                                width: '100%',
                                marginBottom: '1rem',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                marginTop: '1.8rem',
                            }}
                        >
                            {item.techBlogPostBasicInfoDto.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                width: '100%',
                                display: 'block',
                                overflow: 'hidden',
                                height: '6.5rem',
                                marginBottom: '1.5rem',
                                lineHeight: '1.25',
                            }}
                        >
                            {item.techBlogPostBasicInfoDto.summary}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                paddingBottom: '1rem',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowarp',
                                lineHeight: '1.25',
                            }}
                        >
                            <ul className="flex flex-wrap w-full overflow-y-hidden h-[30px] ">
                                {item.categoryDto?.map((item: any) => (
                                    <li key={item.id} id={item.id} className="mr-2 text-xs">
                                        #{item.name}
                                    </li>
                                ))}
                            </ul>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <span className="mr-2 text-xs">
                                좋아요: {item.techBlogPostBasicInfoDto.postLike}
                            </span>
                            <span>조회수: {item.techBlogPostBasicInfoDto.viewCount}</span>
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </>
    );
}
