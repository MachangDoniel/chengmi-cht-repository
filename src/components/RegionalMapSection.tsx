import React, { useState, useEffect } from 'react';
import {
  ALL_CHT_UPAZILAS,
  KHAGRACHARI_UPAZILAS,
  RANGAMATI_UPAZILAS,
  BANDARBAN_UPAZILAS,
  HISTORIC_LANDMARKS,
  CHT_AUDIO_MAP_HOTSPOTS,
} from '../data/mapData';
import { COMPREHENSIVE_CIRCLES } from '../data/circleEvaluationData';
import { UpazilaInfo, LandmarkInfo } from '../types';
import { CircleEvaluationModal } from './CircleEvaluationModal';
import {
  MapLayerControls,
  MapMode,
  DistrictLayers,
  CirclesLayers,
  WorldviewLayers,
  TimelineLayers,
} from './map/MapLayerControls';
import { ChronologicalHistoricalMap } from './map/ChronologicalHistoricalMap';
import { RealGISMap } from './map/RealGISMap';
import { ArchivalSurveySheetViewer } from './map/ArchivalSurveySheetViewer';
import {
  MapPin,
  Compass,
  Waves,
  Shield,
  BookOpen,
  Layers,
  Info,
  ExternalLink,
  Crown,
  Globe,
  Clock,
  Sparkles,
  Mountain,
  ChevronRight,
  Eye,
  Camera,
  Navigation,
  CheckSquare,
  Square,
  ZoomIn,
  X,
  Maximize2
} from 'lucide-react';

