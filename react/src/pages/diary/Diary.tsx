import useDiary from 'hooks/useDiary';
import Button from 'one-bite/components/diary/Button';
import Header from 'one-bite/components/diary/Header';
import Viewer from 'one-bite/components/diary/Viewer';
import { useNavigate, useParams } from 'react-router-dom';
import { getStringedDate } from 'utils/get-stringed-date';

export default function Diary() {
    const navigate = useNavigate();
    const params = useParams();

    const currentDiary = useDiary(params?.diaryId || '');

    if (!currentDiary) {
        return <div>데이터 로딩중 ... </div>;
    }

    const title =
        currentDiary.createdDate &&
        getStringedDate(new Date(currentDiary.createdDate));

    return (
        <div>
            <Header
                title={`${title} 기록`}
                leftChild={
                    <Button text='< 뒤로 가기' onClick={() => navigate(-1)} />
                }
                rightChild={
                    <Button
                        text='수정하기'
                        onClick={() => navigate(`/edit/${params.diaryId}`)}
                    />
                }
            />

            <Viewer diary={currentDiary} />
        </div>
    );
}
