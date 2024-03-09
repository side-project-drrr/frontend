import { useDarkMode } from '../../ThemeContext/ThemeProvider.tsx';
import darkLogo from '../../assets/darkLogo.webp';
import lightLogo from '../../assets/lightLogo.webp';

export default function DrrrLogo() {
    const { isDarkMode } = useDarkMode();

    const logoUrl = isDarkMode() ? darkLogo : lightLogo;
    return (
        <div className="mr-4 none">
            <img src={logoUrl} alt="로고" />
        </div>
    );
}
