import CardComponent from './CardComponent';
import { IListBoxProps } from '@monorepo/component/src/stories/listbox/type';

export default function CardList({ items, onCategoryId, onFilterItems }: IListBoxProps) {
    return (
        <>
            {onCategoryId === 0 || onCategoryId === undefined ? (
                <div className="flex flex-wrap justify-between w-10/12">
                    {items.map((item: any) => (
                        <CardComponent key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-wrap justify-between w-10/12">
                    {onFilterItems.map((item: any) => (
                        <CardComponent key={item.id} item={item} />
                    ))}
                </div>
            )}
        </>
    );
}
