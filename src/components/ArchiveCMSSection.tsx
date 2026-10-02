import React, { useState, useEffect } from 'react';
import { ArchiveRecord, Citation, SensitivityLevel } from '../types';
import { INITIAL_ARCHIVES } from '../data/archiveData';
import { HISTORICAL_GALLERY_ITEMS } from '../data/galleryData';
import { CHT_AUDIO_ARCHIVES } from '../data/audioArchivesData';
import { HistoricalGallery } from './archive/HistoricalGallery';
import { AudioArchivesSection } from './archive/AudioArchivesSection';
import { RecordCitationToast } from './archive/RecordCitationToast';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Filter,
  Lock,
  Unlock,
  BookOpen,
  UploadCloud,
  FileText,
  Copy,
  Check,
  X,
  ShieldAlert,
  Calendar,
  AlertTriangle,
  FolderOpen,
  Camera,
  Image as ImageIcon,
  Quote,
  Headphones,
} from 'lucide-react';

interface ArchiveCMSSectionProps {
  onOpenAuth: () => void;
}

export const ArchiveCMSSection: React.FC<ArchiveCMSSectionProps> = ({ onOpenAuth }) => {
  const { canAccessSensitive, canUploadArchive, currentUser, logAudit } = useAuth();
  const [archives, setArchives] = useState<ArchiveRecord[]>(INITIAL_ARCHIVES);
  const [activeSubTab, setActiveSubTab] = useState<'documents' | 'gallery' | 'audio'>('documents');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSensitivity, setSelectedSensitivity] = useState('All');
  const [selectedRecord, setSelectedRecord] = useState<ArchiveRecord | null>(null);
  const [citingRecord, setCitingRecord] = useState<ArchiveRecord | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Auto-selection listener from Global Search
  useEffect(() => {
    const handleSelectArchive = (e: Event) => {
      const customEvent = e as CustomEvent<ArchiveRecord>;
      if (customEvent.detail) {
        setSelectedCategory('All');
        setSelectedSensitivity('All');
        setSearchQuery('');
        setSelectedRecord(customEvent.detail);
        logAudit(`Archival record inspected via search: ${customEvent.detail.accessionNumber}`, customEvent.detail.sensitivity, customEvent.detail.id);
      }
    };

    const handleSelectAudio = () => {
      setActiveSubTab('audio');
    };

    window.addEventListener('chengmi-archive-select', handleSelectArchive);
    window.addEventListener('chengmi-audio-select', handleSelectAudio);
    return () => {
      window.removeEventListener('chengmi-archive-select', handleSelectArchive);
      window.removeEventListener('chengmi-audio-select', handleSelectAudio);
    };
  }, [logAudit]);

  // Upload Modal State
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAccession, setNewAccession] = useState('');
  const [newYear, setNewYear] = useState<number | string>(1900);
  const [newEra, setNewEra] = useState<ArchiveRecord['era']>('British Colonial (1760-1947)');
  const [newCategory, setNewCategory] = useState<ArchiveRecord['category']>('Treaties & Regulations');
  const [newRegion, setNewRegion] = useState<ArchiveRecord['region']>('Mong Circle (Khagrachari)');
  const [newSensitivity, setNewSensitivity] = useState<SensitivityLevel>('public');
  const [newAbstract, setNewAbstract] = useState('');
  const [newTranscription, setNewTranscription] = useState('');
  const [newKeywords, setNewKeywords] = useState('');

  // Mandatory Reference fields
  const [refAuthor, setRefAuthor] = useState('');
  const [refTitle, setRefTitle] = useState('');
  const [refYear, setRefYear] = useState('');
  const [refShelfmark, setRefShelfmark] = useState('');
  const [refRepo, setRefRepo] = useState('');
  const [refSourceType, setRefSourceType] = useState<Citation['sourceType']>('Colonial Gazette');

  const categories = [
    'All',
    'Administration',
    'Mong Circle & Chiefs',
    'Land & Customary Law',
    'Ethnography & Language',
    'Treaties & Regulations',
    'Ecological Geography',
  ];

  const filteredArchives = archives.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSens = selectedSensitivity === 'All' || item.sensitivity === selectedSensitivity;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.accessionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSens && matchesSearch;
  });

  const handleRecordClick = (record: ArchiveRecord) => {
    setSelectedRecord(record);
    logAudit(`Archival record inspected: ${record.accessionNumber}`, record.sensitivity, record.id);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Strict validation of primary reference
    if (!refAuthor.trim() || !refTitle.trim() || !refShelfmark.trim()) {
      alert('Archival Integrity Policy Violation: Every uploaded record MUST include a validated primary reference with Author/Body, Title, and Archival Shelfmark/Call Number.');
      return;
    }

    if (!newTitle.trim() || !newAccession.trim() || !newAbstract.trim() || !newTranscription.trim()) {
      alert('Please fill out all required fields: Title, Accession Number, Abstract, and Full Transcription.');
      return;
    }

    const primaryCitation: Citation = {
      sourceType: refSourceType,
      authorOrBody: refAuthor.trim(),
      title: refTitle.trim(),
      year: refYear.trim() || String(newYear),
      shelfmarkOrCallNumber: refShelfmark.trim(),
      urlOrRepository: refRepo.trim() || 'National Archives / Mong Royal Archive Vault',
    };

    const newRecord: ArchiveRecord = {
      id: `arch-${Date.now()}`,
      accessionNumber: newAccession.trim().toUpperCase(),
      title: newTitle.trim(),
      era: newEra,
      year: newYear,
      category: newCategory,
      region: newRegion,
      abstract: newAbstract.trim(),
      fullTranscription: newTranscription.trim(),
      sensitivity: newSensitivity,
      references: [primaryCitation],
      keywords: newKeywords.split(',').map((k) => k.trim()).filter(Boolean),
      submittedBy: currentUser?.email || 'Authorized Contributor',
      submissionDate: new Date().toISOString().split('T')[0],
      verifiedBy: currentUser ? `${currentUser.name} (${currentUser.role})` : 'Pending Verification',
    };

    setArchives((prev) => [newRecord, ...prev]);
    logAudit(`New archival record deposited: ${newRecord.accessionNumber}`, newRecord.sensitivity, newRecord.id);
    setIsUploadOpen(false);

    // Reset upload form
    setNewTitle('');
    setNewAccession('');
    setNewAbstract('');
    setNewTranscription('');
    setNewKeywords('');
    setRefAuthor('');
    setRefTitle('');
    setRefShelfmark('');
    setRefRepo('');
  };

  const generateCitationText = (record: ArchiveRecord, format: 'APA' | 'Chicago' | 'Shelfmark') => {
    const primary = record.references[0];
    if (!primary) return `${record.title} (${record.year}). Accession: ${record.accessionNumber}.`;

    if (format === 'APA') {
      return `${primary.authorOrBody} (${primary.year}). ${primary.title}. ${primary.urlOrRepository || 'Chittagong Hill Tracts Historical Repository'}. Shelfmark: ${primary.shelfmarkOrCallNumber}. Accession: ${record.accessionNumber}.`;
    }
    if (format === 'Chicago') {
      return `${primary.authorOrBody}. "${primary.title}." ${primary.year}. Archival Collection: ${primary.shelfmarkOrCallNumber}, ${primary.urlOrRepository || 'National Archives'}. Cited via Chengmi Repository (${record.accessionNumber}).`;
    }
    return `[ARCHIVAL CALL: ${primary.shelfmarkOrCallNumber}] :: ${record.accessionNumber} :: ${record.title} (${record.year}). Repository: ${primary.urlOrRepository || 'Manikchari / National Archives'}.`;
  };

  const copyToClipboard = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pb-16 transition-colors">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-6 pt-4">
        <div className="space-y-1">
          <div className="text-xs font-serif uppercase tracking-widest text-amber-800 dark:text-amber-400 font-bold">
            Primary Document Repository & Clearance Management
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 dark:text-stone-100">
            Research Archives CMS
          </h1>
          <p className="text-sm font-serif text-stone-600 dark:text-stone-400 max-w-2xl">
            Statutory colonial regulations, Mong Circle royal charters, customary land demarcations, and declassified partition memos with strict primary reference verification.
          </p>
        </div>

        {canUploadArchive() ? (
          <button
            onClick={() => setIsUploadOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-stone-700 dark:hover:bg-stone-600 rounded-xl transition-colors cursor-pointer self-start md:self-auto shadow-xs"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Archival Record</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 text-xs font-serif text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>Sign in as Researcher or Admin to upload archives</span>
          </div>
        )}
      </div>

      {/* Sub-Tab Navigation for Manuscripts vs Historical Visual Plates Gallery vs Audio Archives */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-3">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/80 dark:bg-stone-800/90 rounded-2xl shadow-inner">
          <button
            onClick={() => setActiveSubTab('documents')}
            className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'documents'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>Document Archives & Treaties</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
              {archives.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('gallery')}
            className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'gallery'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Historical Photographs & Maps</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
              {HISTORICAL_GALLERY_ITEMS.length} Plates
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('audio')}
            className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'audio'
                ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Headphones className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Audio Archives (Oral Histories & Songs)</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold">
              {CHT_AUDIO_ARCHIVES.length} Field Tapes
            </span>
          </button>
        </div>

        {activeSubTab === 'documents' && (
          <div className="text-xs font-serif text-stone-500 dark:text-stone-400">
            Showing {filteredArchives.length} of {archives.length} primary source manuscripts
          </div>
        )}
        {activeSubTab === 'gallery' && (
          <div className="text-xs font-serif text-stone-500 dark:text-stone-400">
            {HISTORICAL_GALLERY_ITEMS.length} high-resolution cartographic & photographic plates
          </div>
        )}
        {activeSubTab === 'audio' && (
          <div className="text-xs font-serif text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>Digitized field reels with synchronized multilingual transcripts</span>
          </div>
        )}
      </div>

      {activeSubTab === 'audio' ? (
        <AudioArchivesSection
          onCiteAudio={(rec) => setCitingRecord(rec)}
          onAuditLog={logAudit}
        />
      ) : activeSubTab === 'gallery' ? (
        <HistoricalGallery />
      ) : (
        <>
          {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            placeholder="Search by title, accession number (e.g. CHT-REG-1900), or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs font-serif bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg focus:outline-hidden focus:border-stone-800 dark:focus:border-amber-400 text-stone-900 dark:text-stone-100 shadow-xs"
          />
        </div>

        <div className="md:col-span-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full py-2 px-3 text-xs font-serif bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-700 dark:text-stone-200 cursor-pointer shadow-xs"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3">
          <select
            value={selectedSensitivity}
            onChange={(e) => setSelectedSensitivity(e.target.value)}
            className="w-full py-2 px-3 text-xs font-serif bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-700 dark:text-stone-200 cursor-pointer shadow-xs"
          >
            <option value="All">Sensitivity: All Tiers</option>
            <option value="public">Tier: Public Archives</option>
            <option value="restricted">Tier: Restricted Customary / Land Records</option>
            <option value="declassified">Tier: Declassified State Memoranda</option>
          </select>
        </div>
      </div>

      {/* Archives Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArchives.map((record) => {
          const isRestricted = record.sensitivity === 'restricted';
          const isDeclassified = record.sensitivity === 'declassified';
          const hasAccess = canAccessSensitive();

          return (
            <div
              key={record.id}
              id={`archive-card-${record.id}`}
              onClick={() => handleRecordClick(record)}
              className={`p-6 flex flex-col justify-between space-y-4 rounded-2xl border-2 transition-all cursor-pointer group scroll-mt-28 shadow-xs hover:shadow-xl hover:-translate-y-0.5 ${
                isRestricted
                  ? 'bg-gradient-to-br from-amber-50/80 via-white to-stone-50 dark:from-stone-900 dark:via-stone-900 dark:to-amber-950/20 border-amber-300 dark:border-amber-900/60'
                  : isDeclassified
                  ? 'bg-gradient-to-br from-sky-50/80 via-white to-stone-50 dark:from-stone-900 dark:via-stone-900 dark:to-sky-950/20 border-sky-300 dark:border-sky-900/60'
                  : 'bg-gradient-to-br from-emerald-50/50 via-white to-stone-50 dark:from-stone-900 dark:via-stone-900 dark:to-emerald-950/20 border-emerald-300 dark:border-emerald-900/60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-serif">
                  <span className="font-mono text-stone-500 dark:text-stone-400 font-bold tracking-wider text-[11px]">
                    {record.accessionNumber}
                  </span>

                  {isRestricted ? (
                    <span className="flex items-center gap-1 text-[11px] font-sans font-bold text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                      <Lock className="w-3 h-3 text-amber-800 dark:text-amber-400" />
                      <span>Restricted Archive</span>
                    </span>
                  ) : isDeclassified ? (
                    <span className="flex items-center gap-1 text-[11px] font-sans font-bold text-sky-900 dark:text-sky-300 bg-sky-100 dark:bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-300 dark:border-sky-800">
                      <Unlock className="w-3 h-3 text-sky-700 dark:text-sky-400" />
                      <span>Declassified</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-sans font-bold text-emerald-900 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                      Public Record
                    </span>
                  )}
                </div>

                <h3 className="text-base font-serif font-black text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors leading-snug">
                  {record.title}
                </h3>

                <div className="text-xs text-stone-500 dark:text-stone-400 font-serif">
                  <span className="font-semibold text-stone-700 dark:text-stone-300">{record.era}</span>
                  <span className="mx-1.5">·</span>
                  <span>{record.category}</span>
                </div>

                <p className="text-xs font-serif text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                  {record.abstract}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2 text-[11px] font-serif text-stone-500 dark:text-stone-400">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCitingRecord(record);
                    logAudit(`Citation generated: ${record.accessionNumber}`, record.sensitivity, record.id);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-amber-100/80 hover:bg-amber-200 dark:bg-amber-950/80 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-300 font-sans font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-amber-300/80 dark:border-amber-800/80 shadow-2xs"
                  title="Generate formatted APA/Chicago citation string"
                >
                  <Quote className="w-3 h-3 text-amber-700 dark:text-amber-400" />
                  <span>Cite Record</span>
                </button>

                <span className="font-sans font-bold text-stone-800 dark:text-stone-200 group-hover:underline flex items-center gap-0.5">
                  Inspect Record →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )}

      {/* Record Inspection Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FBF9F5] border border-stone-300 rounded-xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-stone-500">
                  <span>{selectedRecord.accessionNumber}</span>
                  <span>·</span>
                  <span className="text-amber-900">{selectedRecord.region}</span>
                  <span>·</span>
                  <span>Year: {selectedRecord.year}</span>
                </div>
                <h2 className="text-2xl font-serif font-bold text-stone-900 leading-snug">
                  {selectedRecord.title}
                </h2>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setCitingRecord(selectedRecord);
                    logAudit(`Citation generated via modal: ${selectedRecord.accessionNumber}`, selectedRecord.sensitivity, selectedRecord.id);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 text-amber-900 dark:text-amber-300 text-xs font-serif font-bold flex items-center gap-1.5 border border-amber-300 dark:border-amber-800 transition-colors cursor-pointer shadow-xs"
                >
                  <Quote className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                  <span>Cite this Record</span>
                </button>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-1.5 text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  title="Close inspection"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sensitivity Banner */}
            {selectedRecord.sensitivity === 'restricted' && !canAccessSensitive() && (
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs font-serif text-amber-950">
                  <div className="font-bold uppercase tracking-wider text-[11px]">
                    Archival Access Restricted: Sensitive Customary Land & Royal Lineage Record
                  </div>
                  <p>
                    This manuscript contains sensitive customary land rights, genealogical succession rolls, or sacred clan demarcations. In accordance with the Mong Circle Heritage Protocol, the complete primary transcription is restricted to authorized researchers and circle archivists.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedRecord(null);
                      onOpenAuth();
                    }}
                    className="inline-block mt-1 underline font-semibold text-amber-900 hover:text-black cursor-pointer"
                  >
                    Authenticate with Test Admin or Researcher Clearance →
                  </button>
                </div>
              </div>
            )}

            {/* Record Abstract */}
            <div className="space-y-2">
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-stone-400">
                Archival Abstract & Provenance
              </h4>
              <p className="text-sm font-serif text-stone-800 leading-relaxed bg-white p-4 rounded border border-stone-200">
                {selectedRecord.abstract}
              </p>
            </div>

            {/* Full Transcription Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-stone-400">
                  Primary Text Transcription
                </h4>
                {selectedRecord.sensitivity === 'restricted' && canAccessSensitive() && (
                  <span className="text-[11px] font-sans font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Clearance Validated: {currentUser?.role?.toUpperCase()}
                  </span>
                )}
              </div>

              {selectedRecord.sensitivity === 'restricted' && !canAccessSensitive() ? (
                <div className="relative p-6 bg-stone-100 border border-stone-200 rounded-lg text-center space-y-3">
                  <div className="filter blur-xs select-none pointer-events-none text-xs font-mono text-stone-400 space-y-1 text-left">
                    <p>MRA-PALM-1782-01: In the reign of King Mrachai, First Chieftain of Phalang Htaung...</p>
                    <p>The northern boundaries shall stretch from the Feni waters to the upper ridge...</p>
                    <p>Genealogical succession of Mong Rajas preserved under customary seal...</p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSelectedRecord(null);
                        onOpenAuth();
                      }}
                      className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors cursor-pointer"
                    >
                      Sign In to Unlock Full Transcript
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-stone-900 text-stone-100 rounded-lg text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto border border-stone-800">
                  {selectedRecord.fullTranscription}
                </div>
              )}
            </div>

            {/* Primary Verified Citations */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-stone-500" />
                <span>Verified Mandatory Archival Citations ({selectedRecord.references.length})</span>
              </h4>

              <div className="space-y-2">
                {selectedRecord.references.map((ref, idx) => (
                  <div key={idx} className="p-3 bg-white border border-stone-200 rounded text-xs font-serif space-y-1">
                    <div className="font-semibold text-stone-900">
                      {ref.authorOrBody} ({ref.year}). <em>{ref.title}</em>.
                    </div>
                    <div className="text-stone-600 flex flex-wrap gap-2 text-[11px]">
                      <span>Source: <strong>{ref.sourceType}</strong></span>
                      <span>·</span>
                      <span>Shelfmark: <code className="bg-stone-100 px-1 py-0.5 rounded font-mono">{ref.shelfmarkOrCallNumber}</code></span>
                      {ref.pageOrFolio && (
                        <>
                          <span>·</span>
                          <span>{ref.pageOrFolio}</span>
                        </>
                      )}
                    </div>
                    {ref.urlOrRepository && (
                      <div className="text-[11px] text-stone-500 italic">
                        Archival Location: {ref.urlOrRepository}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Citation Generator */}
            <div className="p-4 bg-[#F4EFE6] border border-[#DDD4C1] rounded-lg space-y-2">
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-stone-600 block">
                Scholarly Citation Formats
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {(['APA', 'Chicago', 'Shelfmark'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => copyToClipboard(generateCitationText(selectedRecord, fmt), fmt)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-300 rounded text-xs font-serif text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
                  >
                    {copiedFormat === fmt ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-400" />}
                    <span>{copiedFormat === fmt ? 'Copied' : `Copy ${fmt}`}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-stone-200 text-xs font-serif text-stone-500">
              <span>Deposited by: {selectedRecord.submittedBy}</span>
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-200 hover:bg-stone-300 rounded transition-colors cursor-pointer"
              >
                Close Archive View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Research Archive CMS Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FBF9F5] border border-stone-300 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  Upload Research Archive / Manuscript
                </h3>
                <p className="text-xs font-serif text-stone-500">
                  Deposit statutory instruments, colonial gazettes, or customary records. Mandatory citations are required.
                </p>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-800 rounded transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs font-serif">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Document Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1881 Demarcation of Mong Circle Boundaries"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">
                    Accession Number / Archival ID *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CHT-DOC-1881-MC"
                    value={newAccession}
                    onChange={(e) => setNewAccession(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 font-mono uppercase"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Era</label>
                  <select
                    value={newEra}
                    onChange={(e) => setNewEra(e.target.value as ArchiveRecord['era'])}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 cursor-pointer"
                  >
                    <option value="Pre-Colonial (Pre-1760)">Pre-Colonial (Pre-1760)</option>
                    <option value="British Colonial (1760-1947)">British Colonial (1760-1947)</option>
                    <option value="Pakistan Era (1947-1971)">Pakistan Era (1947-1971)</option>
                    <option value="Post-Independence (1971-1983)">Post-Independence (1971-1983)</option>
                    <option value="Modern Era (1983-Present)">Modern Era (1983-Present)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ArchiveRecord['category'])}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 cursor-pointer"
                  >
                    <option value="Administration">Administration</option>
                    <option value="Mong Circle & Chiefs">Mong Circle & Chiefs</option>
                    <option value="Land & Customary Law">Land & Customary Law</option>
                    <option value="Ethnography & Language">Ethnography & Language</option>
                    <option value="Treaties & Regulations">Treaties & Regulations</option>
                    <option value="Ecological Geography">Ecological Geography</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Sensitivity Clearance</label>
                  <select
                    value={newSensitivity}
                    onChange={(e) => setNewSensitivity(e.target.value as SensitivityLevel)}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 cursor-pointer font-semibold"
                  >
                    <option value="public">Public Archive</option>
                    <option value="restricted">Restricted (Researcher Only)</option>
                    <option value="declassified">Declassified Historical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Abstract & Provenance *</label>
                <textarea
                  rows={2}
                  placeholder="Provide a summary of the record, its historical origin, and administrative impact..."
                  value={newAbstract}
                  onChange={(e) => setNewAbstract(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Full Archival Transcription / Document Text *</label>
                <textarea
                  rows={4}
                  placeholder="Transcribe the verbatim text of the regulation, deed, or sanad..."
                  value={newTranscription}
                  onChange={(e) => setNewTranscription(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900 font-mono"
                  required
                />
              </div>

              {/* Mandatory Reference Citation Form Section */}
              <div className="p-4 bg-stone-100 border border-stone-300 rounded space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-xs">
                    Mandatory Primary Archival Reference *
                  </span>
                  <span className="text-[10px] text-amber-900 font-semibold uppercase">
                    Verification Required
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Author or Issuing Body (e.g. Government of Bengal) *"
                    value={refAuthor}
                    onChange={(e) => setRefAuthor(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-stone-300 rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Primary Source Title / Registry *"
                    value={refTitle}
                    onChange={(e) => setRefTitle(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-stone-300 rounded"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Year (e.g. 1881)"
                    value={refYear}
                    onChange={(e) => setRefYear(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-stone-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Shelfmark / Call Number *"
                    value={refShelfmark}
                    onChange={(e) => setRefShelfmark(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-stone-300 rounded font-mono"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Repository / Physical Location"
                    value={refRepo}
                    onChange={(e) => setRefRepo(e.target.value)}
                    className="px-2.5 py-1.5 bg-white border border-stone-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">Keywords (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Mong Circle, Regulation 1900, Chengi River, Customary Law"
                  value={newKeywords}
                  onChange={(e) => setNewKeywords(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded text-stone-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-stone-700 hover:bg-stone-200 rounded transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded transition-colors cursor-pointer"
                >
                  Deposit & Catalog Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Persistent Citation Floating Panel / Toast */}
      <RecordCitationToast
        record={citingRecord}
        onClose={() => setCitingRecord(null)}
      />
    </div>
  );
};
