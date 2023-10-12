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
    Pagination,
} from '@nextui-org/react';

import { columns, users } from './data';
import { selectData } from './selectData';
import Calendar from '../datePicker/Calendar';
import SearchInput from '../Input/SearchInput';
import { useCallback, useMemo, useState } from 'react';

export default function TablePage() {
    const [filterValue, setFilterValue] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    let hasSearchFilter = Boolean(filterValue);

    const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...users];
        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter(
                user => user.Writer?.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        return filteredUsers;
    }, [users, filterValue]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        console.log(value);
        if (value === '전체') {
            setFilterValue('');
        } else {
            if (value) {
                setFilterValue(value);
                setPage(1);
            } else {
                setFilterValue('');
            }
        }
    };

    const Search = () => {
        return (
            <>
                <div className="flex text-center items-center justify-between">
                    <div>
                        <Select
                            placeholder="Select an animal"
                            defaultSelectedKeys={['전체']}
                            className="max-w-xs"
                            style={{ width: '200px' }}
                            onChange={onSearchChange}
                        >
                            {selectData.map(data => (
                                <SelectItem key={data.value} value={data.value}>
                                    {data.label}
                                </SelectItem>
                            ))}
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
                        <select
                            className="dark flex text-center items-center"
                            aria-label="Example with disabled actions"
                            onChange={onRowsPerPageChange}
                            value={rowsPerPage}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                </div>
            </>
        );
    };
    const BottomContent = () => {
        return (
            <div className="py-2 px-2 flex items-center justify-between">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className=" sm:flex w-[30%] justify-end gap-2">
                    <Button
                        isDisabled={pages === 1}
                        size="sm"
                        variant="flat"
                        onPress={onPreviousPage}
                    >
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    };
    return (
        <Table
            aria-label="Example static collection table"
            className="text-center dark items-center"
            topContent={<Search />}
            bottomContent={<BottomContent />}
        >
            <TableHeader>
                {columns.map(column => (
                    <TableColumn className="bg-white" key={column.uid}>
                        {column.name}
                    </TableColumn>
                ))}
            </TableHeader>
            <TableBody className="text-center " items={items} style={{ height: '100px' }}>
                {items.map(user => (
                    <TableRow key={user.id}>
                        {columnKey => <TableCell>{getKeyValue(user, columnKey)}</TableCell>}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
