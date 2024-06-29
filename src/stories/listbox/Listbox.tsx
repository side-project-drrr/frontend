import { Box } from '@mui/material';
import ListboxItem from './ListboxItem';
import { useRecoilValue } from 'recoil';
import { techBlogDataState } from '../../recoil/atom/techBlogDataState';

export default function ListBox() {
    const techBlogData = useRecoilValue(techBlogDataState);
    return (
        <>
            <Box>
                {techBlogData.map((item: any, index: number) => (
                    <ListboxItem key={index} item={item} index={index} />
                ))}
            </Box>
        </>
    );
}
