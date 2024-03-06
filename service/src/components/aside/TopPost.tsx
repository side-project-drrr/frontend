import { Link } from 'react-router-dom';
import { ITopPostProps } from './type';

const TopPost = ({ item }: ITopPostProps) => {
    console.log(item.techBlogPostBasicInfoDto.thumbnailUrl);

    return (
        <div className="flex h-[103px]" aria-label="탑 게시글">
            <div id={item.techBlogPostBasicInfoDto.id} key={item.techBlogPostBasicInfoDto.id}>
                <Link
                    to={`/category/detail/${item.techBlogPostBasicInfoDto.id}`}
                    className="text-black dark:text-white hover:text-black"
                >
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="flex justify-center items-center flex-col w-1/2">
                            <img
                                src={item.techBlogPostBasicInfoDto.thumbnailUrl}
                                alt="썸네일"
                                className="rounded-sm w-3/4 object-cover"
                            />
                        </div>
                        <div className="text-xs gap-2 flex flex-col">
                            <p className="text-black hover:cursor-pointer text-inherit hover:text-inherit hover:underline dark:text-white w-full">
                                {item.techBlogPostBasicInfoDto.title}
                            </p>
                            <ul className="flex text-[10px] whitespace-nowrap gap-2 flex-wrap h-7 overflow-y-hidden">
                                {item.categoryDto.map(data => (
                                    <li
                                        key={data.id}
                                        id={data.id}
                                        className="text-[10px] dark:bg-[#444444] rounded-lg py-1 px-4 bg-[#F0F0F0] text-black dark:text-white"
                                    >
                                        {data.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default TopPost;
