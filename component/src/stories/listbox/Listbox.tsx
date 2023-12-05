import { Props } from './index';
export default function Listbox({ items }: Props) {
    return (
        <>
            {items.map(item => (
                <div
                    key={item.id}
                    className="flex flex-col flex-wrap text-black bg-white w-[650px] h-[155px] justify-center rounded-lg"
                >
                    <p className="text-base font-bold bold ">{item.title}</p>
                    <p className="w-full text-xs">{item.content}</p>
                    <div>
                        <span className="text-xs ">{item.bookmark}</span>
                        <span className="text-xs ">{item.views}</span>
                    </div>
                </div>
            ))}
        </>
    );
}
