import CardComponent from './CardComponent';
import { IListBoxProps } from '../../stories/listbox/type';
import { useRecoilValue } from 'recoil';
import { techBlogDataState } from '../../recoil/atom/techBlogDataState';

export default function CardList({ onCategoryId, onFilterItems }: IListBoxProps) {
    const techBlogData = useRecoilValue(techBlogDataState);
    return (
        <>
            {onCategoryId === 0 || onCategoryId === undefined ? (
                <div className="flex flex-wrap justify-between pr-10">
                    {techBlogData.map((item: any, index: number) => (
                        <CardComponent key={index} item={item} index={index} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-wrap justify-between pr-10">
                    {onFilterItems.map((item: any, index: number) => (
                        <CardComponent key={index} item={item} index={index} />
                    ))}
                </div>
            )}
        </>
    );
}
