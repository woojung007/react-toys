import styles from './Button.module.scss';

type Props = {
    text: string;
    onClick: () => void;
    type: 'DEFAULT' | 'POSITIVE' | 'NEGATIVE';
};

export default function Button({ text, type, onClick }: Props) {
    return (
        <button onClick={onClick} className={`${styles['Button']} ${styles[`Button_${type}`]}`}>
            {text}
        </button>
    );
}
