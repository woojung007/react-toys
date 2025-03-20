import { TodoObject } from 'one-bite/components/todo/Todo.type';
import TodoEditor from 'one-bite/components/todo/TodoEditor';
import TodoHeader from 'one-bite/components/todo/TodoHeader';
import TodoList from 'one-bite/components/todo/TodoList';
import { useCallback, useReducer, useRef, createContext } from 'react';
import { changeLanguage } from 'utils/language';
import styles from './Todo.module.scss';

const mockData: TodoObject[] = [
    {
        id: 0,
        isDone: false,
        content: 'React 공부하기',
        date: new Date().getTime(),
    },
    {
        id: 1,
        isDone: false,
        content: '빨래하기',
        date: new Date().getTime(),
    },
    {
        id: 2,
        isDone: false,
        content: '노래 연습하기',
        date: new Date().getTime(),
    },
];

type TodoAction = 'CREATE' | 'UPDATE' | 'DELETE';

function reducer(state: TodoObject[], action: { type: TodoAction; data?: TodoObject; targetId?: number }) {
    switch (action.type) {
        case 'CREATE':
            if (!action.data) return state;
            return [action.data, ...state];
        case 'UPDATE':
            return state.map((item) => (item.id === action.targetId ? { ...item, isDone: !item.isDone } : item));
        case 'DELETE':
            return state.filter((item) => item.id !== action.targetId);
        default:
            return state;
    }
}

type TodoContextType = {
    todos: TodoObject[];
    onCreate: (content: string) => void;
    onUpdate: (targetId: number) => void;
    onDelete: (targetId: number) => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export default function Todo() {
    // const [todos, setTodos] = useState<TodoObject[]>(mockData);
    const [todos, dispatch] = useReducer(reducer, mockData);
    const idRef = useRef(3);

    const onCreate = useCallback((content: string) => {
        // const newTodo = {
        //     id: idRef.current++,
        //     isDone: false,
        //     content,
        //     date: new Date().getTime(),
        // };
        // setTodos((prev) => [newTodo, ...prev]);
        dispatch({
            type: 'CREATE',
            data: {
                id: idRef.current++,
                isDone: false,
                content: content,
                date: new Date().getTime(),
            },
        });
    }, []);

    const onUpdate = useCallback((targetId: number) => {
        // setTodos((prev) =>
        //     prev.map(
        //         (todo) => (todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo),
        //     ),
        // );
        dispatch({
            type: 'UPDATE',
            targetId: targetId,
        });
    }, []);

    const onDelete = useCallback((targetId: number) => {
        // setTodos((prev) => prev.filter((todo) => todo.id !== targetId));
        dispatch({
            type: 'DELETE',
            targetId: targetId,
        });
    }, []);

    return (
        <div className={styles.todo_app}>
            <div>
                <button onClick={() => changeLanguage('ko')}>한국어</button>
                <button onClick={() => changeLanguage('en')}>영어</button>
            </div>
            <TodoHeader />
            <TodoContext.Provider
                value={{
                    todos,
                    onCreate,
                    onUpdate,
                    onDelete,
                }}
            >
                <TodoEditor />
                <TodoList />
            </TodoContext.Provider>

            {/* <ReducerExam /> */}
        </div>
    );
}
