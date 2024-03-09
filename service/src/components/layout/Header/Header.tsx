// custom component
import HeaderSearchBar from './HeaderSearchBar';
import HeaderMenu from './HeaderMenu.tsx';

const Header = () => {
    return (
        <header className="w-full flex justify-center">
            <div className="flex justify-between w-full max-w-screen-xl py-4">
                <HeaderSearchBar />
                <HeaderMenu />
            </div>
        </header>
    );
};

export default Header;
