import usePageTitle from 'hooks/usePageTitle';
import Button from 'one-bite/components/diary/Button';
import Header from 'one-bite/components/diary/Header';
import { DiaryDispatchContext } from 'pages/diary/DiaryApp';
import Editor, { EditorInput } from 'pages/diary/Editor';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function New() {
    const navigate = useNavigate();

    const dispatchContext = useContext(DiaryDispatchContext);
    usePageTitle('새 일기 쓰기');

    const onSubmit = (input: EditorInput) => {
        dispatchContext?.onCreate(
            input.createdDate.getTime(),
            Number(input.emotionId),
            input.content,
        );
        navigate('/', {
            replace: true, // 뒤로 가기 방지
        });
    };

    return (
        <div>
            <Header
                title='새 일기 쓰기'
                leftChild={
                    <Button
                        text='< 뒤로 가기'
                        onClick={() => navigate(-1)}
                        type='DEFAULT'
                    />
                }
            />
            <Editor onSubmit={onSubmit} />
        </div>
    );
}
