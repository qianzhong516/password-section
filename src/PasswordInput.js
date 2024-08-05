import { useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function PasswordInput({
    label,
    field,
    placeholder,
    className
}) {
    const id = useId();
    const [isMasked, setIsMasked] = useState(true);
    const toggleMaskPassword = () => setIsMasked(state => !state);

    return (
        <div className='flex flex-col gap-1'>
            <label className="text-sm" htmlFor={id}>{label}</label>
            <div className='relative'>
                <input className={twMerge('w-full p-2 border rounded-md text-sm', className)} type={isMasked ? 'password' : 'text'} name={field} id={id} placeholder={placeholder} />
                <span className='absolute top-2 right-2' onClick={toggleMaskPassword} >{isMasked ? 'Show' : 'Hide'}</span>
            </div>
        </div>
    )
}