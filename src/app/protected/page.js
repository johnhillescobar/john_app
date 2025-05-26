'use client';

export default function ProtectedPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-center mb-4">Protected Content</h1>
                <p className="text-gray-600 text-center mb-6">
                    You have successfully accessed the protected content with a valid API key.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">What's Next?</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                        <li>Explore the API documentation</li>
                        <li>Test different API endpoints</li>
                        <li>Monitor your API usage</li>
                        <li>Set up rate limiting and quotas</li>
                    </ul>
                </div>
            </div>
        </div>
    );
} 