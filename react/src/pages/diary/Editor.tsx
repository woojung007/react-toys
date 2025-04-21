import EmotionItem from 'one-bite/components/diary/EmotionItem';
import styles from './Editor.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import Button from 'one-bite/components/diary/Button';
import { useNavigate } from 'react-router-dom';
import { DiaryData } from 'pages/diary/DiaryApp';

export type Emotion = {
    emotionId: number;
    emotionName: string;
};

const emotionList: Emotion[] = [
    {
        emotionId: 1,
        emotionName: '완전 좋음',
    },
    {
        emotionId: 2,
        emotionName: '좋음',
    },
    {
        emotionId: 3,
        emotionName: '그럭저럭',
    },
    {
        emotionId: 4,
        emotionName: '나쁨',
    },
    {
        emotionId: 5,
        emotionName: '끔찍함',
    },
];

// 날짜 -> YYYY-MM-DD
export const getStringedDate = (targetDate: Date) => {
    let year = String(targetDate.getFullYear());
    let month = String(targetDate.getMonth() + 1);
    let date = String(targetDate.getDate());

    if (Number(month) < 10) {
        month = `0${month}`;
    }
    if (Number(date) < 10) {
        date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
};

export type EditorInput = {
    createdDate: Date;
    emotionId: number;
    content: string;
};

type Props = {
    onSubmit: (input: EditorInput) => void;
    initData: DiaryData | undefined;
};

type CustomEventType = {
    target: {
        name: string;
        value: string;
    };
};

export default function Editor({ onSubmit, initData }: Props) {
    const [input, setInput] = useState<EditorInput>({
        createdDate: new Date(),
        emotionId: 3,
        content: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (initData) {
            setInput({
                ...initData,
                emotionId: initData.emotionId || 1,
                content: initData.content || '',
                createdDate: new Date(Number(initData.createdDate)),
            });
        }
    }, [initData]);

    const onChangeInput = (
        e: ChangeEvent<HTMLInputElement> | CustomEventType,
    ) => {
        let name = e.target.name;
        let value: string | Date = e.target.value;

        if (name === 'createdDate') {
            value = new Date(value);
        }
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onClickSubmitButton = () => {
        onSubmit(input);
    };

    return (
        <div className={styles.Editor}>
            <section className={styles.date_section}>
                <h4>오늘의 날짜</h4>
                <input
                    onChange={onChangeInput}
                    name='createdDate'
                    value={getStringedDate(input.createdDate)}
                    type='date'
                />
            </section>
            <section className={styles.emotion_section}>
                <h4>오늘의 감정</h4>
                <div className={styles.emotion_list_wrapper}>
                    {emotionList.map((item) => (
                        <EmotionItem
                            key={item.emotionId}
                            emotion={item}
                            isSelected={
                                item.emotionId === Number(input.emotionId)
                            }
                            onClick={() => {
                                onChangeInput({
                                    target: {
                                        name: 'emotionId',
                                        value: String(item.emotionId),
                                    },
                                });
                            }}
                        />
                    ))}
                </div>
            </section>
            <section className={styles.content_section}>
                <h4>오늘의 일기</h4>
                <textarea
                    value={input.content}
                    name='content'
                    onChange={onChangeInput}
                    placeholder='오늘은 어땠나요?'
                />
            </section>
            <section className={styles.button_section}>
                <Button text='취소하기' onClick={() => navigate(-1)} />
                <Button
                    text='작성완료'
                    type='POSITIVE'
                    onClick={onClickSubmitButton}
                />
            </section>
        </div>
    );
}
