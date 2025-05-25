'use client';

import { useEffect } from 'react';

export default function useKeyboardShortcut(key, callback, modifiers = []) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            const keyMatches = event.key.toLowerCase() === key.toLowerCase();
            const modifiersMatch = modifiers.every(modifier => {
                switch (modifier) {
                    case 'ctrl':
                        return event.ctrlKey;
                    case 'shift':
                        return event.shiftKey;
                    case 'alt':
                        return event.altKey;
                    case 'meta':
                        return event.metaKey;
                    default:
                        return false;
                }
            });

            if (keyMatches && modifiersMatch) {
                event.preventDefault();
                callback();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [key, callback, JSON.stringify(modifiers)]);
} 