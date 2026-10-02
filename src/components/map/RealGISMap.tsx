import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { UpazilaInfo, LandmarkInfo } from '../../types';
import {
  ALL_CHT_UPAZILAS,
  KHAGRACHARI_UPAZILAS,
  RANGAMATI_UPAZILAS,
  BANDARBAN_UPAZILAS,
  HISTORIC_LANDMARKS,
  CHT_AUDIO_MAP_HOTSPOTS,
  AudioMapHotspot,
} from '../../data/mapData';
import { chtAudioEngine } from '../../services/chtAudioEngine';
import {
  Layers,
  MapPin,
  Compass,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Crown,
  Sparkles,
  Mountain,
  Waves,
  Globe,
  Navigation,
  Crosshair,
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ExternalLink,
  ChevronRight,
  X,
} from 'lucide-react';

export type RealMapMode = 'khagrachari' | 'cht_circles' | 'worldview' | 'timeline';
export type CHTDistrict = 'all' | 'khagrachari' | 'rangamati' | 'bandarban';

interface RealGISMapProps {
  mode?: RealMapMode;
  selectedDistrict?: CHTDistrict;
  onSelectDistrict?: (district: CHTDistrict) => void;
  selectedUpazila: UpazilaInfo;
  onSelectUpazila: (upazila: UpazilaInfo) => void;
  selectedLandmark: LandmarkInfo | null;
  onSelectLandmark: (landmark: LandmarkInfo | null) => void;
  selectedCircleId: 'mong' | 'chakma' | 'bohmong' | null;
  onSelectCircle: (id: 'mong' | 'chakma' | 'bohmong') => void;
  showHistoricalOverlay?: boolean;
  onNavigateToAudioArchives?: (audioId: string) => void;
}

// ==========================================
// ACCURATE GEOSPATIAL DATA FOR ALL 26 CHT UPAZILAS
// ==========================================
const UPAZILA_GEOMETRIES: Record<
  string,
  { centroid: [number, number]; polygon: [number, number][]; areaKm2: number; rivers: string[] }
