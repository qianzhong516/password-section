import { memo } from 'react';
import { twJoin } from 'tailwind-merge';

export const TickIcon = memo(({ isActive }) => {
    const commonClasses = 'flex items-center justify-center rounded-full w-5 h-5';
    const classes = isActive ? twJoin(commonClasses, 'bg-green-700') : twJoin(commonClasses, 'bg-neutral-400');
    return <div className={classes}><i className="ri-check-line text-white" /></div>;
});