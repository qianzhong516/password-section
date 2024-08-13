export const Button = ({ onClick, children }) =>
    <button className='bg-indigo-700 text-white rounded-md self-end py-2 px-4 ' onClick={onClick} >{children}</button>;