> = {
  // --- Khagrachari (Mong Circle - 9 Upazilas) ---
  panchhari: {
    centroid: [23.3333, 91.9000],
    polygon: [
      [23.4450, 91.8700],
      [23.4350, 91.9550],
      [23.3600, 91.9680],
      [23.2750, 91.9500],
      [23.2650, 91.8850],
      [23.3100, 91.8400],
      [23.3950, 91.8350],
      [23.4450, 91.8700],
    ],
    areaKm2: 334.5,
    rivers: ['Chengi (Upper Basin)', 'Harina stream'],
  },
  dighinala: {
    centroid: [23.2500, 92.0500],
    polygon: [
      [23.4600, 91.9950],
      [23.4350, 92.1500],
      [23.3200, 92.1800],
      [23.1800, 92.1500],
      [23.1450, 92.0650],
      [23.1850, 91.9950],
      [23.3100, 91.9800],
      [23.4600, 91.9950],
    ],
    areaKm2: 694.4,
    rivers: ['Maini River', 'Kasalang headwaters'],
  },
  'khagrachari-sadar': {
    centroid: [23.1079, 91.9702],
    polygon: [
      [23.1900, 91.9300],
      [23.1850, 92.0150],
      [23.1200, 92.0500],
      [23.0350, 92.0300],
      [23.0400, 91.9350],
      [23.1100, 91.9050],
      [23.1900, 91.9300],
    ],
    areaKm2: 297.9,
    rivers: ['Chengi (Chengmi) River', 'Ganjachhari'],
  },
  mahalchari: {
    centroid: [22.9167, 91.9833],
    polygon: [
      [23.0300, 91.9350],
      [23.0300, 92.0300],
      [22.9200, 92.0650],
      [22.8350, 92.0400],
      [22.8400, 91.9400],
      [22.9300, 91.9150],
      [23.0300, 91.9350],
    ],
    areaKm2: 207.2,
    rivers: ['Chengi River', 'Maini confluence', 'Upper Kaptai arm'],
  },
  matiranga: {
    centroid: [23.0417, 91.8750],
    polygon: [
      [23.2700, 91.8350],
      [23.2650, 91.9100],
      [23.1100, 91.9050],
      [22.9800, 91.8700],
      [22.9100, 91.7850],
      [22.9850, 91.7450],
      [23.1200, 91.7500],
      [23.2700, 91.8350],
    ],
    areaKm2: 495.4,
    rivers: ['Feni River Tributaries', 'Alutila Streams'],
  },
  guimara: {
    centroid: [22.9500, 91.8300],
    polygon: [
      [22.9950, 91.8000],
      [22.9850, 91.8750],
      [22.9050, 91.8850],
      [22.8650, 91.8200],
      [22.9050, 91.7800],
      [22.9950, 91.8000],
    ],
    areaKm2: 153.2,
    rivers: ['Sindukchhari Stream', 'Guimara Khal'],
  },
  ramgarh: {
    centroid: [22.9667, 91.7000],
    polygon: [
      [23.0800, 91.6800],
      [23.0400, 91.7500],
      [22.9300, 91.7650],
      [22.8750, 91.7100],
      [22.9100, 91.6600],
      [23.0300, 91.6500],
      [23.0800, 91.6800],
    ],
    areaKm2: 287.9,
    rivers: ['Feni River (Border Port)', 'Kuhulong'],
  },
  manikchari: {
    centroid: [22.8406, 91.8398],
    polygon: [
      [22.9050, 91.7800],
      [22.9050, 91.8850],
      [22.8100, 91.9050],
      [22.7550, 91.8500],
      [22.7700, 91.7800],
      [22.8450, 91.7600],
      [22.9050, 91.7800],
    ],
    areaKm2: 168.4,
    rivers: ['Halda Headwaters', 'Dhuluchhari'],
  },
  lakshmichhari: {
    centroid: [22.7833, 91.9000],
    polygon: [
      [22.8400, 91.8900],
      [22.8400, 91.9550],
      [22.7400, 91.9650],
      [22.7150, 91.8950],
      [22.7550, 91.8500],
      [22.8400, 91.8900],
    ],
    areaKm2: 220.1,
    rivers: ['Dhulyachhari', 'Upper Karnaphuli catchment'],
  },

  // --- Rangamati (Chakma Circle - 10 Upazilas) ---
  'rangamati-sadar': {
    centroid: [22.6533, 92.1753],
    polygon: [
      [22.7500, 92.1200],
      [22.7400, 92.2300],
      [22.6100, 92.2600],
      [22.5600, 92.1800],
      [22.5800, 92.1100],
      [22.6900, 92.0900],
      [22.7500, 92.1200],
    ],
    areaKm2: 546.5,
    rivers: ['Karnaphuli River Basin', 'Kaptai Lake'],
  },
  kaptai: {
    centroid: [22.4961, 92.2267],
    polygon: [
      [22.5800, 92.1800],
      [22.5700, 92.2800],
      [22.4600, 92.2900],
      [22.4100, 92.2100],
      [22.4400, 92.1400],
      [22.5200, 92.1500],
      [22.5800, 92.1800],
    ],
    areaKm2: 259.0,
    rivers: ['Karnaphuli River (Dam Gorge)', 'Kaptai Chhara'],
  },
  baghaichhari: {
    centroid: [23.3820, 92.2938],
    polygon: [
      [23.5800, 92.1800],
      [23.5400, 92.4200],
      [23.2500, 92.4100],
      [23.1200, 92.2800],
      [23.1800, 92.1500],
      [23.4200, 92.1500],
      [23.5800, 92.1800],
    ],
    areaKm2: 1931.3,
    rivers: ['Kasalang River', 'Sajek Stream'],
  },
  barkal: {
    centroid: [22.7333, 92.3500],
    polygon: [
      [22.8900, 92.2800],
      [22.8600, 92.4800],
      [22.6800, 92.5100],
      [22.6200, 92.3600],
      [22.6800, 92.2500],
      [22.8100, 92.2600],
      [22.8900, 92.2800],
    ],
    areaKm2: 760.9,
    rivers: ['Karnaphuli River (Upper Gorge)', 'Thega River'],
  },
  langadu: {
    centroid: [22.9833, 92.1500],
    polygon: [
      [23.1400, 92.0800],
      [23.1100, 92.2400],
      [22.8800, 92.2600],
      [22.8400, 92.1500],
      [22.8900, 92.0600],
      [23.0500, 92.0400],
      [23.1400, 92.0800],
    ],
    areaKm2: 388.5,
    rivers: ['Maini River', 'Kasalang River', 'Kaptai Lake'],
  },
  jurachhari: {
    centroid: [22.6667, 92.3833],
    polygon: [
      [22.7600, 92.3200],
      [22.7400, 92.5100],
      [22.5500, 92.5200],
      [22.5200, 92.3500],
      [22.6200, 92.2800],
      [22.7600, 92.3200],
    ],
    areaKm2: 606.1,
    rivers: ['Subalong Chhara', 'Thega River Headwaters'],
  },
  bilaichhari: {
    centroid: [22.4667, 92.3667],
    polygon: [
      [22.5800, 92.2900],
      [22.5600, 92.5100],
      [22.3200, 92.5400],
      [22.2800, 92.3200],
      [22.4100, 92.2500],
      [22.5800, 92.2900],
    ],
    areaKm2: 745.9,
    rivers: ['Rainkhyang River', 'Upper Kaptai Arm'],
  },
  rajasthali: {
    centroid: [22.3833, 92.2500],
    polygon: [
      [22.4600, 92.1800],
      [22.4500, 92.3100],
      [22.3100, 92.3300],
      [22.2900, 92.1900],
      [22.3600, 92.1400],
      [22.4600, 92.1800],
    ],
    areaKm2: 145.0,
    rivers: ['Rainkhyang River', 'Karnaphuli Southern Tributaries'],
  },
  kawkhali: {
    centroid: [22.5667, 92.0333],
    polygon: [
      [22.6800, 91.9800],
      [22.6600, 92.1100],
      [22.4800, 92.1200],
      [22.4600, 91.9700],
      [22.5800, 91.9400],
      [22.6800, 91.9800],
    ],
    areaKm2: 247.9,
    rivers: ['Ichamati Headwaters', 'Ghagra Chhara'],
  },
  naniarchar: {
    centroid: [22.8500, 92.1167],
    polygon: [
      [22.9500, 92.0400],
      [22.9400, 92.1800],
      [22.7800, 92.1900],
      [22.7500, 92.0800],
      [22.8300, 92.0100],
      [22.9500, 92.0400],
    ],
    areaKm2: 193.7,
    rivers: ['Chengi River (Southern Basin)', 'Kaptai Lake'],
  },

  // --- Bandarban (Bohmong Circle - 7 Upazilas) ---
  'bandarban-sadar': {
    centroid: [22.1950, 92.2180],
    polygon: [
      [22.3100, 92.1400],
      [22.3000, 92.3100],
      [22.1200, 92.3300],
      [22.0800, 92.1800],
      [22.1500, 92.1100],
      [22.3100, 92.1400],
    ],
    areaKm2: 502.0,
    rivers: ['Sangu (Rigray Khyoung) River', 'Ghagro Chhara'],
  },
  ruma: {
    centroid: [22.0500, 92.4167],
    polygon: [
      [22.2100, 92.3100],
      [22.1900, 92.5600],
      [21.9200, 92.5800],
      [21.8900, 92.3400],
      [22.0400, 92.2800],
      [22.2100, 92.3100],
    ],
    areaKm2: 492.1,
    rivers: ['Sangu River (Upper Gorge)', 'Boga Lake Crater Springs'],
  },
  thanchi: {
    centroid: [21.7833, 92.4333],
    polygon: [
      [21.9500, 92.3600],
      [21.9200, 92.6400],
      [21.5200, 92.6500],
      [21.4900, 92.3500],
      [21.7200, 92.3100],
      [21.9500, 92.3600],
    ],
    areaKm2: 1020.8,
    rivers: ['Sangu River', 'Remakri Canal', 'Boro Pathor Canyon'],
  },
  rowangchhari: {
    centroid: [22.1667, 92.3333],
    polygon: [
      [22.2900, 92.2500],
      [22.2800, 92.4500],
      [22.0600, 92.4700],
      [22.0400, 92.2700],
      [22.1800, 92.2200],
      [22.2900, 92.2500],
    ],
    areaKm2: 442.9,
    rivers: ['Tara Chhara', 'Rowang River'],
  },
  lama: {
    centroid: [21.7833, 92.2000],
    polygon: [
      [21.9600, 92.0800],
      [21.9400, 92.3200],
      [21.6800, 92.3300],
      [21.6200, 92.1200],
      [21.7500, 92.0500],
      [21.9600, 92.0800],
    ],
    areaKm2: 671.8,
    rivers: ['Matamuhuri River', 'Lama Canal'],
  },
  alikadam: {
    centroid: [21.6500, 92.3167],
    polygon: [
      [21.7500, 92.2200],
      [21.7200, 92.4800],
      [21.4200, 92.4900],
      [21.3900, 92.2500],
      [21.5600, 92.1800],
      [21.7500, 92.2200],
    ],
    areaKm2: 885.8,
    rivers: ['Matamuhuri River (Upper Gorge)', 'Twain Chhara'],
  },
  naikhongchhari: {
    centroid: [21.4167, 92.1833],
    polygon: [
      [21.6200, 92.1100],
      [21.5900, 92.3200],
      [21.2500, 92.3100],
      [21.2200, 92.0800],
      [21.4500, 92.0400],
      [21.6200, 92.1100],
    ],
    areaKm2: 463.6,
    rivers: ['Bakkhali River Headwaters', 'Reju Canal'],
  },
};

