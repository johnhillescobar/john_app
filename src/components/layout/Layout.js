'use client';

import { SidebarProvider } from './SidebarContext';
import Sidebar from './Sidebar';
import { useSidebar } from './SidebarContext';

function MainContent({ children }) {
    const { isExpanded } = useSidebar();

    return (
        <main className={`
            transition-all duration-300 ease-in-out
            ${isExpanded ? 'ml-64' : 'ml-16'}
        `}>
            <div className="p-8">
                {children}
            </div>
        </main>
    );
}

export default function Layout({ children }) {
    return (
        <SidebarProvider>
            <div className="min-h-screen bg-gray-50">
                <Sidebar />
                <MainContent>{children}</MainContent>
            </div>
        </SidebarProvider>
    );
} 