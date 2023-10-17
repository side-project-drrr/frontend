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
    Button,
    Pagination,
} from '@nextui-org/react';
import { format } from 'date-fns';

import { columns, users } from './data';
import { selectData } from './selectData';
import { Stack } from './Stack';
import Calendar from '../datePicker/Calendar';
import SearchInput from '../Input/SearchInput';
import { useCallback, useMemo, useState } from 'react';

export default function TablePage() {
    const [filterValue, setFilterValue] = useState('');
    const [stackValue, setStackValue] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterDate, setFilterDate] = useState<Date>(new Date());
    const [page, setPage] = useState(1);

    const hasSearchFilter = Boolean(filterValue);
    const stackSerchFilter = Boolean(stackValue);
    const dateDateFilter = Boolean(filterDate);

    const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);
    const abc = users.filter(user => user.Writer?.includes(''));
    console.log(abc);
    const data = format(filterDate, 'yyyy-MM-dd');
    const filteredItems = useMemo(() => {
        let filteredUsers = [...users];
        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter(
                user => user.Writer?.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (stackSerchFilter) {
            filteredUsers = filteredUsers.filter(
                user => user.Stack?.toLowerCase().includes(stackValue.toLowerCase()),
            );
        }
        if (dateDateFilter) {
            filteredUsers = filteredUsers.filter(user => {
                return user?.crawledDate.includes(data);
            });
        }
        return filteredUsers;
    }, [users, filterValue, stackValue, filterDate]);

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
    const onStackSearchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === '전체') {
            setStackValue('');
        } else {
            if (value) {
                setStackValue(value);
                setPage(1);
            } else {
                setStackValue('');
            }
        }
    };

    const Search = () => {
        return (
            <>
                <div className="flex text-center items-center justify-between">
                    <div>
                        <Select
                            placeholder="Select an tagName"
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
                        <Calendar setFilterDate={setFilterDate} filterDate={filterDate} />
                    </div>
                    <div>
                        <SearchInput />
                    </div>
                    <div>
                        <Select
                            placeholder="Select an stack"
                            defaultSelectedKeys={['전체']}
                            className="max-w-xs"
                            style={{ width: '200px' }}
                            onChange={onStackSearchChange}
                        >
                            {Stack.map(data => (
                                <SelectItem key={data.value} value={data.value}>
                                    {data.label}
                                </SelectItem>
                            ))}
                        </Select>
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
