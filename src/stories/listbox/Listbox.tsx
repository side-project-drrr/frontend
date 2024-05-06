import { Box } from '@mui/material';
import ListboxItem from './ListboxItem';
import { IListBoxProps } from './type';
import { useRecoilValue } from 'recoil';
import { techBlogDataState } from '../../recoil/atom/techBlogDataState';

export default function ListBox({ onCategoryId, onFilterItems }: IListBoxProps) {
    const techBlogData = useRecoilValue(techBlogDataState);
    return (
        <>
            {onCategoryId === 0 || onCategoryId === undefined ? (
                <Box>
                    {techBlogData.map((item: any, index: number) => (
                        <ListboxItem key={index} item={item} index={index} />
                    ))}
                </Box>
            ) : (
                <Box>
                    {onFilterItems.map((item: any, index: number) => (
                        <ListboxItem key={index} item={item} index={index} />
                    ))}
                </Box>
            )}
        </>
    );
}
