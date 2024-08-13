import { useId, useState, memo } from 'react';
import { twMerge, twJoin } from 'tailwind-merge';
import { TickIcon } from './TickIcon';

export default function PasswordInput({
    label,
    field,
    placeholder,
    className,
    value,
    onChange,
    isValid
}) {
    const id = useId();
    const [isMasked, setIsMasked] = useState(true);
    const toggleMaskPassword = () => setIsMasked(state => !state);

    const Icon = memo(({ isActive }) => {
        const commonClasses = 'cursor-pointer text-neutral-400';
        return isActive ? <i className={twJoin(commonClasses, 'ri-eye-close-line')}></i> : <i className={twJoin(commonClasses, 'ri-eye-line')}></i>
    });

    return (
        <div className='flex flex-col gap-1'>
            <label className="text-sm" htmlFor={id}>{label}</label>
            <div className='relative'>
                <input className={twMerge('w-full p-2 border rounded-md text-sm', className)} type={isMasked ? 'password' : 'text'} name={field} id={id} placeholder={placeholder} value={value} onChange={onChange} />
                <div className='absolute top-2 right-2' onClick={toggleMaskPassword} >
                    <div className='flex gap-2 items-center'>
                        {isValid && <TickIcon isActive={isValid} />}
                        {<Icon isActive={isMasked} />}
                    </div>
                </div>
            </div>
        </div>
    )
}