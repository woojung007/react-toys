import Button from 'one-bite/components/diary/Button';
import Header from 'one-bite/components/diary/Header';
import Editor from 'pages/diary/Editor';

export default function New() {
    return (
        <div>
            <Header
                title='새 일기 쓰기'
                leftChild={
                    <Button
                        text='< 뒤로 가기'
                        onClick={() => {}}
                        type='DEFAULT'
                    />
                }
            />
            <Editor />
        </div>
    );
}
