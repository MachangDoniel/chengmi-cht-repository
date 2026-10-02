import React, { useState, useRef, useEffect } from 'react';
import {
  AudioRecord,
  TranscriptSegment,
  CHT_AUDIO_ARCHIVES,
} from '../../data/audioArchivesData';
import { ArchiveRecord, SensitivityLevel } from '../../types';
import { chtAudioEngine } from '../../services/chtAudioEngine';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  Quote,
  Search,
  Filter,
  BookOpen,
  Calendar,
  MapPin,
  Mic,
  Music,
  Headphones,
  FileText,
  Copy,
  Check,
  Sparkles,
  Download,
  Share2,
  ExternalLink,
  Info,
  Clock,
  Repeat,
  Radio,
} from 'lucide-react';

interface AudioArchivesSectionProps {
  onCiteAudio?: (record: ArchiveRecord) => void;
  onAuditLog?: (action: string, sensitivity: SensitivityLevel, recordId?: string) => void;
}

export const AudioArchivesSection: React.FC<AudioArchivesSectionProps> = ({
  onCiteAudio,
  onAuditLog,
}) => {
  const [selectedRecord, setSelectedRecord] = useState<AudioRecord>(CHT_AUDIO_ARCHIVES[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(selectedRecord.audioDurationSeconds);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [activeLangTab, setActiveLangTab] = useState<'bilingual' | 'english' | 'original' | 'bengali'>('bilingual');
  const [transcriptSearch, setTranscriptSearch] = useState<string>('');
  const [copiedTranscriptId, setCopiedTranscriptId] = useState<string | null>(null);

  // Sync listener from Interactive Map and Global Search
  useEffect(() => {
    const handleAudioSelect = (e: Event) => {
      const customEvent = e as CustomEvent<string | AudioRecord>;
      if (customEvent.detail) {
        const audioId = typeof customEvent.detail === 'string' ? customEvent.detail : customEvent.detail.id;
        const found = CHT_AUDIO_ARCHIVES.find((a) => a.id === audioId);
        if (found) {
          setSelectedRecord(found);
          setCurrentTime(0);
          setIsPlaying(true);
        }
      }
    };
    window.addEventListener('chengmi-audio-select', handleAudioSelect);
    return () => window.removeEventListener('chengmi-audio-select', handleAudioSelect);
  }, []);

  // Filters
  const [selectedCommunity, setSelectedCommunity] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [catalogSearch, setCatalogSearch] = useState<string>('');
  const [isLiveSynthActive, setIsLiveSynthActive] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load real playable WAV Blob URL from CHT Indigenous Acoustic Engine
  useEffect(() => {
    let isCancelled = false;
    chtAudioEngine.stopLiveSynthesizer();
    setIsPlaying(false);
    setIsLiveSynthActive(false);
    setCurrentTime(0);
    setDuration(selectedRecord.audioDurationSeconds);

    chtAudioEngine.getTrackWavUrl(selectedRecord.id).then((wavUrl) => {
      if (isCancelled) return;
      if (audioRef.current && wavUrl) {
        audioRef.current.src = wavUrl;
        audioRef.current.load();
      }
    });

    if (onAuditLog) {
      onAuditLog(
        `Inspected Audio Oral History: ${selectedRecord.accessionNumber} (${selectedRecord.title})`,
        'public',
        selectedRecord.id
      );
    }

    return () => {
      isCancelled = true;
      chtAudioEngine.stopLiveSynthesizer();
    };
  }, [selectedRecord]);

  // Audio Playback Controls with dual engine (WAV Blob audio element + Web Audio API synthesizer)
  const togglePlayPause = async () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      chtAudioEngine.stopLiveSynthesizer();
      setIsPlaying(false);
      setIsLiveSynthActive(false);
    } else {
      // Ensure audio source is loaded
      if (audioRef.current && !audioRef.current.src) {
        const wavUrl = await chtAudioEngine.getTrackWavUrl(selectedRecord.id);
        if (audioRef.current && wavUrl) {
          audioRef.current.src = wavUrl;
        }
      }

      if (audioRef.current && audioRef.current.src && !isLiveSynthActive) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsLiveSynthActive(false);
          })
          .catch((err) => {
            console.log('Switching to direct Web Audio synthesis:', err);
            startDirectSynthesis();
          });
      } else {
        startDirectSynthesis();
      }

      if (onAuditLog) {
        onAuditLog(`Played Oral History: ${selectedRecord.accessionNumber}`, 'public', selectedRecord.id);
      }
    }
  };

  const startDirectSynthesis = () => {
    setIsPlaying(true);
    setIsLiveSynthActive(true);
    chtAudioEngine.playLiveSynthesizer(selectedRecord.id, isMuted ? 0 : volume, (time, playing) => {
      setCurrentTime(time);
      setIsPlaying(playing);
      if (!playing) {
        setIsLiveSynthActive(false);
      }
    });
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && !isLiveSynthActive) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration) && audioRef.current.duration > 0) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(newTime);
    if (audioRef.current && !isLiveSynthActive) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleSkip = (seconds: number) => {
    const target = Math.min(Math.max(currentTime + seconds, 0), duration);
    handleSeek(target);
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume || 0.85;
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  // Convert seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  // Active Transcript Segment tracking
  const activeSegmentIndex = selectedRecord.transcripts.findIndex((seg, idx) => {
    const nextSeg = selectedRecord.transcripts[idx + 1];
    if (!nextSeg) return true;
    return currentTime >= seg.seconds && currentTime < nextSeg.seconds;
  });

  // Filter Catalog
  const communities = ['All', 'Tripuri', 'Marma', 'Chakma', 'Mro', 'Bawm', 'Regional CHT'];
  const categories = ['All', 'Oral History', 'Traditional Ballad', 'Ritual & Ceremony', 'Court Testimony', 'Folk Chant'];

  const filteredCatalog = CHT_AUDIO_ARCHIVES.filter((item) => {
    const matchesComm = selectedCommunity === 'All' || item.community === selectedCommunity;
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      catalogSearch === '' ||
      item.title.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      item.nativeTitle.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      item.accessionNumber.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      item.narratorOrPerformer.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      item.summary.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(catalogSearch.toLowerCase()));
    return matchesComm && matchesCat && matchesSearch;
  });

  // Filtered Transcripts for search
  const filteredTranscripts = selectedRecord.transcripts.filter((seg) => {
    if (!transcriptSearch) return true;
    const q = transcriptSearch.toLowerCase();
    return (
      seg.originalText.toLowerCase().includes(q) ||
      seg.englishTranslation.toLowerCase().includes(q) ||
      seg.bengaliTranslation.toLowerCase().includes(q) ||
      seg.speaker.toLowerCase().includes(q)
    );
  });

  // Copy transcript segment
  const handleCopyTranscript = (seg: TranscriptSegment) => {
    const textToCopy = `"${seg.englishTranslation}"\n— ${seg.speaker}, ${selectedRecord.title} (${selectedRecord.recordedYear}), Accession No: ${selectedRecord.accessionNumber}, Chittagong Hill Tracts Historical Repository.`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedTranscriptId(seg.id);
    setTimeout(() => setCopiedTranscriptId(null), 2500);
  };

  // Convert to ArchiveRecord format for Citation Toast integration
  const triggerCiteRecording = () => {
    if (!onCiteAudio) return;
    const asArchiveRecord: ArchiveRecord = {
      id: selectedRecord.id,
      accessionNumber: selectedRecord.accessionNumber,
      title: `${selectedRecord.title} (Recorded Sound Performance)`,
      era: 'Modern Era (1983-Present)',
      year: selectedRecord.recordedYear,
      category: 'Ethnography & Language',
      region:
        selectedRecord.community === 'Marma' || selectedRecord.community === 'Tripuri'
          ? 'Mong Circle (Khagrachari)'
          : selectedRecord.community === 'Chakma'
          ? 'Chakma Circle (Rangamati)'
          : selectedRecord.community === 'Mro' || selectedRecord.community === 'Bawm'
          ? 'Bohmong Circle (Bandarban)'
          : 'General CHT',
      abstract: selectedRecord.summary,
      fullTranscription: selectedRecord.transcripts.map((t) => `[${t.timestamp}] ${t.speaker}: ${t.englishTranslation}`).join('\n\n'),
      sensitivity: 'public',
      references: [
        {
          sourceType: 'Oral History',
          authorOrBody: selectedRecord.citation.author,
          title: selectedRecord.citation.title,
          year: selectedRecord.citation.year,
          shelfmarkOrCallNumber: selectedRecord.citation.shelfmark,
          urlOrRepository: selectedRecord.citation.repository,
        },
      ],
      keywords: selectedRecord.tags,
      submittedBy: selectedRecord.recordedBy,
      submissionDate: `${selectedRecord.recordedYear}-01-01`,
    };
    onCiteAudio(asArchiveRecord);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={selectedRecord.audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => {
          if (isLooping) {
            handleSeek(0);
            audioRef.current?.play();
          } else {
            setIsPlaying(false);
          }
        }}
      />

      {/* Hero Showcase Player & Interactive Transcript Console */}
      <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-2xl space-y-6">
        {/* Top Metadata Header & Badges */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-800 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
                <span>Oral History Sound Archive</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-stone-400 bg-stone-800 border border-stone-700">
                {selectedRecord.accessionNumber}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-serif font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80">
                {selectedRecord.community} Community
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
              {selectedRecord.title}
            </h2>
            <p className="text-sm font-serif text-amber-200/90 italic">
              {selectedRecord.nativeTitle}
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2">
            <button
              onClick={triggerCiteRecording}
              className="px-3 py-1.5 rounded-xl text-xs font-serif font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              title="Cite this Oral History Record"
            >
              <Quote className="w-3.5 h-3.5 text-amber-400" />
              <span>Cite Recording</span>
            </button>

            <button
              onClick={() => {
                const blob = new Blob(
                  [
                    `CHITTAGONG HILL TRACTS HISTORICAL SOUND REPOSITORY\nAccession No: ${selectedRecord.accessionNumber}\nTitle: ${selectedRecord.title}\nNative Title: ${selectedRecord.nativeTitle}\nCommunity: ${selectedRecord.community}\nCategory: ${selectedRecord.category}\nNarrator/Performer: ${selectedRecord.narratorOrPerformer} (${selectedRecord.performerRole})\nRecorded: ${selectedRecord.recordedYear} at ${selectedRecord.recordedLocation}\nArchivist: ${selectedRecord.recordedBy} (${selectedRecord.institution})\n\nSUMMARY:\n${selectedRecord.summary}\n\nHISTORICAL SIGNIFICANCE:\n${selectedRecord.historicalSignificance}\n\nTRANSCRIPT:\n${selectedRecord.transcripts.map((t) => `[${t.timestamp}] ${t.speaker}:\nOriginal: ${t.originalText}\nEnglish: ${t.englishTranslation}\nBengali: ${t.bengaliTranslation}`).join('\n\n')}`,
                  ],
                  { type: 'text/plain;charset=utf-8' }
                );
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${selectedRecord.accessionNumber}_Transcript_Dossier.txt`;
                a.click();
              }}
              className="p-2 rounded-xl text-stone-300 hover:text-white bg-stone-800 hover:bg-stone-700 transition-colors cursor-pointer"
              title="Download Transcript Dossier"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Audio Console Grid: Waveform & Playback Engine (Left) + Transcript Side-Panel (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Master Audio Control Deck (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Audio Waveform Scrubbing Canvas */}
            <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 shadow-inner space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Music className="w-3.5 h-3.5" />
                  <span>Acoustic Waveform Analysis</span>
                </span>
                <span className="text-amber-400 font-bold">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Waveform Bars */}
              <div
                className="h-20 flex items-end gap-1 sm:gap-1.5 cursor-pointer py-1 select-none"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickPercent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                  handleSeek(clickPercent * duration);
                }}
              >
                {selectedRecord.waveform.map((barVal, idx) => {
                  const barProgress = (idx / selectedRecord.waveform.length);
                  const currentProgress = currentTime / duration;
                  const isPassed = barProgress <= currentProgress;

                  return (
                    <div
                      key={idx}
                      style={{ height: `${Math.max(14, barVal * 100)}%` }}
                      className={`flex-1 rounded-full transition-all duration-100 ${
                        isPassed
                          ? 'bg-gradient-to-t from-emerald-500 to-amber-400 shadow-xs'
                          : 'bg-stone-800 hover:bg-stone-700'
                      } ${isPlaying && isPassed ? 'opacity-100' : 'opacity-80'}`}
                    />
                  );
                })}
              </div>

              {/* Precise Time Seek Bar */}
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={(e) => handleSeek(parseFloat(e.target.value))}
                className="w-full accent-amber-500 bg-stone-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />

              {/* Master Playback Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleSkip(-10)}
                    className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                    title="Rewind 10s"
                  >
                    <Rewind className="w-4 h-4" />
                  </button>

                  <button
                    onClick={togglePlayPause}
                    className="w-12 h-12 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold flex items-center justify-center shadow-lg hover:shadow-amber-400/20 transition-all cursor-pointer"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={() => handleSkip(10)}
                    className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                    title="Forward 10s"
                  >
                    <FastForward className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleSeek(0)}
                    className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                    title="Replay from start"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsLooping(!isLooping)}
                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                      isLooping ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-stone-400 hover:text-white hover:bg-stone-800'
                    }`}
                    title={isLooping ? 'Looping Enabled' : 'Loop Audio'}
                  >
                    <Repeat className="w-4 h-4" />
                  </button>
                </div>

                {/* Speed & Volume Tools */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Active Audio Output Indicator */}
                  {isPlaying && (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-[11px] font-mono text-emerald-300">
                      <div className="flex items-end gap-0.5 h-3">
                        <span className="w-1 bg-emerald-400 rounded-xs animate-bounce" style={{ height: '80%', animationDuration: '600ms' }}></span>
                        <span className="w-1 bg-emerald-400 rounded-xs animate-bounce" style={{ height: '100%', animationDuration: '450ms' }}></span>
                        <span className="w-1 bg-emerald-400 rounded-xs animate-bounce" style={{ height: '60%', animationDuration: '750ms' }}></span>
                      </div>
                      <span>{isLiveSynthActive ? 'Live Synth Output' : 'Acoustic Sound Active'}</span>
                    </div>
                  )}

                  {/* Direct Synth Toggle for Guaranteed Speaker Audio */}
                  <button
                    onClick={() => {
                      if (isLiveSynthActive) {
                        chtAudioEngine.stopLiveSynthesizer();
                        setIsLiveSynthActive(false);
                        audioRef.current?.play().catch(() => {});
                      } else {
                        audioRef.current?.pause();
                        startDirectSynthesis();
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer border ${
                      isLiveSynthActive
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 font-bold'
                        : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-white'
                    }`}
                    title="Switch to direct Web Audio synthesizer if browser blocks audio element"
                  >
                    {isLiveSynthActive ? '● Synth Engaged' : 'Direct Synth Mode'}
                  </button>

                  {/* Speed Selector */}
                  <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-xl border border-stone-800 text-xs font-mono">
                    {[0.75, 1.0, 1.25, 1.5].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => handleSpeedChange(rate)}
                        className={`px-2 py-0.5 rounded-lg transition-colors cursor-pointer ${
                          playbackRate === rate
                            ? 'bg-amber-500 text-stone-950 font-bold'
                            : 'text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>

                  {/* Volume Slider */}
                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="text-stone-400 hover:text-white cursor-pointer">
                      {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-16 accent-amber-400 bg-stone-800 h-1 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Narrator & Ethnographic Recording Dossier */}
            <div className="p-5 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-4 text-xs font-serif">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-3 border-b border-stone-800">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                    <Mic className="w-3 h-3" />
                    <span>Narrator & Oral Custodian</span>
                  </div>
                  <div className="font-bold text-stone-200 text-sm">
                    {selectedRecord.narratorOrPerformer}
                  </div>
                  <div className="text-stone-400 text-xs">
                    {selectedRecord.performerRole}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-bold flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    <span>Field Recording Metadata</span>
                  </div>
                  <div className="text-stone-300 font-mono">
                    Year: {selectedRecord.recordedYear} • Duration: {selectedRecord.audioDurationDisplay}
                  </div>
                  <div className="text-stone-400 flex items-center gap-1 text-[11px]">
                    <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{selectedRecord.recordedLocation}</span>
                  </div>
                </div>
              </div>

              {/* Traditional Instruments Featured */}
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-bold">
                  Indigenous Instruments Heard:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRecord.instruments.map((inst, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-lg bg-stone-800 text-amber-300 border border-stone-700 text-[11px] font-mono"
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>

              {/* Anthropological & Historical Context */}
              <div className="space-y-1 pt-1">
                <div className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-bold">
                  Anthropological Significance:
                </div>
                <p className="text-stone-300 leading-relaxed text-xs">
                  {selectedRecord.historicalSignificance}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Synchronized Transcript Side-Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-stone-950 rounded-2xl border border-stone-800 p-5 space-y-4 flex flex-col h-[520px]">
            {/* Header & Sub-Language Switchers */}
            <div className="space-y-3 pb-3 border-b border-stone-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span className="font-serif font-bold text-sm text-white">
                    Synchronized Transcript
                  </span>
                </div>
                <span className="text-[10px] font-mono text-stone-400 bg-stone-800 px-2 py-0.5 rounded">
                  Click line to seek
                </span>
              </div>

              {/* Language Mode Toggle */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-stone-900 rounded-xl text-[11px] font-serif font-bold">
                <button
                  onClick={() => setActiveLangTab('bilingual')}
                  className={`py-1 rounded-lg transition-colors cursor-pointer ${
                    activeLangTab === 'bilingual'
                      ? 'bg-amber-400 text-stone-950 font-black shadow-xs'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Bilingual
                </button>
                <button
                  onClick={() => setActiveLangTab('english')}
                  className={`py-1 rounded-lg transition-colors cursor-pointer ${
                    activeLangTab === 'english'
                      ? 'bg-amber-400 text-stone-950 font-black shadow-xs'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setActiveLangTab('original')}
                  className={`py-1 rounded-lg transition-colors cursor-pointer ${
                    activeLangTab === 'original'
                      ? 'bg-amber-400 text-stone-950 font-black shadow-xs'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Indigenous
                </button>
                <button
                  onClick={() => setActiveLangTab('bengali')}
                  className={`py-1 rounded-lg transition-colors cursor-pointer ${
                    activeLangTab === 'bengali'
                      ? 'bg-amber-400 text-stone-950 font-black shadow-xs'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  বাংলা
                </button>
              </div>

              {/* In-Transcript Keyword Filter */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type="text"
                  placeholder="Filter within spoken words..."
                  value={transcriptSearch}
                  onChange={(e) => setTranscriptSearch(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-hidden focus:border-amber-500 font-serif"
                />
              </div>
            </div>

            {/* Scrollable Transcript Lines */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {filteredTranscripts.length === 0 ? (
                <div className="py-12 text-center text-stone-500 font-serif">
                  No matching transcript lines found.
                </div>
              ) : (
                filteredTranscripts.map((seg, idx) => {
                  const isActive = idx === activeSegmentIndex;

                  return (
                    <div
                      key={seg.id}
                      onClick={() => handleSeek(seg.seconds)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                        isActive
                          ? 'bg-amber-500/15 border-amber-500/50 shadow-md ring-1 ring-amber-500/30'
                          : 'bg-stone-900/60 border-stone-800 hover:border-stone-700 hover:bg-stone-900'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className={`flex items-center gap-1.5 font-bold ${isActive ? 'text-amber-300' : 'text-stone-400'}`}>
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>{seg.timestamp}</span>
                          <span className="text-stone-500 font-serif font-normal">• {seg.speaker}</span>
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyTranscript(seg);
                          }}
                          className="p-1 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
                          title="Copy transcript line"
                        >
                          {copiedTranscriptId === seg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Indigenous Script / Oral Speech */}
                      {(activeLangTab === 'bilingual' || activeLangTab === 'original') && (
                        <div className="font-serif text-stone-100 font-medium leading-relaxed italic text-sm border-l-2 border-amber-400/60 pl-2.5">
                          {seg.originalText}
                        </div>
                      )}

                      {/* Scholarly English Translation */}
                      {(activeLangTab === 'bilingual' || activeLangTab === 'english') && (
                        <div className="font-serif text-stone-300 leading-relaxed">
                          {seg.englishTranslation}
                        </div>
                      )}

                      {/* Bengali Translation */}
                      {activeLangTab === 'bengali' && (
                        <div className="font-serif text-stone-200 leading-relaxed">
                          {seg.bengaliTranslation}
                        </div>
                      )}

                      {/* Historical / Cultural Footnote */}
                      {seg.culturalNote && (
                        <div className="text-[10px] font-serif text-amber-200/70 pt-1 border-t border-stone-800/80 flex items-start gap-1">
                          <Info className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                          <span>{seg.culturalNote}</span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Oral History Catalog Browser & Playlist Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-serif font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <Headphones className="w-5 h-5 text-amber-600" />
              <span>Chittagong Hill Tracts Oral Heritage Catalog</span>
            </h3>
            <p className="text-xs font-serif text-stone-500 dark:text-stone-400">
              Browse recorded elders, epics, customary court testimonies, and traditional chants
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search oral recordings..."
              value={catalogSearch}
              onChange={(e) => setCatalogSearch(e.target.value)}
              className="w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-800 dark:text-stone-200 placeholder-stone-400 font-serif focus:outline-hidden focus:border-amber-600 shadow-xs"
            />
          </div>
        </div>

        {/* Filter Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-stone-100 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-700/80 text-xs font-serif">
          {/* Community Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
            <span className="font-mono text-[11px] text-stone-500 font-bold px-1 whitespace-nowrap">Community:</span>
            {communities.map((comm) => (
              <button
                key={comm}
                onClick={() => setSelectedCommunity(comm)}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCommunity === comm
                    ? 'bg-emerald-800 text-white font-bold shadow-xs'
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {comm}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
            <span className="font-mono text-[11px] text-stone-500 font-bold px-1 whitespace-nowrap">Genre:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-amber-800 text-white font-bold shadow-xs'
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCatalog.map((item) => {
            const isCurrent = selectedRecord.id === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedRecord(item)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-0.5 space-y-4 flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50/70 dark:from-stone-900 dark:to-stone-800 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                    : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-300 dark:hover:border-amber-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold">
                      {item.community}
                    </span>
                    <span className="text-stone-400 font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" />
                      {item.audioDurationDisplay}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif font-black text-stone-900 dark:text-stone-100 text-lg leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs font-serif text-amber-800 dark:text-amber-400 italic mt-0.5">
                      {item.nativeTitle}
                    </p>
                  </div>

                  <p className="text-xs font-serif text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2 text-xs font-serif">
                  <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 text-[11px]">
                    <span className="truncate max-w-[180px]">🗣️ {item.narratorOrPerformer}</span>
                    <span className="font-mono">Year {item.recordedYear}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRecord(item);
                        if (!isPlaying || selectedRecord.id !== item.id) {
                          setIsPlaying(true);
                          if (audioRef.current) {
                            audioRef.current.currentTime = 0;
                            audioRef.current.play().catch(() => startDirectSynthesis());
                          } else {
                            startDirectSynthesis();
                          }
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-stone-900 dark:bg-stone-700 text-white font-bold text-xs hover:bg-amber-600 dark:hover:bg-amber-600 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {isCurrent && isPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>Playing Now</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Listen Archive</span>
                        </>
                      )}
                    </button>

                    <span className="text-[11px] font-mono text-stone-400">
                      {item.accessionNumber}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
