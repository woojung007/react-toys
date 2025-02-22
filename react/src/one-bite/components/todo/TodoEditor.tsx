import { ChangeEvent, useRef, useState } from 'react';
import styles from './TodoEditor.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
    onCreate: (content: string) => void;
};

export default function TodoEditor({ onCreate }: Props) {
    const { t } = useTranslation();

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
                placeholder={t('todo.editor.placeholder')}
            />
            <button onClick={onSubmit}>{t('todo.editor.add')}</button>
        </div>
    );
}
