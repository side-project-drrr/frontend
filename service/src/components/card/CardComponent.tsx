import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { ICardItemsProps } from './type';

export default function CardComponent({ items }: ICardItemsProps) {
    return (
        <>
            {items.map(item => (
                <>
                    <Card sx={{ maxWidth: 345 }} key={item.id}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.thumbnailUrl}
                                alt="썸네일"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.content}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </>
            ))}
        </>
    );
}
