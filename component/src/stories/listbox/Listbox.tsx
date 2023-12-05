import { Props } from './index';

import { FaHeart } from 'react-icons/fa';

export default function ListBox({ items }: Props) {
    return (
        <>
            {items.map(item => (
                <div
                    key={item.id}
                    className="flex flex-col flex-wrap text-black bg-white w-[650px] h-[155px] justify-center rounded-lg pl-6 gap-3"
                >
                    <p className="text-base font-bold bold ">{item.title}</p>
                    <p className="w-10/12 text-xs">{item.content}</p>
                    <div className="flex justify-between w-2/12">
                        <span className="flex items-center justify-around text-xs text-center">
                            <FaHeart size={12} />
                            {item.bookmark}
                        </span>
                        <span className="text-xs">{item.views}</span>
                    </div>
                </div>
            ))}
        </>
    );
}
