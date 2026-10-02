import React, { useState } from 'react';
import { GalleryItem } from '../../types';
import { HISTORICAL_GALLERY_ITEMS } from '../../data/galleryData';
import { GalleryModalViewer } from './GalleryModalViewer';
import { useAuth } from '../../context/AuthContext';
import {
  Search,
  Filter,
  ZoomIn,
  Camera,
  Map as MapIcon,
  Layers,
  Calendar,
  MapPin,
  ChevronRight,
  BookOpen,
  Sparkles,
} from 'lucide-react';

export const HistoricalGallery: React.FC = () => {
  const { logAudit } = useAuth();
  const [items] = useState<GalleryItem[]>(HISTORICAL_GALLERY_ITEMS);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Historical Maps',
    'Royal Chiefs & Monarchy',
    'Colonial Frontiers',
    'Ecological & Riverways',
    'Architectural Heritage',
  ];

  const types = [
    { id: 'All', label: 'All Artifacts' },
    { id: 'map', label: 'Historical Maps', icon: MapIcon },
    { id: 'photograph', label: 'Photographs & Glass Plates', icon: Camera },
  ];

  const filteredItems = items.filter((item) => {
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.archiveRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesCategory && matchesSearch;
  });

  const handleOpenItem = (item: GalleryItem) => {
    setActiveModalItem(item);
    logAudit(`Archival photograph/map inspected: ${item.archiveRef}`, 'public', item.id);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner and Stats Overview */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-stone-100 dark:from-stone-900 dark:to-stone-850 border border-amber-200/80 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-amber-800 dark:text-amber-400 font-bold">
            <Camera className="w-4 h-4" />
            <span>Curated Archival Photography & Cartographic Manuscript Gallery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-stone-100">
            Chittagong Hill Tracts Historical Plates
          </h2>
          <p className="text-xs sm:text-sm font-serif text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
            High-resolution colonial boundary surveys, glass-plate negatives, royal court portraits from the Mong Rajbari at Manikchari, and riparian records tracing over two centuries of regional history.
          </p>
        </div>

        {/* Quick Statistical Counts */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="px-4 py-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center shadow-xs">
            <div className="text-xl font-serif font-black text-amber-800 dark:text-amber-400">
              {items.length}
            </div>
            <div className="text-[10px] uppercase font-mono text-stone-500">
              Plates Cataloged
            </div>
          </div>
          <div className="px-4 py-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center shadow-xs">
            <div className="text-xl font-serif font-black text-emerald-800 dark:text-emerald-400">
              {items.filter((i) => i.type === 'map').length}
            </div>
            <div className="text-[10px] uppercase font-mono text-stone-500">
              Survey Maps
            </div>
          </div>
          <div className="px-4 py-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center shadow-xs">
            <div className="text-xl font-serif font-black text-blue-800 dark:text-blue-400">
              {items.filter((i) => i.type === 'photograph').length}
            </div>
            <div className="text-[10px] uppercase font-mono text-stone-500">
              Glass Plates
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              placeholder="Search historical plates by title, location, call number, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-serif bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl focus:outline-hidden focus:border-amber-700 text-stone-900 dark:text-stone-100"
            />
          </div>

          {/* Type Toggle Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl self-start md:self-auto">
            {types.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedType === t.id
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {t.icon && <t.icon className="w-3.5 h-3.5 text-amber-600" />}
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Category Horizontal Filter Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 text-xs">
          <span className="text-[11px] font-mono text-stone-400 shrink-0 mr-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-800 text-white font-semibold'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Plates Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
          <BookOpen className="w-8 h-8 text-stone-400 mx-auto" />
          <h3 className="font-serif font-bold text-stone-700 dark:text-stone-300">
            No historical plates found
          </h3>
          <p className="text-xs text-stone-500 font-serif">
            Try adjusting your search terms or filter selection.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((plate) => (
            <div
              key={plate.id}
              onClick={() => handleOpenItem(plate)}
              className="group bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Image Preview with Badges */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100 dark:bg-stone-950">
                <img
                  src={plate.imageUrl}
                  alt={plate.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="px-2 py-1 rounded-lg bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-white text-xs font-serif font-bold flex items-center gap-1 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5 text-amber-600" />
                    <span>Inspect High-Res Plate</span>
                  </span>
                </div>

                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/75 text-white backdrop-blur-xs">
                    {plate.type === 'map' ? 'Archival Map' : 'Photograph'}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/90 text-stone-950 backdrop-blur-xs">
                    {plate.year}
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-stone-500 dark:text-stone-400">
                    <MapPin className="w-3 h-3 text-amber-600" />
                    <span className="truncate">{plate.location}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors mt-1 line-clamp-2">
                    {plate.title}
                  </h3>

                  <p className="text-xs font-serif text-stone-600 dark:text-stone-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {plate.caption}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-500 dark:text-stone-400">
                  <span className="truncate max-w-[180px]">{plate.archiveRef}</span>
                  <span className="text-amber-800 dark:text-amber-400 font-serif font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Inspect <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* High-Resolution Modal Viewer */}
      {activeModalItem && (
        <GalleryModalViewer
          item={activeModalItem}
          allItems={filteredItems}
          onClose={() => setActiveModalItem(null)}
          onSelectItem={(newItem) => {
            setActiveModalItem(newItem);
            logAudit(`Archival plate browsed in viewer: ${newItem.archiveRef}`, 'public', newItem.id);
          }}
        />
      )}
    </div>
  );
};
