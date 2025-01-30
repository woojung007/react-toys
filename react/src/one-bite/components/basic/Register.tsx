import { ChangeEvent, useRef, useState } from 'react';

export default function Register() {
    const [input, setInput] = useState({
        name: '',
        birth: '',
        country: '',
        bio: '',
    });
    const countRef = useRef(0);
    const registerRef = useRef(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        registerRef.current++;
        console.log('registerRef.current:', registerRef.current);
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = () => {
        if (!input.name) {
            // 이름을 입력하는 DOM 요소 포커스
            inputRef.current?.focus();
        }
    };
    return (
        <div>
            <button
                onClick={() => {
                    countRef.current++;
                    console.log('countRef.current:', countRef.current);
                }}
            >
                ref+1
            </button>

            <div>
                <input
                    ref={inputRef}
                    onChange={onChange}
                    name='name'
                    type='text'
                    value={input.name}
                    placeholder='이름'
                />
                <input onChange={onChange} name='birth' value={input.birth} type='date' />
                <select onChange={onChange} name='country' value={input.country}>
                    <option value='korea'>한국</option>
                    <option value='japan'>일본</option>
                    <option value='china'>중국</option>
                </select>
                <textarea onChange={onChange} name='bio' value={input.bio} />
            </div>

            <button onClick={onSubmit}>제출</button>
        </div>
    );
}
