import { getEmotionImage } from 'utils/get-emotion-image';
import styles from './Viewer.module.scss';
import { emotionList } from 'constants/emotions';
import { DiaryData } from 'pages/diary/DiaryApp';

type Props = {
    diary: DiaryData;
};

export default function Viewer({ diary }: Props) {
    const emotionId = diary.emotionId || 1;
    const emotionItem = emotionList.find(
        (item) => String(item.emotionId) === String(emotionId),
    );
    return (
        <div className={styles.Viewer}>
            <section className={styles.img_section}>
                <h4>오늘의 감정</h4>
                <div
                    className={`${styles.emotion_img_wrapper} ${
                        styles[`emotion_img_wrapper_${emotionId}`]
                    }`}
                >
                    <img src={getEmotionImage(emotionId)} alt='' />
                    <div>{emotionItem?.emotionName}</div>
                </div>
            </section>
            <section className={styles.content_section}>
                <h4>오늘의 일기</h4>
                <div className={styles.content_wrapper}>
                    <p>{diary.content}</p>
                </div>
            </section>
        </div>
    );
}
