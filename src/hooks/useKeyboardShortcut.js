'use client';

import { useEffect, useCallback } from 'react';

export default function useKeyboardShortcut(key, callback, modifiers = []) {
    const handleKeyPress = useCallback((event) => {
        const modifiersPressed = modifiers.every(modifier => {
            if (modifier === 'ctrl') return event.ctrlKey;
            if (modifier === 'shift') return event.shiftKey;
            if (modifier === 'alt') return event.altKey;
            if (modifier === 'meta') return event.metaKey;
            return false;
        });

        if (event.key.toLowerCase() === key.toLowerCase() && modifiersPressed) {
            event.preventDefault();
            callback();
        }
    }, [key, callback, modifiers]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);
} 