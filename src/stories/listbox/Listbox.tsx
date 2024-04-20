import { Box } from '@mui/material';
import ListboxItem from './ListboxItem';
import { IListBoxProps } from './type';

export default function ListBox({ items, onCategoryId, onFilterItems }: IListBoxProps) {
    return (
        <>
            {onCategoryId === 0 || onCategoryId === undefined ? (
                <Box>
                    {items.map((item: any, index: number) => (
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
