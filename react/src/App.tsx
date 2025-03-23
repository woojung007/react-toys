import Diary from 'pages/Diary';
import Home from 'pages/Home';
import New from 'pages/New';
import Notfound from 'pages/Notfound';
import { Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<New />} />
            <Route path='/diary' element={<Diary />} />
            <Route path='/*' element={<Notfound />} />
        </Routes>
    );
};

export default App;
