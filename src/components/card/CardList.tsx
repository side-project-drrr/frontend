import CardComponent from './CardComponent';
import { useRecoilValue } from 'recoil';
import { techBlogDataState } from '../../recoil/atom/techBlogDataState';

export default function CardList() {
    const techBlogData = useRecoilValue(techBlogDataState);

    return (
        <>
            <div className="flex flex-wrap justify-between pr-[15px] pl-[15px] w-full">
                {techBlogData.map((item: any, index: number) => (
                    <CardComponent key={index} item={item} index={index} />
                ))}
            </div>
        </>
    );
}
