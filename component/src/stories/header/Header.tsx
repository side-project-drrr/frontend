import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { BiLogoGit } from 'react-icons/bi';
import { CiBellOn } from 'react-icons/ci';
import { Login } from '@monorepo/component/src/stories/login/Login';

const InputTextField = styled(TextField)({
    '& label': {
        color: 'var(--sub-text)',
    },

    '& .MuiOutlinedInput-root': {
        color: 'var(--text)',
        '& fieldset': {
            borderRadius: 20,
            width: '24rem',
            backgroundColor: 'transparent',
            borderColor: '#E4E4E7',
            //height: '2.75rem',
        },
    },
});

export default function Header() {
    return (
        <header className="flex w-screen h-[57px] border-b-1 border-solid border-zinc-500 items-center ">
            <div className="flex items-center flex-1 mx-10">
                <div className="mx-2 none">
                    <BiLogoGit size={40} aria-label="로고" />
                </div>
                <div className="grow">
                    <InputTextField
                        type="text"
                        className="max-w-xs"
                        variant="outlined"
                        label="검색"
                        aria-label="검색"
                    />
                </div>
                <div>
                    <CiBellOn size={26} aria-label="알림" />
                </div>
                {/* <div className="mr-2 bg-transparent border-transparent dark hover:border-transparent"> */}
                {/* </div> */}
                <Login />
            </div>
        </header>
    );
}
