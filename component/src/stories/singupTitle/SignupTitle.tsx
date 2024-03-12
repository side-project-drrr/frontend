import loginLogo from '@monorepo/service/src/assets/loginLogo.webp';
import CloseIcon from '@mui/icons-material/Close';
interface ISingupProps {
    onHangleCloseClick: () => void;
}
export default function SignupTitle({ onHangleCloseClick }: ISingupProps) {
    return (
        <>
            <div className=" w-full flex justify-between items-center">
                <h1>
                    <img src={loginLogo} alt="logo" />
                </h1>
                <div className="text-black">
                    <CloseIcon onClick={onHangleCloseClick} />
                </div>
            </div>
            <div
                className="flex text-black flex-wrap w-full justify-center items-center text-center text-base font-bold"
                aria-label="이용 약관"
            >
                <p>
                    지금 로그인하고 매일 새로운 <p>기술블로그 소식을 전달받아보세요</p>
                </p>
            </div>
        </>
    );
}
