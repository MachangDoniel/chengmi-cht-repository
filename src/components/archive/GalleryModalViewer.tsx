import React, { useState, useEffect, useRef } from 'react';
import { GalleryItem } from '../../types';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  BookOpen,
  MapPin,
  Calendar,
  Layers,
  Info,
  ExternalLink,
  Download,
  Minimize2,
} from 'lucide-react';

interface GalleryModalViewerProps {
  item: GalleryItem;
  allItems: GalleryItem[];
  onClose: () => void;
  onSelectItem: (item: GalleryItem) => void;
}

export const GalleryModalViewer: React.FC<GalleryModalViewerProps> = ({
  item,
  allItems,
  onClose,
  onSelectItem,
}) => {
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);
  const [citationFormat, setCitationFormat] = useState<'APA' | 'Chicago' | 'Shelfmark'>('Chicago');
  const containerRef = useRef<HTMLDivElement>(null);

  const currentIndex = allItems.findIndex((i) => i.id === item.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allItems.length - 1;

  // Reset transforms when item changes
  useEffect(() => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  }, [item.id]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev) {
        onSelectItem(allItems[currentIndex - 1]);
      } else if (e.key === 'ArrowRight' && hasNext) {
        onSelectItem(allItems[currentIndex + 1]);
      } else if (e.key === '+' || e.key === '=') {
        setScale((prev) => Math.min(prev + 0.3, 4));
      } else if (e.key === '-') {
        setScale((prev) => Math.max(prev - 0.3, 0.6));
      } else if (e.key === '0') {
        setScale(1);
        setPosition({ x: 0, y: 0 });
        setRotation(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasPrev, hasNext, allItems, onSelectItem, onClose]);

  // Mouse drag handlers for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom controls
  const handleZoomIn = () => setScale((p) => Math.min(p + 0.3, 4));
  const handleZoomOut = () => setScale((p) => Math.max(p - 0.3, 0.6));
  const handleRotate = () => setRotation((p) => (p + 90) % 360);
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  // Citation generator
  const getCitation = (format: 'APA' | 'Chicago' | 'Shelfmark') => {
    const ref = item.references[0];
    if (format === 'APA') {
      return `${ref?.authorOrBody || 'Archival Survey'} (${item.year}). ${item.title}. ${ref?.urlOrRepository || 'Chittagong Hill Tracts Historical Repository'}. Shelfmark: ${item.archiveRef}.`;
    }
    if (format === 'Chicago') {
      return `${ref?.authorOrBody || 'Archival Officer'}. "${item.title}." ${item.year}. ${item.location}. Archival Call: ${item.archiveRef}. Physical Medium: ${item.physicalMedium || 'Glass Plate / Lithograph'}. Cited via Chengmi Repository.`;
    }
    return `[CALL NUMBER: ${item.archiveRef}] :: ${item.title} (${item.year}) :: Medium: ${item.physicalMedium || 'Archival Plate'} :: Dimensions: ${item.dimensions || 'Imperial Standard'}.`;
  };

  const copyCitationToClipboard = (format: 'APA' | 'Chicago' | 'Shelfmark') => {
    const text = getCitation(format);
    navigator.clipboard.writeText(text);
    setCopiedCitation(format);
    setTimeout(() => setCopiedCitation(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col text-white select-none animate-fadeIn overflow-hidden">
      {/* Top Header & Inspection Toolbar */}
      <div className="h-16 px-4 sm:px-6 bg-stone-900/90 border-b border-stone-800 flex items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 whitespace-nowrap">
            {item.type === 'map' ? 'Archival Map' : 'Historical Photograph'}
          </span>
          <div className="truncate">
            <h2 className="font-serif font-bold text-sm sm:text-base text-stone-100 truncate">
              {item.title}
            </h2>
            <div className="text-[11px] font-mono text-stone-400 flex items-center gap-2">
              <span>{item.year}</span>
              <span>•</span>
              <span className="truncate">{item.location}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="hidden sm:flex items-center gap-1 bg-stone-800/80 p-1 rounded-xl border border-stone-700/60">
            <button
              onClick={handleZoomIn}
              className="p-1.5 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-1.5 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleRotate}
              className="p-1.5 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Rotate 90° Clockwise"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="px-2 py-1 rounded-lg hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
              title="Reset Zoom (0)"
            >
              {Math.round(scale * 100)}%
            </button>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
              sidebarOpen
                ? 'bg-amber-600/30 text-amber-300 border-amber-500/40'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
            }`}
          >
            <Info className="w-4 h-4" />
            <span className="hidden sm:inline">Archival Details</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer ml-1"
            title="Close Viewer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Left/Prev Arrow */}
        {hasPrev && (
          <button
            onClick={() => onSelectItem(allItems[currentIndex - 1])}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-700/80 text-white transition-all shadow-xl hover:scale-110 cursor-pointer backdrop-blur-xs"
            title="Previous Plate (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right/Next Arrow */}
        {hasNext && (
          <button
            onClick={() => onSelectItem(allItems[currentIndex + 1])}
            className={`absolute top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 border border-stone-700/80 text-white transition-all shadow-xl hover:scale-110 cursor-pointer backdrop-blur-xs ${
              sidebarOpen ? 'right-[22rem] sm:right-[26rem]' : 'right-4'
            }`}
            title="Next Plate (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* High-Resolution Interactive Image Viewport */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden ${
            scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
          }`}
        >
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.25s ease-out',
            }}
            className="max-w-full max-h-full flex items-center justify-center"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="max-h-[82vh] max-w-[85vw] object-contain rounded-lg shadow-2xl pointer-events-none ring-1 ring-white/10"
              draggable={false}
            />
          </div>
        </div>

        {/* Collapsible Archival Sidebar */}
        {sidebarOpen && (
          <div className="w-80 sm:w-96 bg-stone-900/95 border-l border-stone-800 p-5 sm:p-6 overflow-y-auto space-y-6 z-20 backdrop-blur-md text-stone-200">
            {/* Header info */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                Archival Record Catalog
              </div>
              <h3 className="text-lg font-serif font-black text-white mt-1">
                {item.title}
              </h3>
              <div className="text-xs text-stone-400 font-serif mt-1">
                {item.category} • {item.era}
              </div>
            </div>

            {/* Description & Caption */}
            <div className="space-y-2">
              <div className="text-xs font-serif font-bold text-stone-300">
                Archival Caption:
              </div>
              <p className="text-xs font-serif text-stone-300 leading-relaxed bg-stone-950/60 p-3 rounded-xl border border-stone-800">
                {item.caption}
              </p>
            </div>

            {/* Deep Curator Notes */}
            <div className="space-y-2">
              <div className="text-xs font-serif font-bold text-amber-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Historical Context & Curatorial Notes:</span>
              </div>
              <p className="text-xs font-serif text-stone-400 leading-relaxed">
                {item.curatorNotes}
              </p>
            </div>

            {/* Plate Specifications Matrix */}
            <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between text-stone-400">
                <span>Archive Call Ref:</span>
                <span className="text-amber-400 font-bold truncate max-w-[170px]">{item.archiveRef}</span>
              </div>
              <div className="flex items-center justify-between text-stone-400">
                <span>Location:</span>
                <span className="text-stone-200">{item.location}</span>
              </div>
              <div className="flex items-center justify-between text-stone-400">
                <span>Chronology:</span>
                <span className="text-stone-200">{item.year}</span>
              </div>
              {item.physicalMedium && (
                <div className="flex items-center justify-between text-stone-400">
                  <span>Physical Medium:</span>
                  <span className="text-stone-200 text-[11px] text-right max-w-[160px] truncate">{item.physicalMedium}</span>
                </div>
              )}
              {item.dimensions && (
                <div className="flex items-center justify-between text-stone-400">
                  <span>Dimensions:</span>
                  <span className="text-stone-200">{item.dimensions}</span>
                </div>
              )}
            </div>

            {/* Primary Source Citation & Copy */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-300">
                <span>Academic Citation</span>
                <div className="flex items-center gap-1 text-[11px] font-mono">
                  {(['Chicago', 'APA', 'Shelfmark'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setCitationFormat(fmt)}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${
                        citationFormat === fmt
                          ? 'bg-amber-500/20 text-amber-300 font-bold'
                          : 'text-stone-500 hover:text-stone-300'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/90 border border-stone-800 text-[11px] font-mono text-stone-400 leading-relaxed relative group">
                <p>{getCitation(citationFormat)}</p>
                <button
                  onClick={() => copyCitationToClipboard(citationFormat)}
                  className="mt-2 w-full py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-serif font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-stone-700"
                >
                  {copiedCitation === citationFormat ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Citation Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-400" />
                      <span>Copy {citationFormat} Citation</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <div className="text-[10px] uppercase font-bold text-stone-500">
                Keywords & Thematic Tags
              </div>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 text-[11px] font-serif border border-stone-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="h-10 px-4 sm:px-6 bg-stone-900 border-t border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-400 z-20">
        <div className="flex items-center gap-3">
          <span>
            Item {currentIndex + 1} of {allItems.length}
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Use Arrow keys to browse plates, Esc to exit</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={item.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 flex items-center gap-1 transition-colors"
          >
            <span>Open Original Image</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
