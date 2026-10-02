import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Calendar,
  BookOpen,
  MapPin,
  Feather,
  X,
  Sparkles,
  Tag,
  Headphones,
  ArrowUpRight,
  Hash,
  Compass,
} from 'lucide-react';
import { searchIndexer, SearchMatch, KeywordSuggestion } from '../services/searchIndexer';
import { TimelineEvent, ArchiveRecord, BlogPost, UpazilaInfo, LandmarkInfo } from '../types';

export type SearchResultItem =
  | { type: 'timeline'; item: TimelineEvent }
  | { type: 'archive'; item: ArchiveRecord }
  | { type: 'blog'; item: BlogPost }
  | { type: 'map'; item: UpazilaInfo | LandmarkInfo };

interface GlobalSearchProps {
  onSelectResult: (result: SearchResultItem) => void;
  className?: string;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ onSelectResult, className = '' }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cleanQuery = query.trim();
  const searchResults: SearchMatch[] = cleanQuery.length >= 2 ? searchIndexer.search(cleanQuery, 10) : [];
  const keywordSuggestions: KeywordSuggestion[] = searchIndexer.getKeywordSuggestions(cleanQuery, 6);

  const handleSelectMatch = (match: SearchMatch) => {
    const item = match.item;
    if (item.domain === 'timeline') {
      onSelectResult({ type: 'timeline', item: item.rawItem as TimelineEvent });
    } else if (item.domain === 'archive' || item.domain === 'audio') {
      onSelectResult({ type: 'archive', item: item.rawItem as ArchiveRecord });
    } else if (item.domain === 'blog') {
      onSelectResult({ type: 'blog', item: item.rawItem as BlogPost });
    } else if (item.domain === 'map') {
      onSelectResult({ type: 'map', item: item.rawItem as UpazilaInfo | LandmarkInfo });
    }
    setIsOpen(false);
    setQuery('');
  };

  const handleKeywordClick = (keyword: string) => {
    setQuery(keyword);
    setIsOpen(true);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative flex items-center">
        <Search className="w-3.5 h-3.5 absolute left-3 text-stone-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search keywords, records, timeline, maps, blogs..."
          className="w-48 sm:w-64 md:w-72 lg:w-80 pl-8 pr-7 py-1.5 text-xs font-serif bg-white/95 dark:bg-stone-800/95 hover:bg-white dark:hover:bg-stone-800 focus:bg-white dark:focus:bg-stone-800 border border-stone-300 dark:border-stone-700 focus:border-stone-800 dark:focus:border-amber-400 rounded-md transition-all shadow-xs focus:outline-hidden text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-400"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-2 p-0.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Dropdown Results Window with Keyword Indexer Mapping */}
      {isOpen && (
        <div className="absolute left-0 sm:right-0 sm:left-auto top-full mt-1.5 w-[330px] sm:w-[460px] bg-[#FBF9F5] dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-stone-200 dark:divide-stone-800 animate-fadeIn">
          {/* Header Bar */}
          <div className="px-3.5 py-2 bg-stone-100/90 dark:bg-stone-800/90 flex items-center justify-between text-[11px] font-serif text-stone-500 dark:text-stone-400">
            <span className="flex items-center gap-1.5 font-sans font-semibold text-stone-700 dark:text-stone-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              {cleanQuery.length >= 2
                ? `Mapped ${searchResults.length} indexed records to scroll target`
                : 'Archival Keyword Indexer & Auto-Scroll'}
            </span>
            <span className="font-mono text-[10px] text-stone-400">ESC to close</span>
          </div>

          {/* Quick Keyword Index Pills */}
          {keywordSuggestions.length > 0 && (
            <div className="px-3 py-2 bg-stone-50/70 dark:bg-stone-900/60 border-b border-stone-200 dark:border-stone-800">
              <div className="text-[10px] uppercase font-mono font-bold text-stone-400 flex items-center gap-1 mb-1.5">
                <Hash className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                <span>Indexed Keywords:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {keywordSuggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleKeywordClick(sug.keyword)}
                    className="px-2 py-0.5 rounded-md text-[11px] font-serif bg-white dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-stone-700 dark:text-stone-300 hover:text-amber-900 dark:hover:text-amber-200 border border-stone-200 dark:border-stone-700 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>{sug.keyword}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800">
            {searchResults.length > 0 ? (
              searchResults.map((match) => {
                const item = match.item;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectMatch(match)}
                    className="w-full text-left p-3 hover:bg-amber-50/70 dark:hover:bg-amber-950/30 transition-colors group cursor-pointer flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between text-[11px] font-sans">
                      <div className="flex items-center gap-1.5 font-bold">
                        {item.domain === 'timeline' && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 text-[10px] flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Timeline
                          </span>
                        )}
                        {item.domain === 'archive' && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 text-[10px] flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> Archive
                          </span>
                        )}
                        {item.domain === 'blog' && (
                          <span className="px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-900 dark:text-sky-300 text-[10px] flex items-center gap-1">
                            <Feather className="w-3 h-3" /> Dispatch
                          </span>
                        )}
                        {item.domain === 'map' && (
                          <span className="px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-950 text-teal-900 dark:text-teal-300 text-[10px] flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> Geography
                          </span>
                        )}
                        {item.domain === 'audio' && (
                          <span className="px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-300 text-[10px] flex items-center gap-1">
                            <Headphones className="w-3 h-3" /> Audio
                          </span>
                        )}
                        <span className="text-stone-500 font-normal">{item.category}</span>
                      </div>

                      <div className="flex items-center gap-1 text-[10px] text-stone-400 font-mono">
                        {item.badge && (
                          <span className="px-1.5 py-0.2 bg-stone-200 dark:bg-stone-800 rounded">
                            {item.badge}
                          </span>
                        )}
                        <ArrowUpRight className="w-3 h-3 text-amber-600 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    <div className="text-xs font-serif font-black text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-snug">
                      {item.title}
                    </div>

                    <div className="text-[11px] font-serif text-stone-600 dark:text-stone-400 line-clamp-1 leading-relaxed">
                      {item.snippet}
                    </div>

                    {/* Matched Keywords Tags */}
                    {match.matchedKeywords.length > 0 && (
                      <div className="flex items-center gap-1 pt-0.5 overflow-x-auto">
                        <Tag className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                        <span className="text-[10px] font-sans text-stone-400">Match:</span>
                        {match.matchedKeywords.slice(0, 3).map((kw, kwIdx) => (
                          <span
                            key={kwIdx}
                            className="px-1.5 py-0.2 rounded bg-amber-100/70 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 font-mono text-[9px]"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })
            ) : cleanQuery.length >= 2 ? (
              <div className="p-6 text-center text-xs font-serif text-stone-500 dark:text-stone-400 space-y-1">
                <p>No indexed records matched "{query}".</p>
                <p className="text-[11px] text-stone-400 dark:text-stone-500">
                  Try searching "Chengmi", "Nal Khagra", "Mong Circle", "Manikchari", or "Regulation 1900".
                </p>
              </div>
            ) : (
              <div className="p-5 text-center text-xs font-serif text-stone-500 dark:text-stone-400 space-y-1">
                <p className="font-semibold text-stone-700 dark:text-stone-300">
                  Type to search across historical records, timeline milestones, and dispatches.
                </p>
                <p className="text-[11px] text-stone-400">
                  Selecting any entry will automatically scroll the page directly to its section.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
