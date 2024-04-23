import loginLogo from '../../assets/loginLogo.webp';
import CloseIcon from '@mui/icons-material/Close';
interface ISingupProps {
    onHangleCloseClick: () => void;
    state: string;
}
export default function ModalTitle({ onHangleCloseClick, state = 'signup' }: ISingupProps) {
    return (
        <>
            <div className="flex items-center justify-between w-full">
                <h1>
                    <img src={loginLogo} alt="logo" className="max-[600px]:w-10" />
                </h1>
                <div className="text-black">
                    <CloseIcon onClick={onHangleCloseClick} />
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-center w-full text-base font-bold text-center text-black max-[600px]:text-xs max-[600px]:mt-5">
                {state === 'signup' ? (
                    <p>
                        지금 로그인하고 매일 새로운 <br />
                        기술블로그 소식을 전달받아보세요.
                    </p>
                ) : (
                    <p>
                        탈퇴하시겠습니까? <br />
                        구독했던 카테고리들이 사라집니다.
                    </p>
                )}
            </div>
        </>
    );
}
