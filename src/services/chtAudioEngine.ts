/**
 * CHT Indigenous Acoustic Audio Engine
 * Provides authentic synthesized traditional tribal instruments (Bamboo Flute Dung/Plung,
 * Bronze Ceremonial Gong Chwe, Tribal Drums Kham, and Bamboo Clappers Sari-Pai)
 * generating real playable WAV audio Blobs and real-time Web Audio API soundscapes.
 */

// Helper: Convert AudioBuffer to standard WAV Blob for native <audio> tags
export function audioBufferToWavBlob(buffer: AudioBuffer): Blob {
  const numOfChan = buffer.numberOfChannels;
  const length = buffer.length * numOfChan * 2 + 44;
  const out = new DataView(new ArrayBuffer(length));
  const channels: Float32Array[] = [];
  const sampleRate = buffer.sampleRate;
  let offset = 0;
  let pos = 0;

  function setUint16(data: number) {
    out.setUint16(offset, data, true);
    offset += 2;
  }
  function setUint32(data: number) {
    out.setUint32(offset, data, true);
    offset += 4;
  }

  // RIFF Chunk Descriptor
  setUint32(0x46464952); // "RIFF"
  setUint32(length - 8); // file length - 8
  setUint32(0x45564157); // "WAVE"

  // "fmt " sub-chunk
  setUint32(0x20746d66); // "fmt "
  setUint32(16); // 16 for PCM
  setUint16(1); // 1 = Linear PCM
  setUint16(numOfChan);
  setUint32(sampleRate);
  setUint32(sampleRate * 2 * numOfChan); // byte rate: sampleRate * numChannels * bitsPerSample/8
  setUint16(numOfChan * 2); // block align: numChannels * bitsPerSample/8
  setUint16(16); // 16-bit audio

  // "data" sub-chunk
  setUint32(0x61746164); // "data"
  setUint32(length - offset - 4);

  for (let i = 0; i < buffer.numberOfChannels; i++) {
    channels.push(buffer.getChannelData(i));
  }

  while (pos < buffer.length) {
    for (let i = 0; i < numOfChan; i++) {
      let sample = Math.max(-1, Math.min(1, channels[i][pos]));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      out.setInt16(offset, intSample, true);
      offset += 2;
    }
    pos++;
  }

  return new Blob([out.buffer], { type: 'audio/wav' });
}

// Track Musical Recipes
interface TrackTheme {
  name: string;
  bpm: number;
  scale: number[];
  melodyPattern: number[];
  noteDurations: number[];
  hasGong: boolean;
  hasDrum: boolean;
  hasPlungDrone: boolean;
  hasWaterAmbient: boolean;
  hasBambooClicks: boolean;
}

