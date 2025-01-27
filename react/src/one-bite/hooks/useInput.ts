import { ChangeEvent, useState } from 'react';

export default function useInput() {
    const [input, setInput] = useState<string>('');

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return {
        input,
        onChange,
    };
}
