import Button from 'one-bite/components/common/Button';
import Header from 'one-bite/components/common/Header';
import Diary from 'pages/diary/Diary';
import Edit from 'pages/diary/Edit';
import Home from 'pages/diary/Home';
import New from 'pages/diary/New';
import Notfound from 'pages/diary/Notfound';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { getEmotionImage } from 'utils/get-emotion-image';
import styles from './DiaryApp.module.scss';
import { createContext, useReducer, useRef } from 'react';

type DiaryData = {
    id: number;
    createdDate?: number;
    emotionId?: number;
    content?: string;
};

const mockData: DiaryData[] = [
    {
        id: 1,
        createdDate: new Date().getTime(),
        emotionId: 1,
        content: '1번 일기 내용',
    },
    {
        id: 2,
        createdDate: new Date().getTime(),
        emotionId: 2,
        content: '2번 일기 내용',
    },
];

type DiaryReducerActionType = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';

type DiaryReducerAction = {
    type: DiaryReducerActionType;
    data: DiaryData;
};

function reducer(state: DiaryData[], action: DiaryReducerAction) {
    switch (action.type) {
        case 'CREATE':
            return [action.data, ...state];
        case 'UPDATE':
            return state.map((item) => (String(item.id) === String(action.data.id) ? action.data : item));
        case 'DELETE':
            return state.filter((item) => String(item.id) !== String(action.data.id));
        default:
            return state;
    }
}

const DiaryStateContext = createContext(mockData);
const DiaryDispatchContext = createContext({});

export default function DiaryApp() {
    const [data, dispatch] = useReducer(reducer, mockData);

    const idRef = useRef<number>(3);

    const navigate = useNavigate();

    const onClickNewButton = () => {
        navigate('/new');
    };

    const onClickButton = () => {
        console.log('123 버튼 클릭');
    };

    // 새로운 일기 추가
    const onCreate = (createdDate: number, emotionId: number, content: string) => {
        dispatch({
            type: 'CREATE',
            data: {
                id: idRef.current++,
                createdDate,
                emotionId,
                content,
            },
        });
    };

    // 기존 일기 수정
    const onUpdate = (id: number, createdDate: number, emotionId: number, content: string) => {
        dispatch({
            type: 'UPDATE',
            data: {
                id,
                createdDate,
                emotionId,
                content,
            },
        });
    };

    // 기존 일기 삭제
    const onDelete = (id: number) => {
        dispatch({
            type: 'DELETE',
            data: {
                id,
            },
        });
    };

    return (
        <div className={styles.diary__app}>
            <div className={styles.diary__root}>
                <DiaryStateContext.Provider value={data}>
                    <DiaryDispatchContext.Provider
                        value={{
                            onCreate,
                            onUpdate,
                            onDelete,
                        }}
                    >
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/new' element={<New />} />
                            <Route path='/diary/:diaryId' element={<Diary />} />
                            <Route path='/edit/:diaryId' element={<Edit />} />
                            <Route path='/*' element={<Notfound />} />
                        </Routes>
                    </DiaryDispatchContext.Provider>
                </DiaryStateContext.Provider>
            </div>
        </div>
    );
}
