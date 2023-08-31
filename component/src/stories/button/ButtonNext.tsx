import { Button } from '@nextui-org/react';

/**
 * Primary UI component for user interaction
 */
export const ButtonNext = () => {
    return (
        <div className="flex flex-wrap gap-4 items-center">
            <Button
                color="default"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
                Default
            </Button>
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="success">Success</Button>
            <Button color="warning">Warning</Button>
            <Button color="danger">Danger</Button>
        </div>
    );
};
