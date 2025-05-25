'use client';

import { useState, useEffect } from 'react';
import Toast from '@/components/Toast';
import PlanOverview from '@/components/dashboard/PlanOverview';
import ApiKeyTable from '@/components/dashboard/ApiKeyTable';
import CreateKeyModal from '@/components/dashboard/CreateKeyModal';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorMessage from '@/components/common/ErrorMessage';
import { fetchApiKeys } from '@/services/apiKeyService';

export default function ApiKeysDashboard() {
    const [apiKeys, setApiKeys] = useState([]);
    const [showNewKey, setShowNewKey] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleKeys, setVisibleKeys] = useState({});
    const [toast, setToast] = useState(null);
    const [newlyCreatedKey, setNewlyCreatedKey] = useState(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const loadApiKeys = async (showLoadingState = true) => {
        try {
            if (showLoadingState) setIsLoading(true);
            const data = await fetchApiKeys();
            setApiKeys(data);
            setError(null);
        } catch (err) {
            console.error('Error loading API keys:', err);
            setError('Failed to load API keys. Please refresh the page or try again later.');
        } finally {
            setIsLoading(false);
            setIsInitialLoad(false);
        }
    };

    // Initial load
    useEffect(() => {
        loadApiKeys();
    }, []);

    // Set up auto-refresh every 30 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            // Don't show loading state for background refreshes
            loadApiKeys(false);
        }, 30000);

        return () => clearInterval(intervalId);
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        // Auto-dismiss toast after 3 seconds
        setTimeout(() => setToast(null), 3000);
    };

    const handleCopyKey = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            showToast('API Key copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
            showToast('Failed to copy API key to clipboard', 'error');
        }
    };

    const handleKeyCreated = (newKey) => {
        setNewlyCreatedKey(newKey);
        loadApiKeys(false); // Refresh the list in the background
        showToast('API Key created successfully');
    };

    const handleModalClose = () => {
        setShowNewKey(false);
        setNewlyCreatedKey(null);
    };

    const toggleKeyVisibility = (keyId) => {
        setVisibleKeys(prev => ({
            ...prev,
            [keyId]: !prev[keyId]
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 px-8 py-6">
            {/* Toast Notifications */}
            {toast && (
                <div className="fixed top-4 right-4 z-50">
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            {/* Breadcrumb and page title */}
            <div className="mb-4">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>Pages</span>
                    <span className="mx-2">/</span>
                    <span>Overview</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
            </div>

            {/* Plan Overview */}
            <PlanOverview />

            {/* API Keys section */}
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">API Keys</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            The key is used to authenticate your requests to the <a href="#" className="text-blue-600 hover:underline">Research API</a>. To learn more, see the <a href="#" className="text-blue-600 hover:underline">documentation</a> page.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowNewKey(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Create New API Key
                    </button>
                </div>
            </div>

            {/* Error message */}
            {error && <ErrorMessage message={error} />}

            {/* Content */}
            <div className="transition-opacity duration-200 ease-in-out">
                {isLoading && isInitialLoad ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <LoadingSpinner size="lg" className="text-blue-600" />
                    </div>
                ) : (
                    <>
                        {/* API Keys Table */}
                        <div className={`transition-opacity duration-200 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
                            <ApiKeyTable
                                apiKeys={apiKeys}
                                onUpdate={loadApiKeys}
                                onDelete={loadApiKeys}
                                onCopy={handleCopyKey}
                                visibleKeys={visibleKeys}
                                onToggleVisibility={toggleKeyVisibility}
                            />
                        </div>

                        {/* Create Key Modal */}
                        {showNewKey && (
                            <CreateKeyModal
                                onClose={handleModalClose}
                                onKeyCreated={handleKeyCreated}
                                onCopy={handleCopyKey}
                                createdKey={newlyCreatedKey}
                            />
                        )}

                        {/* Expert section */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-700">MyApp Expert</h2>
                                <div className="text-xs text-gray-500">Powered by <span className="font-semibold">Tadata</span></div>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                                Your expert is a specialized agent, always up to date with MyApp's latest documentation and best practices. To be used in AI-native IDEs to accurately implement and test MyApp tools within your application.
                            </p>
                            <div className="mt-4">
                                <button className="bg-blue-500 text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-blue-600 transition-colors duration-200">
                                    Get your MyApp Expert
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
} 