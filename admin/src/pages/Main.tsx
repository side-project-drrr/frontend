import { useEffect } from 'react';
import axios from 'axios';

export default function Main() {
    async function testFetch() {
        try {
            const res = await axios.get('/posts');
            return res.data;
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        testFetch();
    }, []);
    return <div>Main</div>;
}
