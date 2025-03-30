import Diary from 'pages/Diary';
import Home from 'pages/Home';
import New from 'pages/New';
import Notfound from 'pages/Notfound';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate();

    const onClickButton = () => {
        navigate('/new');
    };

    return (
        <>
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
