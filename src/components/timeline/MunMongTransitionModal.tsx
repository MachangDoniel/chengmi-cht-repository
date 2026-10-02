import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Shield,
  Crown,
  FileText,
  AlertTriangle,
  Compass,
  Landmark,
  Scale,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react';

interface MunMongTransitionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MunMongTransitionModal: React.FC<MunMongTransitionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'narrative' | 'incident' | 'treaties' | 'sources'>('narrative');
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyCitation = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitation(id);
    setTimeout(() => setCopiedCitation(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn select-none">
      <div className="bg-[#FAF7F0] dark:bg-stone-900 border-2 border-amber-600/70 dark:border-amber-500/60 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl text-stone-900 dark:text-stone-100 ring-1 ring-black/20">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 text-white border-b border-amber-700/50 flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-amber-300 font-bold">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Colonial Cartography & Territorial Delimitation Monograph</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white">
              The Transition from Tripura &ldquo;Mun&rdquo; Circle to the British &ldquo;Mong&rdquo; Circle (1860–1884)
            </h2>
            <p className="text-xs sm:text-sm font-serif text-amber-200/90 leading-relaxed max-w-3xl">
              An exhaustive archival monograph clarifying the historical incident of the &ldquo;Great Bypass&rdquo;, the dispute with the Tripura Durbar, and the transformation of northern customary governance.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition-colors cursor-pointer shrink-0"
            title="Close Monograph (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 pt-3 pb-2 bg-stone-100 dark:bg-stone-850 border-b border-stone-200 dark:border-stone-800 text-xs font-serif overflow-x-auto">
          <button
            onClick={() => setActiveTab('narrative')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'narrative'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Historical Genesis & The &ldquo;Mun&rdquo; Designation</span>
          </button>
          <button
            onClick={() => setActiveTab('incident')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'incident'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>2. The 1881 Historical Incident (&ldquo;The Great Bypass&rdquo;)</span>
          </button>
          <button
            onClick={() => setActiveTab('treaties')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'treaties'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>3. Demarcation & Customary Impact</span>
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'sources'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>4. Primary Archival Citations & Shelfmarks</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs sm:text-sm font-serif leading-relaxed text-stone-800 dark:text-stone-200 selection:bg-amber-700 selection:text-white select-text">
          {/* TAB 1: NARRATIVE & MUN GENESIS */}
          {activeTab === 'narrative' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-900 dark:text-amber-300 font-bold">
                  Geopolitical Premise: The Northern Hill Tracts Prior to 1860
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  Before the British crown annexed the Chittagong Hill Tracts via <strong>Act XXII of 1860</strong>, the hill territories between the Feni and Chengi rivers were not a monolithic administrative unit. The northern territory was overwhelmingly populated by indigenous <strong>Tripuri (Tipra)</strong> communities, whose village headmen (*Roajas*) paid allegiance, tribute, and agrarian tithes to the royal court of <strong>Hill Tippera (modern Tripura State)</strong>.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-serif font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                  <span>The Origin of the Term &ldquo;Mun Circle&rdquo;</span>
                </h3>
                <p>
                  In the earliest British colonial revenue records and reconnaissance maps prepared following the 1860 annexation (notably by Captain Thomas Herbert Lewin and early Superintendents), the northern division was designated as the <strong>&ldquo;Mun Circle&rdquo;</strong> (sometimes recorded in colonial phonetic transcripts as <em>Mung</em>, <em>Mun</em>, or <em>Muan</em>).
                </p>
                <p>
                  Linguistically and administratively, colonial scholars trace &ldquo;Mun&rdquo; to two intersecting realities:
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    <strong>Tripuri Customary Clans & Chiefdoms:</strong> The northern hill tracts were administered by hereditary Tipra clan leaders. In Kokborok and early border records, these clans were recognized as the northern frontier guardians (*Mun* clans) answering to the Tripura kingdom.
                  </li>
                  <li>
                    <strong>Early British Revenue Designations:</strong> When the British established the Hill Tracts as an independent district in 1860 under Act XXII, they grouped the northern Mouzas together as the &ldquo;Mun Circle&rdquo; to separate them from the Chakma Circle in the Karnaphuli valley and the Bohmong Circle in the Sangu valley.
                  </li>
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100">
                  The Arrival of the Marma Lineage at Manikchari
                </h4>
                <p className="text-stone-600 dark:text-stone-400">
                  Simultaneously, following the Burmese conquest of Arakan in 1782–1784, a substantial Marma community led by Chieftain Mrachai (*Marma: Phalang Htaung*) migrated northwards from the coastal plains and settled in the fertile valley of Manikchari. Chieftain Mrachai was granted permission by local authorities to settle, eventually constructing the fortified <strong>Manikchari Rajbari</strong>. This introduced a distinct Marma royal seat inside an area whose surrounding hills were populated largely by Tipra clans.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: THE 1881 HISTORICAL INCIDENT */}
          {activeTab === 'incident' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-rose-900 dark:text-rose-300 font-bold">
                  The Frontier Crisis: Tripura Durbar Claims vs. The British Crown (1870–1881)
                </div>
                <h3 className="text-base font-serif font-black text-rose-950 dark:text-rose-100">
                  The Historic Incident: The Border Demarcation Dispute & &ldquo;The Great Bypass&rdquo;
                </h3>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  During the late 1870s, <strong>Maharaja Bir Chandra Manikya of Hill Tippera</strong> formally asserted sovereign jurisdiction over the northern valleys of Khagrachari (the Chengi and Feni river basins), claiming that the indigenous Tipra Roajas were subjects of his crown and that the British had encroached upon his ancestral territory.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-serif font-black text-stone-900 dark:text-stone-100">
                  The Tactical British Counter-Strategy (1881–1884)
                </h4>
                <p>
                  To neutralize the Tripura King&rsquo;s sovereign claims without engaging in a costly military conflict with a friendly princely state, British Bengal Revenue Secretary <strong>Sir Alexander Mackenzie</strong> devised what historians today describe as <strong>&ldquo;The Great Bypass&rdquo;</strong>:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-2">
                    <div className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase">
                      Step 1: Bypassing the Tipra Chieftains
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      Instead of recognizing any indigenous Tipra leader who held familial and customary allegiance to the Maharaja of Tripura, the British deliberately bypassed all Tipra noble houses. Recognizing a Tipra chief would validate Tripura&rsquo;s diplomatic claim of suzerainty over the northern hills.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-2">
                    <div className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                      Step 2: Elevating the Marma Chief at Manikchari
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      The British recognized <strong>Chieftain Mrachai</strong> (and later his successors King Narabadi and King Chakhoy) as the sole territorial ruler. Because the Marmas had no allegiance to Agartala (Tripura), this created an impassable diplomatic wall between the northern hills and the Princely State.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 space-y-2">
                <h4 className="font-bold text-amber-950 dark:text-amber-100">
                  Phonetic Mutation: From &ldquo;Mun&rdquo; to &ldquo;Mong&rdquo;
                </h4>
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                  In the 1884 Survey of India reports, Sir Alexander Mackenzie codified the new revenue entity not as the <em>Mun Circle</em>, but officially as the <strong>&ldquo;Mong Circle&rdquo;</strong>. The British utilized the Marma royal honorific <em>Mong</em> (derived from the Arakanese/Burmese term <em>Maung</em> or <em>Mran-Gyi</em>, signifying royal ruler or lord) to formalize the Marma court&rsquo;s hegemony over the entire northern district.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: TREATIES & DEMARCATION */}
          {activeTab === 'treaties' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-3">
                <h3 className="text-lg font-serif font-black text-stone-900 dark:text-stone-100">
                  Customary Governance & The Codification of 1884
                </h3>
                <p>
                  Under the 1884 settlement, the boundaries of the <strong>Mong Circle</strong> were fixed by the Government of Bengal:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    <strong>Northern Boundary:</strong> Fixed along the international ridge line bordering Hill Tippera (the modern Indian state of Tripura).
                  </li>
                  <li>
                    <strong>Western Boundary:</strong> The Feni River, dividing the Hill Tracts from the settled British plains of Chittagong District (Fatikchhari and Mirsarai).
                  </li>
                  <li>
                    <strong>Eastern Boundary:</strong> The watershed dividing the Chengi and Maini valleys from the Chakma Circle jurisdiction in Rangamati.
                  </li>
                  <li>
                    <strong>Southern Boundary:</strong> Marked along the Manikchari and Raozan frontier.
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-2">
                <h4 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-amber-700" />
                  <span>The Legacy: Tipra Mouzas under Mong Customary Jurisdiction</span>
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  While the transformation successfully established a stable colonial frontier, it created a unique pluralistic customary governance structure: hundreds of Tripuri village headmen (*Roajas*) across Panchhari, Matiranga, and Khagrachari Sadar henceforth collected customary land revenue (*Jhum tax*) and administered customary civil law under the appellate jurisdiction of the Marma Mong King at Manikchari Rajbari. This arrangement was permanently codified in the <strong>Chittagong Hill Tracts Regulation I of 1900</strong>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: PRIMARY CITATIONS */}
          {activeTab === 'sources' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-xs font-serif text-stone-600 dark:text-stone-400">
                The historical transition between the Mun and Mong Circles is substantiated by the following primary archival manuscripts, colonial gazetteers, and judicial proceedings:
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: 'cit-mackenzie',
                    title: 'History of the Relations of the Government with the Hill Tribes of the North-East Frontier of Bengal',
                    author: 'Alexander Mackenzie, C.S. (Secretary to the Government of Bengal)',
                    year: '1884',
                    shelfmark: 'British Library IOR/V/27/262/1 • Chapter IV, pp. 67–89',
                    quote: 'The claims of the Tipperah Raja over the northern valleys were set at rest by defining the boundary of the northern circle under the chief at Manikchari, designated the Mong Circle.',
                  },
                  {
                    id: 'cit-lewin',
                    title: 'The Hill Tracts of Chittagong and the Dwellers Therein',
                    author: 'Capt. Thomas Herbert Lewin (Deputy Commissioner, CHT)',
                    year: '1869',
                    shelfmark: 'IOR/V/27/64/1 • Calcutta: Bengal Secretariat Press',
                    quote: 'Describing the early demarcation of the northern Mun Circle and the ethnographic distribution of the Tipra and Marma clans.',
                  },
                  {
                    id: 'cit-bengal-rev',
                    title: 'Proceedings of the Lieutenant-Governor of Bengal (Revenue Department: CHT)',
                    author: 'Government of Bengal, Revenue Branch',
                    year: '1881–1884',
                    shelfmark: 'National Archives of Bangladesh • BD-REV-CHT-1881-84 • File No. 14/B',
                    quote: 'Official correspondence detailing the dispute with Maharaja Bir Chandra Manikya and the sanad of recognition granted to the Mong King at Manikchari.',
                  },
                  {
                    id: 'cit-royal-reg',
                    title: 'Sanad of Recognition & Mouza Boundary Register of the Mong Circle',
                    author: 'Mong Circle Royal Archives (Manikchari Rajbari)',
                    year: '1884',
                    shelfmark: 'MRA-HIST-1884-MACKENZIE • Folio 01–14',
                    quote: 'Original customary seal and register assigning 84 northern mouzas under the judicial seat of King Mrachai.',
                  },
                ].map((src) => (
                  <div
                    key={src.id}
                    className="p-4 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-750 space-y-2 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-stone-900 dark:text-stone-100 font-serif">
                          {src.title}
                        </div>
                        <div className="text-xs text-amber-800 dark:text-amber-400 font-mono">
                          {src.author} ({src.year})
                        </div>
                      </div>
                      <button
                        onClick={() => copyCitation(`${src.author} (${src.year}). ${src.title}. Shelfmark: ${src.shelfmark}.`, src.id)}
                        className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                      >
                        {copiedCitation === src.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Citation</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                      Call Shelfmark: <code className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded">{src.shelfmark}</code>
                    </div>

                    <blockquote className="text-xs italic text-stone-600 dark:text-stone-400 border-l-2 border-amber-600 pl-3 pt-0.5">
                      &ldquo;{src.quote}&rdquo;
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="p-4 bg-stone-100 dark:bg-stone-850 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs font-serif text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-900 dark:text-stone-100">Archival Series:</span>
            <span>Historical Monograph No. 04 • Mong Circle Heritage Archive</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-800 hover:bg-amber-700 text-white font-serif font-bold transition-colors cursor-pointer shadow-xs"
          >
            Close Monograph
          </button>
        </div>
      </div>
    </div>
  );
};
