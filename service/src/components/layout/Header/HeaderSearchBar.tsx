import DrrrLogo from '../../logo/DrrrLogo.tsx';
import { InputTextField } from '../../../style/inputText.ts';

const HeaderSearchBar = () => {
    return (
        <div className="flex items-center">
            <DrrrLogo />
            <InputTextField
                type="text"
                variant="outlined"
                aria-label="검색"
                sx={{ width: '18rem' }}
                placeholder="검색"
                autoComplete="off"
            />
        </div>
    );
};

export default HeaderSearchBar;
