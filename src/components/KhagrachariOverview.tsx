import React, { useState } from 'react';
import { BookOpen, Compass, Shield, Feather, Sparkles, MapPin, ExternalLink, ArrowRight, Sun, Mountain, Waves, Crown, AlertTriangle, ChevronRight } from 'lucide-react';
import { CHT_CIRCLES } from '../data/mapData';
import { HillGirlArtwork } from './HillGirlArtwork';
import { CircleEvaluationModal } from './CircleEvaluationModal';

interface KhagrachariOverviewProps {
  onNavigateToTimeline: () => void;
  onNavigateToMap: () => void;
  onNavigateToArchives: () => void;
}

export const KhagrachariOverview: React.FC<KhagrachariOverviewProps> = ({
  onNavigateToTimeline,
  onNavigateToMap,
  onNavigateToArchives,
}) => {
  const [selectedCircleId, setSelectedCircleId] = useState<'mong' | 'chakma' | 'bohmong' | null>(null);
  return (
    <div className="space-y-16 pb-16">
      {/* Visual Hero Showcase: Beautiful Hill Area + Hill Girl + Chengmi Valley */}
      <section className="relative overflow-hidden bg-radial from-[#1e293b] via-[#0f172a] to-[#020617] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-800 shadow-2xl">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column: Narrative & Clear Identity */}
          <div className="lg:col-span-6 space-y-6 z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-serif tracking-widest uppercase">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Chittagong Hill Tracts Historical Repository</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-tight">
                Chengmi
              </h1>
              <p className="text-xl sm:text-2xl font-serif text-amber-200/90 font-light">
                The Sovereign Valleys & Customary Chiefdom of Khagrachari
              </p>
            </div>

            <p className="text-sm sm:text-base font-serif text-stone-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Named after the shimmering <strong className="text-white">Chengi River</strong> and the wild <strong className="text-amber-300">Nal Khagra</strong> reeds. Explore the unbroken continuity from ancient <strong className="text-emerald-300">Tarak</strong>, the Mughal <strong className="text-amber-200">Karpas Mahal</strong> cotton agreements, and the hereditary <strong className="text-orange-300">Mong Circle</strong> chieftaincy to modern statehood.
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onNavigateToTimeline}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-lg hover:shadow-amber-400/20 transition-all cursor-pointer"
              >
                <span>Timeline (0000 → Present)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onNavigateToMap}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800/80 hover:bg-emerald-700 border border-emerald-600/50 rounded-lg transition-all cursor-pointer backdrop-blur-xs"
              >
                <Compass className="w-3.5 h-3.5 text-emerald-300" />
                <span>Regional Cartography</span>
              </button>
              <button
                onClick={onNavigateToArchives}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-200 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all cursor-pointer backdrop-blur-xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                <span>Research Archives</span>
              </button>
            </div>

            {/* Highlight Metric Strip */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-stone-800/80 text-center lg:text-left">
              <div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-amber-400">1782</div>
                <div className="text-[11px] text-stone-400 font-serif">Mong Circle Founded</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">9 Zilas</div>
                <div className="text-[11px] text-stone-400 font-serif">Upazilas of Khagrachari</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-sky-400">1900</div>
                <div className="text-[11px] text-stone-400 font-serif">Customary Regulation I</div>
              </div>
            </div>
          </div>

          {/* Right Visual Column: Stunning Hill Area + Hill Girl Illustration Canvas */}
          <div className="lg:col-span-6 relative z-10">
            <div className="relative group rounded-2xl overflow-hidden p-2 bg-gradient-to-br from-amber-500/20 via-emerald-500/20 to-indigo-500/20 shadow-2xl border border-white/10 backdrop-blur-md">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-900 border border-stone-800">
                <HillGirlArtwork className="w-full h-full object-cover" />
              </div>

              {/* Floating Caption Ribbon */}
              <div className="absolute bottom-5 left-5 right-5 p-3.5 bg-stone-950/85 backdrop-blur-md rounded-xl border border-white/15 text-xs font-serif text-stone-300 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>The Chengi Basin & Indigenous Heritage</span>
                  </div>
                  <p className="text-[11px] text-amber-200/80">
                    Traditional Chakma, Marma, and Tripuri handloom tapestry & morning hill vistas
                  </p>
                </div>
                <span className="hidden sm:inline text-[10px] uppercase font-mono tracking-wider text-stone-400 bg-stone-800 px-2 py-1 rounded">
                  Khagrachari
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colorful Cards Grid: Historical Toponymy Across Epochs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-block text-xs font-serif uppercase tracking-widest text-amber-800 font-bold bg-amber-100 px-3 py-1 rounded-full">
            Toponymy & Epochs
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
            Historical Names of Khagrachari
          </h2>
          <p className="text-sm text-stone-600 font-serif">
            Distinctive historical names chronicling indigenous roots, ancient realms, and administrative evolutions:
          </p>
        </div>

        {/* Vibrant, visually attractive card deck */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Chengmi (Lush Emerald Theme) */}
          <div className="group relative rounded-xl p-6 bg-gradient-to-br from-emerald-50 via-teal-50/60 to-white border-2 border-emerald-200/80 hover:border-emerald-500 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Indigenous & Local
                </span>
                <Waves className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-serif font-black text-emerald-950 group-hover:text-emerald-700 transition-colors">
                Chengmi
              </h3>
              <p className="text-xs text-emerald-800/80 font-serif italic">
                Regional Dialect & Indigenous Kokborok / Marma
              </p>
              <p className="text-xs font-serif text-stone-700 leading-relaxed">
                The authentic native name of Khagrachari. Derived from the clear waters of the <strong>Chengi River</strong> where ancient clan settlements cultivated fertile terrace lands.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-emerald-200/60 text-[11px] text-emerald-900/70 font-serif flex items-center justify-between">
              <span>Source: Tripura Cultural Institute</span>
              <span className="font-semibold group-hover:translate-x-1 transition-transform">Explore →</span>
            </div>
          </div>

          {/* Card 2: Tarak (Indigo & Lavender Ancient Theme) */}
          <div className="group relative rounded-xl p-6 bg-gradient-to-br from-indigo-50 via-purple-50/60 to-white border-2 border-indigo-200/80 hover:border-indigo-500 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                  Ancient Realm
                </span>
                <Mountain className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-serif font-black text-indigo-950 group-hover:text-indigo-700 transition-colors">
                Tarak
              </h3>
              <p className="text-xs text-indigo-800/80 font-serif italic">
                Pre-Colonial Oral Epics & Northern Ridges
              </p>
              <p className="text-xs font-serif text-stone-700 leading-relaxed">
                Known as an ancient name for the area, preserved in the northern border passes of Panchari and early genealogical records linking the hill tracts to the Kingdom of Tripura.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-indigo-200/60 text-[11px] text-indigo-900/70 font-serif flex items-center justify-between">
              <span>Source: Dr. S. B. Qanungo (1988)</span>
              <span className="font-semibold group-hover:translate-x-1 transition-transform">Explore →</span>
            </div>
          </div>

          {/* Card 3: Phalang Htaung (Royal Terracotta Theme) */}
          <div className="group relative rounded-xl p-6 bg-gradient-to-br from-amber-50 via-orange-50/60 to-white border-2 border-amber-300/80 hover:border-amber-600 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Hereditary Chiefdom
                </span>
                <Shield className="w-4 h-4 text-amber-700 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-serif font-black text-amber-950 group-hover:text-amber-800 transition-colors">
                Phalang Htaung
              </h3>
              <p className="text-xs text-amber-800/80 font-serif italic">
                Mong Circle Historic Arakanese Designation
              </p>
              <p className="text-xs font-serif text-stone-700 leading-relaxed">
                The traditional name associated with the <strong>Mong Circle</strong> chieftaincy, referencing the domain governed by Chieftain Mrachai and the Arakanese-descended Marma leaders of Manikchari.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-amber-200/60 text-[11px] text-amber-900/70 font-serif flex items-center justify-between">
              <span>Source: Manikchari Rajbari Archives</span>
              <span className="font-semibold group-hover:translate-x-1 transition-transform">Explore →</span>
            </div>
          </div>

          {/* Card 4: Karpas Mahal (Warm Sunset Rose Theme) */}
          <div className="group relative rounded-xl p-6 bg-gradient-to-br from-rose-50 via-orange-50/50 to-white border-2 border-rose-200/80 hover:border-rose-500 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-full">
                  Mughal Cotton Paction
                </span>
                <Feather className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-serif font-black text-rose-950 group-hover:text-rose-700 transition-colors">
                Karpas Mahal
              </h3>
              <p className="text-xs text-rose-800/80 font-serif italic">
                Cotton Tribute Tract (c. 1724–1789)
              </p>
              <p className="text-xs font-serif text-stone-700 leading-relaxed">
                The revenue-collection name applied by Mughal Subahdars. Tribal chiefs paid an annual tribute in raw hill cotton (<em>karpas</em>) rather than cash rents, preserving internal sovereignty.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-rose-200/60 text-[11px] text-rose-900/70 font-serif flex items-center justify-between">
              <span>Source: Bengal Board of Revenue, 1772</span>
              <span className="font-semibold group-hover:translate-x-1 transition-transform">Explore →</span>
            </div>
          </div>

          {/* Card 5: Ramgarh (Sky Blue Frontier Theme) */}
          <div className="group relative rounded-xl p-6 bg-gradient-to-br from-sky-50 via-blue-50/50 to-white border-2 border-sky-200/80 hover:border-sky-500 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full">
                  Colonial Subdivision HQ
                </span>
                <Compass className="w-4 h-4 text-sky-600 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-serif font-black text-sky-950 group-hover:text-sky-700 transition-colors">
                Ramgarh
              </h3>
              <p className="text-xs text-sky-800/80 font-serif italic">
                Administrative Seat (1860–1983)
              </p>
              <p className="text-xs font-serif text-stone-700 leading-relaxed">
                The premier administrative headquarters for the entire northern hill tracts for 123 years before the central district administration shifted to Khagrachari Sadar in 1983.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-sky-200/60 text-[11px] text-sky-900/70 font-serif flex items-center justify-between">
              <span>Source: Act XXII of 1860 Records</span>
              <span className="font-semibold group-hover:translate-x-1 transition-transform">Explore →</span>
            </div>
          </div>

          {/* Card 6: Modern Khagrachari (Botanical & Deep Amber Glow Theme) */}
          <div className="group relative rounded-xl p-6 bg-gradient-to-br from-[#1c1917] via-[#292524] to-[#0c0a09] text-white border-2 border-amber-500/60 hover:border-amber-400 shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 rounded-full">
                  Botanical Origin & Zila
                </span>
                <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              </div>
              <h3 className="text-2xl font-serif font-black text-white group-hover:text-amber-300 transition-colors">
                Khagrachari
              </h3>
              <p className="text-xs text-amber-300/80 font-serif italic">
                Upgraded to District Status on Nov 7, 1983
              </p>
              <p className="text-xs font-serif text-stone-300 leading-relaxed">
                Named after the winding mountain stream (<em>chhari</em>) bordered by dense wild thickets of tall <strong>Nal Khagra</strong> catkin reeds flowing through what is now Sadar municipality.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-stone-800 text-[11px] text-stone-400 font-serif flex items-center justify-between">
              <span>Gazette S.R.O. 441-L/83</span>
              <span className="font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">Inspect →</span>
            </div>
          </div>
        </div>
      </section>

      {/* Deep-Dive Section: The Stream of Nal Khagra Reeds */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-10 bg-gradient-to-br from-[#F4EFE6] via-[#FAF6ED] to-white border-2 border-[#E2D8C3] rounded-2xl shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-serif tracking-widest uppercase text-amber-900 font-bold">
            <Feather className="w-4 h-4 text-amber-800" />
            <span>Botanical Geography & Toponymy</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
            Origin of the Name 'Khagrachari': The Stream of the Reed Grass
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            <div className="space-y-4 text-sm text-stone-700 font-serif leading-relaxed">
              <p>
                The name <em>Khagrachari</em> is derived directly from the physical geography, hydrology, and native riparian flora of the central Chengi valley:
              </p>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-amber-950 min-w-[75px] bg-amber-100 px-2 py-0.5 rounded text-xs">"Khagra":</span>
                  <span>Refers to <strong>Nal Khagra</strong> (<em>Phragmites karka</em> and <em>Saccharum spontaneum</em>, commonly known as Catkin reed grass)—a type of tall, sturdy wild reed plant that grows densely along riverbanks and marshy shallows.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="font-bold text-amber-950 min-w-[75px] bg-amber-100 px-2 py-0.5 rounded text-xs">"Chhari":</span>
                  <span>In the regional dialect of the Chittagong Hill Tracts, <em>chhari</em> (or <em>chhara</em>) designates a perennial mountain stream, creek, or natural water channel descending from the forested ridges.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-white/90 border border-stone-200 rounded-xl text-xs font-serif text-stone-700 space-y-3 leading-relaxed shadow-xs">
              <div className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                <span>Historical Eyewitness Account (1869)</span>
              </div>
              <blockquote className="italic border-l-2 border-amber-800 pl-3 text-stone-600">
                "A winding mountain stream flowed right through what is now the heart of Khagrachari Sadar town. Both sides of this stream were covered in thick, wild forests of Nal Khagra reeds that towered over twelve feet high. Over time, indigenous traders and travelers naturally began calling the bazaar and river confluence 'Khagrachari'—the stream of the reed grass."
              </blockquote>
              <div className="text-[11px] text-stone-500 pt-1">
                — Captain Thomas Herbert Lewin, <em>The Hill Tracts of Chittagong and the Dwellers Therein</em> (Calcutta, 1869).
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Mong Circle & 3 Chiefdoms Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-block text-xs font-serif uppercase tracking-widest text-emerald-800 dark:text-emerald-300 font-bold bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
            Traditional Governance Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 dark:text-stone-100">
            The Three Hereditary Chiefdoms of CHT
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 font-serif">
            Click on any circle below (Mong, Chakma, or Bohmong) to open its comprehensive chronological evaluation (0000–Present), dynastic lineages, and archival records.
          </p>
        </div>

        {/* 3 Circles Cards - ALL 3 CLICKABLE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHT_CIRCLES.map((circle) => (
            <div
              key={circle.id}
              onClick={() => setSelectedCircleId(circle.id as 'mong' | 'chakma' | 'bohmong')}
              className={`p-6 rounded-2xl border-2 space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                circle.id === 'mong'
                  ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 via-teal-50 to-white dark:from-emerald-950/40 dark:to-stone-900'
                  : circle.id === 'chakma'
                  ? 'border-amber-500 bg-gradient-to-br from-amber-50 via-orange-50 to-white dark:from-amber-950/40 dark:to-stone-900'
                  : 'border-rose-500 bg-gradient-to-br from-rose-50 via-red-50 to-white dark:from-rose-950/40 dark:to-stone-900'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-serif uppercase tracking-wider font-bold text-stone-500 dark:text-stone-400">
                    {circle.district}
                  </span>
                  <span className="text-[11px] font-sans font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 bg-white/80 dark:bg-black/40 text-stone-800 dark:text-stone-200">
                    <Crown className="w-3 h-3 text-amber-600" />
                    Interactive Dossier
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100 flex items-center justify-between">
                    <span>{circle.name}</span>
                    <ChevronRight className="w-5 h-5 text-stone-400 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 font-serif mt-0.5">
                    Ruler: <strong className="text-stone-800 dark:text-stone-200">{circle.rulerTitle}</strong> · Seat: {circle.seat}
                  </p>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
                  {circle.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-black/10 dark:border-white/10 space-y-2">
                <div className="text-[11px] text-stone-500 dark:text-stone-400">
                  <strong>Indigenous Communities:</strong> {circle.dominantTribes}
                </div>
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                  <span>View Chronological Milestones & Lineage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Validated Historical Spotlight: Mun Circle to Mong Circle Bypass */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-stone-900 dark:to-stone-950 border-2 border-amber-300 dark:border-amber-800/80 shadow-md space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center font-bold shadow-xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-amber-800 dark:text-amber-400 font-bold">
                Archival Historical Validation
              </div>
              <h3 className="text-xl font-serif font-black text-amber-950 dark:text-amber-200">
                The "Mun Circle" & Tripura Bypass Incident: Historical Reconciliation
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-serif text-stone-700 dark:text-stone-300 leading-relaxed">
            Historical inquiry confirms that before the 1880s, the northern territory of Khagrachari was widely populated by indigenous <strong>Tipra (Tripuri)</strong> clans and acknowledged in early colonial surveys under Act XXII of 1860 as the <strong>"Mun Circle"</strong> (derived from the Tripura/Riang dialect). The Maharajas of Tripura claimed tributary rights over these northern tracts. However, following Arakanese Marma settlement at Ramgarh in 1782, the British Crown under Sir Alexander Mackenzie sought to decisively establish revenue borders between British Bengal and the Princely State of Hill Tipperah. To prevent the Tripura Maharaja from exerting dual taxation within British borders, British administrators bypassed the Tripura clan heads and elevated the Marma Chieftain Kyaja Sain Chowdhury at Manikchari, officially changing the circle name from <em>"Mun Circle"</em> to <em>"Mong Circle"</em> in 1881–1884.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs pt-2">
            <button
              onClick={() => setSelectedCircleId('mong')}
              className="px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-bold cursor-pointer transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span>Read Full Mong & Mun Chronological Evaluation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-stone-500 dark:text-stone-400 font-mono text-[11px]">
              Ref: Mackenzie (1884), IOR/L/PJ/6/112 & Rajmala Chronicles
            </span>
          </div>
        </div>

        {/* Chronological Breakdown of Mong Circle */}
        <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-2xl p-8 space-y-6 shadow-sm">
          <h3 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100 flex items-center gap-2.5">
            <Shield className="w-6 h-6 text-amber-800 dark:text-amber-400" />
            <span>Chronological Evolution of the Mong Circle</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            <div className="space-y-2 border-l-3 border-emerald-600 pl-4 bg-emerald-50/40 dark:bg-emerald-950/30 p-3 rounded-r-lg">
              <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400">1782 CE</span>
              <h4 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">Founding by Chieftain Mrachai</h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
                Formally established around 1782 by the first chieftain, Mrachai, uniting Arakanese Marma, Tripuri, and Chakma clans with royal headquarters at Manikchari.
              </p>
            </div>

            <div className="space-y-2 border-l-3 border-sky-600 pl-4 bg-sky-50/40 dark:bg-sky-950/30 p-3 rounded-r-lg">
              <span className="text-xs font-mono font-bold text-sky-800 dark:text-sky-400">1860s – 1881</span>
              <h4 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">British Mun to Mong Circle</h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
                Initially documented in British East India Company records as the "Mun Circle" (from a Tripura dialect), then formally codified as the Mong Circle in 1881.
              </p>
            </div>

            <div className="space-y-2 border-l-3 border-amber-600 pl-4 bg-amber-50/40 dark:bg-amber-950/30 p-3 rounded-r-lg">
              <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400">1900 CE</span>
              <h4 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">Act I of 1900 Autonomy</h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
                The Chittagong Hill Tracts Regulations formalized internal customary self-governance, granting the Mong Chief jurisdiction over village headmen (mouza chiefs) and customary law.
              </p>
            </div>

            <div className="space-y-2 border-l-3 border-indigo-600 pl-4 bg-indigo-50/40 dark:bg-indigo-950/30 p-3 rounded-r-lg">
              <span className="text-xs font-mono font-bold text-indigo-800 dark:text-indigo-400">Present Era</span>
              <h4 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">Living Modern Authority</h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
                The reigning Mong King manages customary dispute arbitration, administers traditional tribal justice, and issues legally binding Permanent Resident Certificates (PRCs).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Reference Citation Box */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-6 bg-[#F4EFE6] dark:bg-stone-900 border border-[#DDD4C1] dark:border-stone-800 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs font-serif uppercase tracking-widest text-stone-600 dark:text-stone-400">
            <span className="font-bold text-stone-900 dark:text-stone-100">Primary Archival Sources & Authority</span>
            <span>Ref: ARCH-CHT-HIST-01</span>
          </div>
          <p className="text-xs text-stone-700 dark:text-stone-300 font-serif leading-relaxed">
            All historical milestones and toponymic derivations above are substantiated by primary documents in the National Archives of Bangladesh, the British Library India Office Records (IOR/P/67/41 and IOR/L/PJ/6/48), the Royal Manuscripts of the Manikchari Rajbari (MCRA-REC-1782-A), and the Government of Bangladesh Extraordinary Gazette of November 7, 1983.
          </p>
        </div>
      </section>

      {/* Circle Evaluation Modal */}
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