// ==========================================
// 3 HEREDITARY CIRCLES
// ==========================================
const CIRCLE_TERRITORIES: Record<
  'mong' | 'chakma' | 'bohmong',
  {
    name: string;
    title: string;
    color: string;
    fill: string;
    seat: string;
    ruler: string;
    district: string;
    polygon: [number, number][];
    areaKm2: number;
  }
> = {
  mong: {
    name: 'Mong Circle',
    title: 'Northern Chiefdom (Khagrachari District)',
    color: '#059669',
    fill: '#10b981',
    seat: 'Manikchari Rajbari (Khagrachari)',
    ruler: 'King Saching Prue Chowdhury',
    district: 'Khagrachari Hill District',
    areaKm2: 2699,
    polygon: [
      [23.4650, 91.8400],
      [23.4500, 92.1700],
      [23.1800, 92.1500],
      [23.0100, 92.0800],
      [22.8200, 92.0400],
      [22.7100, 91.9400],
      [22.7400, 91.7500],
      [22.9000, 91.6600],
      [23.1500, 91.6800],
      [23.4650, 91.8400],
    ],
  },
  chakma: {
    name: 'Chakma Circle',
    title: 'Central Chiefdom (Rangamati District)',
    color: '#d97706',
    fill: '#f59e0b',
    seat: 'Rajbari, Rangamati Sadar',
    ruler: 'King Raja Devasish Roy',
    district: 'Rangamati Hill District',
    areaKm2: 6116,
    polygon: [
      [23.5800, 92.1800],
      [23.5400, 92.4800],
      [22.8800, 92.5600],
      [22.4200, 92.5600],
      [22.2500, 92.3500],
      [22.4200, 92.1100],
      [22.6800, 91.9500],
      [22.8600, 92.0200],
      [23.1200, 92.0500],
      [23.4200, 92.1200],
      [23.5800, 92.1800],
    ],
  },
  bohmong: {
    name: 'Bohmong Circle',
    title: 'Southern Chiefdom (Bandarban District)',
    color: '#b91c1c',
    fill: '#ef4444',
    seat: 'Bohmong Rajbari, Bandarban Sadar',
    ruler: 'King U Chaw Prue',
    district: 'Bandarban Hill District',
    areaKm2: 4479,
    polygon: [
      [22.3600, 92.1500],
      [22.3200, 92.4200],
      [21.9800, 92.6200],
      [21.4800, 92.6500],
      [21.2100, 92.3200],
      [21.2200, 92.0800],
      [21.6200, 92.0500],
      [21.9600, 92.0800],
      [22.3600, 92.1500],
    ],
  },
};

