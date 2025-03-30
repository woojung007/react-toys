import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Home() {
    const [params, setParams] = useSearchParams();
    console.log(params.get('value'));
    useEffect(() => {
        setParams({ hi: 'hello' });
    }, []);
    return (
        <div>
            <div>home</div>
        </div>
    );
}
