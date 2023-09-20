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
    Input,
} from '@nextui-org/react';

import { columns, users } from './data';
import { useMemo } from 'react';
import { selectData } from './selectData';

export default function TablePage() {
    const SearchInput = useMemo(() => {
        return (
            <div className="flex">
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
                    <input type="date" />
                </div>
                <div>
                    <Input value={'블로그 기술 그룹'} />
                </div>
            </div>
        );
    }, []);

    return (
        <section className="text-center flex">
            <div></div>
            <Table
                aria-label="Example static collection table"
                className="text-center"
                topContent={SearchInput}
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
    );
}
