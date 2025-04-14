import { Emotion } from 'pages/diary/Editor';
import { getEmotionImage } from 'utils/get-emotion-image';
import styles from './EmotionItem.module.scss';

type Props = {
    emotion: Emotion;
    isSelected: boolean;
    onClick: () => void;
};

export default function EmotionItem({
    emotion: { emotionId, emotionName },
    isSelected,
    onClick,
}: Props) {
    return (
        <div
            onClick={onClick}
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
