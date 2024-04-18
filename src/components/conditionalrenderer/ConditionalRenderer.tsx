import ListBox from '../../stories/listbox/Listbox';
import CardList from '../../components/card/CardList';
import { DisplayModeState } from '../../recoil/atom/DisplayModeState';
import { useRecoilValue } from 'recoil';
import { IListBoxProps } from '../../stories/listbox/type';

export default function ConditionalRenderer({ items, onCategoryId, onFilterItems }: IListBoxProps) {
    const displayMode = useRecoilValue(DisplayModeState);

    return (
        <>
            {displayMode ? (
                <ListBox items={items} onCategoryId={onCategoryId} onFilterItems={onFilterItems} />
            ) : (
                <CardList items={items} onCategoryId={onCategoryId} onFilterItems={onFilterItems} />
            )}
        </>
    );
}
