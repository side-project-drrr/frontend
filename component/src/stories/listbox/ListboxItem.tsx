import { Box, Chip, Link } from '@mui/material';
import { ItemProps } from './type';
import darkLogo from '@monorepo/service/src/assets/darkLogo.webp';

export default function ListboxItem({ item }: ItemProps) {
    return (
        <>
            <Link
                href={`/view/${item.techBlogPostBasicInfoDto.id}`}
                color="text.primary"
                underline="none"
            >
                <Box
                    key={item.techBlogPostBasicInfoDto.id}
                    borderBottom={1}
                    borderColor="primary.main"
                    padding="25px 20px"
                    className="relative flex flex-col justify-around"
                >
                    <h1 className="w-full overflow-hidden text-xl font-bold bold whitespace-nowrap text-ellipsis mb-[10px]">
                        {item.techBlogPostBasicInfoDto.title}
                    </h1>
                    <div className="flex items-center justify-between w-full">
                        <p className="text-base overflow-hidden text-ellipsis h-[140px] max-h-[140px] mr-[20px]">
                            {item.techBlogPostBasicInfoDto.summary}
                        </p>

                        {item.techBlogPostBasicInfoDto.thumbnailUrl ? (
                            <Box sx={{ width: '200px' }}>
                                <img
                                    src={item.techBlogPostBasicInfoDto.thumbnailUrl}
                                    alt="썸네일"
                                    className="flex justify-center w-40 rounded-2xl right-10 h-36"
                                />
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItem: 'center',
                                    justifyContent: 'center',
                                    width: '140px',
                                    height: '140px',
                                    backgroundColor: 'rgb(158, 158, 158)',
                                    borderRadius: '20px',
                                    backgroundImage: `url(${darkLogo})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center center',
                                    backgroundSize: '30%',
                                }}
                            ></Box>
                        )}
                    </div>
                    <Box className="flex gap-2 w-full flex-wrap overflow-y-hidden h-[40px] mt-[20px]">
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
                    <div className="flex justify-between w-3/12 mt-[10px]">
                        <span className="flex items-center justify-around text-xs text-center">
                            좋아요: {item.techBlogPostBasicInfoDto.postLike}
                        </span>
                        <span className="text-xs">
                            조회수: {item.techBlogPostBasicInfoDto.viewCount}
                        </span>
                    </div>
                </Box>
            </Link>
        </>
    );
}
