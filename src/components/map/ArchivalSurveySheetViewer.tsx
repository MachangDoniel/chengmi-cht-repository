import React, { useState } from 'react';
import {
  Compass,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  BookOpen,
  Calendar,
  Layers,
  Info,
  ExternalLink,
  Shield,
  Download,
} from 'lucide-react';

interface ArchivalSheet {
  id: string;
  title: string;
  year: string;
  surveyor: string;
  repository: string;
  callNumber: string;
  description: string;
  scale: string;
  imageUrl: string;
  keyFeatures: string[];
}

const ARCHIVAL_SHEETS: ArchivalSheet[] = [
  {
    id: 'sheet-1897',
    title: '1897 Survey of India: Chittagong Hill Tracts & Chengi Valley',
    year: '1897',
    surveyor: 'Major J.R. Hobday, Surveyor General of India',
    repository: 'The British Library Map Collection, London',
    callNumber: 'IOR/X/3020/79M',
    scale: '1 inch = 1 mile (1:63,360)',
    description: 'Detailed colonial trigonometrical survey showing the Chengi River riverine corridor, Manikchari Royal Seat, Ramgarh frontier fortress, and customary mouza boundaries established under the Mong Chief.',
    imageUrl: 'https://images.unsplash.com/photo-1524654458049-e36be0721fa2?auto=format&fit=crop&w=1200&q=85',
    keyFeatures: [
      'Chengi River meanders through Sadar valley',
      'Manikchari Rajbari court compound & coronation temple',
      'Ramgarh frontier barter ghat with Tripura Kingdom',
      'Indigenous Jhum cultivation ridges marked with elevation benchmarks',
    ],
  },
  {
    id: 'sheet-1776',
    title: '1776 Major James Rennell: A Bengal Atlas (Plate VI: Chittagong Frontier)',
    year: '1776',
    surveyor: 'Major James Rennell, First Surveyor General of Bengal',
    repository: 'National Archives of Bangladesh / East India Company Records',
    callNumber: 'NAB/CART/1776-06',
    scale: '1 inch = 5 miles',
    description: 'Earliest scientific cartographic chart of the eastern borderland. Shows the Karpas Mahal cotton barter posts along the Feni River and marks the sovereign hill country as independent tribal territory beyond British civil jurisdiction.',
    imageUrl: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?auto=format&fit=crop&w=1200&q=85',
    keyFeatures: [
      'Original Feni River border demarcation',
      'Karpas Mahal cotton toll stations at Ramgarh & Rangunia',
      'Marked as "Unexplored Country of Independent Hill Rajas"',
      'Ancient caravan trails connecting Bengal to Arakan',
    ],
  },
  {
    id: 'sheet-1900',
    title: '1900 Regulation I Delimitation Map: The Three Customary Circles',
    year: '1900',
    surveyor: 'Government of Bengal, Political Department',
    repository: 'Chittagong District Collectorate & Mong Circle Archives',
    callNumber: 'CHT/REG-1900/MAP-1',
    scale: '1 inch = 4 miles',
    description: 'Statutory cartographic annexure to the Chittagong Hill Tracts Regulation 1900 (Act I of 1900). Officially legally defines the boundary lines between the Mong Circle (Khagrachari), Chakma Circle (Rangamati), and Bohmong Circle (Bandarban).',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=85',
    keyFeatures: [
      'Legal boundaries of Mong, Chakma, and Bohmong Circles',
      'Excluded Area administrative perimeter',
      'Hereditary mouza headman jurisdictions',
      'Non-alienation land covenant demarcation',
    ],
  },
];

interface ArchivalSurveySheetViewerProps {
  onOpenLightbox?: (image: { title: string; caption: string; category: string; imageUrl: string; archivalSource?: string; year?: string }) => void;
}

