import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { ShieldCheck, UserCheck, LogOut, Sliders, Lock, BookOpen, Sun, Moon, Share2, Check } from 'lucide-react';
import { UserRole } from '../types';
import { GlobalSearch, SearchResultItem } from './GlobalSearch';
import { searchIndexer } from '../services/searchIndexer';

interface HeaderProps {
  activeTab: 'overview' | 'timeline' | 'map' | 'archives' | 'blog';
  setActiveTab: (tab: 'overview' | 'timeline' | 'map' | 'archives' | 'blog') => void;
  openAuthModal: () => void;
  openAdminModal: () => void;
  onSelectSearchResult?: (result: SearchResultItem) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  openAuthModal,
  openAdminModal,
  onSelectSearchResult,
}) => {
  const { currentUser, effectiveRole, simulatedRole, setSimulatedRole, logout, canManageUsers } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  const publicAppUrl = 'https://chengmi-khagrachari-chittagong-hill-tracts-histor.ai.studio';

  const copyPublicShareLink = () => {
    navigator.clipboard.writeText(publicAppUrl);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 3000);
  };

  const handleSearchResult = (result: SearchResultItem) => {
    let targetTab: 'overview' | 'timeline' | 'map' | 'archives' | 'blog' = 'overview';
    let targetElementId = '';

    if (result.type === 'timeline') {
      targetTab = 'timeline';
      targetElementId = `timeline-event-${result.item.id}`;
      window.dispatchEvent(new CustomEvent('chengmi-timeline-select', { detail: result.item }));
    } else if (result.type === 'archive') {
      targetTab = 'archives';
      targetElementId = `archive-card-${result.item.id}`;
      window.dispatchEvent(new CustomEvent('chengmi-archive-select', { detail: result.item }));
    } else if (result.type === 'blog') {
      targetTab = 'blog';
      targetElementId = `blog-post-${result.item.id}`;
      window.dispatchEvent(new CustomEvent('chengmi-blog-select', { detail: result.item }));
    } else if (result.type === 'map') {
      targetTab = 'map';
      targetElementId = `upazila-card-${result.item.id}`;
      window.dispatchEvent(new CustomEvent('chengmi-map-select', { detail: result.item }));
    }

    // Auto-scroll to target element with smooth behavior and visual pulse highlight via Search Indexer
    if (targetElementId) {
      searchIndexer.navigateToAndScroll(targetTab, targetElementId, setActiveTab);
    } else {
      setActiveTab(targetTab);
    }

    onSelectSearchResult?.(result);
  };

  const roleLabels: Record<UserRole, string> = {
    super_admin: 'Super Admin',
    archivist: 'Senior Archivist',
    researcher: 'Academic Researcher',
    contributor: 'Field Contributor',
    public_reader: 'Public Reader',
  };

  return (
    <>
      {/* Simulation Banner when testing roles */}
      {simulatedRole && (
        <div className="bg-amber-900 text-amber-100 text-xs py-1.5 px-4 flex items-center justify-between border-b border-amber-800">
          <div className="flex items-center gap-2 max-w-5xl mx-auto w-full">
            <Sliders className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="font-medium">Testing Active Role Simulation:</span>
            <span className="font-semibold text-white tracking-wide uppercase text-[11px] bg-amber-800 px-2 py-0.5 rounded">
              {roleLabels[simulatedRole]}
            </span>
            <span className="text-amber-200 hidden sm:inline text-[11px]">
              (Viewing repository with restricted {simulatedRole === 'public_reader' ? 'read-only' : simulatedRole} permissions)
            </span>
            <button
              onClick={() => setSimulatedRole(null)}
              className="ml-auto text-amber-200 underline hover:text-white text-xs whitespace-nowrap cursor-pointer"
            >
              Exit Simulation
            </button>
          </div>
        </div>
      )}

      {/* Top Bar with Chengmi brand and Global Search */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Brand: Single clean name "Chengmi" as explicitly requested */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setActiveTab('overview')}
              className="text-left group cursor-pointer focus-visible:outline-hidden flex items-baseline gap-2"
            >
              <span className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-amber-950 dark:text-amber-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                Chengmi
              </span>
            </button>
          </div>

          {/* Global Search Bar */}
          <div className="flex-1 max-w-md hidden md:flex justify-center">
            <GlobalSearch onSelectResult={handleSearchResult} />
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-stone-600 dark:text-stone-300">
            <button
              onClick={() => setActiveTab('overview')}
              className={`transition-colors hover:text-stone-900 dark:hover:text-white cursor-pointer whitespace-nowrap py-1 ${
                activeTab === 'overview'
                  ? 'text-stone-950 dark:text-white font-semibold border-b-2 border-stone-900 dark:border-amber-400'
                  : ''
              }`}
            >
              Historical Identity
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`transition-colors hover:text-stone-900 dark:hover:text-white cursor-pointer whitespace-nowrap py-1 ${
                activeTab === 'timeline'
                  ? 'text-stone-950 dark:text-white font-semibold border-b-2 border-stone-900 dark:border-amber-400'
                  : ''
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`transition-colors hover:text-stone-900 dark:hover:text-white cursor-pointer whitespace-nowrap py-1 ${
                activeTab === 'map'
                  ? 'text-stone-950 dark:text-white font-semibold border-b-2 border-stone-900 dark:border-amber-400'
                  : ''
              }`}
            >
              Regional Map
            </button>
            <button
              onClick={() => setActiveTab('archives')}
              className={`transition-colors hover:text-stone-900 dark:hover:text-white cursor-pointer whitespace-nowrap py-1 ${
                activeTab === 'archives'
                  ? 'text-stone-950 dark:text-white font-semibold border-b-2 border-stone-900 dark:border-amber-400'
                  : ''
              }`}
            >
              Archives CMS
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`transition-colors hover:text-stone-900 dark:hover:text-white cursor-pointer whitespace-nowrap py-1 ${
                activeTab === 'blog'
                  ? 'text-stone-950 dark:text-white font-semibold border-b-2 border-stone-900 dark:border-amber-400'
                  : ''
              }`}
            >
              Dispatches
            </button>
          </nav>

          {/* User & Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Dark Mode Switcher (Moon/Sun icon) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer text-stone-700 dark:text-amber-400 shadow-xs"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Public Share URL Button */}
            <button
              onClick={copyPublicShareLink}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                copiedShareLink
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
              }`}
              title="Copy Public URL to share with friends"
            >
              {copiedShareLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Share App</span>
                </>
              )}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2">
                {canManageUsers() && (
                  <button
                    onClick={openAdminModal}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                    title="User Role Management & Testing"
                  >
                    <Sliders className="w-3.5 h-3.5 text-stone-700 dark:text-stone-300" />
                    <span className="hidden sm:inline">Admin & Testing</span>
                  </button>
                )}

                <div className="hidden xl:flex flex-col items-end text-right mr-1">
                  <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 leading-tight">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider">
                    {roleLabels[effectiveRole]}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-700 dark:hover:bg-stone-600 rounded-xl transition-colors cursor-pointer whitespace-nowrap shadow-xs"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Row & Nav */}
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 px-4 py-2 space-y-2 bg-[#F7F4EE] dark:bg-stone-900">
          <div className="w-full flex justify-center">
            <GlobalSearch onSelectResult={handleSearchResult} className="w-full" />
          </div>
          <div className="flex overflow-x-auto gap-4 text-xs font-medium text-stone-600 pb-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`whitespace-nowrap ${activeTab === 'overview' ? 'text-stone-900 font-bold' : ''}`}
            >
              Identity
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`whitespace-nowrap ${activeTab === 'timeline' ? 'text-stone-900 font-bold' : ''}`}
            >
              Timeline
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`whitespace-nowrap ${activeTab === 'map' ? 'text-stone-900 font-bold' : ''}`}
            >
              Map
            </button>
            <button
              onClick={() => setActiveTab('archives')}
              className={`whitespace-nowrap ${activeTab === 'archives' ? 'text-stone-900 font-bold' : ''}`}
            >
              Archives CMS
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`whitespace-nowrap ${activeTab === 'blog' ? 'text-stone-900 font-bold' : ''}`}
            >
              Dispatches
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
