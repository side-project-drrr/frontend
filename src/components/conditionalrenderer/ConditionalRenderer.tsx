import ListBox from '../../stories/listbox/Listbox';
import CardList from '../../components/card/CardList';
import { DisplayModeState } from '../../recoil/atom/DisplayModeState';
import { useRecoilValue } from 'recoil';

export default function ConditionalRenderer() {
    const displayMode = useRecoilValue(DisplayModeState);

    return <>{displayMode ? <ListBox /> : <CardList />}</>;
}
