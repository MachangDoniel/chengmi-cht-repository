import React, { useState } from 'react';
import { CircleDetail } from '../types';
import { COMPREHENSIVE_CIRCLES } from '../data/circleEvaluationData';
import { X, Crown, Shield, MapPin, BookOpen, Clock, Calendar, CheckCircle2, ChevronRight, AlertTriangle, ExternalLink } from 'lucide-react';

interface CircleEvaluationModalProps {
  circleId: 'mong' | 'chakma' | 'bohmong' | null;
  onClose: () => void;
  onSelectCircle?: (id: 'mong' | 'chakma' | 'bohmong') => void;
}

export const CircleEvaluationModal: React.FC<CircleEvaluationModalProps> = ({
  circleId,
  onClose,
  onSelectCircle,
}) => {
  const [activeTab, setActiveTab] = useState<'chronology' | 'incident' | 'rulers' | 'citations'>('chronology');

  if (!circleId) return null;

  const circle = COMPREHENSIVE_CIRCLES.find((c) => c.id === circleId) || COMPREHENSIVE_CIRCLES[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF7F0] dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden transition-colors">
        {/* Modal Top Header with Circle Selector */}
        <div
          className="p-5 sm:p-6 text-white relative overflow-hidden"
          style={{
            background:
              circle.id === 'mong'
                ? 'linear-gradient(135deg, #064e3b 0%, #047857 50%, #0f766e 100%)'
                : circle.id === 'chakma'
                ? 'linear-gradient(135deg, #78350f 0%, #b45309 50%, #d97706 100%)'
                : 'linear-gradient(135deg, #881337 0%, #be123c 50%, #991b1b 100%)',
          }}
        >
          {/* Subtle background ornamentation */}
          <div className="absolute right-0 -bottom-10 opacity-15 pointer-events-none">
            <Crown className="w-56 h-56 text-white" />
          </div>

          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-white/20 text-white backdrop-blur-xs flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5" />
                  Hereditary Tribal Chiefdom
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-black/25 text-amber-200">
                  {circle.district}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white drop-shadow-xs">
                {circle.name} — Chronological Evaluation
              </h2>
              <p className="text-xs sm:text-sm text-stone-100 max-w-2xl font-serif leading-relaxed">
                {circle.summary}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Circle Switcher Tabs */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-white/20 overflow-x-auto relative z-10">
            {COMPREHENSIVE_CIRCLES.map((c) => (
              <button
                key={c.id}
                onClick={() => onSelectCircle ? onSelectCircle(c.id) : null}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  c.id === circle.id
                    ? 'bg-white text-stone-900 shadow-md font-bold'
                    : 'bg-white/15 text-stone-100 hover:bg-white/25'
                }`}
              >
                <span>{c.name}</span>
                <span className="text-[10px] opacity-75">({c.district.split(' ')[0]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chiefdom Vital Dossier Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-4 bg-stone-100 dark:bg-stone-950/70 border-b border-stone-200 dark:border-stone-800 text-xs">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400">
              Current Reigning Chief
            </div>
            <div className="font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
              {circle.currentRuler}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400">
              Royal Seat / Palace
            </div>
            <div className="font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
              {circle.seat}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400">
              Dominant Indigenous Peoples
            </div>
            <div className="font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
              {circle.dominantTribes}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400">
              Customary Authority
            </div>
            <div className="font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
              Regulation I of 1900
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 px-6 bg-white dark:bg-stone-900 text-xs sm:text-sm font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('chronology')}
            className={`py-3 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'chronology'
                ? 'border-amber-700 dark:border-amber-500 text-amber-900 dark:text-amber-300 font-bold'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Chronological Milestones (0000–Now)</span>
          </button>

          <button
            onClick={() => setActiveTab('incident')}
            className={`py-3 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'incident'
                ? 'border-amber-700 dark:border-amber-500 text-amber-900 dark:text-amber-300 font-bold'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>
              {circle.id === 'mong'
                ? 'Mun Circle & Tripura Bypass Incident'
                : circle.id === 'chakma'
                ? 'Rani Kalindi & Karpas Mahal Treaty'
                : 'Pegu Dynastic Conquest & Origin'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('rulers')}
            className={`py-3 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'rulers'
                ? 'border-amber-700 dark:border-amber-500 text-amber-900 dark:text-amber-300 font-bold'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>Dynastic Rulers & Lineage</span>
          </button>

          <button
            onClick={() => setActiveTab('citations')}
            className={`py-3 px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'citations'
                ? 'border-amber-700 dark:border-amber-500 text-amber-900 dark:text-amber-300 font-bold'
                : 'border-transparent text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Scholarly Citations ({circle.citations.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#FAF7F0] dark:bg-stone-900 text-stone-800 dark:text-stone-200">
          {/* TAB 1: CHRONOLOGICAL EVALUATION */}
          {activeTab === 'chronology' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                <span className="font-bold text-amber-900 dark:text-amber-300">Royal Lineage Origin: </span>
                {circle.royalLineageOrigin}
              </div>

              <div className="relative border-l-2 border-stone-300 dark:border-stone-700 ml-4 pl-6 space-y-8">
                {circle.chronologicalEvaluation.map((milestone, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline Node Icon */}
                    <div
                      className="absolute -left-[35px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md"
                      style={{ backgroundColor: circle.color }}
                    >
                      {idx + 1}
                    </div>

                    <div className="bg-white dark:bg-stone-800/80 p-5 rounded-xl border border-stone-200 dark:border-stone-700/80 shadow-xs space-y-2 hover:shadow-md transition-shadow">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-700 text-stone-800 dark:text-stone-200">
                          {milestone.era}
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400">
                          {milestone.yearRange}
                        </span>
                      </div>

                      <h4 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                        {milestone.title}
                      </h4>

                      <p className="text-sm font-serif leading-relaxed text-stone-600 dark:text-stone-300">
                        {milestone.details}
                      </p>

                      <div className="pt-2 border-t border-stone-100 dark:border-stone-700/50 text-xs space-y-1">
                        <div>
                          <strong className="text-stone-800 dark:text-stone-200">Significance: </strong>
                          <span className="text-stone-600 dark:text-stone-400">{milestone.significance}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <strong className="text-stone-800 dark:text-stone-200">Key Figures: </strong>
                          {milestone.keyFigures.map((fig, fIdx) => (
                            <span
                              key={fIdx}
                              className="px-1.5 py-0.2 rounded bg-amber-50 dark:bg-stone-700 text-amber-900 dark:text-amber-300 text-[11px]"
                            >
                              {fig}
                            </span>
                          ))}
                        </div>
                        {milestone.reference && (
                          <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 italic pt-0.5">
                            Ref: {milestone.reference}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: HISTORICAL INCIDENT & BYPASS ANALYSIS */}
          {activeTab === 'incident' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-stone-800 dark:to-stone-900 border-2 border-amber-300 dark:border-amber-700/60 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-700 text-white flex items-center justify-center font-bold">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-black text-amber-950 dark:text-amber-200">
                      Validated Historical Dossier
                    </h3>
                    <p className="text-xs text-amber-800 dark:text-amber-400">
                      Archival analysis & documentary reconciliation
                    </p>
                  </div>
                </div>

                <div className="text-sm font-serif leading-relaxed text-stone-800 dark:text-stone-200 p-4 bg-white/80 dark:bg-stone-950/60 rounded-xl border border-amber-200 dark:border-amber-900/60 shadow-inner">
                  {circle.historicalIncidentExplanation}
                </div>

                {circle.id === 'mong' && (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs sm:text-sm space-y-2">
                    <h5 className="font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      Key Validated Findings: Mun Circle & Tripura Relationship
                    </h5>
                    <ul className="list-disc pl-5 space-y-1.5 text-stone-700 dark:text-stone-300">
                      <li>
                        <strong>Tripuri Inhabitation & Naming:</strong> The northern tracts were named &quot;Chengmi&quot; and &quot;Tarak&quot; by indigenous Kokborok/Tripuri speakers, who paid cotton taxes to local headmen allied with the Twipra kingdom.
                      </li>
                      <li>
                        <strong>Act XXII of 1860 &quot;Mun Circle&quot;:</strong> Earliest British records codified the territory as the &quot;Mun Circle&quot; (or Riang/Tripura circle).
                      </li>
                      <li>
                        <strong>1881–1884 Boundary Bypass:</strong> Rather than allowing the Maharaja of Tripura sovereign jurisdiction within British Bengal, Sir Alexander Mackenzie formalized the circle under the Marma Chieftain at Manikchari, renaming it &quot;Mong Circle&quot;.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: DYNASTIC RULERS */}
          {activeTab === 'rulers' && (
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                Hereditary Chieftains of {circle.name}
              </h3>
              <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-stone-700 shadow-xs">
                <table className="min-w-full text-xs sm:text-sm divide-y divide-stone-200 dark:divide-stone-700">
                  <thead className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4 text-left">Chieftain / Monarch</th>
                      <th className="py-3 px-4 text-left">Reign Period</th>
                      <th className="py-3 px-4 text-left">Historical Achievement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-800 bg-white dark:bg-stone-900">
                    {circle.keyDynasticRulers.map((r, idx) => (
                      <tr key={idx} className="hover:bg-amber-50/50 dark:hover:bg-stone-800/50">
                        <td className="py-3 px-4 font-bold text-stone-900 dark:text-stone-100">
                          {r.name}
                        </td>
                        <td className="py-3 px-4 font-mono font-medium text-amber-800 dark:text-amber-400">
                          {r.reign}
                        </td>
                        <td className="py-3 px-4 text-stone-600 dark:text-stone-300 font-serif">
                          {r.achievement}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: SCHOLARLY CITATIONS */}
          {activeTab === 'citations' && (
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                Primary Sources & Archival Records for {circle.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {circle.citations.map((cite, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300">
                        {cite.sourceType}
                      </span>
                      <span className="font-mono text-stone-500 dark:text-stone-400">Year {cite.year}</span>
                    </div>
                    <h5 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                      {cite.title}
                    </h5>
                    <div className="text-xs text-stone-600 dark:text-stone-400 font-serif">
                      Author/Body: <strong>{cite.authorOrBody}</strong>
                    </div>
                    <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                      Shelfmark: {cite.shelfmarkOrCallNumber}
                    </div>
                    {cite.pageOrFolio && (
                      <div className="text-[11px] font-mono text-stone-400">
                        Folio: {cite.pageOrFolio}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-100 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="text-xs text-stone-500 dark:text-stone-400">
            Source: Chittagong Hill Tracts Historical Repository & Customary Records
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-800 dark:bg-stone-700 hover:bg-stone-900 dark:hover:bg-stone-600 text-white rounded-lg text-xs font-bold cursor-pointer transition-colors shadow-xs"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
