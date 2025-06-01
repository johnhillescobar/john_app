'use client';

import { useSidebar } from './SidebarContext';

export default function Sidebar() {
    const { isExpanded, toggleSidebar } = useSidebar();

    return (
        <div className={`
            fixed left-0 top-0 h-screen bg-white
            shadow-lg transition-all duration-300 ease-in-out
            ${isExpanded ? 'w-64' : 'w-16'}
        `}>
            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-16 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50"
            >
                <svg
                    className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={isExpanded ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                    />
                </svg>
            </button>

            {/* Logo Section */}
            <div className="p-5 border-b border-gray-200">
                <div className="flex items-center">
                    {isExpanded ? (
                        <span className="text-2xl font-bold">Dandi</span>
                    ) : (
                        <span className="text-2xl font-bold">D</span>
                    )}
                </div>
            </div>

            {/* Personal Section */}
            <div className="p-3 border-b border-gray-200">
                <div className="flex items-center space-x-2 p-2 rounded-md">
                    <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                    {isExpanded && <span className="text-sm text-gray-600">Personal</span>}
                </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-3">
                <ul className="space-y-1">
                    <NavItem
                        href="/"
                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
                        label="Overview"
                        isActive={true}
                        expanded={isExpanded}
                    />
                    <NavItem
                        href="/playground"
                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />}
                        label="API Playground"
                        expanded={isExpanded}
                    />
                    <NavItem
                        href="/cases"
                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />}
                        label="Use Cases"
                        expanded={isExpanded}
                    />
                    <NavItem
                        href="/billing"
                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />}
                        label="Billing"
                        expanded={isExpanded}
                    />
                    <NavItem
                        href="/settings"
                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />}
                        label="Settings"
                        expanded={isExpanded}
                    />
                    <NavItem
                        href="/docs"
                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />}
                        label="Documentation"
                        expanded={isExpanded}
                        hasExternalIcon={true}
                    />
                    <NavItem
                        href="/dashboards"
                        icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />}
                        label="API Keys"
                        expanded={isExpanded}
                        hasExternalIcon={true}
                    />
                </ul>
            </nav>
        </div>
    );
}

function NavItem({ href, icon, label, isActive = false, expanded, hasExternalIcon = false }) {
    return (
        <li>
            <a
                href={href}
                className={`
                    flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100
                    ${isActive ? 'text-blue-600' : 'text-gray-600'}
                    ${expanded ? 'justify-start' : 'justify-center'}
                `}
            >
                <svg className={`w-5 h-5 ${isActive ? '' : 'text-gray-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {icon}
                </svg>
                {expanded && (
                    <>
                        <span className="text-sm">{label}</span>
                        {hasExternalIcon && (
                            <svg className="w-3 h-3 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        )}
                    </>
                )}
            </a>
        </li>
    );
} 