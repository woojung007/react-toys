import { useParams } from 'react-router-dom';

export default function Diary() {
    const params = useParams();

    return (
        <div>
            <div>{params.diaryId}번 일기입니다</div>
        </div>
    );
}
