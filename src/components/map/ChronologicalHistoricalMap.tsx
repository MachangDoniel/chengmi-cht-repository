import React, { useState, useEffect } from 'react';
import { TimelineLayers } from './MapLayerControls';
import {
  Clock,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Shield,
  Crown,
  Compass,
  Sparkles,
  Info,
  BookOpen,
} from 'lucide-react';

export interface CartographicEra {
  year: string;
  title: string;
  subheading: string;
  description: string;
  features: string[];
  keyFigures: string[];
  archivalSource: string;
  mapType: 'karpas' | 'mun_circle' | 'three_circles' | 'excluded_1900' | 'partition_1947' | 'modern_1983';
}

export const CARTOGRAPHIC_ERAS: CartographicEra[] = [
  {
    year: '1760–1787',
    title: 'Karpas Mahal & Mughal Borderland',
    subheading: 'Cotton Tribute Frontier & Ranu Khan Guerrilla Defense',
    description: 'The Chittagong Hill Tracts formed a semi-autonomous buffer between the Mughal Empire / British Bengal and the Kingdom of Arakan. Cotton tribute treaties (Karpas Mahal) were paid in raw cotton maunds at frontier toll gates at Rangunia and Ramgarh.',
    features: [
      'Undefined eastern frontier with Independent Tripura & Arakan',
      'Tribute collection posts at Ramgarh, Rangunia & Fatikchhari',
      'Guerrilla defense led by Dewan Ranu Khan against East India Company forces',
      'Free trade of salt, iron, and dried fish for mountain cotton',
    ],
    keyFigures: ['Dewan Ranu Khan', 'Chieftain Mrachai', 'Harry Verelst (Chittagong Chief)'],
    archivalSource: 'Bengal Revenue Consultations (1776–1787) • British Library IOR',
    mapType: 'karpas',
  },
  {
    year: '1860',
    title: 'Act XXII & The "Mun Circle" Formation',
    subheading: 'Colonial Annexation & Separation from Chittagong District',
    description: 'The British Crown formally annexed the hills following Kuki raids, separating them from Chittagong District. In initial British revenue surveys by Captain Thomas Herbert Lewin, the northern territory was recorded as the "Mun Circle" for indigenous Tipra populations.',
    features: [
      'Official creation of Chittagong Hill Tracts under Superintendent of Hill Tribes',
      'The northern hills designated in imperial gazettes as "Mun Circle"',
      'Establishment of colonial outposts at Chandraghona and Ramgarh',
      'Demarcation of the administrative boundary with Bengal plains',
    ],
    keyFigures: ['Captain Thomas Herbert Lewin', 'Lord Canning', 'Tipra Clan Chiefs'],
    archivalSource: 'Act XXII of 1860 • Lewin: The Hill Tracts of Chittagong (1869)',
    mapType: 'mun_circle',
  },
  {
    year: '1881–1884',
    title: 'Tripartite Circle Delimitation & The Great Bypass',
    subheading: 'Alexander Mackenzie Codification & Creation of Mong Circle',
    description: 'Sir Alexander Mackenzie codified 3 permanent revenue circles. To counter territorial expansion claims by the Maharaja of Tripura, British administrators bypassed Tipra rulers and recognized the Marma chief at Manikchari, officially renaming it the "Mong Circle".',
    features: [
      'Northern Mong Circle codified with Royal Palace at Manikchari',
      'Central Chakma Circle formalized at Rangamati',
      'Southern Bohmong Circle codified at Bandarban',
      'Territorial buffer established against the Kingdom of Twipra',
    ],
    keyFigures: ['Sir Alexander Mackenzie', 'King Narabadi (Mong)', 'King Harish Chandra (Chakma)'],
    archivalSource: 'Mackenzie: History of the Relations of the Government with the Hill Tribes (1884)',
    mapType: 'three_circles',
  },
  {
    year: '1900',
    title: 'Regulation I of 1900 (The CHT Manual)',
    subheading: 'Codified Customary Autonomy & "Excluded Area" Status',
    description: 'The historic CHT Manual strictly codified indigenous land tenure, prohibiting non-indigenous plainsmen from acquiring hill lands. Customary civil and family disputes were placed under the sole jurisdiction of the three hereditary Kings and Mouza Headmen.',
    features: [
      'Complete exclusion from provincial Bengal electoral politics',
      'Customary royal court arbitration for the 3 Chiefs',
      'Establishment of the 3-tier administration: Circle Chief, Mouza Headman, Karbari',
      'Non-alienation clauses strictly barring outside land purchases',
    ],
    keyFigures: ['Lord Curzon', 'King Chuda Thoi (Mong)', 'King Bhuvan Mohan (Chakma)'],
    archivalSource: 'Chittagong Hill Tracts Regulation 1900 (Act I of 1900) • National Archives',
    mapType: 'excluded_1900',
  },
  {
    year: '1947',
    title: 'Partition & The Radcliffe Boundary Award',
    subheading: 'Border Demarcation & Severance of Cross-Border Kinship',
    description: 'Despite a 97.5% non-Muslim indigenous population seeking union with India or dominion status, Sir Cyril Radcliffe awarded the entire CHT to East Pakistan to provide a hydroelectric hinterland for Chittagong Port, dividing families along the Feni River.',
    features: [
      'Hard international border carved along the Feni River',
      'Ramgarh established as prime frontier gateway facing Indian Tripura',
      'Dislocation of indigenous cross-border trade and ancestral migration paths',
      'Protests and temporary hoisting of Indian & indigenous flags at Rangamati',
    ],
    keyFigures: ['Sir Cyril Radcliffe', 'Sneha Kumar Chakma', 'Kamini Mohan Dewan'],
    archivalSource: 'Radcliffe Boundary Commission Report (August 1947) • IOR/L/P&J/10/117',
    mapType: 'partition_1947',
  },
  {
    year: '1983–Present',
    title: 'Tripartite Hill Districts & 1997 Peace Accord',
    subheading: 'Khagrachari District Formation & Regional Council Era',
    description: 'The administrative restructuring elevated Ramgarh subdivision into Khagrachari District in 1983, with Sadar (Chengmi) as the new district headquarters across 9 upazilas. In 1997, the historic CHT Peace Accord recognized the regional autonomy of the CHT Regional Council.',
    features: [
      'Khagrachari Sadar replaces Ramgarh as the district administrative capital',
      'Establishment of 9 modern Upazilas in Khagrachari',
      '1997 Peace Accord recognizing the CHT Regional Council (Rangamati)',
      'Co-existence of modern Deputy Commissioners with traditional Circle Chiefs',
    ],
    keyFigures: ['King Paihala Prue Chowdhury (Mong)', 'Jyotirindra Bodhipriya Larma (Santu)', 'CHT Regional Council'],
    archivalSource: 'Bangladesh Gazette 1983 • The Chittagong Hill Tracts Accord 1997',
    mapType: 'modern_1983',
  },
];

