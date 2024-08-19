export const Button = ({ onClick, children, disabled }) =>
    <button
        className='bg-indigo-700 text-sm text-white rounded-md self-end py-2 px-4 disabled:bg-neutral-100 disabled:text-neutral-500'
        onClick={onClick}
        disabled={disabled}
    >{children}</button>;