import React from 'react';
import { BookOpen, Compass, Shield, Feather } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'overview' | 'timeline' | 'map' | 'archives' | 'blog') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-[#1C1917] text-stone-300 font-serif border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Wordmark & Provenance */}
          <div className="space-y-4 md:col-span-2">
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white block">
                CHENGMI
              </span>
              <span className="text-xs text-stone-400 tracking-wider block">
                Khagrachari & Chittagong Hill Tracts Historical Repository
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              A scholarly, community-grounded archive dedicated to documenting the toponymic, legal, and customary history of Khagrachari (Chengmi), the Mong Circle hereditary chiefdom, and the Chittagong Hill Tracts from 0000 to the present.
            </p>
            <div className="text-[11px] text-stone-500 font-sans">
              Archival Standards: Primary Gazetteers · Regulation I of 1900 · British Library IOR · Royal Manikchari Palm-Leaf Sanads
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-stone-200">
              Archival Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Historical Identity (Chengmi & Mong Circle)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('timeline')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Interactive Chronology (0000 → Present)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('map')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Regional Cartography (9 Upazilas & 3 Circles)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('archives')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Research Archives CMS & Clearance
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('blog')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Scholarly Dispatches & Field Monographs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Mong Circle & Traditional Institutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-stone-200">
              Hereditary Chiefdoms
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <strong className="text-stone-300">Mong Circle:</strong> Manikchari Rajbari, Khagrachari (Chieftain Mrachai, 1782)
              </li>
              <li>
                <strong className="text-stone-300">Chakma Circle:</strong> Rajbari, Rangamati (Karnaphuli Basin)
              </li>
              <li>
                <strong className="text-stone-300">Bohmong Circle:</strong> Bandarban Rajbari (Prince Maung Saw Pru, 1599)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            Chengmi Historical Archive © 2026. Preserved in collaboration with customary circle historians.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a
              href="https://ais-pre-7kl665iuxevia6v2jec335-155832180601.asia-southeast1.run.app"
              target="_blank"
              rel="noreferrer"
              className="text-amber-400 hover:underline font-mono"
            >
              Public Link: ais-pre-7kl665iuxevia6v2jec335-155832180601.asia-southeast1.run.app
            </a>
            <span>All sensitive records require validated primary citations.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
