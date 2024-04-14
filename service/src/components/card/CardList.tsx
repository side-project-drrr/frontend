import CardComponent from './CardComponent';
import { IListBoxProps } from '@monorepo/component/src/stories/listbox/type';

export default function CardList({ items, onCategoryId, onFilterItems }: IListBoxProps) {
    return (
        <>
            {onCategoryId === 0 || onCategoryId === undefined ? (
                <div className="flex flex-wrap justify-between pr-10">
                    {items.map((item: any, index: number) => (
                        <CardComponent key={index} item={item} index={index} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-wrap justify-between pr-10">
                    {onFilterItems.map((item: any, index: number) => (
                        <CardComponent key={index} item={item} index={index} />
                    ))}
                </div>
            )}
        </>
    );
}
