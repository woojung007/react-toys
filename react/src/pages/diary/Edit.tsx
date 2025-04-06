import { useParams } from 'react-router-dom';

export default function Edit() {
    const params = useParams();

    return (
        <div>
            <div>{params.diaryId}번 일기입니다</div>
        </div>
    );
}
