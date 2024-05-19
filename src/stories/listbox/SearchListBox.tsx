import { Box } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { HeaderSearchDataState } from '../../recoil/atom/HeaderSearchDataState';
import SearchListBoxItem from './SearchListBoxItem';

export default function SearchListBox() {
    const techBlogSearchData = useRecoilValue(HeaderSearchDataState);
    return (
        <>
            <Box>
                {techBlogSearchData.map((item: any, index) => (
                    <SearchListBoxItem item={item} key={index} index={index} />
                ))}
            </Box>
        </>
    );
}
