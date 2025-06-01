'use client';

export default function PlanOverview() {
    return (
        <div className="bg-gradient-to-r from-pink-300 via-purple-400 to-blue-400 rounded-lg p-6 mb-8 relative">
            <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded px-3 py-1 text-sm text-white">
                📋 Manage Plan
            </button>
            <div className="text-xs text-white/80 mb-1">CURRENT PLAN</div>
            <div className="text-4xl font-bold text-white mb-6">Researcher</div>

            <div className="flex items-center mb-2">
                <div className="text-white/80 mr-2">API Usage</div>
                <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <div className="text-sm text-white/80 mb-1">Plan</div>
            <div className="bg-white/20 h-2 rounded-full w-full mb-2">
                <div className="bg-white h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="flex justify-end text-sm text-white font-medium">0/1,000 Credits</div>

            <div className="flex items-center mt-4">
                <div className="flex items-center">
                    <div className="w-5 h-5 mr-2 relative">
                        <div className="absolute inset-0 bg-white rounded-full opacity-20"></div>
                        <div className="absolute inset-1 bg-white rounded-full"></div>
                    </div>
                    <span className="text-sm text-white">Pay as you go</span>
                </div>
                <svg className="w-4 h-4 text-white ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
        </div>
    );
} 