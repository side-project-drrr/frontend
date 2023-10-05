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
                <div className="flex text-center items-center justify-between">
                    <div>
                        <Select
                            items={selectData}
                            placeholder="검색 조건을 선택해주세요."
                            className="max-w-xs"
                            style={{ width: '200px' }}
                        >
                            {data => (
                                <SelectItem key={data.id} className="dark">
                                    {data.label}
                                </SelectItem>
                            )}
                        </Select>
                    </div>
                    <div>
                        <Calendar />
                    </div>
                    <div>
                        <SearchInput />
                    </div>
                    <div>
                        <Dropdown className="dark">
                            <DropdownTrigger>
                                <Button
                                    variant="bordered"
                                    className="border-none outline-none w-96"
                                >
                                    기술블로그 그룹
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Example with disabled actions"
                                className="dark"
                            >
                                <DropdownItem key="kakao">카카오</DropdownItem>
                                <DropdownItem key="naver">네이버</DropdownItem>
                                <DropdownItem key="minjoc">배달의 민족</DropdownItem>
                                <DropdownItem key="toss">Toss</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div>
                        <Dropdown className="dark flex text-center items-center">
                            <DropdownTrigger style={{ width: '200px' }}>
                                <p>50개</p>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Example with disabled actions"
                                className="dark"
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
            <Table
                aria-label="Example static collection table"
                className="text-center dark items-center justify-around"
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
        </>
    );
}
