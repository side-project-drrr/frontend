import ListboxItem from './ListboxItem';
import { IListBoxProps } from './type';

export default function ListBox({ items }: IListBoxProps) {
    return (
        <>
            <div className="flex flex-col w-full gap-6">
                {items.map((item: any) => (
                    <ListboxItem
                        key={item.id}
                        item={item}

                        //onSetObservationTarget={onSetObservationTarget}
                    />
                ))}
            </div>
        </>
    );
}
