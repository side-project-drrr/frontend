import { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default function Calendar() {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    return (
        <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            className="h-11 rounded-xl text-center"
        />
    );
}
