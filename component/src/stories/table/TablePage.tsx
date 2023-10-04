import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Select,
    SelectItem,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    Button,
    DropdownItem,
} from '@nextui-org/react';

import { columns, users } from './data';
import { selectData } from './selectData';
import Calendar from '../datePicker/Calendar';
import SearchInput from '../Input/SearchInput';

export default function TablePage() {
    const Search = () => {
        return (
            <>
                <div className="flex justify-around items-center">
                    <div>
                        <Select
                            items={selectData}
                            label="검색어를 선택해주세요."
                            placeholder="검색어를 선택해주세요."
                            className="max-w-xs w-96 h-10"
                        >
                            {data => <SelectItem key={data.value}>{data.label}</SelectItem>}
                        </Select>
                    </div>
                    <div>
                        <Calendar />
                    </div>
                    <div>
                        <SearchInput />
                    </div>
                    <div>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered" className="border-none outline-none">
                                    기술블로그 그룹
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Example with disabled actions"
                                disabledKeys={['edit', 'delete']}
                            >
                                <DropdownItem key="kakao">카카오</DropdownItem>
                                <DropdownItem key="naver">네이버</DropdownItem>
                                <DropdownItem key="minjoc">배달의 민족</DropdownItem>
                                <DropdownItem key="toss">Toss</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div>
                        <Dropdown>
                            <DropdownTrigger>50개</DropdownTrigger>
                            <DropdownMenu
                                aria-label="Example with disabled actions"
                                disabledKeys={['edit', 'delete']}
                            >
                                <DropdownItem key="10">10개</DropdownItem>
                                <DropdownItem key="20">20개</DropdownItem>
                                <DropdownItem key="30">30개</DropdownItem>
                                <DropdownItem key="40">40개</DropdownItem>
                                <DropdownItem key="50">50개</DropdownItem>
                                <DropdownItem key="60">60개</DropdownItem>
                                <DropdownItem key="70">70개</DropdownItem>
                                <DropdownItem key="80">80개</DropdownItem>
                                <DropdownItem key="90">90개</DropdownItem>
                                <DropdownItem key="100">100개</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <section className="text-center flex items-center">
                <div></div>
                <Table
                    aria-label="Example static collection table"
                    className="text-center"
                    topContent={<Search />}
                >
                    <TableHeader>
                        {columns.map(column => (
                            <TableColumn key={column.uid}>{column.name}</TableColumn>
                        ))}
                    </TableHeader>
                    <TableBody className="text-center">
                        {users.map(user => (
                            <TableRow key={user.id}>
                                {columnKey => <TableCell>{getKeyValue(user, columnKey)}</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </>
    );
}
