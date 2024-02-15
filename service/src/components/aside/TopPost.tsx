import { useEffect, useState } from 'react';
import { getTopPostItemService } from '../../service/TopPostService';
import { ITopPostProps } from './type';
import { Link } from 'react-router-dom';

const TopPost = () => {
    const [topContent, setTopContent] = useState<ITopPostProps[]>([]);
    async function getTopContentRender() {
        const topContentData = await getTopPostItemService();
        setTopContent(topContentData);
    }
    useEffect(() => {
        getTopContentRender();
    }, []);

    return (
        <div className="my-8" aria-label="탑 게시글">
            <h2 className="text-lg font-bold ">Top {topContent.length}</h2>
            <ol className="flex flex-col mt-4 ">
                {topContent?.map((content, index) => (
                    <Link
                        to={`/category/detail/${content.id}`}
                        key={content.id}
                        className="text-black dark:text-white"
                    >
                        <li className="flex py-2 " id={String(content.id)}>
                            <span className="mr-3">{index + 1}.</span>
                            <p className="text-black hover:cursor-pointer text-inherit hover:text-inherit hover:underline dark:text-white">
                                {content.title}
                            </p>
                        </li>
                    </Link>
                ))}
            </ol>
        </div>
    );
};

export default TopPost;
