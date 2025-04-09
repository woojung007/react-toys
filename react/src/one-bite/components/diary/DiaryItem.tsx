import Button from 'one-bite/components/common/Button';
import styles from './DiaryItem.module.scss';
import { getEmotionImage } from 'utils/get-emotion-image';

export default function DiaryItem() {
    const emotionId = 1;
    return (
        <div className={styles.DiaryItem}>
            <div className={`${styles.img_section} ${styles[`img_section_${emotionId}`]}`}>
                <img src={getEmotionImage(1)} alt='emotion' />
            </div>
            <div className={styles.info_section}>
                <div className={styles.created_date}>{new Date().toLocaleDateString()}</div>
                <div className={styles.content}>일기 컨텐츠</div>
            </div>
            <div className={styles.button_section}>
                <Button text='수정하기' onClick={() => {}} type='DEFAULT' />
            </div>
        </div>
    );
}