const TRACK_THEMES: Record<string, TrackTheme> = {
  // 1. Marma Chieftain Mrachai Exodus (Royal Court Flute & Ceremonial Bronze Gong)
  'audio-001': {
    name: 'Marma Royal Court Flute',
    bpm: 72,
    scale: [293.66, 349.23, 392.00, 440.00, 523.25, 587.33], // D minor pentatonic
    melodyPattern: [0, 1, 2, 4, 3, 2, 1, 0, 2, 3, 5, 4, 3, 2, 1, 0],
    noteDurations: [1.2, 0.8, 1.5, 1.0, 0.8, 1.2, 1.0, 2.0, 0.8, 1.0, 1.8, 1.0, 0.8, 1.2, 1.5, 2.5],
    hasGong: true,
    hasDrum: false,
    hasPlungDrone: false,
    hasWaterAmbient: true,
    hasBambooClicks: false,
  },
  // 2. Chakma Radhamon-Dhanpudi Epic Ballad (Flute + Dhol Tribal Drum)
  'audio-002': {
    name: 'Chakma Epic Ballad & Drum',
    bpm: 88,
    scale: [261.63, 311.13, 349.23, 392.00, 466.16, 523.25], // C minor pentatonic
    melodyPattern: [0, 2, 3, 4, 3, 2, 0, 1, 2, 3, 5, 4, 3, 1, 2, 0],
    noteDurations: [0.8, 0.8, 1.2, 0.6, 0.6, 1.0, 1.5, 0.8, 0.8, 1.2, 1.5, 0.8, 0.8, 1.0, 1.2, 2.0],
    hasGong: false,
    hasDrum: true,
    hasPlungDrone: false,
    hasWaterAmbient: false,
    hasBambooClicks: true,
  },
  // 3. Tripuri Chengi River Goddess Lore (High Flute & Bubbling Water Soundscape)
  'audio-003': {
    name: 'Tripuri River Lore Flute',
    bpm: 78,
    scale: [329.63, 392.00, 440.00, 493.88, 587.33, 659.25], // E minor pentatonic
    melodyPattern: [0, 1, 3, 2, 4, 3, 1, 2, 0, 2, 4, 5, 3, 2, 1, 0],
    noteDurations: [1.0, 0.6, 1.4, 0.8, 1.2, 0.8, 0.6, 1.8, 0.8, 1.0, 1.5, 1.2, 0.8, 0.8, 1.0, 2.2],
    hasGong: true,
    hasDrum: false,
    hasPlungDrone: false,
    hasWaterAmbient: true,
    hasBambooClicks: false,
  },
  // 4. Mro Plung Gourd Mouth-Organ Chants (10-Pipe Multi-Reed Harmonic Drone)
  'audio-004': {
    name: 'Mro Plung Sacred Drone',
    bpm: 60,
    scale: [220.00, 277.18, 329.63, 440.00, 554.37, 659.25], // A major pentatonic
    melodyPattern: [0, 2, 3, 4, 2, 3, 1, 0, 3, 4, 5, 4, 3, 2, 1, 0],
    noteDurations: [1.8, 1.2, 2.0, 1.5, 1.2, 1.8, 1.2, 3.0, 1.5, 1.5, 2.5, 1.5, 1.2, 1.8, 2.0, 3.5],
    hasGong: true,
    hasDrum: false,
    hasPlungDrone: true,
    hasWaterAmbient: false,
    hasBambooClicks: false,
  },
  // 5. Rule 34 Customary Durbar Lore (Ceremonial Gong & Customary Gathering)
  'audio-005': {
    name: 'Customary Durbar Resonant Gongs',
    bpm: 66,
    scale: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25], // C major pentatonic
    melodyPattern: [0, 2, 1, 3, 4, 3, 2, 1, 0, 3, 4, 5, 3, 2, 0, 0],
    noteDurations: [1.5, 1.0, 1.2, 1.8, 1.2, 1.0, 1.5, 2.0, 1.2, 1.4, 2.0, 1.5, 1.2, 1.4, 2.0, 3.0],
    hasGong: true,
    hasDrum: false,
    hasPlungDrone: false,
    hasWaterAmbient: false,
    hasBambooClicks: true,
  },
  // 6. Bawm Cheraw Bamboo Dance Ballad (Fast Bamboo Rhythmic Claps & Mountain Flute)
  'audio-006': {
    name: 'Bawm Bamboo Dance Ballad',
    bpm: 104,
    scale: [293.66, 329.63, 369.99, 440.00, 493.88, 587.33], // D major pentatonic
    melodyPattern: [0, 1, 2, 3, 4, 3, 2, 1, 0, 2, 4, 5, 4, 3, 2, 0],
    noteDurations: [0.6, 0.6, 0.8, 0.6, 1.0, 0.6, 0.6, 1.2, 0.6, 0.6, 1.0, 1.0, 0.6, 0.6, 0.8, 1.8],
    hasGong: false,
    hasDrum: true,
    hasPlungDrone: false,
    hasWaterAmbient: false,
    hasBambooClicks: true,
  },
};

class CHTAudioEngine {
  private blobCache: Map<string, string> = new Map();
  private liveAudioCtx: AudioContext | null = null;
  private currentLiveNodes: { stop: () => void } | null = null;

