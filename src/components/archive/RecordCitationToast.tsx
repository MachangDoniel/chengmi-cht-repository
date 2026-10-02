import React, { useState } from 'react';
import { ArchiveRecord } from '../../types';
import {
  Quote,
  Copy,
  Check,
  X,
  Minimize2,
  Maximize2,
  BookOpen,
  Download,
  Share2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface RecordCitationToastProps {
  record: ArchiveRecord | null;
  onClose: () => void;
}

export type CitationStyle = 'apa' | 'chicago_bib' | 'chicago_note' | 'bibtex';

export const formatArchiveCitation = (record: ArchiveRecord, style: CitationStyle): string => {
  const primaryRef = record.references?.[0];
  const author = primaryRef?.authorOrBody || 'Mong Circle Royal Secretariat & British Hill Tracts Administration';
  const year = record.year || primaryRef?.year || 'n.d.';
  const shelfmark = primaryRef?.shelfmarkOrCallNumber || record.accessionNumber;
  const repository = primaryRef?.urlOrRepository || 'Chittagong Hill Tracts Historical Repository (Manikchari & Rangamati)';

  switch (style) {
    case 'apa':
      return `${author} (${year}). ${record.title} (Accession No. ${record.accessionNumber}) [Archival Manuscript]. ${repository}. Call No: ${shelfmark}.`;

    case 'chicago_bib':
      return `${author}. "${record.title}." ${year}. Archival Record ${record.accessionNumber}, Shelfmark ${shelfmark}. ${repository}. Consulted via Chengmi Historical Research Archives.`;

    case 'chicago_note':
      return `${author}, "${record.title}," ${year}, Archival Series ${record.accessionNumber}, Call No. ${shelfmark}, ${repository}, accessed via Chengmi Historical Research Repository.`;

    case 'bibtex':
      const citeKey = `${author.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '')}_${year}_${record.accessionNumber.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      return `@archive{${citeKey},
  author       = {${author}},
  title        = {${record.title}},
  year         = {${year}},
  number       = {${record.accessionNumber}},
  series       = {${record.category}},
  institution  = {${repository}},
  howpublished = {Call No. ${shelfmark}},
  note         = {Region: ${record.region}; Historical Era: ${record.era}; Consulted via Chengmi Archival Repository}
}`;

    default:
      return `${author} (${year}). ${record.title}. ${shelfmark}.`;
  }
};

export const RecordCitationToast: React.FC<RecordCitationToastProps> = ({ record, onClose }) => {
  const [style, setStyle] = useState<CitationStyle>('chicago_bib');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  if (!record) return null;

  const citationText = formatArchiveCitation(record, style);

  const handleCopy = () => {
    navigator.clipboard.writeText(citationText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2600);
  };

  const handleDownload = () => {
    const ext = style === 'bibtex' ? 'bib' : 'txt';
    const blob = new Blob([citationText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `citation-${record.accessionNumber.toLowerCase()}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Minimized floating trigger pill
  if (isMinimized) {
    return (
      <div className="fixed bottom-5 right-5 z-50 animate-bounce-subtle">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-stone-900/95 dark:bg-stone-800/95 text-stone-100 border-2 border-amber-500/70 shadow-2xl hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
        >
          <Quote className="w-4 h-4 text-amber-400" />
          <div className="text-left text-xs">
            <span className="font-mono text-[10px] text-amber-300 block leading-tight font-bold">
              {record.accessionNumber}
            </span>
            <span className="font-serif font-semibold text-stone-200 truncate max-w-[180px] block">
              Cite: {record.title}
            </span>
          </div>
          <Maximize2 className="w-3.5 h-3.5 text-stone-400 ml-1 hover:text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 max-w-lg w-[calc(100vw-1.5rem)] sm:w-full animate-fadeIn select-none">
      <div className="bg-stone-900/95 dark:bg-[#11161d]/95 text-stone-100 rounded-2xl border-2 border-amber-500/60 shadow-2xl backdrop-blur-xl p-4 sm:p-5 space-y-4 ring-1 ring-black/20">
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-3 border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/40">
              <Quote className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-800/60">
                  {record.accessionNumber}
                </span>
                <span className="text-[11px] font-serif text-stone-400">
                  {record.year} • {record.region.split('(')[0]}
                </span>
              </div>
              <h4 className="text-sm font-serif font-black text-white truncate mt-0.5">
                Cite: {record.title}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              title="Minimize panel"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              title="Dismiss citation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Style Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-stone-950/80 rounded-xl border border-stone-800 text-xs font-serif overflow-x-auto">
          <button
            onClick={() => setStyle('chicago_bib')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap font-medium ${
              style === 'chicago_bib'
                ? 'bg-amber-600 text-white font-bold shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Chicago (Biblio)
          </button>
          <button
            onClick={() => setStyle('chicago_note')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap font-medium ${
              style === 'chicago_note'
                ? 'bg-amber-600 text-white font-bold shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Chicago (Note)
          </button>
          <button
            onClick={() => setStyle('apa')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap font-medium ${
              style === 'apa'
                ? 'bg-amber-600 text-white font-bold shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            APA 7th
          </button>
          <button
            onClick={() => setStyle('bibtex')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap font-medium ${
              style === 'bibtex'
                ? 'bg-amber-600 text-white font-bold shadow-xs'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            BibTeX
          </button>
        </div>

        {/* Formatted Citation Output Box */}
        <div className="relative group">
          <div className="p-3.5 rounded-xl bg-stone-950/90 border border-stone-800 text-xs text-stone-200 font-serif leading-relaxed max-h-36 overflow-y-auto selection:bg-amber-800 select-text">
            {style === 'bibtex' ? (
              <pre className="font-mono text-[11px] text-amber-200/90 whitespace-pre-wrap">
                {citationText}
              </pre>
            ) : (
              <p className="italic">{citationText}</p>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-2 pt-1 text-xs">
          <div className="text-[11px] font-mono text-stone-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Ref: {record.references?.[0]?.shelfmarkOrCallNumber || record.accessionNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-serif font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-700"
              title="Download citation file"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              onClick={handleCopy}
              className={`px-4 py-1.5 rounded-xl font-serif font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                isCopied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 hover:bg-amber-500 text-white'
              }`}
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Citation</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
