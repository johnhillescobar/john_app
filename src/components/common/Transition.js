'use client';

import { useEffect, useState } from 'react';

export default function Transition({
    show,
    enter = 'transition-all ease-in-out duration-300',
    enterFrom = 'opacity-0',
    enterTo = 'opacity-100',
    leave = 'transition-all ease-in-out duration-300',
    leaveFrom = 'opacity-100',
    leaveTo = 'opacity-0',
    children
}) {
    const [shouldRender, setShouldRender] = useState(show);
    const [classes, setClasses] = useState(show ? `${enter} ${enterTo}` : `${leave} ${leaveTo}`);

    useEffect(() => {
        if (show) {
            setShouldRender(true);
            // Enter animation
            const enterTimer = setTimeout(() => {
                setClasses(`${enter} ${enterTo}`);
            }, 10); // Small delay to ensure enterFrom is applied
            return () => clearTimeout(enterTimer);
        } else {
            // Leave animation
            setClasses(`${leave} ${leaveTo}`);
            const leaveTimer = setTimeout(() => {
                setShouldRender(false);
            }, 300); // Match the duration in your CSS classes
            return () => clearTimeout(leaveTimer);
        }
    }, [show, enter, enterFrom, enterTo, leave, leaveFrom, leaveTo]);

    if (!shouldRender) return null;

    return (
        <div className={classes}>
            {children}
        </div>
    );
} 