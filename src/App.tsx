/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { ReadingProgressBar } from './components/common/ReadingProgressBar';
import { KhagrachariOverview } from './components/KhagrachariOverview';
import { TimelineSection } from './components/TimelineSection';
import { RegionalMapSection } from './components/RegionalMapSection';
import { ArchiveCMSSection } from './components/ArchiveCMSSection';
import { BlogSection } from './components/BlogSection';
import { AuthModal } from './components/AuthModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { Footer } from './components/Footer';

function MainApp() {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'map' | 'archives' | 'blog'>('overview');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const handleTabChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail && ['overview', 'timeline', 'map', 'archives', 'blog'].includes(customEvent.detail)) {
        setActiveTab(customEvent.detail as 'overview' | 'timeline' | 'map' | 'archives' | 'blog');
      }
    };
    window.addEventListener('chengmi-tab-change', handleTabChange);
    return () => window.removeEventListener('chengmi-tab-change', handleTabChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] dark:bg-[#0C1014] text-stone-900 dark:text-stone-100 font-sans transition-colors">
      {/* Header (Top Bar Contract strictly implemented) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={() => setIsAuthOpen(true)}
        openAdminModal={() => setIsAdminOpen(true)}
      />

      {/* Subtle Scholarly Reading Progress Bar */}
      <ReadingProgressBar activeTab={activeTab} />

      {/* Main Archival Canvas */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <KhagrachariOverview
            onNavigateToTimeline={() => setActiveTab('timeline')}
            onNavigateToMap={() => setActiveTab('map')}
            onNavigateToArchives={() => setActiveTab('archives')}
          />
        )}

        {activeTab === 'timeline' && <TimelineSection />}

        {activeTab === 'map' && <RegionalMapSection />}

        {activeTab === 'archives' && (
          <ArchiveCMSSection onOpenAuth={() => setIsAuthOpen(true)} />
        )}

        {activeTab === 'blog' && <BlogSection />}
      </main>

      {/* Institutional Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Authentication Modal with Pre-loaded Test Admin Credentials */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Admin Panel with User Role Management & Role Testing */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
