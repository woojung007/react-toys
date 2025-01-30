import CounterController from 'one-bite/components/counter/CounterController';
import CounterViewer from 'one-bite/components/counter/CounterViewer';
import styles from './Counter.module.scss';

export default function Counter() {
    return (
        <div className={styles.counter_app}>
            <h1>Simple Counter</h1>

            <section>
                <CounterViewer />
            </section>

            <section>
                <CounterController />
            </section>
        </div>
    );
}
