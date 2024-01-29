import { useEffect } from 'react';
//import { getTopPostItemService } from '../../service/TopPostService';
//import { ITopPostProps } from './type';

const topContent = [{ id: 1, title: '123' }];

const TopPost = () => {
    //const [topContent, setTopContent] = useState<ITopPostProps[]>([]);
    async function getTopContentRender() {
        //const topContentData = await getTopPostItemService();
        //      setTopContent();
    }
    useEffect(() => {
        getTopContentRender();
    }, []);
    return (
        <div className="my-2" aria-label="탑 게시글">
            <h2 className="text-lg font-bold">Top {topContent.length}</h2>
            <ol>
                {topContent?.map(item => (
                    <li key={item.id} className="py-2">
                        <span className="mr-3">{Number(item) + 1}.</span>
                        <p className="hover:cursor-pointer text-inherit hover:text-inherit hover:underline ">
                            {item.title}
                        </p>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default TopPost;
