import { useReducer } from 'react';

type Action = {
    type: 'INCREASE' | 'DECREASE';
    data: number;
};

// reducer : 변환기
// -> 상태를 실제로 변화시키는 변환기 역할
function reducer(state: number, action: Action) {
    switch (action.type) {
        case 'INCREASE':
            return state + action.data;
        case 'DECREASE':
            return state - action.data;
        default:
            return state;
    }
}

export default function ReducerExam() {
    // dispatch : 발송하다, 급송하다
    // -> 상태 변화가 있어야 한다는 사실을 알리는, 발송하는 함수
    const [state, dispatch] = useReducer(reducer, 0);

    const onClickPlus = () => {
        // 인수 : 상태가 어떻게 변화되길 원하는지
        // -> 액션 객체
        dispatch({
            type: 'INCREASE',
            data: 1,
        });
    };

    const onClickMinus = () => {
        // 인수 : 상태가 어떻게 변화되길 원하는지
        // -> 액션 객체
        dispatch({
            type: 'DECREASE',
            data: 1,
        });
    };

    return (
        <div>
            <h1>{state}</h1>
            <button onClick={onClickMinus}>-</button>
            <button onClick={onClickPlus}>+</button>
        </div>
    );
}
