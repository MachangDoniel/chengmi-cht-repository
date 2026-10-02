import React from 'react';
import { TimelineEvent } from '../../types';
import { Crown, MapPin, Calendar, BookOpen, ChevronRight, Sparkles } from 'lucide-react';

interface ParallelCirclesTimelineProps {
  events: TimelineEvent[];
  onSelectEvent: (event: TimelineEvent) => void;
  onOpenMunMongModal: () => void;
}

interface EpochDefinition {
  id: string;
  name: string;
  period: string;
  description: string;
  accent: {
    badge: string;
    border: string;
    headerBg: string;
  };
}

const HISTORICAL_EPOCHS: EpochDefinition[] = [
  {
    id: 'epoch-pre-colonial',
    name: 'Ancient Foundations & Tributary Sovereign Principalities',
    period: 'c. 650 – 1760 CE',
    description: 'Autonomous indigenous chiefdoms negotiating tributary borders with Arakan, Twipra, and Mughal Subahdars.',
    accent: {
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
      border: 'border-emerald-500/40',
      headerBg: 'from-emerald-900/20 to-stone-900/10 dark:from-emerald-950/40 dark:to-stone-900/30',
    },
  },
  {
    id: 'epoch-karpas',
    name: 'Karpas Mahal Frontier Barter & Cotton Treaties',
    period: '1760 – 1860 CE',
    description: 'Cotton tribute treaties negotiated with the British East India Company; resistance campaigns against monopoly outposts.',
    accent: {
      badge: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
      border: 'border-amber-500/40',
      headerBg: 'from-amber-900/20 to-stone-900/10 dark:from-amber-950/40 dark:to-stone-900/30',
    },
  },
  {
    id: 'epoch-delimitation',
    name: 'Act XXII Annexation, The Great Bypass & Circle Delimitation',
    period: '1860 – 1900 CE',
    description: 'Creation of Chittagong Hill Tracts as an independent district; codification of the 3 Circles under Sir Alexander Mackenzie.',
    accent: {
      badge: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800',
      border: 'border-purple-500/40',
      headerBg: 'from-purple-900/20 to-stone-900/10 dark:from-purple-950/40 dark:to-stone-900/30',
    },
  },
  {
    id: 'epoch-regulation-1900',
    name: 'Regulation I of 1900 & Excluded Area Customary Autonomy',
    period: '1900 – 1947 CE',
    description: 'The historic CHT Manual statutory regime codifying indigenous land protection and customary royal courts.',
    accent: {
      badge: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
      border: 'border-blue-500/40',
      headerBg: 'from-blue-900/20 to-stone-900/10 dark:from-blue-950/40 dark:to-stone-900/30',
    },
  },
  {
    id: 'epoch-modern',
    name: 'Radcliffe Partition, Kaptai Dam & Modern Reorganization',
    period: '1947 – Present',
    description: 'Radcliffe partition boundary award, 1960 Kaptai inundation, tripartite district creation in 1983, and 1997 Peace Accord.',
    accent: {
      badge: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
      border: 'border-rose-500/40',
      headerBg: 'from-rose-900/20 to-stone-900/10 dark:from-rose-950/40 dark:to-stone-900/30',
    },
  },
];