export const ArchivalSurveySheetViewer: React.FC<ArchivalSurveySheetViewerProps> = ({ onOpenLightbox }) => {
  const [selectedSheetId, setSelectedSheetId] = useState<string>('sheet-1897');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const activeSheet = ARCHIVAL_SHEETS.find((s) => s.id === selectedSheetId) || ARCHIVAL_SHEETS[0];

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 25, 250));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 25, 75));
  const handleResetZoom = () => setZoomLevel(100);

  return (
    <div className="space-y-4">
      {/* Sheet Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-stone-100 dark:bg-stone-800/80 rounded-xl border border-stone-200 dark:border-stone-700 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
          <span className="font-mono text-[10px] uppercase font-bold text-stone-500 px-1">Survey Plate:</span>
          {ARCHIVAL_SHEETS.map((sheet) => (
            <button
              key={sheet.id}
              onClick={() => {
                setSelectedSheetId(sheet.id);
                setZoomLevel(100);
              }}
              className={`px-3 py-1.5 rounded-lg font-serif font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                selectedSheetId === sheet.id
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white bg-white dark:bg-stone-900'
              }`}
            >
              <Calendar className="w-3 h-3 text-amber-300" />
              <span>{sheet.year} • {sheet.title.split(':')[0]}</span>
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-white dark:bg-stone-900 p-1 rounded-lg border border-stone-200 dark:border-stone-700">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 75}
            className="p-1 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded disabled:opacity-40 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[10px] px-1.5 text-stone-600 dark:text-stone-300 font-bold">{zoomLevel}%</span>
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 250}
            className="p-1 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded disabled:opacity-40 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          {onOpenLightbox && (
            <button
              onClick={() =>
                onOpenLightbox({
                  title: activeSheet.title,
                  caption: activeSheet.description,
                  category: 'Historical Cartography',
                  imageUrl: activeSheet.imageUrl,
                  archivalSource: `${activeSheet.repository} (${activeSheet.callNumber})`,
                  year: activeSheet.year,
                })
              }
              className="p-1 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950 rounded cursor-pointer ml-1"
              title="Full-Screen Inspection"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Archival Plate Canvas */}
      <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden border-2 border-stone-300 dark:border-stone-800 shadow-xl bg-stone-950 flex items-center justify-center">
        <div className="w-full h-full overflow-auto flex items-center justify-center p-4">
          <div
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transition: 'transform 0.2s ease-out',
              transformOrigin: 'center center',
            }}
            className="relative max-w-full max-h-full shadow-2xl rounded-lg overflow-hidden border border-amber-900/40"
          >
            <img
              src={activeSheet.imageUrl}
              alt={activeSheet.title}
              className="w-full h-auto object-contain select-none"
            />

            {/* Antique Archival Cartouche Overlay */}
            <div className="absolute top-4 left-4 p-3 bg-stone-950/85 backdrop-blur-md rounded-xl border border-amber-500/30 text-white max-w-xs shadow-2xl text-[11px] font-serif">
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold mb-1 flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-amber-400" />
                <span>Survey Plate Cartouche</span>
              </div>
              <div className="font-bold text-stone-100 text-xs">{activeSheet.title}</div>
              <div className="text-[10px] text-stone-400 font-mono mt-1">
                Scale: {activeSheet.scale} • {activeSheet.year}
              </div>
              <div className="text-[10px] text-amber-200/80 mt-1 font-mono">
                Call No: {activeSheet.callNumber}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sheet Provenance & Archival Feature Key */}
      <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-stone-800/60 border border-amber-200 dark:border-stone-700 space-y-3 text-xs font-serif">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-amber-200/80 dark:border-stone-700 pb-2">
          <div>
            <span className="font-bold text-stone-900 dark:text-stone-100">{activeSheet.surveyor}</span>
            <span className="text-stone-500 dark:text-stone-400 ml-2">({activeSheet.repository})</span>
          </div>
          <span className="text-[11px] font-mono text-amber-800 dark:text-amber-400 font-bold">
            Shelfmark: {activeSheet.callNumber}
          </span>
        </div>

        <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-xs">
          {activeSheet.description}
        </p>

        <div>
          <div className="text-[10px] uppercase font-mono font-bold text-stone-500 dark:text-stone-400 mb-1">
            Notated Historical Toponyms & Cartographic Features:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {activeSheet.keyFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] text-stone-800 dark:text-stone-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
