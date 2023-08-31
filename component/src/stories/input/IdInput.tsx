import { Input } from '@nextui-org/react';
export const IdInput = () => {
    return (
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
            <Input type="email" label="Email" variant="underlined" />
        </div>
    );
};
