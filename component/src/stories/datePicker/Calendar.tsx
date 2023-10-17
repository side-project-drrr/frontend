import { Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface Props {
    filterDate: Date;
    setFilterDate: Dispatch<SetStateAction<Date>>;
}

export default function Calendar({ setFilterDate, filterDate }: Props) {
    return (
        <DatePicker
            selected={filterDate}
            onChange={date => date && setFilterDate(date)}
            dateFormat="yyyy-MM-dd"
            className="h-11 rounded-xl text-center"
        />
    );
}
