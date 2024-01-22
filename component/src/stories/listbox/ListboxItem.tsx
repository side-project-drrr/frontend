import { ItemProps } from './type';

export default function ListboxItem({ id, title, content, bookmark, views }: ItemProps) {
    return (
        <div
            key={id}
            className="flex flex-col justify-around w-10/12 gap-3 pl-6 text-black bg-white rounded-lg h-44"
        >
            <h1 className="text-base font-bold bold">{title}</h1>
            <p className="w-10/12 text-xs">{content}</p>
            <div className="flex justify-between w-2/12">
                <span className="flex items-center justify-around text-xs text-center">
                    좋아요: {bookmark}
                </span>
                <span className="text-xs">조회수: {views}</span>
            </div>
        </div>
    );
}