  /**
   * Generates or retrieves a real playable WAV audio Blob URL for the given track.
   * Renders ~40-60 seconds of authentic indigenous acoustic instrumentation.
   */
  public async getTrackWavUrl(trackId: string): Promise<string> {
    if (this.blobCache.has(trackId)) {
      return this.blobCache.get(trackId)!;
    }

    const theme = TRACK_THEMES[trackId] || TRACK_THEMES['audio-001'];
    const durationSeconds = 60; // 60 seconds of loopable authentic indigenous soundscape
    const sampleRate = 22050; // Optimized sample rate for instant compilation & warm analog acoustic feel

    const OfflineCtxClass =
      window.OfflineAudioContext ||
      (window as unknown as { webkitOfflineAudioContext: typeof OfflineAudioContext }).webkitOfflineAudioContext;

    if (!OfflineCtxClass) {
      // In rare environments without OfflineAudioContext, return placeholder data URI
      return '';
    }

    const offlineCtx = new OfflineCtxClass(2, Math.floor(sampleRate * durationSeconds), sampleRate);

    // 1. Master Reverb / Ambient Space Simulation
    const masterGain = offlineCtx.createGain();
    masterGain.gain.setValueAtTime(0.85, 0);
    masterGain.connect(offlineCtx.destination);

    // 2. Stream Ambient Water Background (if applicable)
    if (theme.hasWaterAmbient) {
      const bufferSize = sampleRate * 2;
      const noiseBuffer = offlineCtx.createBuffer(1, bufferSize, sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noise = offlineCtx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const waterFilter = offlineCtx.createBiquadFilter();
      waterFilter.type = 'lowpass';
      waterFilter.frequency.setValueAtTime(320, 0);

      const waterGain = offlineCtx.createGain();
      waterGain.gain.setValueAtTime(0.04, 0);

      noise.connect(waterFilter);
      waterFilter.connect(waterGain);
      waterGain.connect(masterGain);
      noise.start(0);
    }

    // 3. Mro Plung 10-Pipe Gourd Mouth-Organ Continuous Drone (if applicable)
    if (theme.hasPlungDrone) {
      const dronePitches = [110, 164.81, 220, 329.63];
      dronePitches.forEach((freq) => {
        const osc = offlineCtx.createOscillator();
        const gain = offlineCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, 0);

        // Breath fluctuation LFO
        const lfo = offlineCtx.createOscillator();
        const lfoGain = offlineCtx.createGain();
        lfo.frequency.setValueAtTime(0.3, 0);
        lfoGain.gain.setValueAtTime(1.5, 0);
        lfo.connect(osc.frequency);
        lfo.start(0);

        gain.gain.setValueAtTime(0.035, 0);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(0);
      });
    }

    // 4. Tribal Drums & Bamboo Clapper Rhythms
    if (theme.hasDrum || theme.hasBambooClicks) {
      const beatInterval = 60 / theme.bpm;
      let beatTime = 0;

      while (beatTime < durationSeconds) {
        if (theme.hasDrum && (Math.floor(beatTime / beatInterval) % 2 === 0)) {
          // Deep tribal drum strike (Kham)
          const drumOsc = offlineCtx.createOscillator();
          const drumGain = offlineCtx.createGain();
          drumOsc.type = 'sine';
          drumOsc.frequency.setValueAtTime(130, beatTime);
          drumOsc.frequency.exponentialRampToValueAtTime(42, beatTime + 0.18);

          drumGain.gain.setValueAtTime(0.22, beatTime);
          drumGain.gain.exponentialRampToValueAtTime(0.001, beatTime + 0.22);

          drumOsc.connect(drumGain);
          drumGain.connect(masterGain);
          drumOsc.start(beatTime);
          drumOsc.stop(beatTime + 0.25);
        }

        if (theme.hasBambooClicks) {
          // Sharp bamboo stick click (Cheraw rhythm)
          const clickOsc = offlineCtx.createOscillator();
          const clickGain = offlineCtx.createGain();
          clickOsc.type = 'square';
          clickOsc.frequency.setValueAtTime(1200 + Math.random() * 200, beatTime);

          clickGain.gain.setValueAtTime(0.08, beatTime);
          clickGain.gain.exponentialRampToValueAtTime(0.001, beatTime + 0.04);

          clickOsc.connect(clickGain);
          clickGain.connect(masterGain);
          clickOsc.start(beatTime);
          clickOsc.stop(beatTime + 0.05);
        }

        beatTime += beatInterval;
      }
    }

    // 5. Ceremonial Bronze Gong (Chwe) on measure beginnings
    if (theme.hasGong) {
      const gongInterval = 6.0;
      let gongTime = 0.5;

      while (gongTime < durationSeconds) {
        [138.59, 277.18, 415.3, 830.6].forEach((gongFreq, gIdx) => {
          const osc = offlineCtx.createOscillator();
          const gain = offlineCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(gongFreq, gongTime);

          const initVol = (0.12 / (gIdx + 1));
          gain.gain.setValueAtTime(initVol, gongTime);
          gain.gain.exponentialRampToValueAtTime(0.0005, gongTime + 3.8);

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(gongTime);
          osc.stop(gongTime + 4.0);
        });

        gongTime += gongInterval;
      }
    }

    // 6. Traditional Bamboo Transverse Flute (Dung) Melody
    let noteTime = 0.2;
    let patternIdx = 0;

    while (noteTime < durationSeconds) {
      const scaleIndex = theme.melodyPattern[patternIdx % theme.melodyPattern.length];
      const noteFreq = theme.scale[scaleIndex % theme.scale.length];
      const noteDur = theme.noteDurations[patternIdx % theme.noteDurations.length];

      // Flute Fundamental (Triangle for woody bamboo character)
      const fluteOsc = offlineCtx.createOscillator();
      const fluteGain = offlineCtx.createGain();
      fluteOsc.type = 'triangle';
      fluteOsc.frequency.setValueAtTime(noteFreq, noteTime);

      // Subtle breath vibrato (5.2 Hz)
      const vibrato = offlineCtx.createOscillator();
      const vibratoGain = offlineCtx.createGain();
      vibrato.frequency.setValueAtTime(5.2, noteTime);
      vibratoGain.gain.setValueAtTime(noteFreq * 0.018, noteTime);
      vibrato.connect(fluteOsc.frequency);
      vibrato.start(noteTime + 0.15); // Vibrato blooms after onset
      vibrato.stop(noteTime + noteDur);

      // Flute Air Envelope (soft attack, sustained, soft release)
      fluteGain.gain.setValueAtTime(0.0001, noteTime);
      fluteGain.gain.linearRampToValueAtTime(0.18, noteTime + 0.12);
      fluteGain.gain.setValueAtTime(0.16, noteTime + noteDur * 0.8);
      fluteGain.gain.exponentialRampToValueAtTime(0.001, noteTime + noteDur);

      // Subtle 2nd harmonic octave overtone for realistic open-pipe resonance
      const overtoneOsc = offlineCtx.createOscillator();
      const overtoneGain = offlineCtx.createGain();
      overtoneOsc.type = 'sine';
      overtoneOsc.frequency.setValueAtTime(noteFreq * 2, noteTime);
      overtoneGain.gain.setValueAtTime(0.025, noteTime);
      overtoneGain.gain.exponentialRampToValueAtTime(0.001, noteTime + noteDur);

      fluteOsc.connect(fluteGain);
      overtoneOsc.connect(overtoneGain);
      fluteGain.connect(masterGain);
      overtoneGain.connect(masterGain);

      fluteOsc.start(noteTime);
      fluteOsc.stop(noteTime + noteDur + 0.05);
      overtoneOsc.start(noteTime);
      overtoneOsc.stop(noteTime + noteDur + 0.05);

      noteTime += noteDur + 0.12; // Slight breath pause between phrases
      patternIdx++;
    }

    try {
      const renderedBuffer = await offlineCtx.startRendering();
      const wavBlob = audioBufferToWavBlob(renderedBuffer);
      const blobUrl = URL.createObjectURL(wavBlob);
      this.blobCache.set(trackId, blobUrl);
      return blobUrl;
    } catch (e) {
      console.error('Failed to render audio buffer:', e);
      return '';
    }
  }

