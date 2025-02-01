import CounterController from 'one-bite/components/counter/CounterController';
import CounterViewer from 'one-bite/components/counter/CounterViewer';
import styles from './Counter.module.scss';
import { useEffect, useRef, useState } from 'react';
import CounterEven from 'one-bite/components/counter/CounterEven';

export default function Counter() {
    const [count, setCount] = useState(0);
    const [input, setInput] = useState('');

    const isMount = useRef(false);

    const onClickButton = (value: number) => {
        setCount((prev) => prev + value);
    };

    // 1. 마운트 : 탄생
    useEffect(() => {
        console.log('mount');
    }, []);

    // 2. 업데이트 : 변화, 리렝더링
    useEffect(() => {
        if (!isMount.current) {
            isMount.current = true;
            return;
        }
        console.log('update');
    });

    // 3. 언마운트 : 죽음
    useEffect(() => {
        // cleanup 클린업, 정리함수
        return () => {
            //
        };
    }, []);

    // 의존성 배열, dependency array, deps
    // useEffect(() => {
    //     console.log('count:', count, 'input:', input);
    // }, [count, input]);
    return (
        <div className={styles.counter_app}>
            <h1>Simple Counter</h1>

            <section>
                <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
            </section>

            <section>
                <CounterViewer count={count} />
                {count % 2 === 0 ? <CounterEven /> : null}
            </section>

            <section>
                <CounterController onClickButton={onClickButton} />
            </section>
        </div>
    );
}