interface ChronologicalHistoricalMapProps {
  timelineLayers: TimelineLayers;
}

export const ChronologicalHistoricalMap: React.FC<ChronologicalHistoricalMapProps> = ({
  timelineLayers,
}) => {
  const [currentEraIndex, setCurrentEraIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeInspectorNode, setActiveInspectorNode] = useState<{
    title: string;
    description: string;
    historicalRole: string;
    era: string;
  } | null>(null);

  const era = CARTOGRAPHIC_ERAS[currentEraIndex];

  // Auto-play timer for chronologic playback
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentEraIndex((prev) => (prev + 1) % CARTOGRAPHIC_ERAS.length);
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Interactive Playback & Scrubber Controls */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
            <Clock className="w-4 h-4" />
            <span>Chronological Historical Map Overlays (1760 – Present)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300 hover:bg-purple-200'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Auto-Advance' : 'Play Timeline Tour'}</span>
            </button>

            <span className="text-xs font-mono text-stone-500 pl-2">
              Phase {currentEraIndex + 1} of {CARTOGRAPHIC_ERAS.length}
            </span>
          </div>
        </div>

        {/* 6 Era Scrubber Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {CARTOGRAPHIC_ERAS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentEraIndex(idx);
                setIsPlaying(false);
              }}
              className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                currentEraIndex === idx
                  ? 'bg-purple-700 text-white border-purple-800 shadow-md font-bold scale-[1.02]'
                  : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-750'
              }`}
            >
              <div className="text-[10px] font-mono tracking-tight opacity-80">{item.year}</div>
              <div className="text-xs font-serif font-bold truncate mt-0.5">{item.title.split(' ')[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Historical Map Canvas & Strategic Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Dynamic SVG Historical Cartography Canvas (7 Cols) */}
        <div className="lg:col-span-7 bg-[#F4EFE6] dark:bg-stone-900/90 border border-[#DDD4C1] dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-300 dark:border-stone-700 pb-3 text-xs font-serif">
            <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200">
              <Compass className="w-4 h-4 text-purple-700 dark:text-purple-400" />
              <span className="font-bold">
                {era.year}: {era.title}
              </span>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-mono">
              Archival Map Overlay
            </span>
          </div>

          {/* Dedicated Interactive SVG Canvas for Historical Eras */}
          <div className="relative w-full aspect-4/3 bg-[#EAE2D0] dark:bg-stone-950 rounded-xl overflow-hidden border border-stone-300 dark:border-stone-800 shadow-inner flex items-center justify-center">
            <svg viewBox="0 0 700 550" className="w-full h-full select-none">
              {/* Regional Baseline Labels */}
              <text x="30" y="45" fill="#9CA3AF" fontSize="11" fontWeight="bold">
                Kingdom of Twipra (Tripura)
              </text>
              <text x="560" y="220" fill="#9CA3AF" fontSize="11" fontWeight="bold">
                Lushai Hills (Mizoram)
              </text>
              <text x="540" y="510" fill="#9CA3AF" fontSize="11" fontWeight="bold">
                Kingdom of Arakan / Burma
              </text>
              <text x="30" y="490" fill="#9CA3AF" fontSize="11" fontWeight="bold">
                Bengal Plains (Chittagong)
              </text>

              {/* Waterways Baseline */}
              {timelineLayers.waterways && (
                <g opacity="0.6">
                  {/* Chengi River */}
                  <path
                    d="M 330,60 Q 345,150 350,240 T 360,350 T 375,470"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <text x="365" y="270" fill="#0369A1" fontSize="9" fontStyle="italic">
                    Chengi River
                  </text>

                  {/* Feni River */}
                  <path
                    d="M 120,60 Q 150,160 140,250 T 130,390 T 120,500"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <text x="145" y="320" fill="#0369A1" fontSize="9" fontStyle="italic">
                    Feni River (Border)
                  </text>
                </g>
              )}

              {/* ----------------- ERA 1: 1760-1787 KARPAS MAHAL ----------------- */}
              {era.mapType === 'karpas' && (
                <g>
                  {/* Semi-autonomous tribal cotton zone */}
                  {timelineLayers.tribalAutonomousZones && (
                    <polygon
                      points="160,80 480,90 520,440 200,430"
                      fill="#D97706"
                      fillOpacity="0.4"
                      stroke="#B45309"
                      strokeWidth="2.5"
                      strokeDasharray="6,4"
                    />
                  )}

                  {/* East India Company Mughal Bengal border */}
                  {timelineLayers.colonialBorders && (
                    <path
                      d="M 100,50 L 160,200 L 140,480"
                      fill="none"
                      stroke="#DC2626"
                      strokeWidth="3"
                    />
                  )}
                  <text x="110" y="140" fill="#991B1B" fontSize="10" fontWeight="bold">
                    EIC Borderland Post
                  </text>

                  {/* Tribute Collection Gates */}
                  {timelineLayers.tributePosts && (
                    <g>
                      {/* Ramgarh Cotton Barter Gate */}
                      <g
                        className="cursor-pointer"
                        onClick={() =>
                          setActiveInspectorNode({
                            title: 'Ramgarh Cotton Barter & Toll Post (1776)',
                            description: 'Established under the East India Company to measure raw cotton (Karpas) tribute collected from northern indigenous hill chiefs before transit into Chittagong.',
                            historicalRole: 'Karpas Mahal revenue collection center & border outpost.',
                            era: '1760–1787',
                          })
                        }
                      >
                        <rect x="135" y="270" width="16" height="16" fill="#F59E0B" stroke="#78350F" strokeWidth="2" rx="3" />
                        <text x="160" y="282" fontSize="10" fontWeight="bold" fill="#78350F">
                          Ramgarh Tribute Gate
                        </text>
                      </g>

                      {/* Rangunia Faujdari Toll Station */}
                      <g
                        className="cursor-pointer"
                        onClick={() =>
                          setActiveInspectorNode({
                            title: 'Rangunia Faujdari Toll Station',
                            description: 'Southern riverine post on the Karnaphuli where cotton maunds were weighed and salt/tobacco barter treaties were signed.',
                            historicalRole: 'Central tribute collection point for Chakma and Marma chiefs.',
                            era: '1760–1787',
                          })
                        }
                      >
                        <rect x="230" y="410" width="16" height="16" fill="#F59E0B" stroke="#78350F" strokeWidth="2" rx="3" />
                        <text x="255" y="422" fontSize="10" fontWeight="bold" fill="#78350F">
                          Rangunia Toll Post
                        </text>
                      </g>
                    </g>
                  )}

                  {/* Ranu Khan Guerrilla Defense Sector */}
                  {timelineLayers.resistanceCorridors && (
                    <g>
                      <path
                        d="M 220,180 Q 280,240 340,190 T 420,280"
                        fill="none"
                        stroke="#BE123C"
                        strokeWidth="3"
                        strokeDasharray="4,4"
                      />
                      <text x="240" y="220" fill="#9F1239" fontSize="10" fontWeight="bold">
                        Dewan Ranu Khan Resistance Corridor
                      </text>
                    </g>
                  )}
                </g>
              )}

              {/* ----------------- ERA 2: 1860 ACT XXII MUN CIRCLE ----------------- */}
              {era.mapType === 'mun_circle' && (
                <g>
                  {/* Historical Mun Circle encompassing northern hills */}
                  {timelineLayers.tribalAutonomousZones && (
                    <g>
                      <polygon
                        points="160,70 510,80 470,260 170,250"
                        fill="#059669"
                        fillOpacity="0.45"
                        stroke="#065F46"
                        strokeWidth="2.5"
                      />
                      <text x="260" y="150" fontSize="16" fontWeight="900" fill="#065F46">
                        "MUN CIRCLE" (1860)
                      </text>
                      <text x="240" y="170" fontSize="10" fontWeight="bold" fill="#047857">
                        Recorded in British Colonial Survey for Tipra Inhabitants
                      </text>
                    </g>
                  )}

                  {/* Act XXII Separation Line from Chittagong */}
                  {timelineLayers.colonialBorders && (
                    <g>
                      <path
                        d="M 140,50 L 170,260 L 220,480"
                        fill="none"
                        stroke="#7C3AED"
                        strokeWidth="3.5"
                        strokeDasharray="8,4"
                      />
                      <text x="80" y="360" fill="#6D28D9" fontSize="10" fontWeight="bold" transform="rotate(-75 80,360)">
                        Act XXII Annexation Line (1860)
                      </text>
                    </g>
                  )}

                  {/* Captain Lewin Superintendent Post */}
                  <g
                    className="cursor-pointer"
                    onClick={() =>
                      setActiveInspectorNode({
                        title: 'Superintendent Post at Chandraghona (1860)',
                        description: 'Initial administrative headquarters established by the British Crown under Act XXII to govern the newly created Chittagong Hill Tracts district.',
                        historicalRole: 'First colonial administrative seat before shifting to Rangamati in 1869.',
                        era: '1860',
                      })
                    }
                  >
                    <circle cx="280" cy="380" r="8" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="300" y="385" fontSize="10" fontWeight="bold" fill="#5B21B6">
                      Chandraghona HQ (Capt. Lewin)
                    </text>
                  </g>
                </g>
              )}

              {/* ----------------- ERA 3: 1881 TRIPARTITE CIRCLE CODIFICATION ----------------- */}
              {era.mapType === 'three_circles' && (
                <g>
                  {/* Northern Mong Circle */}
                  <polygon
                    points="170,70 480,80 450,230 200,220"
                    fill="#059669"
                    fillOpacity="0.55"
                    stroke="#064E3B"
                    strokeWidth="2.5"
                  />
                  <text x="270" y="140" fontSize="15" fontWeight="900" fill="#064E3B">
                    MONG CIRCLE (1881)
                  </text>
                  <text x="245" y="160" fontSize="10" fontWeight="bold" fill="#047857">
                    Created via Mackenzie Codification (Manikchari Seat)
                  </text>

                  {/* Central Chakma Circle */}
                  <polygon
                    points="200,225 450,235 520,380 250,370"
                    fill="#D97706"
                    fillOpacity="0.55"
                    stroke="#78350F"
                    strokeWidth="2.5"
                  />
                  <text x="310" y="290" fontSize="15" fontWeight="900" fill="#78350F">
                    CHAKMA CIRCLE
                  </text>

                  {/* Southern Bohmong Circle */}
                  <polygon
                    points="250,375 520,385 470,520 270,510"
                    fill="#BE123C"
                    fillOpacity="0.55"
                    stroke="#881337"
                    strokeWidth="2.5"
                  />
                  <text x="310" y="440" fontSize="15" fontWeight="900" fill="#881337">
                    BOHMONG CIRCLE
                  </text>

                  {/* Manikchari Royal Seat Pin */}
                  <g
                    className="cursor-pointer"
                    onClick={() =>
                      setActiveInspectorNode({
                        title: 'Manikchari Mong Rajbari (1881 Bypass Decision)',
                        description: 'Sir Alexander Mackenzie recognized the Marma Chieftain at Manikchari over indigenous Tipra claims, formalizing the name "Mong Circle" to block the Maharaja of Tripura.',
                        historicalRole: 'Dynastic royal court and customary dispute arbitration capital.',
                        era: '1881–1884',
                      })
                    }
                  >
                    <circle cx="210" cy="180" r="9" fill="#FDE047" stroke="#854D0E" strokeWidth="2.5" />
                    <text x="140" y="175" fontSize="10" fontWeight="bold" fill="#713F12">
                      Manikchari Royal Court
                    </text>
                  </g>
                </g>
              )}

              {/* ----------------- ERA 4: 1900 REGULATION I EXCLUDED AREA ----------------- */}
              {era.mapType === 'excluded_1900' && (
                <g>
                  {/* Codified Excluded Area Perimeter */}
                  {timelineLayers.colonialBorders && (
                    <polygon
                      points="160,60 520,70 550,510 220,500"
                      fill="#8B5CF6"
                      fillOpacity="0.25"
                      stroke="#6D28D9"
                      strokeWidth="3.5"
                      strokeDasharray="8,4"
                    />
                  )}
                  <text x="240" y="100" fontSize="16" fontWeight="900" fill="#5B21B6">
                    REGULATION I OF 1900 "EXCLUDED AREA"
                  </text>
                  <text x="225" y="120" fontSize="10" fontWeight="bold" fill="#6D28D9">
                    Inalienable Customary Tribal Territory & Traditional Courts
                  </text>

                  {/* Headman & King Courts */}
                  <g
                    className="cursor-pointer"
                    onClick={() =>
                      setActiveInspectorNode({
                        title: 'CHT Manual 1900: Mouza Headman Network',
                        description: 'Codified the 3-tiered customary governance hierarchy: Karbari (Village), Headman (Mouza land administration), and Circle King (Customary judicial appeal).',
                        historicalRole: 'Customary revenue and judicial institution.',
                        era: '1900',
                      })
                    }
                  >
                    <circle cx="340" cy="220" r="7" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="2" />
                    <circle cx="410" cy="290" r="7" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="2" />
                    <circle cx="330" cy="420" r="7" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="355" y="225" fontSize="9" fontWeight="bold" fill="#4C1D95">
                      3 Kings Customary Courts
                    </text>
                  </g>
                </g>
              )}

              {/* ----------------- ERA 5: 1947 RADCLIFFE PARTITION AWARD ----------------- */}
              {era.mapType === 'partition_1947' && (
                <g>
                  {/* Hard International Radcliffe Line along Feni River */}
                  <path
                    d="M 130,40 L 150,150 L 140,320 L 120,490"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="4"
                    strokeDasharray="6,3"
                  />
                  <text x="40" y="240" fill="#DC2626" fontSize="11" fontWeight="bold" transform="rotate(-85 40,240)">
                    Radcliffe Partition Demarcation Line (1947)
                  </text>

                  {/* Ramgarh Border Gateway */}
                  <g
                    className="cursor-pointer"
                    onClick={() =>
                      setActiveInspectorNode({
                        title: 'Ramgarh Border Station (Post-1947 Dislocation)',
                        description: 'Established directly on the Feni River to control movement between East Pakistan and Tripura, severing ancient cross-border tribal ties.',
                        historicalRole: 'Strategic border checkpoint and refugee corridor.',
                        era: '1947',
                      })
                    }
                  >
                    <circle cx="140" cy="320" r="8" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                    <text x="155" y="325" fontSize="10" fontWeight="bold" fill="#991B1B">
                      Ramgarh Border Checkpoint
                    </text>
                  </g>

                  {/* Dislocation Marker */}
                  <text x="240" y="160" fontSize="14" fontWeight="bold" fill="#991B1B">
                    Severance of Tripura-CHT Kinship Ties
                  </text>
                  <text x="230" y="180" fontSize="10" fill="#7F1D1D">
                    97.5% Indigenous Population Awarded to East Pakistan
                  </text>
                </g>
              )}

              {/* ----------------- ERA 6: 1983-PRESENT MODERN 3 DISTRICTS & PEACE ACCORD ----------------- */}
              {era.mapType === 'modern_1983' && (
                <g>
                  {/* Khagrachari District Outline */}
                  <polygon
                    points="170,60 460,70 430,280 180,270"
                    fill="#10B981"
                    fillOpacity="0.5"
                    stroke="#047857"
                    strokeWidth="2.5"
                  />
                  <text x="240" y="140" fontSize="15" fontWeight="900" fill="#064E3B">
                    KHAGRACHARI DISTRICT (1983)
                  </text>
                  <text x="250" y="160" fontSize="10" fontWeight="bold" fill="#047857">
                    9 Upazilas • Sadar (Chengmi) HQ
                  </text>

                  {/* Rangamati & Bandarban */}
                  <polygon
                    points="180,275 430,285 510,410 240,400"
                    fill="#F59E0B"
                    fillOpacity="0.4"
                    stroke="#B45309"
                    strokeWidth="2"
                  />
                  <text x="290" y="330" fontSize="14" fontWeight="bold" fill="#78350F">
                    Rangamati Hill District
                  </text>

                  <polygon
                    points="240,405 510,415 470,520 260,510"
                    fill="#F43F5E"
                    fillOpacity="0.4"
                    stroke="#BE123C"
                    strokeWidth="2"
                  />
                  <text x="310" y="460" fontSize="14" fontWeight="bold" fill="#881337">
                    Bandarban Hill District
                  </text>

                  {/* CHT Regional Council (Rangamati) */}
                  <g
                    className="cursor-pointer"
                    onClick={() =>
                      setActiveInspectorNode({
                        title: 'CHT Regional Council (1997 Peace Accord)',
                        description: 'Autonomous apex governing body created by the 1997 Peace Accord, exercising supervisory authority over the 3 Hill District Councils and customary law.',
                        historicalRole: 'Regional Council apex authority.',
                        era: '1983–Present',
                      })
                    }
                  >
                    <circle cx="390" cy="340" r="9" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2.5" />
                    <text x="405" y="345" fontSize="10" fontWeight="bold" fill="#0369A1">
                      CHT Regional Council (Accord)
                    </text>
                  </g>
                </g>
              )}
            </svg>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between text-xs font-serif text-stone-600 dark:text-stone-400 pt-2 border-t border-stone-200 dark:border-stone-800">
            <button
              onClick={() => setCurrentEraIndex((p) => Math.max(0, p - 1))}
              disabled={currentEraIndex === 0}
              className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 disabled:opacity-40 cursor-pointer flex items-center gap-1 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Era
            </button>

            <span className="font-mono text-[11px] text-stone-500">
              Click any pin or post to inspect archival significance
            </span>

            <button
              onClick={() => setCurrentEraIndex((p) => Math.min(CARTOGRAPHIC_ERAS.length - 1, p + 1))}
              disabled={currentEraIndex === CARTOGRAPHIC_ERAS.length - 1}
              className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 disabled:opacity-40 cursor-pointer flex items-center gap-1 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              Next Era <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Detailed Historical Inspection & Archival Digest (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Active Node Flyout Card */}
          {activeInspectorNode && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-stone-800 dark:to-purple-950/40 border-2 border-purple-400 dark:border-purple-700 shadow-md space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-200 dark:bg-purple-900 text-purple-900 dark:text-purple-200">
                  Cartographic Milestone • {activeInspectorNode.era}
                </span>
                <button
                  onClick={() => setActiveInspectorNode(null)}
                  className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs font-bold cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
              <h3 className="text-lg font-serif font-black text-purple-950 dark:text-purple-100">
                {activeInspectorNode.title}
              </h3>
              <p className="text-xs font-serif leading-relaxed text-stone-700 dark:text-stone-300">
                {activeInspectorNode.description}
              </p>
              <div className="text-[11px] pt-2 border-t border-purple-200/60 dark:border-purple-800 font-mono text-purple-800 dark:text-purple-300">
                Strategic Function: {activeInspectorNode.historicalRole}
              </div>
            </div>
          )}

          {/* Era Digest Profile */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md space-y-4">
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-widest text-purple-700 dark:text-purple-400 font-bold">
                Archival Cartography Profile
              </div>
              <h3 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100">
                {era.title}
              </h3>
              <div className="text-xs font-serif text-amber-700 dark:text-amber-400 font-bold">
                {era.subheading}
              </div>
            </div>

            <p className="text-xs sm:text-sm font-serif leading-relaxed text-stone-600 dark:text-stone-300">
              {era.description}
            </p>

            {/* Key Historical Features */}
            <div className="space-y-2 pt-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                Key Administrative & Spatial Milestones
              </div>
              <ul className="space-y-2 text-xs font-serif text-stone-700 dark:text-stone-300">
                {era.features.map((feat, fIdx) => (
                  <li
                    key={fIdx}
                    className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0"></span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Figures */}
            <div className="pt-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                Key Historical Figures
              </div>
              <div className="flex flex-wrap gap-1.5">
                {era.keyFigures.map((fig, figIdx) => (
                  <span
                    key={figIdx}
                    className="px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-950 text-purple-900 dark:text-purple-300 text-xs font-serif font-medium border border-purple-200 dark:border-purple-800"
                  >
                    {fig}
                  </span>
                ))}
              </div>
            </div>

            {/* Archival Citation */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2 text-[11px] font-mono text-stone-500">
              <BookOpen className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span>{era.archivalSource}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
