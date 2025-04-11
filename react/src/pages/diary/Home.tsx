import Button from 'one-bite/components/common/Button';
import Header from 'one-bite/components/common/Header';
import DiaryList from 'one-bite/components/diary/DiaryList';
import { DiaryData, DiaryStateContext } from 'pages/diary/DiaryApp';
import { useContext, useState } from 'react';

const getMonthlyData = (pivotDate: Date, data: DiaryData[]) => {
    const beginTIme = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth(),
        1,
        0,
        0,
        0,
    ).getTime();
    const endTime = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth() + 1,
        0,
        23,
        59,
        59,
    ).getTime();

    return data.filter(
        (item) =>
            item.createdDate &&
            beginTIme <= item.createdDate &&
            item.createdDate <= endTime,
    );
};

export default function Home() {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());

    const monthlyData = getMonthlyData(pivotDate, data);

    const onIncreaseMonth = () => {
        setPivotDate(
            new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1),
        );
    };

    const onDecreaseMonth = () => {
        setPivotDate(
            new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1),
        );
    };
    return (
        <div>
            <Header
                title={`${pivotDate.getFullYear()}년 ${
                    pivotDate.getMonth() + 1
                }월`}
                leftChild={
                    <Button text='<' onClick={onDecreaseMonth} type='DEFAULT' />
                }
                rightChild={
                    <Button text='>' onClick={onIncreaseMonth} type='DEFAULT' />
                }
            />

            <DiaryList monthlyData={monthlyData} />
        </div>
    );
}
