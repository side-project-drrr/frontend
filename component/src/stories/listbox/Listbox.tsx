import ListboxItem from './ListboxItem';
import { IListBoxProps } from './type';

export default function ListBox({ items, onCategoryId, onFilterItems }: IListBoxProps) {
    console.log(onCategoryId);
    return (
        <>
            {onCategoryId === 0 ? (
                <div className="flex flex-col w-full gap-6">
                    {items.map((item: any) => (
                        <ListboxItem key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col w-full gap-6">
                    {onFilterItems.map((item: any) => (
                        <ListboxItem key={item.id} item={item} />
                    ))}
                </div>
            )}
        </>
    );
}
