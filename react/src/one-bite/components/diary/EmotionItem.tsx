import { Emotion } from 'pages/diary/Editor';
import { getEmotionImage } from 'utils/get-emotion-image';
import styles from './EmotionItem.module.scss';

type Props = {
    emotion: Emotion;
    isSelected: boolean;
    onClickEmotion: (emotionId: number) => void;
};

export default function EmotionItem({
    emotion: { emotionId, emotionName },
    isSelected,
    onClickEmotion,
}: Props) {
    return (
        <div
            onClick={() => onClickEmotion(emotionId)}
            className={`${styles.EmotionItem} ${
                isSelected && styles[`on_${emotionId}`]
            }`}
        >
            <img
                className={styles.emotion_img}
                src={getEmotionImage(emotionId)}
                alt={emotionName}
            />
            <div className={styles.emotion_name}>{emotionName}</div>
        </div>
    );
}
