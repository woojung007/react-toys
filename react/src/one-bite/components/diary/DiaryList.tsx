import Button from 'one-bite/components/diary/Button';
import styles from './DiaryList.module.scss';
import DiaryItem from 'one-bite/components/diary/DiaryItem';
import { DiaryData } from 'pages/diary/DiaryApp';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';

type Props = {
    monthlyData: DiaryData[];
};

type SortType = 'latest' | 'oldest';

export default function DiaryList({ monthlyData }: Props) {
    const navigate = useNavigate();

    const [sortType, setSortType] = useState<SortType>('latest');

    const onChangeSortType = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortType(e.target.value as SortType);
    };

    const getSortedData = () => {
        return monthlyData.toSorted((a: DiaryData, b: DiaryData) => {
            if (!a.createdDate || !b.createdDate) return 1;
            if (sortType === 'oldest') {
                return Number(a.createdDate) - Number(b.createdDate);
            } else {
                return Number(b.createdDate) - Number(a.createdDate);
            }
        });
    };

    const sortedData = getSortedData();

    return (
        <div className={styles.DiaryList}>
            <div className={styles.menu_bar}>
                <select onChange={onChangeSortType}>
                    <option value='latest'>최신순</option>
                    <option value='oldest'>오래된순</option>
                </select>

                <Button
                    text='새로운 일기 쓰기'
                    onClick={() => navigate(`/new`)}
                    type='POSITIVE'
                />
            </div>
            <div className={styles.list_wrapper}>
                {sortedData.map((data) => (
                    <DiaryItem key={data.id} diary={data} />
                ))}
            </div>
        </div>
    );
}
