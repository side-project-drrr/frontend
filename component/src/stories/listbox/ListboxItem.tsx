import { ItemProps } from './type';

export default function ListboxItem({ item }: ItemProps) {
    return (
        <>
            <div
                key={item.techBlogPostBasicInfoDto.id}
                className="relative flex flex-col justify-around w-10/12 gap-3 pl-6 text-black bg-white rounded-lg h-60"
            >
                <h1 className="text-base font-bold bold">{item.techBlogPostBasicInfoDto.title}</h1>
                <p className="w-10/12 text-xs">{item.techBlogPostBasicInfoDto.summary}</p>
                <ul className="flex gap-4 overflow-hidden">
                    {item.categoryDto?.map((item: any, index: number) =>
                        index < 5 ? (
                            <li key={item.id} id={item.id} className="text-sm">
                                #{item.name}
                            </li>
                        ) : (
                            <></>
                        ),
                    )}
                    {item.categoryDto?.length > 5 && <li className="text-sm">...</li>}
                </ul>
                <img
                    src={item.techBlogPostBasicInfoDto.thumbnailUrl}
                    alt="썸네일"
                    className="absolute flex justify-center w-40 rounded-2xl right-10 h-36"
                />
                <div className="flex justify-between w-3/12">
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
