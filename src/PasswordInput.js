import { useId, useState, memo, forwardRef, useImperativeHandle, useRef } from 'react';
import { twMerge, twJoin } from 'tailwind-merge';
import { TickIcon } from './TickIcon';

const PasswordInput = forwardRef(({
    label,
    field,
    placeholder,
    className,
    value,
    onChange,
    isValid,
    required,
    ...props
}, ref) => {
    const id = useId();
    const [isMasked, setIsMasked] = useState(true);
    const [isErrored, setIsErrored] = useState(false);
    const toggleMaskPassword = () => setIsMasked(state => !state);
    const inputRef = useRef(null);

    const Icon = memo(({ isActive }) => {
        const commonClasses = 'cursor-pointer text-neutral-400';
        return isActive ? <i className={twJoin(commonClasses, 'ri-eye-close-line')}></i> : <i className={twJoin(commonClasses, 'ri-eye-line')}></i>
    });

    const handleOnBlur = () => setIsErrored(false);

    useImperativeHandle(ref, () => {
        return {
            focusOnError: () => {
                setIsErrored(true);
                inputRef.current.focus();
            }
        }
    }, []);

    return (
        <div className='flex flex-col gap-1'>
            <label className="text-sm" htmlFor={id}>{label}</label>
            <div className='relative'>
                <input
                    className={twMerge('w-full p-2 border rounded-md text-sm bg-neutral-100 placeholder:text-neutral-500', isErrored && 'focus:outline-red-400', className)}
                    type={isMasked ? 'password' : 'text'}
                    name={field}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    ref={inputRef}
                    onBlur={handleOnBlur}
                    {...props}
                />
                <div className='absolute top-2 right-2' onClick={toggleMaskPassword} >
                    <div className='flex gap-2 items-center'>
                        {isValid && <TickIcon isActive={isValid} />}
                        {<Icon isActive={isMasked} />}
                    </div>
                </div>
            </div>
        </div>
    )
})

export default PasswordInput;