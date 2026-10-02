import { INITIAL_ARCHIVES } from '../data/archiveData';
import { TIMELINE_EVENTS } from '../data/timelineData';
import { INITIAL_BLOGS } from '../data/blogData';
import { KHAGRACHARI_UPAZILAS, HISTORIC_LANDMARKS } from '../data/mapData';
import { CHT_AUDIO_ARCHIVES } from '../data/audioArchivesData';
import { ArchiveRecord, TimelineEvent, BlogPost, UpazilaInfo, LandmarkInfo } from '../types';
import { AudioRecord } from '../data/audioArchivesData';

export type IndexableDomain = 'timeline' | 'archive' | 'blog' | 'map' | 'audio';
export type AppTab = 'overview' | 'timeline' | 'map' | 'archives' | 'blog';

export interface IndexedItem {
  id: string;
  domain: IndexableDomain;
  title: string;
  subtitle?: string;
  snippet: string;
  targetTab: AppTab;
  elementId: string;
  keywords: string[];
  category: string;
  yearOrDate?: string | number;
  badge?: string;
  metadata?: Record<string, string | number | boolean>;
  rawItem: TimelineEvent | ArchiveRecord | BlogPost | UpazilaInfo | LandmarkInfo | AudioRecord;
}

export interface SearchMatch {
  item: IndexedItem;
  score: number;
  matchedKeywords: string[];
}

export interface KeywordSuggestion {
  keyword: string;
  count: number;
  primaryDomain: IndexableDomain;
}

class SearchIndexerService {
  private items: Map<string, IndexedItem> = new Map();
  private keywordIndex: Map<string, Set<string>> = new Map();
  private initialized: boolean = false;

  constructor() {
    this.buildIndex();
  }

  /**
   * Builds the inverted index mapping extracted keywords to documents
   */
  public buildIndex(): void {
    this.items.clear();
    this.keywordIndex.clear();

    // 1. Index Timeline Milestones
    TIMELINE_EVENTS.forEach((event) => {
      const keywords: string[] = [
        event.title,
        event.era,
        event.category,
        event.primaryLocation,
        String(event.year),
        event.yearDisplay,
        ...(event.localNameOrAlias ? [event.localNameOrAlias] : []),
        ...(event.references?.map((r) => r.authorOrBody) || []),
        ...(event.references?.map((r) => r.title) || []),
      ];

      const item: IndexedItem = {
        id: event.id,
        domain: 'timeline',
        title: event.title,
        subtitle: event.localNameOrAlias || `${event.yearDisplay} • ${event.era}`,
        snippet: event.summary,
        targetTab: 'timeline',
        elementId: `timeline-event-${event.id}`,
        keywords: this.dedupeAndClean(keywords),
        category: event.category,
        yearOrDate: event.yearDisplay,
        badge: event.circle ? `${event.circle.toUpperCase()} Circle` : 'General CHT',
        rawItem: event,
      };

      this.registerItem(item, `${event.title} ${event.summary} ${event.historicalSignificance || ''}`);
    });

    // 2. Index Archival Records & Treaties
    INITIAL_ARCHIVES.forEach((arch) => {
      const keywords: string[] = [
        arch.title,
        arch.accessionNumber,
        arch.category,
        arch.region,
        arch.era,
        String(arch.year),
        ...(arch.keywords || []),
        ...(arch.references?.map((r) => r.authorOrBody) || []),
        ...(arch.references?.map((r) => r.title) || []),
      ];

      const item: IndexedItem = {
        id: arch.id,
        domain: 'archive',
        title: arch.title,
        subtitle: `${arch.accessionNumber} • ${arch.region}`,
        snippet: arch.abstract,
        targetTab: 'archives',
        elementId: `archive-card-${arch.id}`,
        keywords: this.dedupeAndClean(keywords),
        category: arch.category,
        yearOrDate: arch.year,
        badge: arch.sensitivity.toUpperCase(),
        rawItem: arch,
      };

      this.registerItem(item, `${arch.title} ${arch.abstract} ${arch.fullTranscription.slice(0, 500)}`);
    });

    // 3. Index Scholarly Blog Posts & Field Notes
    INITIAL_BLOGS.forEach((blog) => {
      const keywords: string[] = [
        blog.title,
        blog.subtitle,
        blog.category,
        blog.author,
        blog.authorRole,
        ...(blog.references?.map((r) => r.authorOrBody) || []),
        ...(blog.references?.map((r) => r.title) || []),
        'Chengmi',
        'Nal Khagra',
        'Toponymy',
      ];

      const item: IndexedItem = {
        id: blog.id,
        domain: 'blog',
        title: blog.title,
        subtitle: blog.subtitle,
        snippet: blog.excerpt,
        targetTab: 'blog',
        elementId: `blog-post-${blog.id}`,
        keywords: this.dedupeAndClean(keywords),
        category: blog.category,
        yearOrDate: blog.date,
        badge: blog.readTime,
        rawItem: blog,
      };

      this.registerItem(item, `${blog.title} ${blog.subtitle} ${blog.excerpt} ${blog.content.slice(0, 600)}`);
    });

    // 4. Index Upazilas & Historical Geography
    KHAGRACHARI_UPAZILAS.forEach((upazila) => {
      const keywords: string[] = [
        upazila.name,
        upazila.bengaliName,
        ...upazila.historicalNames,
        ...upazila.keyRivers,
        ...upazila.landmarks,
        'Khagrachari Upazila',
        'Mong Circle',
      ];

      const item: IndexedItem = {
        id: upazila.id,
        domain: 'map',
        title: upazila.name,
        subtitle: `${upazila.bengaliName} • Area: ${upazila.areaSqKm} km²`,
        snippet: upazila.description,
        targetTab: 'map',
        elementId: `upazila-card-${upazila.id}`,
        keywords: this.dedupeAndClean(keywords),
        category: 'Upazila Geography',
        badge: 'Mong Circle',
        rawItem: upazila,
      };

      this.registerItem(item, `${upazila.name} ${upazila.description} ${upazila.mongCircleSignificance}`);
    });

    // 5. Index Landmarks & Heritage Points
    HISTORIC_LANDMARKS.forEach((lm) => {
      const keywords: string[] = [
        lm.name,
        lm.category,
        lm.upazilaId,
        'Landmark',
        'Historical Sanctuary',
      ];

      const item: IndexedItem = {
        id: lm.id,
        domain: 'map',
        title: lm.name,
        subtitle: `${lm.category} • ${lm.upazilaId}`,
        snippet: lm.historicalContext,
        targetTab: 'map',
        elementId: `upazila-card-${lm.id}`,
        keywords: this.dedupeAndClean(keywords),
        category: lm.category,
        badge: 'Heritage Site',
        rawItem: lm,
      };

      this.registerItem(item, `${lm.name} ${lm.summary} ${lm.historicalContext}`);
    });

    // 6. Index Audio Archives & Field Tapes
    CHT_AUDIO_ARCHIVES.forEach((audio) => {
      const keywords: string[] = [
        audio.title,
        audio.nativeTitle,
        audio.accessionNumber,
        audio.community,
        audio.narratorOrPerformer,
        audio.category,
        audio.recordedLocation,
        String(audio.recordedYear),
        ...audio.tags,
      ];

      const item: IndexedItem = {
        id: audio.id,
        domain: 'audio',
        title: audio.title,
        subtitle: `${audio.community} • ${audio.narratorOrPerformer} (${audio.recordedYear})`,
        snippet: audio.summary,
        targetTab: 'archives',
        elementId: `archive-card-${audio.id}`,
        keywords: this.dedupeAndClean(keywords),
        category: audio.category,
        yearOrDate: audio.recordedYear,
        badge: audio.audioDurationDisplay,
        rawItem: audio,
      };

      this.registerItem(item, `${audio.title} ${audio.summary} ${audio.narratorOrPerformer}`);
    });

    this.initialized = true;
  }

