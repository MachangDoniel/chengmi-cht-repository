import React from 'react';
import {
  MapPin,
  Globe,
  Clock,
  Layers,
  Waves,
  Mountain,
  Shield,
  Compass,
  Navigation,
  Crown,
  CheckSquare,
  Square,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';

export type MapMode = 'khagrachari' | 'cht_circles' | 'worldview' | 'timeline';

export interface DistrictLayers {
  rivers: boolean;
  elevation: boolean;
  landmarks: boolean;
  borders: boolean;
  upazilaFills: boolean;
  mouzaCenters: boolean;
}

export interface CirclesLayers {
  circleSeats: boolean;
  waterBodies: boolean;
  tribalCentres: boolean;
  borderLines: boolean;
}

export interface WorldviewLayers {
  tradeRoutes: boolean;
  maritimePorts: boolean;
  frontiers: boolean;
  ecoCorridor: boolean;
  strategicPasses: boolean;
}

export interface TimelineLayers {
  tributePosts: boolean;
  colonialBorders: boolean;
  tribalAutonomousZones: boolean;
  resistanceCorridors: boolean;
  waterways: boolean;
}

interface MapLayerControlsProps {
  mapMode: MapMode;
  setMapMode: (mode: MapMode) => void;
  districtLayers: DistrictLayers;
  setDistrictLayers: React.Dispatch<React.SetStateAction<DistrictLayers>>;
  circlesLayers: CirclesLayers;
  setCirclesLayers: React.Dispatch<React.SetStateAction<CirclesLayers>>;
  worldviewLayers: WorldviewLayers;
  setWorldviewLayers: React.Dispatch<React.SetStateAction<WorldviewLayers>>;
  timelineLayers: TimelineLayers;
  setTimelineLayers: React.Dispatch<React.SetStateAction<TimelineLayers>>;
  showHistoricalOverlayOnDistrict: boolean;
  setShowHistoricalOverlayOnDistrict: (val: boolean) => void;
}

export const MapLayerControls: React.FC<MapLayerControlsProps> = ({
  mapMode,
  setMapMode,
  districtLayers,
  setDistrictLayers,
  circlesLayers,
  setCirclesLayers,
  worldviewLayers,
  setWorldviewLayers,
  timelineLayers,
  setTimelineLayers,
  showHistoricalOverlayOnDistrict,
  setShowHistoricalOverlayOnDistrict,
}) => {
  return (
    <div className="space-y-3">
      {/* 4-Way Mode Selector Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-stone-100 dark:bg-stone-900/90 p-2 sm:p-2.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-serif font-bold text-stone-800 dark:text-stone-200 pl-1">
          <Layers className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          <span>Active Cartographic Scale:</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 w-full md:w-auto">
          <button
            onClick={() => setMapMode('khagrachari')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mapMode === 'khagrachari'
                ? 'bg-emerald-800 text-white shadow-sm font-bold'
                : 'bg-white/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>3 Districts (26 Upazilas)</span>
          </button>

          <button
            onClick={() => setMapMode('cht_circles')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mapMode === 'cht_circles'
                ? 'bg-amber-800 text-white shadow-sm font-bold'
                : 'bg-white/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>3 Chiefdoms (Circles)</span>
          </button>

          <button
            onClick={() => setMapMode('worldview')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mapMode === 'worldview'
                ? 'bg-blue-800 text-white shadow-sm font-bold'
                : 'bg-white/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>Macro World-View</span>
          </button>

          <button
            onClick={() => setMapMode('timeline')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mapMode === 'timeline'
                ? 'bg-purple-800 text-white shadow-sm font-bold'
                : 'bg-white/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-purple-300" />
            <span>Chronological Overlays</span>
          </button>
        </div>
      </div>

      {/* Dynamic Layer Toggle Deck for Active View */}
      <div className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-800 dark:text-stone-200">
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
          <span>Toggle Overlays ({mapMode === 'khagrachari' ? 'District' : mapMode === 'worldview' ? 'World-View' : mapMode === 'timeline' ? 'Chronological Historical' : 'Circles'}):</span>
        </div>

        {/* District Mode Overlays */}
        {mapMode === 'khagrachari' && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setDistrictLayers((p) => ({ ...p, rivers: !p.rivers }))}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                districtLayers.rivers
                  ? 'bg-sky-50 dark:bg-sky-950 text-sky-900 dark:text-sky-300 border-sky-300 dark:border-sky-800 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Waves className="w-3.5 h-3.5 text-sky-500" />
              <span>Rivers (Chengi / Feni / Maini)</span>
              {districtLayers.rivers ? <CheckSquare className="w-3 h-3 text-sky-600" /> : <Square className="w-3 h-3 text-stone-400" />}
            </button>

            <button
              onClick={() => setDistrictLayers((p) => ({ ...p, elevation: !p.elevation }))}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                districtLayers.elevation
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-emerald-500" />
              <span>Elevation Ridges</span>
              {districtLayers.elevation ? <CheckSquare className="w-3 h-3 text-emerald-600" /> : <Square className="w-3 h-3 text-stone-400" />}
            </button>

            <button
              onClick={() => setDistrictLayers((p) => ({ ...p, landmarks: !p.landmarks }))}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                districtLayers.landmarks
                  ? 'bg-amber-50 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Heritage Pins</span>
              {districtLayers.landmarks ? <CheckSquare className="w-3 h-3 text-amber-600" /> : <Square className="w-3 h-3 text-stone-400" />}
            </button>

            <button
              onClick={() => setDistrictLayers((p) => ({ ...p, borders: !p.borders }))}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                districtLayers.borders
                  ? 'bg-rose-50 dark:bg-rose-950 text-rose-900 dark:text-rose-300 border-rose-300 dark:border-rose-800 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-rose-500" />
              <span>Frontier Border</span>
              {districtLayers.borders ? <CheckSquare className="w-3 h-3 text-rose-600" /> : <Square className="w-3 h-3 text-stone-400" />}
            </button>

            <button
              onClick={() => setShowHistoricalOverlayOnDistrict(!showHistoricalOverlayOnDistrict)}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                showHistoricalOverlayOnDistrict
                  ? 'bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-300 border-purple-400 dark:border-purple-800 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
              title="Project historical colonial frontier & tribute posts over modern upazilas"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>1860 Mun Circle Overlay</span>
              {showHistoricalOverlayOnDistrict ? <CheckSquare className="w-3 h-3 text-purple-600" /> : <Square className="w-3 h-3 text-stone-400" />}
            </button>
          </div>
        )}

        {/* Circles Mode Overlays */}
        {mapMode === 'cht_circles' && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setCirclesLayers((p) => ({ ...p, circleSeats: !p.circleSeats }))}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                circlesLayers.circleSeats
                  ? 'bg-amber-50 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              <span>Circle Royal Palaces (Seats)</span>
              {circlesLayers.circleSeats ? <CheckSquare className="w-3 h-3 text-amber-600" /> : <Square className="w-3 h-3 text-stone-400" />}
            </button>

            <button
              onClick={() => setCirclesLayers((p) => ({ ...p, waterBodies: !p.waterBodies }))}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                circlesLayers.waterBodies
                  ? 'bg-sky-50 dark:bg-sky-950 text-sky-900 dark:text-sky-300 border-sky-300 dark:border-sky-800 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Waves className="w-3.5 h-3.5 text-sky-600" />
              <span>Kaptai Basin & Sangu</span>
              {circlesLayers.waterBodies ? <CheckSquare className="w-3 h-3 text-sky-600" /> : <Square className="w-3 h-3 text-stone-400" />}
            </button>

            <button
              onClick={() => setCirclesLayers((p) => ({ ...p, tribalCentres: !p.tribalCentres }))}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                circlesLayers.tribalCentres
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>Customary Mouza Centers</span>
              {circlesLayers.tribalCentres ? <CheckSquare className="w-3 h-3 text-emerald-600" /> : <Square className="w-3 h-3 text-stone-400" />}
            </button>
          </div>
        )}

        {/* Worldview Mode Overlays */}
        {mapMode === 'worldview' && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setWorldviewLayers((p) => ({ ...p, tradeRoutes: !p.tradeRoutes }))}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                worldviewLayers.tradeRoutes
                  ? 'bg-amber-50 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Silk & Cotton Routes</span>
              {worldviewLayers.tradeRoutes ? <CheckSquare className="w-3 h-3 text-amber-600" /> : <Square className="w-3 h-3 text-stone-400" />}
            </button>

            <button
              onClick={() => setWorldviewLayers((p) => ({ ...p, maritimePorts: !p.maritimePorts }))}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                worldviewLayers.maritimePorts
                  ? 'bg-sky-50 dark:bg-sky-950 text-sky-900 dark:text-sky-300 border-sky-300 dark:border-sky-800 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Navigation className="w-3.5 h-3.5 text-sky-600" />
              <span>Maritime Sea Lanes & Ports</span>
              {worldviewLayers.maritimePorts ? <CheckSquare className="w-3 h-3 text-sky-600" /> : <Square className="w-3 h-3 text-stone-400" />}
            </button>

            <button
              onClick={() => setWorldviewLayers((p) => ({ ...p, frontiers: !p.frontiers }))}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                worldviewLayers.frontiers
                  ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-indigo-600" />
              <span>Neighboring Kingdoms</span>
              {worldviewLayers.frontiers ? <CheckSquare className="w-3 h-3 text-indigo-600" /> : <Square className="w-3 h-3 text-stone-400" />}
            </button>

            <button
              onClick={() => setWorldviewLayers((p) => ({ ...p, ecoCorridor: !p.ecoCorridor }))}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                worldviewLayers.ecoCorridor
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-emerald-600" />
              <span>Indo-Burma Corridor</span>
              {worldviewLayers.ecoCorridor ? <CheckSquare className="w-3 h-3 text-emerald-600" /> : <Square className="w-3 h-3 text-stone-400" />}
            </button>
          </div>
        )}

        {/* Timeline Mode Overlays */}
        {mapMode === 'timeline' && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setTimelineLayers((p) => ({ ...p, colonialBorders: !p.colonialBorders }))}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                timelineLayers.colonialBorders
                  ? 'bg-purple-50 dark:bg-purple-950 text-purple-900 dark:text-purple-300 border-purple-300 dark:border-purple-800 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-purple-600" />
              <span>Colonial Frontier Demarcations</span>
              {timelineLayers.colonialBorders ? <CheckSquare className="w-3 h-3 text-purple-600" /> : <Square className="w-3 h-3 text-stone-400" />}
            </button>

            <button
              onClick={() => setTimelineLayers((p) => ({ ...p, tributePosts: !p.tributePosts }))}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                timelineLayers.tributePosts
                  ? 'bg-amber-50 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              <span>Tribute Posts & Forts</span>
              {timelineLayers.tributePosts ? <CheckSquare className="w-3 h-3 text-amber-600" /> : <Square className="w-3 h-3 text-stone-400" />}
            </button>

            <button
              onClick={() => setTimelineLayers((p) => ({ ...p, tribalAutonomousZones: !p.tribalAutonomousZones }))}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                timelineLayers.tribalAutonomousZones
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>Autonomous Indigenous Zones</span>
              {timelineLayers.tribalAutonomousZones ? <CheckSquare className="w-3 h-3 text-emerald-600" /> : <Square className="w-3 h-3 text-stone-400" />}
            </button>

            <button
              onClick={() => setTimelineLayers((p) => ({ ...p, resistanceCorridors: !p.resistanceCorridors }))}
              className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                timelineLayers.resistanceCorridors
                  ? 'bg-rose-50 dark:bg-rose-950 text-rose-900 dark:text-rose-300 border-rose-300 dark:border-rose-800 font-bold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Resistance & Refugee Paths</span>
              {timelineLayers.resistanceCorridors ? <CheckSquare className="w-3 h-3 text-rose-600" /> : <Square className="w-3 h-3 text-stone-400" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
