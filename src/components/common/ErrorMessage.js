'use client';

export default function ErrorMessage({ message, variant = 'error' }) {
    const variants = {
        error: {
            containerClass: 'bg-red-50 border-l-4 border-red-400',
            iconClass: 'text-red-400',
            textClass: 'text-red-700'
        },
        warning: {
            containerClass: 'bg-yellow-50 border-l-4 border-yellow-400',
            iconClass: 'text-yellow-400',
            textClass: 'text-yellow-700'
        }
    };

    const { containerClass, iconClass, textClass } = variants[variant];

    return (
        <div className={`p-4 ${containerClass}`}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className={`h-5 w-5 ${iconClass}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className={`text-sm ${textClass}`}>{message}</p>
                </div>
            </div>
        </div>
    );
} 