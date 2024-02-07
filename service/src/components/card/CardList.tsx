import CardComponent from './CardComponent';
import { IListBoxProps } from '@monorepo/component/src/stories/listbox/type';

export default function CardList({ items, onSetObservationTarget }: IListBoxProps) {
    return (
        <>
            <div className="flex flex-wrap justify-between gap-6">
                {items.map((item: any) => (
                    <CardComponent
                        key={item.id}
                        item={item}
                        onSetObservationTarget={onSetObservationTarget}
                    />
                ))}
            </div>
        </>
    );
}
