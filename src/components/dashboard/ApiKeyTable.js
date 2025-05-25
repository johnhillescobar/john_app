'use client';

import { useState } from 'react';
import { updateApiKey, deleteApiKey } from '@/services/apiKeyService';

export default function ApiKeyTable({ apiKeys, onUpdate, onDelete, onCopy, visibleKeys, onToggleVisibility }) {
    const [editingKey, setEditingKey] = useState(null);
    const [copiedKey, setCopiedKey] = useState(null);

    const handleUpdateKey = async (id, newName) => {
        try {
            await updateApiKey(id, newName);
            onUpdate();
            setEditingKey(null);
        } catch (error) {
            console.error('Error updating key:', error);
        }
    };

    const handleDeleteKey = async (id) => {
        if (window.confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
            try {
                await deleteApiKey(id);
                onDelete();
            } catch (error) {
                console.error('Error deleting key:', error);
            }
        }
    };

    const handleCopyKey = (key, keyId) => {
        onCopy(key);
        setCopiedKey(keyId);
        setTimeout(() => setCopiedKey(null), 2000);
    };

    return (
        <div className="bg-white shadow border border-gray-200 rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Usage
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Key
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Options
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {apiKeys.length > 0 ? (
                        apiKeys.map(key => (
                            <tr key={key.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {editingKey === key.id ? (
                                        <input
                                            type="text"
                                            defaultValue={key.name}
                                            onBlur={(e) => handleUpdateKey(key.id, e.target.value)}
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
                                            autoFocus
                                        />
                                    ) : (
                                        <div className="text-sm font-medium text-gray-900">
                                            {key.name}
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                        {key.type || (key.key.startsWith('tvly-live') ? 'prod' : 'dev')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-16 bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{ width: `${key.usage || 0}%` }}
                                            ></div>
                                        </div>
                                        <span className="ml-2 text-xs text-gray-600">{key.usage || 0}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="text-sm font-mono text-black">
                                            {visibleKeys[key.id] ? key.key : key.key.replace(/^[^-]+-/, '').slice(0, 4) + '•••••••••••••••••••••••••••'}
                                        </div>
                                        <button
                                            onClick={() => onToggleVisibility(key.id)}
                                            className="ml-2 p-1 rounded-md hover:bg-gray-100"
                                            title={visibleKeys[key.id] ? "Hide API key" : "Show API key"}
                                        >
                                            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d={visibleKeys[key.id]
                                                        ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                                        : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    }
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => handleCopyKey(key.key, key.id)}
                                            className={`text-gray-600 hover:text-gray-900 p-1.5 rounded-md transition-colors duration-200 ${copiedKey === key.id ? 'bg-green-100 text-green-800' : 'hover:bg-gray-100'}`}
                                            title="Copy to clipboard"
                                        >
                                            {copiedKey === key.id ? (
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2v8z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16V4c0-1.1.9-2 2-2h8" />
                                                </svg>
                                            )}
                                        </button>
                                        <button
                                            onClick={() => setEditingKey(key.id)}
                                            className="text-gray-600 hover:text-gray-900"
                                            title="Edit"
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteKey(key.id)}
                                            className="text-gray-600 hover:text-gray-900"
                                            title="Delete"
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="px-6 py-10 text-center">
                                <div className="text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    <h3 className="mt-2 text-base font-medium text-gray-900">No API keys</h3>
                                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new API key.</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
} 