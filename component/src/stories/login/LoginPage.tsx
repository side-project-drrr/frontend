import { LoginButton } from '../button/LoginButton';
import { IdInput } from '../input/IdInput';
import { PasswordInput } from '../input/PasswordInput';

export const LoginPage = () => {
    return (
        <div>
            <IdInput />
            <PasswordInput />
            <LoginButton />
        </div>
    );
};
