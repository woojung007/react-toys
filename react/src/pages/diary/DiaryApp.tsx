import Diary from 'pages/diary/Diary';
import Edit from 'pages/diary/Edit';
import Home from 'pages/diary/Home';
import New from 'pages/diary/New';
import Notfound from 'pages/diary/Notfound';
import { createContext, useReducer, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './DiaryApp.module.scss';

export type DiaryData = {
    id: number;
    createdDate?: number;
    emotionId?: number;
    content?: string;
};

const mockData: DiaryData[] = [
    {
        id: 1,
        createdDate: new Date('2025-04-13').getTime(),
        emotionId: 1,
        content: '1번 일기 내용',
    },
    {
        id: 2,
        createdDate: new Date('2025-04-12').getTime(),
        emotionId: 2,
        content: '2번 일기 내용',
    },
    {
        id: 3,
        createdDate: new Date('2025-02-14').getTime(),
        emotionId: 3,
        content: '3번 일기 내용',
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
            return state.map((item) =>
                String(item.id) === String(action.data.id) ? action.data : item,
            );
        case 'DELETE':
            return state.filter(
                (item) => String(item.id) !== String(action.data.id),
            );
        default:
            return state;
    }
}

type DiaryDispatchContextType = {
    onCreate: (createdDate: number, emotionId: number, content: string) => void;
    onUpdate: (
        id: number,
        createdDate: number,
        emotionId: number,
        content: string,
    ) => void;
    onDelete: (id: number) => void;
};

export const DiaryStateContext = createContext<DiaryData[]>([]);
export const DiaryDispatchContext = createContext<
    DiaryDispatchContextType | undefined
>(undefined);

export default function DiaryApp() {
    const [data, dispatch] = useReducer(reducer, mockData);

    const idRef = useRef<number>(3);

    // 새로운 일기 추가
    const onCreate = (
        createdDate: number,
        emotionId: number,
        content: string,
    ) => {
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
    const onUpdate = (
        id: number,
        createdDate: number,
        emotionId: number,
        content: string,
    ) => {
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
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider
                value={{
                    onCreate,
                    onUpdate,
                    onDelete,
                }}
            >
                <div className={styles.diary__app}>
                    <div className={styles.diary__root}>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/new' element={<New />} />
                            <Route path='/diary/:diaryId' element={<Diary />} />
                            <Route path='/edit/:diaryId' element={<Edit />} />
                            <Route path='/*' element={<Notfound />} />
                        </Routes>
                    </div>
                </div>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
}
