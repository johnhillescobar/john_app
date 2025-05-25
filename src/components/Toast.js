'use client';

import { useEffect, useId } from 'react';
import Transition from './common/Transition';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
    const toastId = useId();

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const variants = {
        success: {
            containerClass: 'bg-green-50 border-green-400',
            iconClass: 'text-green-400',
            textClass: 'text-green-800',
            role: 'status'
        },
        error: {
            containerClass: 'bg-red-50 border-red-400',
            iconClass: 'text-red-400',
            textClass: 'text-red-800',
            role: 'alert'
        },
        warning: {
            containerClass: 'bg-yellow-50 border-yellow-400',
            iconClass: 'text-yellow-400',
            textClass: 'text-yellow-800',
            role: 'alert'
        },
        info: {
            containerClass: 'bg-blue-50 border-blue-400',
            iconClass: 'text-blue-400',
            textClass: 'text-blue-800',
            role: 'status'
        }
    };

    const { containerClass, iconClass, textClass, role } = variants[type] || variants.info;

    return (
        <Transition
            show={true}
            enter="transform transition ease-out duration-300"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div
                id={toastId}
                role={role}
                aria-live="polite"
                className={`min-w-[350px] max-w-md w-full shadow-lg rounded-lg pointer-events-auto border ${containerClass}`}
            >
                <div className="p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            {type === 'success' && (
                                <svg className={`h-6 w-6 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            {type === 'error' && (
                                <svg className={`h-6 w-6 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            {type === 'warning' && (
                                <svg className={`h-6 w-6 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            )}
                            {type === 'info' && (
                                <svg className={`h-6 w-6 ${iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                            <p className={`text-sm font-medium ${textClass} truncate`}>
                                {message}
                            </p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">
                            <button
                                type="button"
                                className={`rounded-md inline-flex ${textClass} hover:${textClass} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                                onClick={onClose}
                                aria-label="Close notification"
                            >
                                <span className="sr-only">Close</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
} 