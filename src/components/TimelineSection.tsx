import React, { useState, useEffect } from 'react';
import { TimelineEvent, Citation } from '../types';
import { TIMELINE_EVENTS } from '../data/timelineData';
import { MunMongTransitionModal } from './timeline/MunMongTransitionModal';
import { ParallelCirclesTimeline } from './timeline/ParallelCirclesTimeline';
import {
  Search,
  Filter,
  BookOpen,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  X,
  ExternalLink,
  Plus,
  Crown,
  Columns,
  List,
  Sparkles,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const TimelineSection: React.FC = () => {
  const { canPublishCMS } = useAuth();
  const [events, setEvents] = useState<TimelineEvent[]>(TIMELINE_EVENTS);
  const [selectedEra, setSelectedEra] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCircle, setSelectedCircle] = useState<'All' | 'mong' | 'chakma' | 'bohmong' | 'shared_only'>('All');
  const [highlightSharedMilestones, setHighlightSharedMilestones] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [timelineViewMode, setTimelineViewMode] = useState<'stream' | 'parallel'>('stream');
  const [isMunMongModalOpen, setIsMunMongModalOpen] = useState<boolean>(false);

  // Auto-selection listener from Global Search
  useEffect(() => {
    const handleSelectEvent = (e: Event) => {
      const customEvent = e as CustomEvent<TimelineEvent>;
      if (customEvent.detail) {
        setSelectedEra('All');
        setSelectedCategory('All');
        setSelectedCircle('All');
        setSearchQuery('');
        setSelectedEvent(customEvent.detail);
      }
    };
    window.addEventListener('chengmi-timeline-select', handleSelectEvent);
    return () => window.removeEventListener('chengmi-timeline-select', handleSelectEvent);
  }, []);

  // New Milestone modal state
  const [isAddingMilestone, setIsAddingMilestone] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newYear, setNewYear] = useState<number>(1800);
  const [newYearDisplay, setNewYearDisplay] = useState('');
  const [newEra, setNewEra] = useState<TimelineEvent['era']>('British Colonial Period');
  const [newCategory, setNewCategory] = useState<TimelineEvent['category']>('Colonial Administration');
  const [newCircle, setNewCircle] = useState<'mong' | 'chakma' | 'bohmong' | 'all'>('mong');
  const [newLocation, setNewLocation] = useState('Khagrachari (Mong Circle)');
  const [newSummary, setNewSummary] = useState('');
  const [newSignificance, setNewSignificance] = useState('');
  const [newSourceAuthor, setNewSourceAuthor] = useState('');
  const [newSourceTitle, setNewSourceTitle] = useState('');
  const [newSourceYear, setNewSourceYear] = useState('');
  const [newSourceShelfmark, setNewSourceShelfmark] = useState('');

  const eras = [
    'All',
    'Ancient & Pre-Colonial',
    'British Colonial Period',
    'Pakistan Period',
    'Liberation & Bangladesh',
    'Contemporary CHT',
  ];

  const categories = [
    'All',
    'Chiefdoms & Monarchy',
    'Colonial Administration',
    'Boundary & Treaties',
    'Rebellion & Struggle',
    'Modern Upgrades',
  ];

  // Circle Stream Counts
  const countAll = events.length;
  const countChakma = events.filter((e) => e.circle === 'chakma' || e.circle === 'all' || e.isSharedPanChtMilestone).length;
  const countBohmong = events.filter((e) => e.circle === 'bohmong' || e.circle === 'all' || e.isSharedPanChtMilestone).length;
  const countMong = events.filter((e) => e.circle === 'mong' || e.circle === 'all' || e.isSharedPanChtMilestone).length;
  const countShared = events.filter((e) => e.circle === 'all' || e.isSharedPanChtMilestone).length;

  const filteredEvents = events.filter((ev) => {
    const matchesEra = selectedEra === 'All' || ev.era === selectedEra;
    const matchesCategory = selectedCategory === 'All' || ev.category === selectedCategory;
    const isShared = ev.circle === 'all' || ev.isSharedPanChtMilestone;

    let matchesCircle = false;
    if (selectedCircle === 'All') {
      matchesCircle = true;
    } else if (selectedCircle === 'shared_only') {
      matchesCircle = !!isShared;
    } else {
      matchesCircle = ev.circle === selectedCircle || (!!isShared && highlightSharedMilestones);
    }

    const matchesSearch =
      searchQuery === '' ||
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ev.localNameOrAlias && ev.localNameOrAlias.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ev.primaryLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEra && matchesCategory && matchesCircle && matchesSearch;
  });

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) {
      alert('Please fill in the milestone title and summary.');
      return;
    }
    if (!newSourceAuthor.trim() || !newSourceTitle.trim()) {
      alert('A primary reference (Author and Source Title) is strictly required for archival integrity.');
      return;
    }

    const citation: Citation = {
      sourceType: 'Colonial Gazette',
      authorOrBody: newSourceAuthor.trim(),
      title: newSourceTitle.trim(),
      year: newSourceYear.trim() || String(newYear),
      shelfmarkOrCallNumber: newSourceShelfmark.trim() || 'REG-ARCH-MANUSCRIPT',
    };

    const newEvent: TimelineEvent = {
      id: `tl-${Date.now()}`,
      year: Number(newYear),
      yearDisplay: newYearDisplay.trim() || `${newYear} CE`,
      title: newTitle.trim(),
      era: newEra,
      category: newCategory,
      primaryLocation: newLocation.trim(),
      summary: newSummary.trim(),
      historicalSignificance: newSignificance.trim() || newSummary.trim(),
      references: [citation],
    };

    setEvents(prev => [...prev, newEvent].sort((a, b) => a.year - b.year));
    setIsAddingMilestone(false);
    // Reset form
    setNewTitle('');
    setNewSummary('');
    setNewSignificance('');
    setNewSourceAuthor('');
    setNewSourceTitle('');
    setNewSourceShelfmark('');
  };

  const getEraColor = (era: string) => {
    switch (era) {
      case 'Ancient & Pre-Colonial':
        return {
          badge: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800',
          pin: 'bg-emerald-600 border-white dark:border-stone-900',
          border: 'border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-400',
          year: 'text-emerald-800 dark:text-emerald-300',
        };
      case 'British Colonial Period':
        return {
          badge: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800',
          pin: 'bg-amber-600 border-white dark:border-stone-900',
          border: 'border-amber-200 dark:border-amber-900/50 hover:border-amber-400',
          year: 'text-amber-800 dark:text-amber-300',
        };
      case 'Pakistan Period':
        return {
          badge: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950/80 dark:text-sky-300 dark:border-sky-800',
          pin: 'bg-sky-600 border-white dark:border-stone-900',
          border: 'border-sky-200 dark:border-sky-900/50 hover:border-sky-400',
          year: 'text-sky-800 dark:text-sky-300',
        };
      case 'Liberation & Bangladesh':
        return {
          badge: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-800',
          pin: 'bg-rose-600 border-white dark:border-stone-900',
          border: 'border-rose-200 dark:border-rose-900/50 hover:border-rose-400',
          year: 'text-rose-800 dark:text-rose-300',
        };
      case 'Contemporary CHT':
        return {
          badge: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/80 dark:text-purple-300 dark:border-purple-800',
          pin: 'bg-purple-600 border-white dark:border-stone-900',
          border: 'border-purple-200 dark:border-purple-900/50 hover:border-purple-400',
          year: 'text-purple-800 dark:text-purple-300',
        };
      default:
        return {
          badge: 'bg-stone-100 text-stone-900 border-stone-300',
          pin: 'bg-stone-600 border-white dark:border-stone-900',
          border: 'border-stone-200 dark:border-stone-800 hover:border-stone-400',
          year: 'text-stone-800 dark:text-stone-200',
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 pb-16 transition-colors">
      {/* Header and Controls */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6">
          <div className="space-y-1">
            <div className="text-xs font-serif uppercase tracking-widest text-amber-800 dark:text-amber-400 font-bold">
              Chronological Research Continuum (0000 – Present)
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 dark:text-stone-100">
              Interactive Historical Timeline
            </h1>
            <p className="text-sm font-serif text-stone-600 dark:text-stone-400 max-w-2xl">
              Chronology of Khagrachari (Chengmi) and the Chittagong Hill Tracts from ancient roots (0000) and Mughal Karpas Mahal through British Colonial rule (1760–1947), the Pakistan era (1947–1971), and modern district elevation to the present.
            </p>
          </div>

          {canPublishCMS() && (
            <button
              onClick={() => setIsAddingMilestone(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-700 dark:hover:bg-stone-600 rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Archival Milestone</span>
            </button>
          )}
        </div>

        {/* Monograph Feature Card: Mun Circle to Mong Circle Transition */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-900/10 via-amber-50 to-amber-100/60 dark:from-amber-950/40 dark:via-stone-900 dark:to-stone-900 border-2 border-amber-300 dark:border-amber-800/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-900 dark:text-amber-400">
              <Shield className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              <span>Critical Historical Clarification • 1860–1884 Codification</span>
            </div>
            <h2 className="text-base sm:text-lg font-serif font-black text-stone-900 dark:text-stone-100">
              Transition from Tripura &ldquo;Mun&rdquo; Circle to British &ldquo;Mong&rdquo; Circle
            </h2>
            <p className="text-xs sm:text-sm font-serif text-stone-700 dark:text-stone-300 leading-relaxed">
              Examine the historical incident of &ldquo;The Great Bypass&rdquo;, the diplomatic dispute between Maharaja Bir Chandra Manikya of Tripura and Bengal Secretary Sir Alexander Mackenzie, and the formal recognition of Chieftain Mrachai at Manikchari.
            </p>
          </div>

          <button
            onClick={() => setIsMunMongModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-white font-serif font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm shrink-0 hover:scale-[1.02]"
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Open Explanatory Monograph &rarr;</span>
          </button>
        </div>

        {/* View Mode Switcher: Stream vs 3-Circle Parallel Tracks */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-stone-100 dark:bg-stone-850 rounded-2xl border border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setTimelineViewMode('stream')}
              className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                timelineViewMode === 'stream'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-black'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <List className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              <span>Unified Chronological Stream</span>
            </button>
            <button
              onClick={() => setTimelineViewMode('parallel')}
              className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                timelineViewMode === 'parallel'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-black'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <Columns className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>3-Circle Parallel Tracks (Synchronized)</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold ml-1">
                Comparative
              </span>
            </button>
          </div>

          <div className="text-xs font-serif text-stone-500 dark:text-stone-400 px-2">
            {timelineViewMode === 'stream' ? `${filteredEvents.length} milestones loaded` : 'Mong, Chakma & Bohmong Circles side-by-side'}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          {/* Search Input */}
          <div className="md:col-span-4 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              placeholder="Search historical events, treaties, names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-serif bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg focus:outline-hidden focus:border-stone-800 dark:focus:border-amber-400 text-stone-900 dark:text-stone-100 transition-colors shadow-xs"
            />
          </div>

          {/* Era Filter */}
          <div className="md:col-span-5 flex items-center gap-1.5 overflow-x-auto py-0.5">
            {eras.map((era) => (
              <button
                key={era}
                onClick={() => setSelectedEra(era)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedEra === era
                    ? 'bg-amber-900 text-white shadow-xs font-bold'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {era}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 text-xs font-serif bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg focus:outline-hidden text-stone-800 dark:text-stone-200 cursor-pointer shadow-xs"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  Category: {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Chiefdom Circle Stream Switcher & Shared Milestones Filter */}
        <div className="space-y-2.5 pt-2 border-t border-stone-200/80 dark:border-stone-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-stone-700 dark:text-stone-300">
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <span>Hereditary Circle Streams:</span>
            </div>

            <button
              onClick={() => setHighlightSharedMilestones(!highlightSharedMilestones)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-sans font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                highlightSharedMilestones
                  ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-500 border-stone-200 dark:border-stone-700'
              }`}
              title="Highlight treaties and statutes that applied to all 3 chiefdoms"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{highlightSharedMilestones ? 'Shared Milestones Highlighted' : 'Shared Highlights Off'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedCircle('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedCircle === 'All'
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <span>All Chiefdoms Combined</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-black/10 dark:bg-white/20">
                {countAll}
              </span>
            </button>

            <button
              onClick={() => setSelectedCircle('chakma')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedCircle === 'chakma'
                  ? 'bg-amber-700 text-white shadow-xs font-bold'
                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 hover:bg-amber-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Chakma Circle (Rangamati)</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-amber-200/60 dark:bg-amber-900/60">
                {countChakma}
              </span>
            </button>

            <button
              onClick={() => setSelectedCircle('bohmong')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedCircle === 'bohmong'
                  ? 'bg-rose-700 text-white shadow-xs font-bold'
                  : 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 hover:bg-rose-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <span>Bohmong Circle (Bandarban)</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-rose-200/60 dark:bg-rose-900/60">
                {countBohmong}
              </span>
            </button>

            <button
              onClick={() => setSelectedCircle('mong')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 whitespace-nowrap ${
                selectedCircle === 'mong'
                  ? 'bg-emerald-700 text-white shadow-xs font-bold'
                  : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Mong Circle (Khagrachari)</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-emerald-200/60 dark:bg-emerald-900/60">
                {countMong}
              </span>
            </button>

            <button
              onClick={() => setSelectedCircle('shared_only')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 whitespace-nowrap border ${
                selectedCircle === 'shared_only'
                  ? 'bg-gradient-to-r from-emerald-600 via-amber-600 to-rose-600 text-white shadow-xs font-bold border-transparent'
                  : 'bg-gradient-to-r from-emerald-50 via-amber-50 to-rose-50 dark:from-emerald-950/40 dark:via-amber-950/40 dark:to-rose-950/40 text-stone-800 dark:text-stone-200 border-amber-300 dark:border-amber-700 hover:opacity-90'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <span>Shared Pan-CHT Treaties</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-black/10 dark:bg-white/20 font-bold">
                {countShared}
              </span>
            </button>
          </div>

          {/* Contextual Stream Descriptor */}
          <div className="text-[11px] font-serif text-stone-500 dark:text-stone-400 flex items-center justify-between">
            <span>
              {selectedCircle === 'chakma' && 'Showing Chakma Circle Stream (Rangamati) + Shared Pan-CHT Milestones.'}
              {selectedCircle === 'bohmong' && 'Showing Bohmong Circle Stream (Bandarban) + Shared Pan-CHT Milestones.'}
              {selectedCircle === 'mong' && 'Showing Mong Circle Stream (Khagrachari) + Shared Pan-CHT Milestones.'}
              {selectedCircle === 'shared_only' && 'Showing exclusively Shared Pan-CHT Treaties and Statutes affecting all three chiefdoms.'}
              {selectedCircle === 'All' && 'Displaying combined chronological milestones across all three hereditary circles.'}
            </span>
            {selectedCircle !== 'All' && (
              <button
                onClick={() => setSelectedCircle('All')}
                className="text-amber-800 dark:text-amber-400 underline font-semibold cursor-pointer ml-2 whitespace-nowrap"
              >
                Reset Circle Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Timeline View: Parallel Tracks vs Chronological Stream */}
      {timelineViewMode === 'parallel' ? (
        <ParallelCirclesTimeline
          events={events}
          onSelectEvent={setSelectedEvent}
          onOpenMunMongModal={() => setIsMunMongModalOpen(true)}
        />
      ) : (
        <div className="relative border-l-2 border-stone-300 dark:border-stone-700 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8 pt-2">
        {filteredEvents.length === 0 ? (
          <div className="p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-center space-y-2">
            <p className="text-sm font-serif text-stone-600 dark:text-stone-400">No milestones match your current filter criteria.</p>
            <button
              onClick={() => {
                setSelectedEra('All');
                setSelectedCategory('All');
                setSelectedCircle('All');
                setSearchQuery('');
              }}
              className="text-xs text-amber-800 dark:text-amber-400 font-bold underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const eraColors = getEraColor(event.era);
            const isShared = event.circle === 'all' || event.isSharedPanChtMilestone;
            return (
              <div
                key={event.id}
                id={`timeline-event-${event.id}`}
                className="relative group cursor-pointer scroll-mt-28 transition-all"
                onClick={() => setSelectedEvent(event)}
              >
                {/* Timeline Pin Marker */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 rounded-full ${
                    isShared && highlightSharedMilestones
                      ? 'bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 ring-2 ring-amber-400 scale-125'
                      : eraColors.pin
                  } border-2 shadow-xs group-hover:scale-125 transition-transform`}
                />

                {/* Event Card with rich theme border */}
                <div
                  className={`p-6 bg-white dark:bg-stone-900 border-2 ${
                    isShared && highlightSharedMilestones
                      ? 'border-amber-400 dark:border-amber-600 ring-2 ring-amber-300/40 dark:ring-amber-500/20 shadow-md bg-gradient-to-br from-amber-50/20 via-white to-stone-50 dark:from-stone-900 dark:via-stone-900 dark:to-amber-950/20'
                      : eraColors.border
                  } rounded-xl space-y-3.5 shadow-xs hover:shadow-lg transition-all duration-300`}
                >
                  {/* Shared Pan-CHT Milestone Ribbon */}
                  {isShared && (
                    <div className="flex flex-wrap items-center justify-between px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-50 via-amber-50 to-rose-50 dark:from-emerald-950/40 dark:via-amber-950/40 dark:to-rose-950/40 border border-amber-300 dark:border-amber-700/80 text-xs shadow-2xs gap-2">
                      <div className="flex items-center gap-2 font-bold text-amber-950 dark:text-amber-200 font-serif">
                        <Crown className="w-3.5 h-3.5 text-amber-500" />
                        <span>Shared Pan-CHT Historical Milestone</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white font-bold">Mong Circle</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-700 text-white font-bold">Chakma Circle</span>
                        <span className="px-1.5 py-0.5 rounded bg-rose-700 text-white font-bold">Bohmong Circle</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-serif">
                      <span className={`font-mono font-bold text-sm ${eraColors.year}`}>
                        {event.yearDisplay}
                      </span>
                      <span aria-hidden="true" className="text-stone-400">·</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${eraColors.badge}`}>
                        {event.era}
                      </span>
                      <span aria-hidden="true" className="text-stone-400">·</span>
                      {isShared ? (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-gradient-to-r from-emerald-100 via-amber-100 to-rose-100 dark:from-emerald-950 dark:via-amber-950 dark:to-rose-950 text-stone-900 dark:text-stone-100 border border-amber-300 dark:border-amber-800">
                          Shared Pan-CHT (3 Circles)
                        </span>
                      ) : event.circle === 'mong' ? (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          Mong Circle
                        </span>
                      ) : event.circle === 'chakma' ? (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                          Chakma Circle
                        </span>
                      ) : event.circle === 'bohmong' ? (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                          Bohmong Circle
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                          General CHT
                        </span>
                      )}
                      <span aria-hidden="true" className="text-stone-400">·</span>
                      <span className="text-stone-600 dark:text-stone-400">{event.category}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 font-serif">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{event.primaryLocation}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg sm:text-xl font-serif font-black text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                      {event.title}
                    </h3>
                    {event.localNameOrAlias && (
                      <div className="text-xs font-serif italic text-stone-500 dark:text-stone-400">
                        Local / Customary Name: {event.localNameOrAlias}
                      </div>
                    )}
                  </div>

                  {/* Mun Circle to Mong Circle Transition Callout */}
                  {event.isMunToMongTransition && (
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/80 dark:to-stone-900 border-2 border-amber-400 dark:border-amber-700 text-xs space-y-1.5 shadow-xs">
                      <div className="flex items-center gap-2 font-bold text-amber-950 dark:text-amber-200">
                        <span className="px-2 py-0.5 rounded bg-amber-700 text-white text-[10px] font-mono tracking-wider uppercase font-bold">
                          Archival Validation
                        </span>
                        <span className="font-serif">Historical Transition: "Mun Circle" ➔ "Mong Circle"</span>
                      </div>
                      <p className="text-stone-700 dark:text-stone-300 font-serif leading-relaxed">
                        Archival records substantiate that the northern territory was initially surveyed in 1860 as <strong>"Mun Circle"</strong> after the indigenous Tipra/Tripuri community paying tribute to the Tripura kingdom. In 1881–1884, Sir Alexander Mackenzie bypassed Tripura royal claims to establish clear British borders, elevating Marma Chieftain Kyaja Sain Chowdhury at Manikchari and officially renaming the chiefdom <strong>"Mong Circle"</strong>.
                      </p>
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsMunMongModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-700 text-white font-serif font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Examine Full Explanatory Monograph & Incident Dossier &rarr;</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <p className="text-sm font-serif text-stone-700 dark:text-stone-300 leading-relaxed">
                    {event.summary}
                  </p>

                  {/* Primary Reference Citation Bar */}
                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs font-serif text-stone-500 dark:text-stone-400">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-stone-400" />
                      <span>
                        Ref: <strong className="text-stone-700 dark:text-stone-300">{event.references[0]?.title}</strong> ({event.references[0]?.year})
                      </span>
                    </div>

                    <span className="text-xs font-sans font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1 group-hover:underline">
                      View Archival Citation & Analysis <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    )}

      {/* Detailed Milestone Drawer Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FBF9F5] border border-stone-300 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div className="space-y-1">
                <div className="text-xs font-mono font-bold text-amber-900 uppercase tracking-widest">
                  {selectedEvent.yearDisplay} · {selectedEvent.era}
                </div>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  {selectedEvent.title}
                </h2>
                {selectedEvent.localNameOrAlias && (
                  <p className="text-xs font-serif italic text-stone-600">
                    Indigenous / Archival Identifier: {selectedEvent.localNameOrAlias}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 text-stone-400 hover:text-stone-800 rounded transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm font-serif text-stone-800 leading-relaxed">
              <div>
                <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Historical Account & Context
                </h4>
                <p>{selectedEvent.summary}</p>
              </div>

              <div>
                <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Long-Term Significance in CHT History
                </h4>
                <p>{selectedEvent.historicalSignificance}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-white border border-stone-200 rounded-lg text-xs font-serif">
                <div>
                  <span className="text-stone-400 block">Primary Geography:</span>
                  <span className="font-semibold text-stone-900">{selectedEvent.primaryLocation}</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Jurisdictional Category:</span>
                  <span className="font-semibold text-stone-900">{selectedEvent.category}</span>
                </div>
              </div>

              {/* Verified Primary Citations */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-stone-600" />
                  <span>Mandatory Verified Archival Citations ({selectedEvent.references.length})</span>
                </h4>
                <div className="space-y-2">
                  {selectedEvent.references.map((ref, idx) => (
                    <div key={idx} className="p-3.5 bg-stone-100/80 border border-stone-200 rounded text-xs font-serif space-y-1">
                      <div className="font-semibold text-stone-900">
                        {ref.authorOrBody} ({ref.year}). <em>{ref.title}</em>.
                      </div>
                      <div className="text-stone-600 flex flex-wrap gap-2 text-[11px]">
                        <span>Classification: <strong>{ref.sourceType}</strong></span>
                        <span>·</span>
                        <span>Call Number: <code className="bg-stone-200 px-1 py-0.5 rounded font-mono">{ref.shelfmarkOrCallNumber}</code></span>
                        {ref.pageOrFolio && (
                          <>
                            <span>·</span>
                            <span>{ref.pageOrFolio}</span>
                          </>
                        )}
                      </div>
                      {ref.urlOrRepository && (
                        <div className="text-[11px] text-stone-500 italic">
                          Archival Repository: {ref.urlOrRepository}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-stone-200">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-200 hover:bg-stone-300 rounded transition-colors cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Milestone Modal */}
      {isAddingMilestone && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FBF9F5] border border-stone-300 rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  Add Historical Milestone to Timeline
                </h3>
                <p className="text-xs font-serif text-stone-500">
                  Contribute ancient (0000–1760) or contemporary historical events with mandatory primary sources.
                </p>
              </div>
              <button
                onClick={() => setIsAddingMilestone(false)}
                className="p-1 text-stone-400 hover:text-stone-800 rounded transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMilestone} className="space-y-4 text-xs font-serif">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Numeric Year (Sort Index)</label>
                  <input
                    type="number"
                    value={newYear}
                    onChange={(e) => setNewYear(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Display Date (e.g. "c. 1250 CE")</label>
                  <input
                    type="text"
                    placeholder="e.g., 1782 CE or August 1947"
                    value={newYearDisplay}
                    onChange={(e) => setNewYearDisplay(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Milestone Title</label>
                <input
                  type="text"
                  placeholder="e.g., Demarcation of the Chengi River Valley Borders"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Era</label>
                  <select
                    value={newEra}
                    onChange={(e) => setNewEra(e.target.value as TimelineEvent['era'])}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 cursor-pointer"
                  >
                    <option value="Ancient & Pre-Colonial">Ancient & Pre-Colonial</option>
                    <option value="British Colonial Period">British Colonial Period</option>
                    <option value="Pakistan Period">Pakistan Period</option>
                    <option value="Liberation & Bangladesh">Liberation & Bangladesh</option>
                    <option value="Contemporary CHT">Contemporary CHT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as TimelineEvent['category'])}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 cursor-pointer"
                  >
                    <option value="Chiefdoms & Monarchy">Chiefdoms & Monarchy</option>
                    <option value="Colonial Administration">Colonial Administration</option>
                    <option value="Boundary & Treaties">Boundary & Treaties</option>
                    <option value="Rebellion & Struggle">Rebellion & Struggle</option>
                    <option value="Modern Upgrades">Modern Upgrades</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Primary Geographic Location</label>
                <input
                  type="text"
                  placeholder="e.g., Manikchari Rajbari / Ramgarh Feni River / Panchari"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Summary Description</label>
                <textarea
                  rows={3}
                  placeholder="Explain the event, indigenous actors, and administrative shifts..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900"
                  required
                />
              </div>

              <div className="p-3 bg-stone-100 border border-stone-300 rounded space-y-2">
                <div className="font-semibold text-stone-900 text-xs">
                  Mandatory Archival Citation
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Author or Issuing Body *"
                    value={newSourceAuthor}
                    onChange={(e) => setNewSourceAuthor(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-stone-300 rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Source Title / Manuscript Name *"
                    value={newSourceTitle}
                    onChange={(e) => setNewSourceTitle(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-stone-300 rounded"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Year of Publication / Deed"
                    value={newSourceYear}
                    onChange={(e) => setNewSourceYear(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-stone-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Shelfmark / Call Number / URL"
                    value={newSourceShelfmark}
                    onChange={(e) => setNewSourceShelfmark(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-stone-300 rounded"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsAddingMilestone(false)}
                  className="px-3.5 py-1.5 text-xs text-stone-700 hover:bg-stone-200 rounded transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors cursor-pointer"
                >
                  Deposit Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Explanatory Monograph Modal: Mun Circle to Mong Circle Transition */}
      <MunMongTransitionModal
        isOpen={isMunMongModalOpen}
        onClose={() => setIsMunMongModalOpen(false)}
      />
    </div>
  );
};
