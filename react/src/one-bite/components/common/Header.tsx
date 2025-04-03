import styles from './Header.module.scss';

type Props = {
    title: string;
    leftChild: React.ReactNode;
    rightChild: React.ReactNode;
};

export default function Header({ title, leftChild, rightChild }: Props) {
    return (
        <header className={styles.Header}>
            <div className={styles.header_left}>{leftChild}</div>
            <div className={styles.header_center}>{title}</div>
            <div className={styles.header_right}>{rightChild}</div>
        </header>
    );
}
