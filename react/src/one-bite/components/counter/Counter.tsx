import CounterController from 'one-bite/components/counter/CounterController';
import CounterViewer from 'one-bite/components/counter/CounterViewer';
import styles from './Counter.module.scss';
import { useEffect, useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);
    const [input, setInput] = useState('');

    const onClickButton = (value: number) => {
        setCount((prev) => prev + value);
    };

    useEffect(() => {
        console.log('count:', count, 'input:', input);
    }, [count, input]); // 의존성 배열, dependency array, deps
    return (
        <div className={styles.counter_app}>
            <h1>Simple Counter</h1>

            <section>
                <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
            </section>

            <section>
                <CounterViewer count={count} />
            </section>

            <section>
                <CounterController onClickButton={onClickButton} />
            </section>
        </div>
    );
}
