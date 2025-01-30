import CounterController from 'one-bite/components/counter/CounterController';
import CounterViewer from 'one-bite/components/counter/CounterViewer';
import styles from './Counter.module.scss';
import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);

    const onClickButton = (value: number) => {
        setCount((prev) => prev + value);
    };
    return (
        <div className={styles.counter_app}>
            <h1>Simple Counter</h1>

            <section>
                <CounterViewer count={count} />
            </section>

            <section>
                <CounterController onClickButton={onClickButton} />
            </section>
        </div>
    );
}