export const RealGISMap: React.FC<RealGISMapProps> = ({
  mode = 'khagrachari',
  selectedDistrict = 'all',
  onSelectDistrict,
  selectedUpazila,
  onSelectUpazila,
  selectedLandmark,
  onSelectLandmark,
  selectedCircleId,
  onSelectCircle,
  showHistoricalOverlay = true,
  onNavigateToAudioArchives,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layersRef = useRef<{ [key: string]: L.LayerGroup | L.TileLayer }>({});
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const [activeBaseLayer, setActiveBaseLayer] = useState<'satellite' | 'topo' | 'opentopo' | 'street'>('satellite');
  const [internalDistrict, setInternalDistrict] = useState<CHTDistrict>(selectedDistrict);
  const [toggleRivers, setToggleRivers] = useState<boolean>(true);
  const [toggleLandmarks, setToggleLandmarks] = useState<boolean>(true);
  const [toggleCircles, setToggleCircles] = useState<boolean>(true);
  const [toggleUpazilaPolygons, setToggleUpazilaPolygons] = useState<boolean>(true);
  const [toggleHistorical, setToggleHistorical] = useState<boolean>(showHistoricalOverlay);
  const [toggleAudioHotspots, setToggleAudioHotspots] = useState<boolean>(true);
  const [activeAudioHotspot, setActiveAudioHotspot] = useState<AudioMapHotspot | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);

  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(9);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const containerWrapperRef = useRef<HTMLDivElement>(null);

  // Sync external prop changes
  useEffect(() => {
    if (selectedDistrict) {
      setInternalDistrict(selectedDistrict);
    }
  }, [selectedDistrict]);

  // Audio Playback Handler with dual engine (WAV Blob audio element + Web Audio API synthesizer)
  const handleTogglePlayAudio = async (hotspot: AudioMapHotspot) => {
    if (activeAudioHotspot?.id === hotspot.id && isPlayingAudio) {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      chtAudioEngine.stopLiveSynthesizer();
      setIsPlayingAudio(false);
    } else {
      setActiveAudioHotspot(hotspot);
      setIsPlayingAudio(true);
      setAudioCurrentTime(0);

      const trackId = hotspot.audioRecordId || 'audio-001';
      const wavUrl = await chtAudioEngine.getTrackWavUrl(trackId);

      if (audioPlayerRef.current && wavUrl) {
        audioPlayerRef.current.src = wavUrl;
        audioPlayerRef.current.currentTime = 0;
        audioPlayerRef.current
          .play()
          .catch(() => {
            // Live Web Audio fallback for instant speaker sound
            chtAudioEngine.playLiveSynthesizer(trackId, 0.85, (time, playing) => {
              setAudioCurrentTime(time);
              setIsPlayingAudio(playing);
            });
          });
      } else {
        chtAudioEngine.playLiveSynthesizer(trackId, 0.85, (time, playing) => {
          setAudioCurrentTime(time);
          setIsPlayingAudio(playing);
        });
      }
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Centered on Central CHT [22.55, 92.18]
    const map = L.map(mapContainerRef.current, {
      center: [22.55, 92.18],
      zoom: 9,
      minZoom: 6,
      maxZoom: 18,
      zoomControl: false,
    });

    mapInstanceRef.current = map;

    // Real Tile Layer 1: High-Resolution Satellite Imagery (Esri World Imagery)
    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '&copy; Esri, DigitalGlobe, GeoEye, Earthstar, USDA, OpenStreetMap contributors | CHT High-Res Satellite',
        maxZoom: 18,
      }
    );

    // Real Tile Layer 2: Shaded Topographic Relief (Esri World Topo Map)
    const topoLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: '&copy; Esri, USGS, NOAA, DeLorme, OpenStreetMap contributors | CHT Topographical Survey',
        maxZoom: 18,
      }
    );

    // Real Tile Layer 3: OpenTopoMap with Elevation Contours
    const opentopoLayer = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Style: &copy; OpenTopoMap',
        maxZoom: 17,
      }
    );

    // Real Tile Layer 4: OpenStreetMap Standard Cartography
    const streetLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors | Survey of Bangladesh',
        maxZoom: 18,
      }
    );

    layersRef.current['satellite'] = satelliteLayer;
    layersRef.current['topo'] = topoLayer;
    layersRef.current['opentopo'] = opentopoLayer;
    layersRef.current['street'] = streetLayer;

    // Add default satellite layer
    satelliteLayer.addTo(map);

    // Scale Bar
    L.control.scale({ imperial: true, metric: true, position: 'bottomleft' }).addTo(map);

    // Coordinate Listener
    map.on('mousemove', (e: L.LeafletMouseEvent) => {
      setCursorCoords({ lat: Number(e.latlng.lat.toFixed(4)), lng: Number(e.latlng.lng.toFixed(4)) });
    });

    map.on('zoomend', () => {
      setZoomLevel(map.getZoom());
    });

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Base Layer Switching
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    ['topo', 'satellite', 'opentopo', 'street'].forEach((key) => {
      const lyr = layersRef.current[key];
      if (lyr && map.hasLayer(lyr)) {
        map.removeLayer(lyr);
      }
    });

    const targetLayer = layersRef.current[activeBaseLayer];
    if (targetLayer) {
      targetLayer.addTo(map);
    }
  }, [activeBaseLayer]);

  // District View Camera Movement
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (internalDistrict === 'khagrachari') {
      map.flyTo([23.11, 91.97], 10, { duration: 1.2 });
    } else if (internalDistrict === 'rangamati') {
      map.flyTo([22.68, 92.20], 9.5, { duration: 1.2 });
    } else if (internalDistrict === 'bandarban') {
      map.flyTo([21.90, 92.30], 9.5, { duration: 1.2 });
    } else {
      // All CHT
      map.flyTo([22.55, 92.18], 8.5, { duration: 1.2 });
    }

    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [internalDistrict]);

  // Render Vector Layers (Upazilas, Circles, Landmarks, Audio Hotspots)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (layersRef.current['dynamicVectorGroup']) {
      map.removeLayer(layersRef.current['dynamicVectorGroup']);
    }

    const vectorGroup = L.layerGroup();

    // Determine which upazilas to display based on internalDistrict
    const upazilasToRender: UpazilaInfo[] =
      internalDistrict === 'khagrachari'
        ? KHAGRACHARI_UPAZILAS
        : internalDistrict === 'rangamati'
        ? RANGAMATI_UPAZILAS
        : internalDistrict === 'bandarban'
        ? BANDARBAN_UPAZILAS
        : ALL_CHT_UPAZILAS;

    // 1. Upazila Boundaries & Filled Polygons
    if (toggleUpazilaPolygons) {
      upazilasToRender.forEach((upazila: UpazilaInfo) => {
        const geo = UPAZILA_GEOMETRIES[upazila.id];
        if (!geo) return;

        const isSelected = selectedUpazila.id === upazila.id;
        const circleThemeColor =
          upazila.circle === 'mong' ? '#10b981' : upazila.circle === 'chakma' ? '#f59e0b' : '#f43f5e';

        const poly = L.polygon(geo.polygon, {
          color: isSelected ? '#ffffff' : circleThemeColor,
          weight: isSelected ? 3.5 : 1.5,
          dashArray: isSelected ? undefined : '3,3',
          fillColor: isSelected ? '#fbbf24' : circleThemeColor,
          fillOpacity: isSelected ? 0.45 : 0.15,
        });

        poly.on('click', () => {
          onSelectUpazila(upazila);
          onSelectLandmark(null);
        });

        poly.bindTooltip(
          `<div style="font-family: serif; font-size: 12px; line-height: 1.4; color: #0f172a;">
            <strong style="font-size: 13px;">${upazila.name} Upazila</strong><br/>
            <span style="font-size: 10px; color: #64748b;">${upazila.bengaliName} • ${upazila.district} (${upazila.circle?.toUpperCase()} Circle)</span><br/>
            <span style="font-size: 10px; color: #b45309; font-weight: bold;">Area: ${geo.areaKm2} km²</span>
          </div>`,
          { sticky: true }
        );

        vectorGroup.addLayer(poly);

        // Centroid Label Marker
        const labelIcon = L.divIcon({
          className: 'upazila-center-label',
          html: `
            <div style="
              background: ${isSelected ? '#b45309' : 'rgba(15, 23, 42, 0.88)'};
              color: #ffffff;
              padding: 2px 7px;
              border-radius: 6px;
              font-family: 'Source Serif 4', serif;
              font-size: 11px;
              font-weight: 700;
              border: 1px solid ${isSelected ? '#fbbf24' : 'rgba(255,255,255,0.25)'};
              box-shadow: 0 2px 5px rgba(0,0,0,0.5);
              white-space: nowrap;
              cursor: pointer;
              transform: translate(-50%, -50%);
            ">
              ${upazila.name}
            </div>
          `,
          iconSize: [80, 20],
          iconAnchor: [40, 10],
        });

        const labelMarker = L.marker(geo.centroid, { icon: labelIcon });
        labelMarker.on('click', () => onSelectUpazila(upazila));
        vectorGroup.addLayer(labelMarker);
      });
    }

    // 2. The Three Traditional Circles (Mong, Chakma, Bohmong)
    if (toggleCircles) {
      (['mong', 'chakma', 'bohmong'] as const).forEach((circleKey) => {
        const c = CIRCLE_TERRITORIES[circleKey];
        const isSelected = selectedCircleId === circleKey;

        const circlePoly = L.polygon(c.polygon, {
          color: isSelected ? '#fbbf24' : c.color,
          weight: isSelected ? 4 : 2,
          fillColor: c.fill,
          fillOpacity: isSelected ? 0.25 : 0.06,
        });

        circlePoly.on('click', () => onSelectCircle(circleKey));

        circlePoly.bindTooltip(
          `<div style="font-family: serif; font-size: 13px; line-height: 1.4;">
            <strong style="color: ${c.color}; font-size: 14px;">${c.name}</strong><br/>
            <span style="font-size: 11px; color: #475569;">${c.title} • Seat: ${c.seat}</span><br/>
            <span style="font-size: 10px; font-weight: bold; color: #b45309;">Chief: ${c.ruler}</span>
          </div>`,
          { sticky: true }
        );

        vectorGroup.addLayer(circlePoly);
      });
    }

    // 3. Oral History Audio Hotspots (Interactive Audio Map Layer)
    if (toggleAudioHotspots) {
      CHT_AUDIO_MAP_HOTSPOTS.forEach((hotspot) => {
        const isCurrentlySelected = activeAudioHotspot?.id === hotspot.id;

        const audioIcon = L.divIcon({
          className: 'gis-audio-hotspot-pin',
          html: `
            <div style="
              background: ${isCurrentlySelected ? '#be123c' : '#e11d48'};
              color: #ffffff;
              border: 2px solid #ffffff;
              border-radius: 50%;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 0 14px rgba(225, 29, 72, 0.7);
              cursor: pointer;
              transform: translate(-50%, -50%);
              animation: ${isCurrentlySelected ? 'pulse 1.5s infinite' : 'none'};
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
              </svg>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const audioMarker = L.marker(hotspot.coordinates, { icon: audioIcon });
        audioMarker.on('click', () => {
          setActiveAudioHotspot(hotspot);
          setIsPlayingAudio(true);
          if (audioPlayerRef.current) {
            audioPlayerRef.current.src = hotspot.audioSrc;
            audioPlayerRef.current.play().catch(() => {});
          }
        });

        audioMarker.bindTooltip(
          `<div style="font-family: serif; font-size: 12px; width: 230px; line-height: 1.4;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <span style="background: #e11d48; color: #fff; font-size: 9px; font-weight: bold; padding: 1px 5px; border-radius: 4px;">🎧 ORAL HISTORY</span>
              <span style="font-size: 10px; color: #64748b;">${hotspot.duration}</span>
            </div>
            <strong style="color: #0f172a; font-size: 13px;">${hotspot.title}</strong><br/>
            <span style="font-size: 11px; color: #b45309; font-weight: bold;">📍 ${hotspot.siteName}</span><br/>
            <span style="font-size: 10px; color: #475569;">Recorded by ${hotspot.performer} (${hotspot.community})</span>
          </div>`,
          { sticky: true }
        );

        vectorGroup.addLayer(audioMarker);
      });
    }

    // 4. Historical Landmarks Pins (Khagrachari, Rangamati, Bandarban)
    if (toggleLandmarks) {
      HISTORIC_LANDMARKS.forEach((lm: LandmarkInfo) => {
        const coords = lm.geoCoordinates || [22.65, 92.18];
        const isSelected = selectedLandmark?.id === lm.id;

        const pinIcon = L.divIcon({
          className: 'gis-landmark-pin',
          html: `
            <div style="
              background: ${isSelected ? '#dc2626' : '#1e293b'};
              color: #ffffff;
              border: 2px solid ${isSelected ? '#fef08a' : '#ffffff'};
              border-radius: 50%;
              width: ${isSelected ? '26px' : '20px'};
              height: ${isSelected ? '26px' : '20px'};
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 3px 8px rgba(0,0,0,0.5);
              cursor: pointer;
              transform: translate(-50%, -50%);
              transition: all 0.2s ease;
            ">
              <div style="width: ${isSelected ? '8px' : '6px'}; height: ${isSelected ? '8px' : '6px'}; border-radius: 50%; background: ${isSelected ? '#fef08a' : '#ffffff'};"></div>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker(coords, { icon: pinIcon });
        marker.on('click', () => {
          onSelectLandmark(lm);
          const parentUpazila = ALL_CHT_UPAZILAS.find((u) => u.id === lm.upazilaId);
          if (parentUpazila) {
            onSelectUpazila(parentUpazila);
          }
        });

        marker.bindTooltip(
          `<div style="font-family: serif; font-size: 12px; width: 220px; line-height: 1.4;">
            <strong style="color: #0f172a; font-size: 13px;">${lm.name}</strong><br/>
            <span style="font-size: 11px; color: #b45309; font-weight: bold;">📍 ${lm.district || 'CHT'} • ${lm.category}</span>
            <div style="font-size: 11px; color: #475569; margin-top: 4px;">
              ${lm.summary.slice(0, 110)}...
            </div>
          </div>`,
          { sticky: true }
        );

        vectorGroup.addLayer(marker);
      });
    }

    // 5. 1860 Mun Circle Historical Line (If Enabled)
    if (toggleHistorical) {
      const historicalMunBoundary: [number, number][] = [
        [23.46, 91.75],
        [23.44, 92.18],
        [22.82, 92.15],
        [22.72, 91.76],
        [23.46, 91.75],
      ];

      const histPoly = L.polygon(historicalMunBoundary, {
        color: '#7c3aed',
        fillColor: '#8b5cf6',
        fillOpacity: 0.1,
        weight: 2.5,
        dashArray: '6,6',
      }).bindTooltip(
        '<strong>1860 Mun Circle Colonial Boundary Overlay</strong><br/><em>Statutory recognition under British Act XXII of 1860</em>',
        { sticky: true }
      );

      vectorGroup.addLayer(histPoly);
    }

    vectorGroup.addTo(map);
    layersRef.current['dynamicVectorGroup'] = vectorGroup;
  }, [
    internalDistrict,
    selectedUpazila,
    selectedLandmark,
    selectedCircleId,
    activeAudioHotspot,
    toggleRivers,
    toggleLandmarks,
    toggleCircles,
    toggleUpazilaPolygons,
    toggleHistorical,
    toggleAudioHotspots,
    onSelectUpazila,
    onSelectLandmark,
    onSelectCircle,
  ]);

  // District Navigation Tab Click
  const handleDistrictChange = (dist: CHTDistrict) => {
    setInternalDistrict(dist);
    onSelectDistrict?.(dist);
  };

  // Fly to preset locations
  const flyToPreset = (coords: [number, number], zoom: number) => {
    mapInstanceRef.current?.flyTo(coords, zoom, { duration: 1.2 });
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerWrapperRef.current) return;
    if (!document.fullscreenElement) {
      containerWrapperRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div ref={containerWrapperRef} className={`space-y-4 ${isFullscreen ? 'bg-stone-950 p-4' : ''}`}>
      {/* Hidden HTML5 Audio Element for Map Snippets */}
      <audio
        ref={audioPlayerRef}
        onTimeUpdate={(e) => setAudioCurrentTime(e.currentTarget.currentTime)}
        onEnded={() => setIsPlayingAudio(false)}
      />

      {/* Top Map Control Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3 text-xs">
        {/* Row 1: District Switcher (Khagrachari, Rangamati, Bandarban, All) */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-2.5">
          <div className="flex items-center gap-1.5 font-serif font-bold text-stone-700 dark:text-stone-300">
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Select CHT District:</span>
          </div>

          <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl overflow-x-auto">
            <button
              onClick={() => handleDistrictChange('all')}
              className={`px-3 py-1.5 rounded-lg font-serif font-bold transition-all cursor-pointer whitespace-nowrap ${
                internalDistrict === 'all'
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              All CHT (3 Circles)
            </button>
            <button
              onClick={() => handleDistrictChange('khagrachari')}
              className={`px-3 py-1.5 rounded-lg font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                internalDistrict === 'khagrachari'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Khagrachari (Mong)</span>
            </button>
            <button
              onClick={() => handleDistrictChange('rangamati')}
              className={`px-3 py-1.5 rounded-lg font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                internalDistrict === 'rangamati'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Rangamati (Chakma)</span>
            </button>
            <button
              onClick={() => handleDistrictChange('bandarban')}
              className={`px-3 py-1.5 rounded-lg font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                internalDistrict === 'bandarban'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <span>Bandarban (Bohmong)</span>
            </button>
          </div>
        </div>

        {/* Row 2: GIS Tiles & Layer Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Base Layer Switcher */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl overflow-x-auto">
            <span className="text-[11px] font-mono text-stone-500 font-bold px-2 whitespace-nowrap">Tiles:</span>
            <button
              onClick={() => setActiveBaseLayer('satellite')}
              className={`px-2.5 py-1 rounded-lg font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeBaseLayer === 'satellite'
                  ? 'bg-emerald-700 text-white shadow-xs font-black'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Satellite</span>
            </button>
            <button
              onClick={() => setActiveBaseLayer('opentopo')}
              className={`px-2.5 py-1 rounded-lg font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeBaseLayer === 'opentopo'
                  ? 'bg-amber-800 text-white shadow-xs font-black'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-amber-300" />
              <span>OSM Topo Contours</span>
            </button>
            <button
              onClick={() => setActiveBaseLayer('street')}
              className={`px-2.5 py-1 rounded-lg font-serif font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeBaseLayer === 'street'
                  ? 'bg-stone-800 text-white shadow-xs font-black'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-stone-300" />
              <span>OSM Cartography</span>
            </button>
          </div>

          {/* Interactive Feature Layer Toggles */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Oral History Audio Map Layer Toggle */}
            <button
              onClick={() => setToggleAudioHotspots(!toggleAudioHotspots)}
              className={`px-2.5 py-1.5 rounded-lg border font-serif text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                toggleAudioHotspots
                  ? 'bg-rose-100 dark:bg-rose-950 text-rose-900 dark:text-rose-200 border-rose-400 dark:border-rose-700 font-bold shadow-xs'
                  : 'bg-stone-50 dark:bg-stone-800 text-stone-500 border-stone-200 dark:border-stone-700'
              }`}
              title="Click on pins to hear oral history field recordings"
            >
              <Headphones className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Oral History Audio ({CHT_AUDIO_MAP_HOTSPOTS.length})</span>
            </button>

            <button
              onClick={() => setToggleCircles(!toggleCircles)}
              className={`px-2.5 py-1.5 rounded-lg border font-serif text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                toggleCircles
                  ? 'bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800 font-bold'
                  : 'bg-stone-50 dark:bg-stone-800 text-stone-500 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-600" />
              <span>3 Circles</span>
            </button>

            <button
              onClick={() => setToggleUpazilaPolygons(!toggleUpazilaPolygons)}
              className={`px-2.5 py-1.5 rounded-lg border font-serif text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                toggleUpazilaPolygons
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 font-bold'
                  : 'bg-stone-50 dark:bg-stone-800 text-stone-500 border-stone-200 dark:border-stone-700'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>26 Upazilas</span>
            </button>

            <button
              onClick={() => setToggleLandmarks(!toggleLandmarks)}
              className={`px-2.5 py-1.5 rounded-lg border font-serif text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                toggleLandmarks
                  ? 'bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800 font-bold'
                  : 'bg-stone-50 dark:bg-stone-800 text-stone-500 border-stone-200 dark:border-stone-700'
              }`}
            >
              <Navigation className="w-3.5 h-3.5 text-blue-600" />
              <span>Landmarks</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 cursor-pointer"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Leaflet GIS Map Canvas with Floating Audio Player */}
      <div
        className={`relative w-full rounded-2xl overflow-hidden border-2 border-stone-300 dark:border-stone-800 shadow-xl bg-stone-900 ${
          isFullscreen ? 'h-[calc(100vh-140px)]' : 'aspect-16/10 sm:aspect-16/9 lg:aspect-21/10 min-h-[480px]'
        }`}
      >
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Native Audio Playback Engine */}
        <audio
          ref={audioPlayerRef}
          onTimeUpdate={() => {
            if (audioPlayerRef.current) {
              setAudioCurrentTime(audioPlayerRef.current.currentTime);
            }
          }}
          onEnded={() => {
            setIsPlayingAudio(false);
          }}
          className="hidden"
        />

        {/* Floating Quick Navigation Hub */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 bg-stone-900/95 text-white p-2.5 rounded-xl border border-stone-700/80 shadow-2xl backdrop-blur-md text-[11px] font-serif max-w-[190px]">
          <div className="text-[10px] uppercase font-mono font-bold text-amber-400 px-1 pb-1 border-b border-stone-700 flex items-center justify-between">
            <span>Spatial Navigation</span>
            <Crosshair className="w-3 h-3 text-amber-400" />
          </div>
          <button
            onClick={() => flyToPreset([23.1079, 91.9702], 11)}
            className="px-2 py-1 rounded text-left hover:bg-stone-800 transition-colors cursor-pointer text-stone-200 flex items-center justify-between"
          >
            <span>Khagrachari Sadar</span>
            <ChevronRight className="w-3 h-3 opacity-60" />
          </button>
          <button
            onClick={() => flyToPreset([22.6533, 92.1753], 11)}
            className="px-2 py-1 rounded text-left hover:bg-stone-800 transition-colors cursor-pointer text-amber-300 flex items-center justify-between"
          >
            <span>Rangamati Rajbari</span>
            <ChevronRight className="w-3 h-3 opacity-60" />
          </button>
          <button
            onClick={() => flyToPreset([22.1950, 92.2180], 11)}
            className="px-2 py-1 rounded text-left hover:bg-stone-800 transition-colors cursor-pointer text-rose-300 flex items-center justify-between"
          >
            <span>Bandarban Bohmong Palace</span>
            <ChevronRight className="w-3 h-3 opacity-60" />
          </button>
          <button
            onClick={() => flyToPreset([23.3820, 92.2938], 12)}
            className="px-2 py-1 rounded text-left hover:bg-stone-800 transition-colors cursor-pointer text-emerald-300 flex items-center justify-between"
          >
            <span>Sajek Ridge (1,800 ft)</span>
            <ChevronRight className="w-3 h-3 opacity-60" />
          </button>
          <button
            onClick={() => flyToPreset([21.6833, 92.4833], 12)}
            className="px-2 py-1 rounded text-left hover:bg-stone-800 transition-colors cursor-pointer text-sky-300 flex items-center justify-between"
          >
            <span>Nafakhum & Sangu Gorge</span>
            <ChevronRight className="w-3 h-3 opacity-60" />
          </button>
        </div>

        {/* Floating Interactive Oral History Player Card */}
        {activeAudioHotspot && (
          <div className="absolute bottom-4 right-4 z-30 max-w-sm w-full bg-[#FBF9F5]/98 dark:bg-stone-900/98 backdrop-blur-md p-4 rounded-2xl border-2 border-rose-500 shadow-2xl space-y-3 animate-fadeIn text-stone-900 dark:text-stone-100">
            <div className="flex items-start justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Geographic Oral History • {activeAudioHotspot.community}</span>
                </div>
                <h4 className="font-serif font-black text-sm text-stone-900 dark:text-stone-100 leading-snug mt-0.5">
                  {activeAudioHotspot.title}
                </h4>
                <div className="text-[11px] font-serif text-amber-800 dark:text-amber-400 font-semibold flex items-center justify-between">
                  <span>📍 {activeAudioHotspot.siteName}</span>
                </div>
                {isPlayingAudio && (
                  <div className="flex items-center gap-1.5 pt-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    <div className="flex items-end gap-0.5 h-2.5">
                      <span className="w-0.5 bg-emerald-500 rounded-xs animate-bounce" style={{ height: '80%', animationDuration: '600ms' }}></span>
                      <span className="w-0.5 bg-emerald-500 rounded-xs animate-bounce" style={{ height: '100%', animationDuration: '450ms' }}></span>
                      <span className="w-0.5 bg-emerald-500 rounded-xs animate-bounce" style={{ height: '60%', animationDuration: '750ms' }}></span>
                    </div>
                    <span>Acoustic Audio Active • {Math.floor(audioCurrentTime)}s / {activeAudioHotspot.duration}</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  if (audioPlayerRef.current) {
                    audioPlayerRef.current.pause();
                  }
                  chtAudioEngine.stopLiveSynthesizer();
                  setIsPlayingAudio(false);
                  setActiveAudioHotspot(null);
                }}
                className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs font-serif text-stone-600 dark:text-stone-300 leading-relaxed italic line-clamp-2">
              "{activeAudioHotspot.previewExcerpt}"
            </p>

            {/* In-Map Playback Controls */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-100 dark:border-stone-800 text-xs">
              <button
                onClick={() => handleTogglePlayAudio(activeAudioHotspot)}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-serif font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? 'Pause Clip' : 'Play Audio Clip'}</span>
              </button>

              <button
                onClick={() => {
                  // Dispatch custom event to sync with Audio Archives Section
                  window.dispatchEvent(
                    new CustomEvent('chengmi-audio-select', { detail: activeAudioHotspot.audioRecordId })
                  );
                  onNavigateToAudioArchives?.(activeAudioHotspot.audioRecordId);
                }}
                className="text-[11px] font-sans font-semibold text-stone-700 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 underline cursor-pointer"
              >
                <span>Full Tape in Archives</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Live Coordinate Display */}
        {cursorCoords && (
          <div className="absolute bottom-2 left-20 z-20 px-2 py-0.5 rounded bg-black/75 text-stone-300 text-[10px] font-mono backdrop-blur-xs border border-white/10 hidden sm:block">
            {cursorCoords.lat}° N, {cursorCoords.lng}° E • Zoom: {zoomLevel}
          </div>
        )}
      </div>
    </div>
  );
};
