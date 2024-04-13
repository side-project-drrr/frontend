import { Link, useNavigate } from 'react-router-dom';
import { ITopPostProps } from './type';
import darkLogo from '../../assets/darkLogo.webp';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';
import { loginModalState } from '../../recoil/atom/loginModalState';
import { Box } from '@mui/material';

const TopPost = ({ item }: ITopPostProps) => {
    const setLoginModalOpen = useSetRecoilState(loginModalState);
    const loggedIn = useRecoilValue(isLoggedInState);
    const navigate = useNavigate();

    const handleClick = (id?: string) => {
        if (loggedIn) {
            navigate(`/view/${id}`);
        } else {
            setLoginModalOpen(true);
        }
    };

    return (
        <div className="flex h-[103px]" aria-label="탑 게시글">
            <div id={item.techBlogPostBasicInfoDto.id} key={item.techBlogPostBasicInfoDto.id}>
                <Box
                    className="flex justify-center items-center w-full h-full gap-4"
                    onClick={() => handleClick(item.techBlogPostBasicInfoDto.id)}
                >
                    <div className="flex justify-center items-center flex-col">
                        {item.techBlogPostBasicInfoDto.thumbnailUrl ? (
                            <div
                                style={{
                                    backgroundImage: `url('${item.techBlogPostBasicInfoDto.thumbnailUrl}')`,
                                    backgroundSize: 'cover',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '20px',
                                }}
                            />
                        ) : (
                            <div
                                style={{
                                    backgroundImage: `url('${darkLogo}')`,
                                    backgroundRepeat: 'no-repeat',
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '20px',
                                    backgroundPosition: 'center',
                                    backgroundSize: '60%',
                                    backgroundColor: 'rgb(203, 213, 225, 5.0)',
                                }}
                            />
                        )}
                    </div>
                    <div className="text-xs gap-2 flex flex-col">
                        <p className="text-black hover:cursor-pointer text-inherit hover:text-inherit hover:underline dark:text-white w-full ">
                            {item.techBlogPostBasicInfoDto.title}
                        </p>
                        <ul className="flex text-[10px] gap-2 flex-wrap h-7 overflow-y-hidden">
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
                </Box>
            </div>
        </div>
    );
};

export default TopPost;
