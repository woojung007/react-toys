import Diary from 'pages/Diary';
import Home from 'pages/Home';
import New from 'pages/New';
import Notfound from 'pages/Notfound';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import emotion1 from 'assets/emotions/emotion1.png';
import emotion2 from 'assets/emotions/emotion2.png';
import emotion3 from 'assets/emotions/emotion3.png';
import emotion4 from 'assets/emotions/emotion4.png';
import emotion5 from 'assets/emotions/emotion5.png';

const App = () => {
    const navigate = useNavigate();

    const onClickButton = () => {
        navigate('/new');
    };

    return (
        <>
            <div>
                <img src={emotion1} alt='emotion1' />
                <img src={emotion2} alt='emotion2' />
                <img src={emotion3} alt='emotion3' />
                <img src={emotion4} alt='emotion4' />
                <img src={emotion5} alt='emotion5' />
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
        </>
    );
};

export default App;
