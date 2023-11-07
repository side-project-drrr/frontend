import { Button, Input } from '@nextui-org/react';

export default function SignupPage() {
    return (
        <div className="flex items-center justify-center flex-col gap-8 w-full">
            <div className="w-full flex items-center justify-center">
                <Input label="이름" className="max-w-md dark" size="lg" />
            </div>
            <div className="w-full flex items-center justify-center">
                <Input label="닉네임" size="lg" className="max-w-md dark" />
            </div>
            <div className="w-full flex items-center justify-center">
                <Input label="전화번호" size="lg" className="max-w-md dark" />
            </div>
            <div className="w-full flex items-center justify-center">
                <Input label="이메일" size="lg" className="max-w-md dark" />
            </div>
            <div className="w-full flex items-center justify-center">
                <Input label="생년월일" size="lg" className="max-w-md dark" />
            </div>
            <div className="w-full flex items-center justify-center">
                <Input label="성별" size="lg" className="max-w-md dark" />
            </div>
            <div className="w-full flex items-center justify-center">
                <Button className="max-w-md dark" size="lg">
                    회원가입 완료
                </Button>
            </div>
        </div>
    );
}
