import Button from 'one-bite/components/diary/Button';
import styles from './DiaryItem.module.scss';
import { getEmotionImage } from 'utils/get-emotion-image';
import { DiaryData } from 'pages/diary/DiaryApp';
import { useNavigate } from 'react-router-dom';

type Props = {
    diary: DiaryData;
};

export default function DiaryItem({ diary }: Props) {
    const navigate = useNavigate();

    return (
        <div className={styles.DiaryItem}>
            <div
                onClick={() => navigate(`/diary/${diary.id}`)}
                className={`${styles.img_section} ${
                    styles[`img_section_${diary.emotionId || 1}`]
                }`}
            >
                <img
                    src={getEmotionImage(diary.emotionId || 1)}
                    alt='emotion'
                />
            </div>
            <div
                onClick={() => navigate(`/diary/${diary.id}`)}
                className={styles.info_section}
            >
                <div className={styles.created_date}>
                    {diary.createdDate &&
                        new Date(diary.createdDate).toLocaleDateString()}
                </div>
                <div className={styles.content}>{diary.content}</div>
            </div>
            <div className={styles.button_section}>
                <Button
                    text='수정하기'
                    onClick={() => navigate(`/edit/${diary.id}`)}
                    type='DEFAULT'
                />
            </div>
        </div>
    );
}
