'use client';

import { useState, useEffect } from 'react';
import { createApiKey } from '@/services/apiKeyService';
import useKeyboardShortcut from '@/hooks/useKeyboardShortcut';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function CreateKeyModal({ onClose, onKeyCreated, onCopy, createdKey }) {
    const [newKeyName, setNewKeyName] = useState('');
    const [newKeyType, setNewKeyType] = useState('dev');
    const [newKeyLimit, setNewKeyLimit] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState(null);

    // Handle escape key to close modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // Handle enter key to submit when ready
    useEffect(() => {
        const handleEnter = (e) => {
            if (e.ctrlKey && e.key === 'Enter' && newKeyName.trim() && !isCreating && !createdKey) {
                handleCreateKey();
            }
        };
        window.addEventListener('keydown', handleEnter);
        return () => window.removeEventListener('keydown', handleEnter);
    }, [newKeyName, isCreating, createdKey]);

    const handleCreateKey = async () => {
        if (!newKeyName.trim()) {
            setError('Key name is required');
            return;
        }

        try {
            setIsCreating(true);
            setError(null);
            const newKey = await createApiKey(newKeyName, newKeyType);
            onKeyCreated(newKey);
        } catch (error) {
            console.error('Error creating key:', error);
            setError('Failed to create API key. Please try again.');
        } finally {
            setIsCreating(false);
        }
    };

    const handleCopyAndClose = () => {
        if (createdKey?.key) {
            onCopy(createdKey.key);
            onClose();
        }
    };

    // Handle copy shortcut
    useEffect(() => {
        const handleCopy = (e) => {
            if (e.ctrlKey && e.key === 'c' && createdKey?.key) {
                handleCopyAndClose();
            }
        };
        window.addEventListener('keydown', handleCopy);
        return () => window.removeEventListener('keydown', handleCopy);
    }, [createdKey]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                {!createdKey ? (
                    <>
                        <h3 className="text-xl font-medium text-gray-900 mb-4">
                            Create a new API key
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Enter a name and limit for the new API key.
                            Press <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl + Enter</kbd> to create.
                        </p>

                        {error && (
                            <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div>
                                <label htmlFor="key-name" className="block text-sm font-medium text-gray-700">
                                    Key Name
                                </label>
                                <input
                                    type="text"
                                    id="key-name"
                                    value={newKeyName}
                                    onChange={(e) => setNewKeyName(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-12 text-gray-900"
                                    placeholder="Enter key name"
                                    disabled={isCreating}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Key Type</label>
                                <div className="mt-2 space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            id="key-type-prod"
                                            type="radio"
                                            name="key-type"
                                            value="prod"
                                            checked={newKeyType === 'prod'}
                                            onChange={() => setNewKeyType('prod')}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            disabled={isCreating}
                                        />
                                        <label htmlFor="key-type-prod" className="ml-3">
                                            <span className="block text-sm font-medium text-gray-700">Production</span>
                                            <span className="block text-sm text-gray-500">For use in production environment</span>
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="key-type-dev"
                                            type="radio"
                                            name="key-type"
                                            value="dev"
                                            checked={newKeyType === 'dev'}
                                            onChange={() => setNewKeyType('dev')}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            disabled={isCreating}
                                        />
                                        <label htmlFor="key-type-dev" className="ml-3">
                                            <span className="block text-sm font-medium text-gray-700">Development</span>
                                            <span className="block text-sm text-gray-500">For testing and development</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center">
                                    <input
                                        id="limit-toggle"
                                        type="checkbox"
                                        checked={newKeyLimit !== null}
                                        onChange={(e) => setNewKeyLimit(e.target.checked ? 1000 : null)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        disabled={isCreating}
                                    />
                                    <label htmlFor="limit-toggle" className="ml-2 block text-sm text-gray-900">
                                        Set monthly usage limit
                                    </label>
                                </div>
                                {newKeyLimit !== null && (
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            value={newKeyLimit}
                                            onChange={(e) => setNewKeyLimit(parseInt(e.target.value) || 0)}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-12 text-gray-900"
                                            placeholder="Enter limit"
                                            disabled={isCreating}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                disabled={isCreating}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleCreateKey}
                                disabled={isCreating || !newKeyName.trim()}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isCreating ? (
                                    <>
                                        <LoadingSpinner size="sm" className="mr-2" />
                                        Creating...
                                    </>
                                ) : (
                                    'Create Key'
                                )}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            API Key Created Successfully
                        </h3>
                        <div className="rounded-md bg-yellow-50 p-4 mb-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.485 2.495c.873-1.562 3.157-1.562 4.03 0l6.28 11.22c.878 1.568-.075 3.537-1.904 3.537H4.11c-1.829 0-2.782-1.969-1.904-3.537l6.28-11.22zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-yellow-800">
                                        Copy your API key now
                                    </h3>
                                    <div className="mt-2 text-sm text-yellow-700">
                                        <p>
                                            Press <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl + C</kbd> to copy and close
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-3 rounded-md font-mono text-sm mb-4 break-all text-gray-900">
                            {createdKey.key}
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                onClick={handleCopyAndClose}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Copy and Close
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
} 