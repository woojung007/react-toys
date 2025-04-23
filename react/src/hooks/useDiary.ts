import { DiaryData, DiaryStateContext } from 'pages/diary/DiaryApp';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useDiary(diaryId: string) {
    const navigate = useNavigate();

    const data = useContext(DiaryStateContext);

    const [currentDiaryItem, setCurrentDiaryItem] = useState<DiaryData>();

    useEffect(() => {
        const getCurrentDiaryItem = () => {
            const currentDiaryItem = data.find(
                (item) => String(item.id) === String(diaryId),
            );

            if (!currentDiaryItem) {
                window.alert('존재하지 않는 일기입니다.');
                navigate('/', { replace: true });
            }

            return currentDiaryItem;
        };

        const currentDiaryItem = getCurrentDiaryItem();
        setCurrentDiaryItem(currentDiaryItem);
    }, [diaryId]);

    return currentDiaryItem;
}
