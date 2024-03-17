import { Box, Chip } from '@mui/material';
import { ItemProps } from './type';

export default function ListboxItem({ item }: ItemProps) {
    return (
        <>
            <Box
                key={item.techBlogPostBasicInfoDto.id}
                borderBottom={1}
                borderColor="primary.main"
                padding="20px 10px"
                className="relative flex flex-col justify-around gap-3"
            >
                <h1 className="w-full overflow-hidden text-xl font-bold bold whitespace-nowrap text-ellipsis">
                    {item.techBlogPostBasicInfoDto.title}
                </h1>
                <div className="flex items-center justify-between w-full gap-10">
                    <p className="text-base block overflow-hidden text-ellipsis h-[140px] max-h-[140px] w-full ">
                        {item.techBlogPostBasicInfoDto.summary}
                    </p>
                    <img
                        src={item.techBlogPostBasicInfoDto.thumbnailUrl}
                        alt="썸네일"
                        className="flex justify-center w-40 rounded-2xl right-10 h-36"
                    />
                </div>
                <Box className="flex gap-2 w-full flex-wrap overflow-y-hidden h-[40px]">
                    {item.categoryDto?.map((item: { id: string; name: string }) => (
                        <Chip
                            key={item.id}
                            id={item.id}
                            label={`#${item.name}`}
                            color="primary"
                            className="text-sm rounded-xl px-4 py-1"
                        />
                    ))}
                </Box>
                <div className="flex justify-between w-3/12">
                    <span className="flex items-center justify-around text-xs text-center">
                        좋아요: {item.techBlogPostBasicInfoDto.postLike}
                    </span>
                    <span className="text-xs">
                        조회수: {item.techBlogPostBasicInfoDto.viewCount}
                    </span>
                </div>
            </Box>
        </>
    );
}
