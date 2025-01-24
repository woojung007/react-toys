import { ChangeEvent, useState } from 'react';

export default function Register() {
    const [input, setInput] = useState({
        name: '',
        birth: '',
        country: '',
        bio: '',
    });

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <div>
            <input onChange={onChange} name='name' type='text' value={input.name} placeholder='이름' />
            <input onChange={onChange} name='birth' value={input.birth} type='date' />
            <select onChange={onChange} name='country' value={input.country}>
                <option value='korea'>한국</option>
                <option value='japan'>일본</option>
                <option value='china'>중국</option>
            </select>
            <textarea onChange={onChange} name='bio' value={input.bio} />
        </div>
    );
}
