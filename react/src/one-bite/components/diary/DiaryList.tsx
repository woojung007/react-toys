import Button from 'one-bite/components/common/Button';
import styles from './DiaryList.module.scss';
import DiaryItem from 'one-bite/components/diary/DiaryItem';

export default function DiaryList() {
    return (
        <div className={styles.DiaryList}>
            <div className={styles.menu_bar}>
                <select name='' id=''>
                    <option value='latest'>최신순</option>
                    <option value='oldest'>오래된순</option>
                </select>

                <Button text='새로운 일기 쓰기' onClick={() => {}} type='POSITIVE' />
            </div>
            <div className={styles.list_wrapper}>
                <DiaryItem />
                <DiaryItem />
                <DiaryItem />
            </div>
        </div>
    );
}
