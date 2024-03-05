import { ItemProps } from './type';

export default function ListboxItem({ item }: ItemProps) {
    return (
        <>
            <div
                key={item.techBlogPostBasicInfoDto.id}
                className="relative flex flex-col justify-around gap-3 border-b border-[#444444]"
            >
                <h1 className="w-full ml-2 overflow-hidden text-xl font-bold bold whitespace-nowrap text-ellipsis">
                    {item.techBlogPostBasicInfoDto.title}
                </h1>
                <div className="flex items-center justify-between p-2">
                    <p className="text-base block overflow-hidden text-ellipsis h-[140px] max-h-[140px] w-10/12">
                        {item.techBlogPostBasicInfoDto.summary}
                    </p>
                    <img
                        src={item.techBlogPostBasicInfoDto.thumbnailUrl}
                        alt="썸네일"
                        className="flex justify-center w-40 rounded-2xl right-10 h-36"
                    />
                </div>
                <ul className="flex gap-2 w-full p-2 flex-wrap overflow-y-hidden h-[40px]">
                    {item.categoryDto?.map((item: { id: string; name: string }) => (
                        <li
                            key={item.id}
                            id={item.id}
                            className="text-sm bg-[#444444] rounded-xl px-4 py-1"
                        >
                            #{item.name}
                        </li>
                    ))}
                </ul>

                <div className="flex justify-between w-3/12 p-2 mb-4">
                    <span className="flex items-center justify-around text-xs text-center">
                        좋아요: {item.techBlogPostBasicInfoDto.postLike}
                    </span>
                    <span className="text-xs">
                        조회수: {item.techBlogPostBasicInfoDto.viewCount}
                    </span>
                </div>
            </div>
        </>
    );
}
