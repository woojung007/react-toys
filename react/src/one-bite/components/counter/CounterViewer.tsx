export default function CounterViewer({ count }: { count: number }) {
    return (
        <div>
            <div>현재 카운트 : </div>
            <h1>{count}</h1>
        </div>
    );
}