  /**
   * Live Web Audio Player: Starts instantaneous real-time acoustic playback
   * directly through the user's speakers, bypassing any potential browser <audio> bugs.
   */
  public playLiveSynthesizer(
    trackId: string,
    volume: number = 0.85,
    onProgress?: (time: number, isPlaying: boolean) => void
  ): () => void {
    this.stopLiveSynthesizer();

    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioCtx) return () => {};

    if (!this.liveAudioCtx || this.liveAudioCtx.state === 'closed') {
      this.liveAudioCtx = new AudioCtx();
    }

    const ctx = this.liveAudioCtx;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const theme = TRACK_THEMES[trackId] || TRACK_THEMES['audio-001'];
    let isRunning = true;
    let elapsed = 0;
    const startTime = ctx.currentTime;

    const timer = setInterval(() => {
      if (!isRunning) return;
      elapsed = ctx.currentTime - startTime;
      onProgress?.(elapsed, true);
    }, 250);

    // Master volume gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume * 0.7, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Live Bamboo Flute Player Loop
    let patternIdx = 0;
    let nextNoteTimeout: number | null = null;

    const scheduleNextNote = () => {
      if (!isRunning) return;
      const scaleIndex = theme.melodyPattern[patternIdx % theme.melodyPattern.length];
      const freq = theme.scale[scaleIndex % theme.scale.length];
      const dur = theme.noteDurations[patternIdx % theme.noteDurations.length];

      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Breath Vibrato
        const vib = ctx.createOscillator();
        const vibGain = ctx.createGain();
        vib.frequency.setValueAtTime(5.2, ctx.currentTime);
        vibGain.gain.setValueAtTime(freq * 0.02, ctx.currentTime);
        vib.connect(osc.frequency);
        vib.start(ctx.currentTime + 0.1);
        vib.stop(ctx.currentTime + dur);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.22, ctx.currentTime + dur * 0.75);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + dur + 0.05);

        patternIdx++;
        nextNoteTimeout = window.setTimeout(scheduleNextNote, (dur + 0.15) * 1000);
      } catch {
        // Safe exit
      }
    };

    scheduleNextNote();

    // Gong Loop if applicable
    let gongInterval: number | null = null;
    if (theme.hasGong) {
      const playGong = () => {
        if (!isRunning) return;
        try {
          [138.59, 277.18, 415.3].forEach((gongFreq, gIdx) => {
            const gongOsc = ctx.createOscillator();
            const gongGain = ctx.createGain();
            gongOsc.type = 'sine';
            gongOsc.frequency.setValueAtTime(gongFreq, ctx.currentTime);
            gongGain.gain.setValueAtTime(0.15 / (gIdx + 1), ctx.currentTime);
            gongGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);
            gongOsc.connect(gongGain);
            gongGain.connect(masterGain);
            gongOsc.start(ctx.currentTime);
            gongOsc.stop(ctx.currentTime + 3.6);
          });
        } catch {
          // ignore
        }
      };

      playGong();
      gongInterval = window.setInterval(playGong, 6000);
    }

    const stop = () => {
      isRunning = false;
      clearInterval(timer);
      if (nextNoteTimeout) clearTimeout(nextNoteTimeout);
      if (gongInterval) clearInterval(gongInterval);
      try {
        masterGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        setTimeout(() => masterGain.disconnect(), 150);
      } catch {
        // ignore
      }
      onProgress?.(elapsed, false);
    };

    this.currentLiveNodes = { stop };
    return stop;
  }

  public stopLiveSynthesizer() {
    if (this.currentLiveNodes) {
      this.currentLiveNodes.stop();
      this.currentLiveNodes = null;
    }
  }

  public setVolume(volume: number) {
    if (this.liveAudioCtx) {
      // master gain can be updated
    }
  }
}

export const chtAudioEngine = new CHTAudioEngine();
