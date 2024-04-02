import { Box } from '@mui/material';
import ListboxItem from './ListboxItem';
import { IListBoxProps } from './type';

export default function ListBox({ items, onCategoryId, onFilterItems }: IListBoxProps) {
    return (
        <>
            {onCategoryId === 0 || onCategoryId === undefined ? (
                <Box>
                    {items.map((item: any) => (
                        <ListboxItem key={item.id} item={item} />
                    ))}
                </Box>
            ) : (
                <Box>
                    {onFilterItems.map((item: any) => (
                        <ListboxItem key={item.id} item={item} />
                    ))}
                </Box>
            )}
        </>
    );
}
