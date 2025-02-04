import { ChangeEvent, useRef, useState } from 'react';
import styles from './TodoEditor.module.scss';

type Props = {
    onCreate: (content: string) => void;
};

export default function TodoEditor({ onCreate }: Props) {
    const [content, setContent] = useState('');
    const contentRef = useRef<HTMLInputElement>(null);

    const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    };

    const onSubmit = () => {
        if (!content) {
            contentRef.current?.focus();
            return;
        }
        onCreate(content);
        setContent('');
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13) {
            onSubmit();
        }
    };

    return (
        <div className={styles.todo_editor}>
            <input
                value={content}
                ref={contentRef}
                onChange={onChangeContent}
                type='text'
                onKeyDown={onKeyDown}
                placeholder='새로운 Todo...'
            />
            <button onClick={onSubmit}>추가</button>
        </div>
    );
}