export const RegionalMapSection: React.FC = () => {
  const [mapMode, setMapMode] = useState<MapMode>('khagrachari');
  const [selectedDistrict, setSelectedDistrict] = useState<'all' | 'khagrachari' | 'rangamati' | 'bandarban'>('all');
  const [selectedUpazila, setSelectedUpazila] = useState<UpazilaInfo>(KHAGRACHARI_UPAZILAS[0]);
  const [selectedLandmark, setSelectedLandmark] = useState<LandmarkInfo | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedCircleId, setSelectedCircleId] = useState<'mong' | 'chakma' | 'bohmong' | null>(null);
  const [cartoDisplayMode, setCartoDisplayMode] = useState<'actual_gis' | 'archival_sheet'>('actual_gis');
  const [lightboxImage, setLightboxImage] = useState<{
    title: string;
    caption: string;
    category: string;
    imageUrl: string;
    archivalSource?: string;
    year?: string;
  } | null>(null);

  const displayedUpazilas =
    selectedDistrict === 'khagrachari'
      ? KHAGRACHARI_UPAZILAS
      : selectedDistrict === 'rangamati'
      ? RANGAMATI_UPAZILAS
      : selectedDistrict === 'bandarban'
      ? BANDARBAN_UPAZILAS
      : ALL_CHT_UPAZILAS;

  const handleDistrictChange = (dist: 'all' | 'khagrachari' | 'rangamati' | 'bandarban') => {
    setSelectedDistrict(dist);
    if (dist === 'khagrachari') {
      setSelectedUpazila(KHAGRACHARI_UPAZILAS[0]);
    } else if (dist === 'rangamati') {
      setSelectedUpazila(RANGAMATI_UPAZILAS[0]);
    } else if (dist === 'bandarban') {
      setSelectedUpazila(BANDARBAN_UPAZILAS[0]);
    }
  };

  // Auto-selection listener from Global Search
  useEffect(() => {
    const handleSelectMapItem = (e: Event) => {
      const customEvent = e as CustomEvent<UpazilaInfo | LandmarkInfo>;
      if (customEvent.detail) {
        const item = customEvent.detail;
        if ('keyRivers' in item) {
          // Upazila
          const upazila = item as UpazilaInfo;
          setMapMode('khagrachari');
          if (upazila.district) {
            setSelectedDistrict(upazila.district.toLowerCase() as 'khagrachari' | 'rangamati' | 'bandarban');
          }
          setSelectedUpazila(upazila);
          setSelectedLandmark(null);
        } else if ('coordinates' in item) {
          // Landmark
          setMapMode('khagrachari');
          setSelectedLandmark(item as LandmarkInfo);
        }
      }
    };
    window.addEventListener('chengmi-map-select', handleSelectMapItem);
    return () => window.removeEventListener('chengmi-map-select', handleSelectMapItem);
  }, []);

  // District View Interactive Layers
  const [districtLayers, setDistrictLayers] = useState<DistrictLayers>({
    rivers: true,
    elevation: true,
    landmarks: true,
    borders: true,
    upazilaFills: true,
    mouzaCenters: true,
  });

  // Regional View Interactive Layers
  const [circlesLayers, setCirclesLayers] = useState<CirclesLayers>({
    circleSeats: true,
    waterBodies: true,
    tribalCentres: true,
    borderLines: true,
  });

  // Worldview Interactive Layers
  const [worldviewLayers, setWorldviewLayers] = useState<WorldviewLayers>({
    tradeRoutes: true,
    maritimePorts: true,
    frontiers: true,
    ecoCorridor: true,
    strategicPasses: true,
  });

  // Timeline Interactive Layers
  const [timelineLayers, setTimelineLayers] = useState<TimelineLayers>({
    tributePosts: true,
    colonialBorders: true,
    tribalAutonomousZones: true,
    resistanceCorridors: true,
    waterways: true,
  });

  const [showHistoricalOverlayOnDistrict, setShowHistoricalOverlayOnDistrict] = useState<boolean>(false);

  const landmarkCategories = [
    'All',
    'Royal Heritage',
    'Natural Wonder',
    'Historic Frontier',
    'Spiritual Sanctuary',
    'Archaeological',
  ];

  const filteredLandmarks =
    activeCategory === 'All'
      ? HISTORIC_LANDMARKS
      : HISTORIC_LANDMARKS.filter((lm) => lm.category === activeCategory);

  // High-Resolution Curated Historical Geography Gallery
  const highResGallery = [
    {
      title: 'Sajek Valley Cloudscape & High-Relief Frontier',
      caption: 'The majestic 1,800-foot ridge along the eastern border of Khagrachari and Rangamati, overlooking mist-clad valleys connecting to Tripura and Mizoram.',
      category: 'Topography & Relief',
      accent: 'border-emerald-500',
      imageUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=85',
      archivalSource: 'Chittagong Hill Tracts Topographical Survey',
      year: 'Contemporary Plate'
    },
    {
      title: 'Alutila Subterranean Cave & Limestone Chasm',
      caption: 'Ancient 100-meter dark limestone passage sculpted by underground waters at 1,000 feet elevation, revered by indigenous elders as an ancestral sanctuary.',
      category: 'Geological Wonder',
      accent: 'border-amber-500',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
      archivalSource: 'Geological Survey of Bengal & CHT',
      year: 'Geological Plate'
    },
    {
      title: 'The Winding Chengi (Chengmi) River & Wild Reed Beds',
      caption: 'The arterial lifeline of Khagrachari flowing past Sadar town, flanked by wild Nal Khagra catkin grass that gave the district its historic name.',
      category: 'Riparian Ecology',
      accent: 'border-teal-500',
      imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=85',
      archivalSource: 'Bengal River Hydrological Archives',
      year: 'Hydrological Survey'
    },
    {
      title: 'Manikchari Rajbari — Royal Palace of the Mong Kings',
      caption: 'The historic royal residence and customary court where the Mong Kings have presided over traditional dispute arbitration and Raj Punyah since 1881.',
      category: 'Dynastic Architecture',
      accent: 'border-rose-500',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
      archivalSource: 'Mong Circle Royal Archive (Manikchari)',
      year: 'Royal Charter Plate'
    },
    {
      title: 'Kaptai Lake Basin & Submerged Ancient Valleys',
      caption: 'The vast 350-square-mile reservoir that flooded the ancient Chakma royal capital and 54,000 acres of prime arable land during the 1960 Kaptai dam disaster.',
      category: 'Hydraulic Transformation',
      accent: 'border-blue-500',
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
      archivalSource: 'East Pakistan WAPDA Cartographic Records',
      year: '1960 Survey'
    },
    {
      title: 'Sangu River Valley & Bandarban Mountain Ridges',
      caption: 'The southern chiefdom territory of the Bohmong Circle along the winding Sangu (Rigray Khyoung) river, surrounded by the highest peaks of Bangladesh.',
      category: 'Southern Chiefdom',
      accent: 'border-purple-500',
      imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
      archivalSource: 'Survey of India (1922 Trigonometrical Series)',
      year: 'Bohmong Domain'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16 transition-colors" id="regional-map-container">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6 pt-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-emerald-800 dark:text-emerald-400 font-bold">
            <Compass className="w-4 h-4" />
            <span>Interactive Cartography, Multi-Scale Layers & Historical Geography</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 dark:text-stone-100">
            Regional Atlas of Chengmi & Chittagong Hill Tracts
          </h1>
          <p className="text-sm font-serif text-stone-600 dark:text-stone-400 max-w-3xl">
            Toggle interactive cartographic layers across district-level upazila grids, the three hereditary chiefdoms, the South-East Asian geopolitical corridor, and 250 years of shifting colonial borders.
          </p>
        </div>
      </div>

      {/* Unified Multi-Scale Interactive Layer Controls */}
      <MapLayerControls
        mapMode={mapMode}
        setMapMode={setMapMode}
        districtLayers={districtLayers}
        setDistrictLayers={setDistrictLayers}
        circlesLayers={circlesLayers}
        setCirclesLayers={setCirclesLayers}
        worldviewLayers={worldviewLayers}
        setWorldviewLayers={setWorldviewLayers}
        timelineLayers={timelineLayers}
        setTimelineLayers={setTimelineLayers}
        showHistoricalOverlayOnDistrict={showHistoricalOverlayOnDistrict}
        setShowHistoricalOverlayOnDistrict={setShowHistoricalOverlayOnDistrict}
      />

      {/* VIEW 1: CHT 3 DISTRICTS & 26 UPAZILAS DETAIL WITH INTERACTIVE LAYERS */}
      {mapMode === 'khagrachari' && (
        <div className="space-y-6 animate-fadeIn">
          {/* CHT 3 Districts Selector Tab Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-100 dark:bg-stone-900/90 p-3 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-stone-800 dark:text-stone-200">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Select District to Inspect:</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 w-full sm:w-auto">
              <button
                onClick={() => handleDistrictChange('all')}
                className={`px-3 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  selectedDistrict === 'all'
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs font-black'
                    : 'bg-white/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                <span>All 3 Districts</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-black/15 dark:bg-white/20">26</span>
              </button>

              <button
                onClick={() => handleDistrictChange('khagrachari')}
                className={`px-3 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  selectedDistrict === 'khagrachari'
                    ? 'bg-emerald-700 text-white shadow-xs font-black'
                    : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Khagrachari</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-black/15 dark:bg-white/20">9</span>
              </button>

              <button
                onClick={() => handleDistrictChange('rangamati')}
                className={`px-3 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  selectedDistrict === 'rangamati'
                    ? 'bg-amber-700 text-white shadow-xs font-black'
                    : 'bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800 hover:bg-amber-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Rangamati</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-black/15 dark:bg-white/20">10</span>
              </button>

              <button
                onClick={() => handleDistrictChange('bandarban')}
                className={`px-3 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap ${
                  selectedDistrict === 'bandarban'
                    ? 'bg-rose-700 text-white shadow-xs font-black'
                    : 'bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-300 border border-rose-300 dark:border-rose-800 hover:bg-rose-100'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                <span>Bandarban</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-black/15 dark:bg-white/20">7</span>
              </button>
            </div>
          </div>

          {/* Quick Upazila Fast-Jump Ribbon */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5">
            <span className="text-[11px] font-mono uppercase font-bold text-stone-500 shrink-0">
              {selectedDistrict === 'all' ? 'All 26 Upazilas:' : `${displayedUpazilas.length} Upazilas in ${selectedDistrict}:`}
            </span>
            {displayedUpazilas.map((u) => {
              const isSel = selectedUpazila.id === u.id;
              const colorClass =
                u.circle === 'mong'
                  ? isSel
                    ? 'bg-emerald-700 text-white font-bold shadow-xs'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border border-emerald-300/80 dark:border-emerald-800 hover:bg-emerald-100'
                  : u.circle === 'chakma'
                  ? isSel
                    ? 'bg-amber-700 text-white font-bold shadow-xs'
                    : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-300/80 dark:border-amber-800 hover:bg-amber-100'
                  : isSel
                  ? 'bg-rose-700 text-white font-bold shadow-xs'
                  : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300 border border-rose-300/80 dark:border-rose-800 hover:bg-rose-100';

              return (
                <button
                  key={u.id}
                  onClick={() => {
                    setSelectedUpazila(u);
                    setSelectedLandmark(null);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-serif transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${colorClass}`}
                >
                  <span>{u.name}</span>
                  <span className="text-[10px] opacity-75 font-mono">({u.areaSqKm} km²)</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Map Canvas (7 Cols) */}
            <div className="lg:col-span-7 bg-[#F4EFE6] dark:bg-stone-900/90 border border-[#DDD4C1] dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-300 dark:border-stone-700 pb-3 text-xs font-serif">
                <div className="flex items-center gap-2">
                  {/* Cartographic Engine Switcher */}
                  <div className="flex items-center gap-1 p-1 bg-stone-200/80 dark:bg-stone-800 rounded-xl shadow-inner">
                    <button
                      onClick={() => setCartoDisplayMode('actual_gis')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        cartoDisplayMode === 'actual_gis'
                          ? 'bg-emerald-700 text-white shadow-xs font-black'
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                      }`}
                    >
                      <Mountain className="w-3.5 h-3.5 text-amber-300" />
                      <span>Actual GIS Map (Topography & Satellite)</span>
                    </button>
                    <button
                      onClick={() => setCartoDisplayMode('archival_sheet')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        cartoDisplayMode === 'archival_sheet'
                          ? 'bg-amber-800 text-white shadow-xs font-black'
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                      }`}
                    >
                      <Compass className="w-3.5 h-3.5 text-amber-300" />
                      <span>Archival Vector Sheet</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400 overflow-x-auto">
                  <span className="text-stone-400 font-sans">Sites:</span>
                  {landmarkCategories.slice(0, 4).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                        activeCategory === cat
                          ? 'bg-emerald-800 text-white font-semibold'
                          : 'hover:bg-stone-200 dark:hover:bg-stone-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rendering Either Real GIS Map or Archival Survey Sheets */}
              {cartoDisplayMode === 'actual_gis' ? (
                <RealGISMap
                  mode="khagrachari"
                  selectedDistrict={selectedDistrict}
                  onSelectDistrict={handleDistrictChange}
                  selectedUpazila={selectedUpazila}
                  onSelectUpazila={(u) => {
                    setSelectedUpazila(u);
                    if (u.district) {
                      const dLower = u.district.toLowerCase() as 'khagrachari' | 'rangamati' | 'bandarban';
                      if (selectedDistrict !== 'all' && selectedDistrict !== dLower) {
                        setSelectedDistrict(dLower);
                      }
                    }
                  }}
                  selectedLandmark={selectedLandmark}
                  onSelectLandmark={setSelectedLandmark}
                  selectedCircleId={selectedCircleId}
                  onSelectCircle={setSelectedCircleId}
                  showHistoricalOverlay={showHistoricalOverlayOnDistrict}
                  onNavigateToAudioArchives={(audioId) => {
                    window.dispatchEvent(new CustomEvent('chengmi-tab-change', { detail: 'archives' }));
                    window.dispatchEvent(new CustomEvent('chengmi-audio-select', { detail: audioId }));
                  }}
                />
              ) : (
                <ArchivalSurveySheetViewer onOpenLightbox={setLightboxImage} />
              )}
            </div>

            {/* Right: Upazila & Landmark Inspector (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Active Landmark Spotlight if chosen */}
              {selectedLandmark && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-stone-800 dark:to-stone-900 border-2 border-amber-300 dark:border-amber-700 shadow-md space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300">
                      {selectedLandmark.category}
                    </span>
                    <button
                      onClick={() => setSelectedLandmark(null)}
                      className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs font-bold cursor-pointer"
                    >
                      Clear Pin
                    </button>
                  </div>
                  <h3 className="text-xl font-serif font-black text-amber-950 dark:text-amber-200">
                    {selectedLandmark.name}
                  </h3>
                  <p className="text-xs font-serif leading-relaxed text-stone-700 dark:text-stone-300">
                    {selectedLandmark.historicalContext}
                  </p>
                </div>
              )}

              {/* Upazila Profile Card */}
              <div
                id={`upazila-card-${selectedUpazila.id}`}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-md space-y-5"
              >
                <div className="flex items-start justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-widest font-bold flex items-center gap-1.5">
                      <span
                        className={
                          selectedUpazila.circle === 'mong'
                            ? 'text-emerald-800 dark:text-emerald-400'
                            : selectedUpazila.circle === 'chakma'
                            ? 'text-amber-800 dark:text-amber-400'
                            : 'text-rose-800 dark:text-rose-400'
                        }
                      >
                        {selectedUpazila.district || 'Chittagong Hill Tracts'} District •{' '}
                        {selectedUpazila.circle ? `${selectedUpazila.circle.toUpperCase()} Circle` : 'Hereditary Circle'}
                      </span>
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                      {selectedUpazila.name}
                    </h2>
                    <div className="text-xs text-stone-500 dark:text-stone-400">
                      {selectedUpazila.bengaliName} • Headquarters: {selectedUpazila.headquarters} • Area: {selectedUpazila.areaSqKm} km²
                    </div>
                  </div>

                  <div
                    className={`p-2 rounded-xl ${
                      selectedUpazila.circle === 'mong'
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : selectedUpazila.circle === 'chakma'
                        ? 'bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                        : 'bg-rose-50 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                    }`}
                  >
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>

                {/* Historical Names Pillbox */}
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-stone-400 mb-1">
                    Historical & Indigenous Designations
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedUpazila.historicalNames.map((alias, aIdx) => (
                      <span
                        key={aIdx}
                        className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-serif font-medium border border-stone-200 dark:border-stone-700"
                      >
                        {alias}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="text-xs sm:text-sm font-serif text-stone-600 dark:text-stone-300 leading-relaxed">
                  {selectedUpazila.description}
                </div>

                {/* Circle Governance Role Callout */}
                <div
                  className={`p-4 rounded-xl border text-xs space-y-1 ${
                    selectedUpazila.circle === 'mong'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60'
                      : selectedUpazila.circle === 'chakma'
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60'
                  }`}
                >
                  <span
                    className={`font-bold flex items-center gap-1.5 ${
                      selectedUpazila.circle === 'mong'
                        ? 'text-emerald-900 dark:text-emerald-300'
                        : selectedUpazila.circle === 'chakma'
                        ? 'text-amber-900 dark:text-amber-300'
                        : 'text-rose-900 dark:text-rose-300'
                    }`}
                  >
                    <Crown className="w-3.5 h-3.5" />
                    Significance in{' '}
                    {selectedUpazila.circle === 'chakma'
                      ? 'Chakma'
                      : selectedUpazila.circle === 'bohmong'
                      ? 'Bohmong'
                      : 'Mong'}{' '}
                    Circle Customary Governance:
                  </span>
                  <p className="text-stone-700 dark:text-stone-300 font-serif leading-relaxed">
                    {selectedUpazila.mongCircleSignificance}
                  </p>
                </div>

                {/* Key Rivers & Landmarks */}
                <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <div className="text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1">
                      <Waves className="w-3 h-3 text-blue-500" /> Rivers & Waters
                    </div>
                    <div className="font-medium text-stone-800 dark:text-stone-200 mt-1">
                      {selectedUpazila.keyRivers.join(', ')}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <div className="text-[10px] uppercase font-bold text-stone-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-500" /> Heritage Sites
                    </div>
                    <div className="font-medium text-stone-800 dark:text-stone-200 mt-1">
                      {selectedUpazila.landmarks.slice(0, 3).join(', ')}
                    </div>
                  </div>
                </div>

                {/* References */}
                {selectedUpazila.references && selectedUpazila.references.length > 0 && (
                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-[11px] font-mono text-stone-500 dark:text-stone-400">
                    Archival Source: {selectedUpazila.references[0].title} ({selectedUpazila.references[0].year}) •{' '}
                    {selectedUpazila.references[0].authorOrBody}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: CHITTAGONG HILL TRACTS 3 CHIEFDOMS WITH REGIONAL LAYERS */}
      {mapMode === 'cht_circles' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Real GIS Map of the 3 Circles + Quick Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Real GIS Map of the 3 Circles (7 Cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 shadow-md space-y-4">
              <div className="flex flex-wrap items-center justify-between text-xs font-serif font-bold text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-700 pb-3 gap-2">
                <span className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span>The Three Hereditary Circles under CHT Regulation 1900</span>
                </span>
                <span className="text-[11px] text-amber-800 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                  Interactive GIS Chiefdom Boundaries
                </span>
              </div>

              <RealGISMap
                mode="cht_circles"
                selectedUpazila={selectedUpazila}
                onSelectUpazila={setSelectedUpazila}
                selectedLandmark={selectedLandmark}
                onSelectLandmark={setSelectedLandmark}
                selectedCircleId={selectedCircleId}
                onSelectCircle={setSelectedCircleId}
                showHistoricalOverlay={true}
              />
            </div>

            {/* Right: 3 Rich Cards for All 3 Circles (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {COMPREHENSIVE_CIRCLES.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCircleId(c.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-0.5 space-y-3 ${
                    c.id === 'mong'
                      ? 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-stone-900 border-emerald-400 dark:border-emerald-700'
                      : c.id === 'chakma'
                      ? 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-stone-900 border-amber-400 dark:border-amber-700'
                      : 'bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-950/40 dark:to-stone-900 border-rose-400 dark:border-rose-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/10 dark:bg-white/10 text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5" />
                      {c.district}
                    </span>
                    <span className="text-xs font-bold flex items-center gap-1 text-stone-800 dark:text-stone-200">
                      Explore Chronology <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-black text-stone-900 dark:text-stone-100">
                    {c.name}
                  </h3>

                  <p className="text-xs font-serif leading-relaxed text-stone-600 dark:text-stone-300">
                    {c.summary}
                  </p>

                  <div className="text-[11px] pt-2 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-stone-700 dark:text-stone-300 font-mono">
                    <span>Chief: {c.currentRuler.split('(')[0]}</span>
                    <span>Seat: {c.seat.split('(')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: GEOPOLITICAL WORLDVIEW WITH TRADE & CORRIDOR LAYERS */}
      {mapMode === 'worldview' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Worldview Real GIS Map (7 Cols) */}
            <div className="lg:col-span-7 bg-[#0F172A] border border-slate-800 rounded-2xl p-5 sm:p-6 text-white shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-700 pb-3 text-xs gap-2">
                <span className="font-bold flex items-center gap-2 text-emerald-400">
                  <Globe className="w-4 h-4" /> Geopolitical Nexus: South Asia & Southeast Asia Gateway
                </span>
                <span className="text-slate-400 font-mono text-[11px] bg-slate-800 px-2 py-0.5 rounded">
                  Tri-Junction Strategic GIS Corridor
                </span>
              </div>

              <RealGISMap
                mode="worldview"
                selectedUpazila={selectedUpazila}
                onSelectUpazila={setSelectedUpazila}
                selectedLandmark={selectedLandmark}
                onSelectLandmark={setSelectedLandmark}
                selectedCircleId={selectedCircleId}
                onSelectCircle={setSelectedCircleId}
                showHistoricalOverlay={true}
              />

              <div className="text-xs text-slate-400 font-serif leading-relaxed pt-2 border-t border-slate-800">
                The Chittagong Hill Tracts forms a crucial geopolitical hinge connecting the Indian subcontinent with Southeast Asia, historically linking Bengal, Arakan (Burma), and the Twipra kingdom across 250 years of territorial demarcations.
              </div>
            </div>

            {/* Right: Worldview Strategic Analysis (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-black text-stone-900 dark:text-stone-100">
                      Geographic & Strategic Significance
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Crossroads of three cultural spheres
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs font-serif text-stone-700 dark:text-stone-300 leading-relaxed">
                  <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">
                      1. The Indo-Burma Biodiversity & Cultural Hotspot
                    </strong>
                    The CHT sits at the intersection of the Himalayan foothills and the Arakan Yoma mountain belt, housing 11 distinct indigenous linguistic communities.
                  </div>

                  <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <strong className="text-amber-700 dark:text-amber-400 block mb-1">
                      2. Feni & Chengi River Trans-Border Corridors
                    </strong>
                    The Feni river at Ramgarh provides the closest physical land bridge between northeast India (Tripura) and the deep-water maritime routes of Chattogram Port.
                  </div>

                  <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <strong className="text-rose-700 dark:text-rose-400 block mb-1">
                      3. Historic Arakanese-Bengal Trade Nexus
                    </strong>
                    For over 400 years, cotton, beeswax, teak, and silk were traded along the mountain passes between Mrauk U, Manikchari, and Chittagong.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: HISTORICAL CARTOGRAPHY & TIMELINE MAP (1760 TO PRESENT) */}
      {mapMode === 'timeline' && (
        <ChronologicalHistoricalMap timelineLayers={timelineLayers} />
      )}

      {/* EXPANDED HIGH-RESOLUTION HISTORICAL GEOGRAPHY GALLERY & LIGHTBOX */}
      <div className="pt-8 border-t border-stone-200 dark:border-stone-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-amber-800 dark:text-amber-400 font-bold">
              <Camera className="w-4 h-4" />
              <span>High-Resolution Historical Geography & Topographical Plates</span>
            </div>
            <h3 className="text-xl font-serif font-black text-stone-900 dark:text-stone-100">
              Curated Archival Landscapes & Cartography
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-mono">Click any plate for high-resolution inspection</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {highResGallery.map((plate, pIdx) => (
            <div
              key={pIdx}
              onClick={() => setLightboxImage(plate)}
              className={`group bg-white dark:bg-stone-900 rounded-2xl border-2 ${plate.accent} overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer`}
            >
              <div className="relative aspect-16/10 overflow-hidden bg-stone-200">
                <img
                  src={plate.imageUrl}
                  alt={plate.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/75 text-white backdrop-blur-xs">
                  {plate.category}
                </span>
                <span className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 backdrop-blur-xs">
                  <ZoomIn className="w-3.5 h-3.5" /> High-Res
                </span>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-black text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                    {plate.title}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 font-serif line-clamp-2 mt-1 leading-relaxed">
                    {plate.caption}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-500 dark:text-stone-400">
                  <span>{plate.year}</span>
                  <span className="text-amber-800 dark:text-amber-400 font-semibold flex items-center gap-1">
                    Examine Plate <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Resolution Plate Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="bg-[#FAF7F0] dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-white dark:bg-stone-950">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-amber-800 dark:text-amber-400 tracking-wider">
                  Historical Geography Plate • {lightboxImage.category}
                </span>
                <h3 className="text-lg font-serif font-black text-stone-900 dark:text-stone-100">
                  {lightboxImage.title}
                </h3>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* High-Res Image Display */}
            <div className="relative aspect-16/9 bg-stone-950 flex items-center justify-center overflow-hidden">
              <img
                src={lightboxImage.imageUrl}
                alt={lightboxImage.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Metadata Footer */}
            <div className="p-5 space-y-2 bg-[#F4EFE6] dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 text-xs font-serif text-stone-700 dark:text-stone-300">
              <p className="leading-relaxed">{lightboxImage.caption}</p>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-300/60 dark:border-stone-800 text-[11px] font-mono text-stone-500">
                <span>Archival Source: {lightboxImage.archivalSource}</span>
                <span>Chronology: {lightboxImage.year}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Circle Chronological Evaluation Modal */}
      {selectedCircleId && (
        <CircleEvaluationModal
          circleId={selectedCircleId}
          onClose={() => setSelectedCircleId(null)}
          onSelectCircle={(id) => setSelectedCircleId(id)}
        />
      )}
    </div>
  );
};
