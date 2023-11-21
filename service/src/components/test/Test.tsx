import { Button } from '@nextui-org/react';
import { useState } from 'react';

export default function Test() {
    const [data, setData] = useState(false);
    const testButton = () => {
        setData(true);
    };
    return (
        <div>
            <Button onClick={testButton}>로그인</Button>
            {data && <p>good</p>}
        </div>
    );
}
