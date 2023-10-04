import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { stackDummy } from './stackDummy';

export default function StackTable() {
    return (
        <Dropdown>
            <DropdownTrigger>StackDrop</DropdownTrigger>
            <DropdownMenu
                aria-label="Example with disabled actions"
                disabledKeys={['edit', 'delete']}
            >
                {stackDummy.map(stack => (
                    <DropdownItem key={stack.id}>{stack.name}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}