export const ParallelCirclesTimeline: React.FC<ParallelCirclesTimelineProps> = ({
  events,
  onSelectEvent,
  onOpenMunMongModal,
}) => {
  // Helper to categorize events into epochs
  const getEpochForYear = (year: number): string => {
    if (year < 1760) return 'epoch-pre-colonial';
    if (year < 1860) return 'epoch-karpas';
    if (year < 1900) return 'epoch-delimitation';
    if (year < 1947) return 'epoch-regulation-1900';
    return 'epoch-modern';
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* 3-Circle Column Headers (Sticky Top Legend) */}
      <div className="sticky top-20 z-20 hidden lg:grid grid-cols-3 gap-4 p-3 bg-[#FAF7F0]/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl border border-stone-300/80 dark:border-stone-800 shadow-md">
        {/* Mong Circle Track Header */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-stone-900 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono font-bold text-emerald-800 dark:text-emerald-400">
                Northern Chiefdom (Khagrachari)
              </div>
              <div className="text-sm font-serif font-black text-stone-900 dark:text-stone-100">
                Mong Circle (Manikchari Seat)
              </div>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-stone-800 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-700">
            Chengi Basin
          </span>
        </div>

        {/* Chakma Circle Track Header */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-stone-900 border border-amber-300 dark:border-amber-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono font-bold text-amber-800 dark:text-amber-400">
                Central Chiefdom (Rangamati)
              </div>
              <div className="text-sm font-serif font-black text-stone-900 dark:text-stone-100">
                Chakma Circle (Rangamati Seat)
              </div>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-300 bg-white dark:bg-stone-800 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-700">
            Karnaphuli Basin
          </span>
        </div>

        {/* Bohmong Circle Track Header */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-950/50 dark:to-stone-900 border border-rose-300 dark:border-rose-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono font-bold text-rose-800 dark:text-rose-400">
                Southern Chiefdom (Bandarban)
              </div>
              <div className="text-sm font-serif font-black text-stone-900 dark:text-stone-100">
                Bohmong Circle (Bandarban Seat)
              </div>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-rose-700 dark:text-rose-300 bg-white dark:bg-stone-800 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-700">
            Sangu Basin
          </span>
        </div>
      </div>

      {/* Epochs Stream */}
      {HISTORICAL_EPOCHS.map((epoch) => {
        const epochEvents = events.filter((e) => getEpochForYear(e.year) === epoch.id);
        const mongEvents = epochEvents.filter((e) => e.circle === 'mong' || e.circle === 'all');
        const chakmaEvents = epochEvents.filter((e) => e.circle === 'chakma' || e.circle === 'all');
        const bohmongEvents = epochEvents.filter((e) => e.circle === 'bohmong' || e.circle === 'all');

        return (
          <div
            key={epoch.id}
            className={`p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900/80 border-2 ${epoch.accent.border} shadow-sm space-y-6 transition-all`}
          >
            {/* Epoch Banner */}
            <div className={`p-4 rounded-2xl bg-gradient-to-r ${epoch.accent.headerBg} border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-3`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${epoch.accent.badge}`}>
                    {epoch.period}
                  </span>
                  <span className="text-xs font-serif text-stone-500 dark:text-stone-400 font-semibold">
                    Epochal Horizon
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-black text-stone-900 dark:text-stone-100">
                  {epoch.name}
                </h3>
                <p className="text-xs font-serif text-stone-600 dark:text-stone-300 max-w-3xl leading-relaxed">
                  {epoch.description}
                </p>
              </div>

              {epoch.id === 'epoch-delimitation' && (
                <button
                  onClick={onOpenMunMongModal}
                  className="px-3 py-2 rounded-xl bg-amber-800 hover:bg-amber-700 text-white text-xs font-serif font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Inspect Mun &rarr; Mong Monograph</span>
                </button>
              )}
            </div>

            {/* 3 Parallel Tracks Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              {/* Column 1: Mong Circle */}
              <div className="space-y-4">
                <div className="lg:hidden flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400 border-b border-emerald-200 pb-1 font-serif">
                  <Crown className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mong Circle (Khagrachari)</span>
                </div>

                {mongEvents.length === 0 ? (
                  <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-850/50 border border-dashed border-stone-200 dark:border-stone-800 text-center text-xs font-serif text-stone-400 italic">
                    Stable customary mouza continuity in the Chengi basin.
                  </div>
                ) : (
                  mongEvents.map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => onSelectEvent(ev)}
                      className="p-4 rounded-xl bg-gradient-to-br from-emerald-50/70 via-white to-stone-50 dark:from-stone-900 dark:via-stone-900 dark:to-emerald-950/20 border-2 border-emerald-300/80 dark:border-emerald-800/80 space-y-2 hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group shadow-2xs"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400 text-xs">
                          {ev.yearDisplay}
                        </span>
                        <span className="text-[10px] font-serif font-semibold text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                          {ev.category}
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                        {ev.title}
                      </h4>

                      <p className="text-xs font-serif text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                        {ev.summary}
                      </p>

                      <div className="pt-2 border-t border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between text-[11px] font-serif text-emerald-800 dark:text-emerald-400 font-semibold">
                        <span className="truncate max-w-[150px]">{ev.primaryLocation}</span>
                        <span className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                          Details <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Column 2: Chakma Circle */}
              <div className="space-y-4">
                <div className="lg:hidden flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-400 border-b border-amber-200 pb-1 font-serif">
                  <Crown className="w-3.5 h-3.5 text-amber-600" />
                  <span>Chakma Circle (Rangamati)</span>
                </div>

                {chakmaEvents.length === 0 ? (
                  <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-850/50 border border-dashed border-stone-200 dark:border-stone-800 text-center text-xs font-serif text-stone-400 italic">
                    Stable customary mouza continuity in the Karnaphuli basin.
                  </div>
                ) : (
                  chakmaEvents.map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => onSelectEvent(ev)}
                      className="p-4 rounded-xl bg-gradient-to-br from-amber-50/70 via-white to-stone-50 dark:from-stone-900 dark:via-stone-900 dark:to-amber-950/20 border-2 border-amber-300/80 dark:border-amber-800/80 space-y-2 hover:shadow-md hover:border-amber-500 transition-all cursor-pointer group shadow-2xs"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-amber-800 dark:text-amber-400 text-xs">
                          {ev.yearDisplay}
                        </span>
                        <span className="text-[10px] font-serif font-semibold text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-800">
                          {ev.category}
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors leading-snug">
                        {ev.title}
                      </h4>

                      <p className="text-xs font-serif text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                        {ev.summary}
                      </p>

                      <div className="pt-2 border-t border-amber-100 dark:border-amber-900/40 flex items-center justify-between text-[11px] font-serif text-amber-800 dark:text-amber-400 font-semibold">
                        <span className="truncate max-w-[150px]">{ev.primaryLocation}</span>
                        <span className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                          Details <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Column 3: Bohmong Circle */}
              <div className="space-y-4">
                <div className="lg:hidden flex items-center gap-2 text-xs font-bold text-rose-800 dark:text-rose-400 border-b border-rose-200 pb-1 font-serif">
                  <Crown className="w-3.5 h-3.5 text-rose-600" />
                  <span>Bohmong Circle (Bandarban)</span>
                </div>

                {bohmongEvents.length === 0 ? (
                  <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-850/50 border border-dashed border-stone-200 dark:border-stone-800 text-center text-xs font-serif text-stone-400 italic">
                    Stable customary mouza continuity in the Sangu basin.
                  </div>
                ) : (
                  bohmongEvents.map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => onSelectEvent(ev)}
                      className="p-4 rounded-xl bg-gradient-to-br from-rose-50/70 via-white to-stone-50 dark:from-stone-900 dark:via-stone-900 dark:to-rose-950/20 border-2 border-rose-300/80 dark:border-rose-800/80 space-y-2 hover:shadow-md hover:border-rose-500 transition-all cursor-pointer group shadow-2xs"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-rose-800 dark:text-rose-400 text-xs">
                          {ev.yearDisplay}
                        </span>
                        <span className="text-[10px] font-serif font-semibold text-rose-900 dark:text-rose-300 bg-rose-100 dark:bg-rose-950 px-2 py-0.5 rounded border border-rose-300 dark:border-rose-800">
                          {ev.category}
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-rose-800 dark:group-hover:text-rose-400 transition-colors leading-snug">
                        {ev.title}
                      </h4>

                      <p className="text-xs font-serif text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                        {ev.summary}
                      </p>

                      <div className="pt-2 border-t border-rose-100 dark:border-rose-900/40 flex items-center justify-between text-[11px] font-serif text-rose-800 dark:text-rose-400 font-semibold">
                        <span className="truncate max-w-[150px]">{ev.primaryLocation}</span>
                        <span className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                          Details <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
