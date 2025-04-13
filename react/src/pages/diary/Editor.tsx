import EmotionItem from 'one-bite/components/diary/EmotionItem';
import styles from './Editor.module.scss';
import { useState } from 'react';
import Button from 'one-bite/components/diary/Button';

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

export default function Editor() {
    const [selectedEmotionId, setSelectedEmotionId] = useState(1);

    const onClickEmotion = (emotionId: number) => {
        setSelectedEmotionId(emotionId);
    };
    return (
        <div className={styles.Editor}>
            <section className={styles.date_section}>
                <h4>오늘의 날짜</h4>
                <input type='date' />
            </section>
            <section className={styles.emotion_section}>
                <h4>오늘의 감정</h4>
                <div className={styles.emotion_list_wrapper}>
                    {emotionList.map((item) => (
                        <EmotionItem
                            key={item.emotionId}
                            emotion={item}
                            isSelected={item.emotionId === selectedEmotionId}
                            onClickEmotion={onClickEmotion}
                        />
                    ))}
                </div>
            </section>
            <section className={styles.content_section}>
                <h4>오늘의 일기</h4>
                <textarea placeholder='오늘은 어땠나요?' />
            </section>
            <section className={styles.button_section}>
                <Button text='취소하기' onClick={() => {}} />
                <Button text='작성완료' type='POSITIVE' onClick={() => {}} />
            </section>
        </div>
    );
}
