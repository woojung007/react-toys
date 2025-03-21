export default function CounterController({ onClickButton }: { onClickButton: (value: number) => void }) {
    return (
        <div>
            <button onClick={() => onClickButton(-1)}>-1</button>
            <button onClick={() => onClickButton(-10)}>-10</button>
            <button onClick={() => onClickButton(-100)}>-100</button>
            <button onClick={() => onClickButton(+100)}>+100</button>
            <button onClick={() => onClickButton(+10)}>+10</button>
            <button onClick={() => onClickButton(+1)}>+1</button>
        </div>
    );
}
