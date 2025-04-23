import useDiary from 'hooks/useDiary';
import Button from 'one-bite/components/diary/Button';
import Header from 'one-bite/components/diary/Header';
import { DiaryDispatchContext } from 'pages/diary/DiaryApp';
import Editor, { EditorInput } from 'pages/diary/Editor';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Edit() {
    const params = useParams();
    const navigate = useNavigate();

    const dispatchContext = useContext(DiaryDispatchContext);

    const currentDiaryItem = useDiary(params?.diaryId || '');

    const onClickDelete = () => {
        if (window.confirm('일기를 정말 삭제할까요? 다시 복구되지 않아요!')) {
            // 일기 삭제 로직
            dispatchContext?.onDelete(Number(params.diaryId));
            navigate('/', { replace: true });
        }
    };

    const onSubmit = (input: EditorInput) => {
        if (!params) return;
        if (window.confirm('일기를 정말 수정할까요?')) {
            dispatchContext?.onUpdate(
                Number(params.diaryId),
                input.createdDate.getTime(),
                Number(input.emotionId),
                input.content,
            );
            navigate('/', { replace: true });
        }
    };

    return (
        <div>
            <Header
                title='일기 수정하기'
                leftChild={
                    <Button text='< 뒤로 가기' onClick={() => navigate(-1)} />
                }
                rightChild={
                    <Button
                        text='삭제하기'
                        onClick={onClickDelete}
                        type='NEGATIVE'
                    />
                }
            />

            <Editor onSubmit={onSubmit} initData={currentDiaryItem} />
        </div>
    );
}
