import { useEffect } from 'react';

export default function CounterEven() {
    useEffect(() => {
        // cleanup 클린업, 정리함수
        return () => {
            console.log('unmount');
        };
    }, []);
    return (
        <div>
            <div>짝수입니다.</div>
        </div>
    );
}
