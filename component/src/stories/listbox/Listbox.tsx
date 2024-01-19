import ListboxItem from './ListboxItem';
import { Props } from './type';

export default function ListBox({ items }: Props) {
    return (
        <>
            <div className="flex flex-col gap-6">
                {items.map(item => (
                    <ListboxItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        content={item.content}
                        bookmark={item.bookmark}
                        views={item.views}
                    />
                ))}
            </div>
        </>
    );
}
