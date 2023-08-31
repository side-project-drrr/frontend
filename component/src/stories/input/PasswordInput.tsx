import { Input } from '@nextui-org/react';
export const PasswordInput = () => {
    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input type="password" label="password" color="success" variant="underlined" />
        </div>
    );
};