  private dedupeAndClean(arr: string[]): string[] {
    const set = new Set<string>();
    arr.forEach((str) => {
      if (!str) return;
      const clean = str.trim();
      if (clean.length >= 2) set.add(clean);
    });
    return Array.from(set);
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s\u0980-\u09FF-]/g, ' ') // support alphanumeric and Bengali unicode
      .split(/\s+/)
      .filter((t) => t.length >= 2);
  }

  private registerItem(item: IndexedItem, bodyText: string): void {
    this.items.set(item.id, item);

    // Index explicitly declared keywords (weighted highest)
    item.keywords.forEach((kw) => {
      const tokens = this.tokenize(kw);
      tokens.forEach((token) => {
        if (!this.keywordIndex.has(token)) {
          this.keywordIndex.set(token, new Set());
        }
        this.keywordIndex.get(token)!.add(item.id);
      });
    });

    // Index body text tokens
    const bodyTokens = this.tokenize(bodyText);
    bodyTokens.forEach((token) => {
      if (!this.keywordIndex.has(token)) {
        this.keywordIndex.set(token, new Set());
      }
      this.keywordIndex.get(token)!.add(item.id);
    });
  }

  /**
   * Search across all indexed repositories with keyword scoring
   */
  public search(query: string, maxResults: number = 10): SearchMatch[] {
    if (!this.initialized) this.buildIndex();

    const cleanQuery = query.trim().toLowerCase();
    if (cleanQuery.length < 2) return [];

    const queryTokens = this.tokenize(cleanQuery);
    if (queryTokens.length === 0) return [];

    const scores = new Map<string, { score: number; matchedKeywords: Set<string> }>();

    queryTokens.forEach((token) => {
      // 1. Exact token matches in index
      const exactMatches = this.keywordIndex.get(token);
      if (exactMatches) {
        exactMatches.forEach((itemId) => {
          const current = scores.get(itemId) || { score: 0, matchedKeywords: new Set() };
          current.score += 15;
          current.matchedKeywords.add(token);
          scores.set(itemId, current);
        });
      }

      // 2. Prefix / Substring matches in keyword index
      this.keywordIndex.forEach((itemIds, indexedToken) => {
        if (indexedToken !== token && indexedToken.includes(token)) {
          itemIds.forEach((itemId) => {
            const current = scores.get(itemId) || { score: 0, matchedKeywords: new Set() };
            current.score += 8;
            current.matchedKeywords.add(indexedToken);
            scores.set(itemId, current);
          });
        }
      });
    });

    // Bonus points for direct matches in title, explicit keywords, and accession numbers
    this.items.forEach((item, itemId) => {
      const titleLower = item.title.toLowerCase();
      if (titleLower.includes(cleanQuery)) {
        const current = scores.get(itemId) || { score: 0, matchedKeywords: new Set() };
        current.score += 25;
        current.matchedKeywords.add(cleanQuery);
        scores.set(itemId, current);
      }

      item.keywords.forEach((kw) => {
        if (kw.toLowerCase().includes(cleanQuery)) {
          const current = scores.get(itemId) || { score: 0, matchedKeywords: new Set() };
          current.score += 20;
          current.matchedKeywords.add(kw);
          scores.set(itemId, current);
        }
      });
    });

    // Sort by descending score
    const results: SearchMatch[] = [];
    scores.forEach((entry, itemId) => {
      const item = this.items.get(itemId);
      if (item) {
        results.push({
          item,
          score: entry.score,
          matchedKeywords: Array.from(entry.matchedKeywords),
        });
      }
    });

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, maxResults);
  }

  /**
   * Suggest popular historical keywords for instant auto-complete
   */
  public getKeywordSuggestions(prefix: string = '', limit: number = 8): KeywordSuggestion[] {
    const clean = prefix.trim().toLowerCase();
    const suggestions: KeywordSuggestion[] = [];

    const topKeywords: Array<{ keyword: string; domain: IndexableDomain }> = [
      { keyword: 'Chengmi toponymy', domain: 'blog' },
      { keyword: 'Nal Khagra reed grass', domain: 'blog' },
      { keyword: 'Regulation 1900 Act I', domain: 'archive' },
      { keyword: 'Mong Circle Raja', domain: 'archive' },
      { keyword: 'Mun Circle 1860', domain: 'timeline' },
      { keyword: 'Manikchari Rajbari', domain: 'map' },
      { keyword: 'Sajek Valley ridge', domain: 'map' },
      { keyword: 'Alutila subterranean cave', domain: 'map' },
      { keyword: 'Dewan Ranu Khan 1776', domain: 'timeline' },
      { keyword: 'Radcliffe boundary 1947', domain: 'timeline' },
      { keyword: 'Kaptai reservoir 1960', domain: 'timeline' },
      { keyword: 'Marma folk ballad', domain: 'audio' },
      { keyword: 'Tipra flute song', domain: 'audio' },
      { keyword: 'Customary Headman Rule 34', domain: 'archive' },
      { keyword: 'Ramgarh border fort', domain: 'map' },
    ];

    topKeywords.forEach((entry) => {
      if (!clean || entry.keyword.toLowerCase().includes(clean)) {
        suggestions.push({
          keyword: entry.keyword,
          count: 1,
          primaryDomain: entry.domain,
        });
      }
    });

    return suggestions.slice(0, limit);
  }

  /**
   * Calculates the exact vertical scroll position of an element by ID
   */
  public getScrollPosition(elementId: string, headerOffset: number = 84): number | null {
    if (typeof document === 'undefined') return null;
    const el = document.getElementById(elementId);
    if (!el) return null;

    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return Math.max(0, rect.top + scrollTop - headerOffset);
  }

  /**
   * Automatically switches application tab if needed, waits for element mounting,
   * smoothly scrolls to its exact position, and applies a spotlight highlight.
   */
  public navigateToAndScroll(
    targetTab: AppTab,
    elementId: string,
    setActiveTab: (tab: AppTab) => void,
    onFound?: (el: HTMLElement) => void
  ): void {
    if (typeof window === 'undefined') return;

    // 1. Switch tab if not already on target
    setActiveTab(targetTab);

    // 2. Poll for element appearance (giving React time to render tab switch)
    let attempts = 0;
    const maxAttempts = 16;
    const intervalMs = 60;

    const checkAndScroll = () => {
      attempts++;
      const el = document.getElementById(elementId);

      if (el) {
        // Calculate offset and scroll
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetScrollY = Math.max(0, rect.top + scrollTop - 84);

        window.scrollTo({
          top: targetScrollY,
          behavior: 'smooth',
        });

        // Apply spotlight aura
        el.classList.add('ring-4', 'ring-amber-400', 'dark:ring-amber-500', 'ring-offset-4', 'shadow-2xl', 'animate-pulse');
        setTimeout(() => {
          el.classList.remove('ring-4', 'ring-amber-400', 'dark:ring-amber-500', 'ring-offset-4', 'shadow-2xl', 'animate-pulse');
        }, 3600);

        onFound?.(el);
      } else if (attempts < maxAttempts) {
        setTimeout(checkAndScroll, intervalMs);
      }
    };

    setTimeout(checkAndScroll, 50);
  }
}

export const searchIndexer = new SearchIndexerService();
