import Diary from 'pages/diary/Diary';
import Home from 'pages/diary/Home';
import New from 'pages/diary/New';
import Notfound from 'pages/diary/Notfound';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { getEmotionImage } from 'utils/get-emotion-image';
import styles from './DiaryApp.module.scss';

export default function DiaryApp() {
    const navigate = useNavigate();

    const onClickButton = () => {
        navigate('/new');
    };

    return (
        <div className={styles.diary__app}>
            <div className={styles.diary__root}>
                <div>
                    <img src={getEmotionImage(1)} alt='emotion1' />
                    <img src={getEmotionImage(2)} alt='emotion2' />
                    <img src={getEmotionImage(3)} alt='emotion3' />
                    <img src={getEmotionImage(4)} alt='emotion4' />
                    <img src={getEmotionImage(5)} alt='emotion5' />
                </div>
                <div>
                    <Link to={'/'}>Home</Link>
                    <Link to={'/new'}>New</Link>
                    <Link to={'/diary'}>Diary</Link>
                </div>

                <button onClick={onClickButton}>New 페이지로 이동</button>

                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/new' element={<New />} />
                    <Route path='/diary/:diaryId' element={<Diary />} />
                    <Route path='/*' element={<Notfound />} />
                </Routes>
            </div>
        </div>
    );
}
