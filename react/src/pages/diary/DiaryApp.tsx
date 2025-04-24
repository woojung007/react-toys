import Diary from 'pages/diary/Diary';
import Edit from 'pages/diary/Edit';
import Home from 'pages/diary/Home';
import New from 'pages/diary/New';
import Notfound from 'pages/diary/Notfound';
import { createContext, useEffect, useReducer, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './DiaryApp.module.scss';

export type DiaryData = {
    id: number;
    createdDate?: number;
    emotionId?: number;
    content?: string;
};

type DiaryReducerActionType = 'INIT' | 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';

type DiaryReducerAction = {
    type: DiaryReducerActionType;
    data: any;
};

function reducer(state: DiaryData[], action: DiaryReducerAction) {
    let nextState;
    switch (action.type) {
        case 'INIT':
            return action.data;
        case 'CREATE':
            nextState = [action.data, ...state];
            break;
        case 'UPDATE':
            nextState = state.map((item) =>
                String(item.id) === String(action.data.id) ? action.data : item,
            );
            break;
        case 'DELETE':
            nextState = state.filter(
                (item) => String(item.id) !== String(action.data.id),
            );
            break;
        default:
            nextState = state;
            break;
    }

    if (!nextState) return null;
    localStorage.setItem('diary', JSON.stringify(nextState));
    return nextState;
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
    const [isLoading, setIsLoading] = useState(true);
    const [data, dispatch] = useReducer(reducer, []);
    const idRef = useRef<number>(0);

    useEffect(() => {
        const storedData = localStorage.getItem('diary');
        if (!storedData) {
            setIsLoading(false);
            return;
        }
        const parsedData = JSON.parse(storedData);
        if (!Array.isArray(parsedData)) {
            setIsLoading(false);
            return;
        }

        let maxId = 0;
        parsedData.forEach((item: DiaryData) => {
            if (Number(item.id) > maxId) {
                maxId = Number(item.id);
            }
        });

        idRef.current = maxId + 1;

        dispatch({
            type: 'INIT',
            data: parsedData,
        });

        setIsLoading(false);
    }, []);

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

    if (isLoading) {
        return <div>데이터 로딩중입니다...</div>;
    }

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
