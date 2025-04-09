import Button from 'one-bite/components/common/Button';
import Header from 'one-bite/components/common/Header';
import DiaryList from 'one-bite/components/diary/DiaryList';

export default function Home() {
    return (
        <div>
            <Header
                title='2024년 2월'
                leftChild={<Button text='<' onClick={() => {}} type='DEFAULT' />}
                rightChild={<Button text='>' onClick={() => {}} type='DEFAULT' />}
            />

            <DiaryList />
        </div>
    );
}
