import ListboxItem from './ListboxItem';
import { IListBoxProps } from './type';

export default function ListBox({ items, onCategoryId, onFilterItems }: IListBoxProps) {
    return (
        <>
            {onCategoryId === 0 || onCategoryId === undefined ? (
                <div className="flex flex-col w-full gap-6 ">
                    {items.map((item: any) => (
                        <ListboxItem key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col w-full gap-6">
                    {onFilterItems?.map((item: any) => <ListboxItem key={item.id} item={item} />)}
                </div>
            )}
        </>
    );
}
