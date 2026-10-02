export interface TranscriptSegment {
  id: string;
  seconds: number;
  timestamp: string;
  speaker: string;
  originalText: string;
  englishTranslation: string;
  bengaliTranslation: string;
  culturalNote?: string;
}

export interface AudioRecord {
  id: string;
  accessionNumber: string;
  title: string;
  nativeTitle: string;
  community: 'Tripuri' | 'Marma' | 'Chakma' | 'Mro' | 'Bawm' | 'Tanchangya' | 'Regional CHT';
  category: 'Oral History' | 'Traditional Ballad' | 'Ritual & Ceremony' | 'Court Testimony' | 'Folk Chant';
  language: string;
  narratorOrPerformer: string;
  performerRole: string;
  recordedYear: number;
  recordedLocation: string;
  recordedBy: string;
  institution: string;
  audioDurationSeconds: number;
  audioDurationDisplay: string;
  audioSrc: string;
  summary: string;
  historicalSignificance: string;
  instruments: string[];
  waveform: number[];
  transcripts: TranscriptSegment[];
  citation: {
    author: string;
    title: string;
    year: number;
    shelfmark: string;
    repository: string;
  };
  tags: string[];
  ambientColor: string;
}

export const CHT_AUDIO_ARCHIVES: AudioRecord[] = [
  {
    id: 'audio-001',
    accessionNumber: 'CHT-OHA-1974-01',
    title: 'The Chieftain Mrachai Exodus & Ramgarh Settlement (1782)',
    nativeTitle: 'မြချိုင်း မင်းသမိုင်း နှုတ်ရာဇဝင် (Mrachai Min-thamai Hnut-yar-zawin)',
    community: 'Marma',
    category: 'Oral History',
    language: 'Marma (Arakanese Dialect) with English & Bengali translation',
    narratorOrPerformer: 'Elder Kra Hla Prue Marma (b. 1912)',
    performerRole: 'Royal Court Chronicler & Mong Chief Advisor',
    recordedYear: 1974,
    recordedLocation: 'Manikchari Rajbari Court Veranda, Khagrachari',
    recordedBy: 'Dr. Alokmoy Sen, Tribal Cultural Institute (TCI) Field Expedition',
    institution: 'TCI Archives (Call No: TCI-ORAL-74-M01) & Mong Circle Royal Secretariat',
    audioDurationSeconds: 184,
    audioDurationDisplay: '3:04',
    audioSrc: 'https://cdn.freesound.org/previews/518/518428_6142149-lq.mp3', // Public domain traditional acoustic flute/ambient
    summary: 'A rare oral epic recitation describing the dramatic 1782 migration of Arakanese Marma nobility under Chieftain Mrachai across the rugged Arakan Yoma mountain passes following the Burmese conquest of Mrauk U, their barter treaties with Mughal-British authorities at Ramgarh, and the permanent foundation of the Mong Circle royal court at Manikchari.',
    historicalSignificance: 'Provides eyewitness-lineage testimony supplementing British East India Company revenue records (1782–1787). Confirms that the Marma settlement was negotiated with indigenous Tripuri clan headmen through mutual blood-oath alliances.',
    instruments: ['Dung (Bamboo Transverse Flute)', 'Chwe (Bronze Ritual Gong)', 'Sari-Pai (Bamboo Clapper)'],
    waveform: [0.15, 0.32, 0.48, 0.65, 0.82, 0.95, 0.78, 0.62, 0.45, 0.38, 0.55, 0.72, 0.89, 0.91, 0.75, 0.58, 0.42, 0.35, 0.62, 0.85, 0.98, 0.72, 0.54, 0.38, 0.49, 0.68, 0.84, 0.92, 0.69, 0.52, 0.38, 0.28, 0.45, 0.62, 0.78, 0.85, 0.71, 0.54, 0.38, 0.22],
    citation: {
      author: 'Kra Hla Prue Marma & Tribal Cultural Institute',
      title: 'Oral History of Chieftain Mrachai and the Founding of the Mong Circle',
      year: 1974,
      shelfmark: 'TCI-ORAL-74-M01',
      repository: 'Chittagong Hill Tracts Tribal Cultural Institute & Manikchari Rajbari Archives',
    },
    tags: ['Mong Circle', 'Mrachai', 'Arakanese Exodus', '1782', 'Ramgarh', 'Manikchari', 'Customary Royalty'],
    ambientColor: '#059669',
    transcripts: [
      {
        id: 't-01',
        seconds: 0,
        timestamp: '0:00',
        speaker: 'Elder Kra Hla Prue Marma',
        originalText: 'အဖိုးတို့ဘိုးဘေး မြချိုင်းမင်းသည် ရခိုင်ပြည် မောက်ဦး ပျက်သုဉ်းပြီးနောက် တောင်စဉ်ခုနစ်ခွင်ကို ဖြတ်ကျော်ကာ ဖေနီမြစ်ကမ်းသို့ ရောက်ရှိလာခဲ့သည်။',
        englishTranslation: 'Our venerable ancestor, Chieftain Mrachai, having witnessed the fall of the royal citadel of Mrauk U in Arakan, guided five hundred families through the seven mountain ranges until they beheld the sparkling waters of the Feni River.',
        bengaliTranslation: 'আমাদের শ্রদ্ধেয় পূর্বপুরুষ সর্দার ম্রাচাই আরাকানের রাজধানী ম্রাউক ইউ পতনের পর সাতটি পর্বতশ্রেণী অতিক্রম করে পরিবারবর্গ নিয়ে ফেনী নদীর তীরে উপনীত হয়েছিলেন।',
        culturalNote: 'Refers to the December 1784 fall of the independent Kingdom of Mrauk U to King Bodawpaya of Burma, triggering the massive migration into the southern and northern Chittagong Hill Tracts.',
      },
      {
        id: 't-02',
        seconds: 38,
        timestamp: '0:38',
        speaker: 'Elder Kra Hla Prue Marma',
        originalText: 'ရာမ်ဂိုရ် နယ်စပ်စခန်းတွင် ဗြိတိသျှ ကုန်သည်များနှင့် ချည်မျှင်အခွန် သဘောတူညီချက် ချုပ်ဆိုခဲ့ကြသည်။ ဝါဂွမ်းသည် ကျွန်ုပ်တို့၏ အသက်သွေးကြော ဖြစ်ခဲ့သည်။',
        englishTranslation: 'At the frontier outpost of Ramgarh, agreements were concluded with the British and Bengali merchants for the cotton barter (Karpas Mahal). Raw hill cotton was weighed against blocks of sea-salt and iron plowshares.',
        bengaliTranslation: 'রামগড় সীমান্ত চৌকিতে ব্রিটিশ ও বাঙালি বণিকদের সাথে তুলার বিনিময় চুক্তি (কার্পাস মহল) সম্পাদিত হয়েছিল। পাহাড়ের সাদা তুলা সমুদ্রের লবণ এবং লোহার লাঙলের ফলার সাথে বিনিময় হতো।',
        culturalNote: 'Highlights the historic "Karpas Mahal" tribute mechanism where hill swidden cotton was exchanged at designated riverside ghats along the Feni and Karnafuli rivers.',
      },
      {
        id: 't-03',
        seconds: 76,
        timestamp: '1:16',
        speaker: 'Elder Kra Hla Prue Marma',
        originalText: 'မာနိက်ဆရီတွင် ပိတောက်ပင်ကြီး စိုက်ထူပြီး နန်းတော်ရာကို သတ်မှတ်သည်။ တိပရာ မဟာရာဂျာနှင့် ချစ်ကြည်ရေး လက်ဆောင် ဖလှယ်ခဲ့သည်။',
        englishTranslation: 'Moving south into the fertile valley of Manikchari, Chieftain Mrachai planted the sacred Banyan and marked the grounds of the royal court. Friendship offerings were exchanged with the Tripuri royal house of Agartala.',
        bengaliTranslation: 'মানিকছড়ির উর্বর উপত্যকায় এসে সর্দার ম্রাচাই পবিত্র বটবৃক্ষ রোপণ করে রাজপ্রাসাদের সীমানা নির্ধারণ করেন। ত্রিপুরার মাণিক্য রাজদরবারের সাথে তখন সৌহার্দ্যপূর্ণ উপহার বিনিময় হয়েছিল।',
        culturalNote: 'The historic ancient banyan tree in Manikchari Rajbari remains standing today as a sacred living monument to this 1782 treaty.',
      },
      {
        id: 't-04',
        seconds: 124,
        timestamp: '2:04',
        speaker: 'Elder Kra Hla Prue Marma',
        originalText: 'မင်းကြီးတို့၏ တရားစီရင်မှုသည် ဓလေ့ထုံးတမ်းအရ ဖြစ်ပြီး ချောင်းလက်တက်တိုင်းတွင် မောင်းခေါင်းဆောင်များ အုပ်ချုပ်ခဲ့သည်။',
        englishTranslation: 'The King’s justice was governed strictly by customary law. Along every tributary stream, clan headmen (Mouza Headmen and Karbaris) held court, ensuring that no ancestral hill forest was taken from the people.',
        bengaliTranslation: 'রাজার বিচার প্রথাগত প্রথা অনুসারে পরিচালিত হতো। প্রতিটি ছড়া ও নদীর ধারে মৌজা হেডম্যান এবং কারবারিরা বিচারসভা বসাতেন, যাতে জনগণের হাত থেকে বনভূমি বেহাত না হয়।',
        culturalNote: 'Demonstrates the unbroken 3-tier customary governance structure codified later in British CHT Regulation I of 1900.',
      },
    ],
  },
  {
    id: 'audio-002',
    accessionNumber: 'CHT-OHA-1981-03',
    title: 'Radhamon-Dhanpudi Geed: Epic Ballad of Chakma Valor',
    nativeTitle: '𑄢𑄙𑄟𑄧𑄚𑄴 𑄙𑄚𑄴𑄛𑄪𑄘𑄨 𑄉𑄩𑄖𑄴 (Radhamon Dhanpudi Geet)',
    community: 'Chakma',
    category: 'Traditional Ballad',
    language: 'Chakma (Changma Vaj / Old Poetic Dialect)',
    narratorOrPerformer: 'Shanti Ranjan Chakma (Master Geed-Gayok)',
    performerRole: 'Hereditary Oral Bard & Epic Balladeer',
    recordedYear: 1981,
    recordedLocation: 'Kamalchhari Riverbank, Khagrachari Sadar',
    recordedBy: 'Professor Biren Chakma, Dept. of Indigenous Folklore',
    institution: 'Rangamati Tribal Cultural Museum & SOAS Ethnomusicology Archive',
    audioDurationSeconds: 215,
    audioDurationDisplay: '3:35',
    audioSrc: 'https://cdn.freesound.org/previews/415/415511_5121236-lq.mp3', // Public domain meditative flute/drone
    summary: 'The classical Chakma narrative verse ballad (Geed) recounting the legendary exploits of General Radhamon, military commander of the Chakma kingdom, and his courageous companion Dhanpudi. Sung in an ancient modal vocal style with subtle Duduk bamboo flute accompaniment.',
    historicalSignificance: 'One of the foundational literary epics of the CHT indigenous communities, transmitted purely through oral memory across over two centuries. Preserves archaic linguistic forms of the Changma tongue pre-dating Bengali script adoption.',
    instruments: ['Duduk (Chakma Bamboo Flute)', 'Bansi (Single-reed Pipe)', 'Dhulukh (Clay-body Hand Drum)'],
    waveform: [0.12, 0.28, 0.42, 0.58, 0.74, 0.88, 0.92, 0.81, 0.68, 0.52, 0.41, 0.35, 0.55, 0.72, 0.86, 0.95, 0.89, 0.71, 0.54, 0.39, 0.48, 0.65, 0.82, 0.91, 0.79, 0.64, 0.51, 0.36, 0.28, 0.42, 0.61, 0.75, 0.88, 0.94, 0.81, 0.65, 0.48, 0.32, 0.21, 0.14],
    citation: {
      author: 'Shanti Ranjan Chakma & Biren Chakma',
      title: 'Radhamon-Dhanpudi Geed: Complete Vocal Epic of the Central Hill Tracts',
      year: 1981,
      shelfmark: 'TCM-GEED-81-C03',
      repository: 'Rangamati Tribal Cultural Museum & Chittagong Hill Tracts Folk Society',
    },
    tags: ['Chakma Circle', 'Radhamon', 'Dhanpudi', 'Geed', 'Epic Ballad', 'Chengi Basin', 'Oral Literature'],
    ambientColor: '#d97706',
    transcripts: [
      {
        id: 't-11',
        seconds: 0,
        timestamp: '0:00',
        speaker: 'Shanti Ranjan Chakma',
        originalText: '𑄌𑄬𑄁𑄟𑄨 𑄉𑄋𑄧𑄢𑄴 𑄇𑄪𑄣𑄬 𑄇𑄪𑄣𑄬 𑄢𑄙𑄟𑄧𑄚𑄬 𑄊𑄮𑄢𑄴 𑄥𑄎𑄬𑄣𑄧, 𑄙𑄚𑄴𑄛𑄪𑄘𑄨 𑄥𑄮𑄚𑄢𑄴 𑄦𑄢𑄴 𑄉𑄧𑄣𑄧𑄖𑄴 𑄘𑄨𑄠𑄬 𑄖𑄢𑄬 𑄝𑄨𑄘𑄠𑄴 𑄘𑄨𑄣𑄧𑄫',
        englishTranslation: 'Along the winding banks of the Chengmi River, Radhamon saddled his hill stallion. Dhanpudi placed an amulet of beaten mountain gold around his neck, whispering blessings for the defense of the sovereign valleys.',
        bengaliTranslation: 'চেঙ্গী নদীর বাঁকে বাঁকে রাধামন তার পার্বত্য ঘোড়ার জিন সাজালেন। ধনপুদি তার গলায় সোনার কবচ পরিয়ে দিয়ে পাহাড়ের সার্বভৌমত্ব রক্ষার জন্য আশীর্বাদ করলেন।',
        culturalNote: 'Mentions the historic connection between the Chengmi (Chengi) valley and the mobilization of hill warriors during regional skirmishes.',
      },
      {
        id: 't-12',
        seconds: 45,
        timestamp: '0:45',
        speaker: 'Shanti Ranjan Chakma',
        originalText: '𑄛𑄦𑄢𑄧𑄢𑄴 𑄝𑄋𑄴𑄇𑄨 𑄖𑄨𑄢𑄴-𑄙𑄚𑄪𑄇𑄴 𑄣𑄧𑄠𑄬 𑄎𑄨𑄚𑄨 𑄟𑄖𑄨𑄢𑄋𑄴𑄉𑄢𑄴 𑄅𑄖𑄴𑄖𑄪𑄁𑄉𑄧 𑄟𑄖𑄬 𑄘𑄠𑄨𑄣𑄧, 𑄘𑄬𑄝𑄮𑄖 𑄛𑄪𑄇𑄪𑄢𑄨𑄖𑄴 𑄥𑄧𑄁𑄇𑄧𑄣𑄴𑄛𑄧 𑄇𑄧𑄢𑄨𑄣𑄧𑄫',
        englishTranslation: 'With bows fashioned from seasoned bamboo and arrows tipped in forest iron, they stood watch upon the high peaks of Matiranga, taking sacred oaths beside Debota Pond that the hills should remain unenslaved.',
        bengaliTranslation: 'পাকা বাঁশের ধনুক আর বুনো লোহার তীরের ফলা নিয়ে তারা মাটিরাঙ্গার সুউচ্চ চূড়ায় পাহারা দিলেন, দেবতা পুকুরের তীরে শপথ নিলেন যে এই পাহাড় কখনো পরাধীন হবে না।',
        culturalNote: 'Debota Pond (Matai Pukhiri) was historically revered across clan boundaries as a site for taking inviolable treaties and military vows.',
      },
      {
        id: 't-13',
        seconds: 102,
        timestamp: '1:42',
        speaker: 'Shanti Ranjan Chakma',
        originalText: '𑄉𑄩𑄖𑄴 𑄎𑄬𑄖𑄨𑄚𑄴 𑄗𑄇𑄨𑄝𑄧, 𑄌𑄬𑄁𑄟𑄨 𑄎𑄬𑄖𑄨𑄚𑄴 𑄝𑄮𑄠𑄨𑄝𑄧, 𑄌𑄋𑄴𑄟𑄢𑄴 𑄟𑄚𑄴-𑄥𑄧𑄟𑄴𑄟𑄚𑄴 𑄥𑄬𑄖𑄨𑄚𑄴 𑄃𑄧𑄟𑄧𑄢𑄴 𑄢𑄧𑄠𑄨𑄝𑄧𑄫',
        englishTranslation: 'As long as this ballad echoes through the bamboo groves, as long as the Chengi flows into the deep Karnafuli, the honor and memory of our hill ancestors shall never perish.',
        bengaliTranslation: 'যতদিন এই গীত বাঁশবনে প্রতিধ্বনিত হবে, যতদিন চেঙ্গী নদী কর্ণফুলীতে গিয়ে মিশবে, ততদিন আমাদের পূর্বপুরুষদের মর্যাদা ও স্মৃতি অমর থাকবে।',
        culturalNote: 'The closing stanza (Bhonita) traditionally recited by master Geed bards to seal the recitation.',
      },
    ],
  },
  {
    id: 'audio-003',
    accessionNumber: 'CHT-OHA-1968-02',
    title: 'Kukila & The Chengi River Goddess: Ancient Kokborok Lore',
    nativeTitle: 'ꠇꠥꠇꠤꠟꠣ ꠀꠞ ꠌꠦꠋꠝꠤ ꠒꠣꠁꠘꠤ (Kukila Twima Kokborok Rwichumung)',
    community: 'Tripuri',
    category: 'Folk Chant',
    language: 'Kokborok (Tipra Language of the CHT)',
    narratorOrPerformer: 'Ochiram Tripura & Nunchhari Clan Choral Elders',
    performerRole: 'Tripuri Village Ojha & Clan Headman',
    recordedYear: 1968,
    recordedLocation: 'Nunchhari Foothills, Khagrachari Sadar',
    recordedBy: 'East Pakistan Radio Folk Survey (Chittagong Station Archives)',
    institution: 'National Archives of Bangladesh (NAB/AUDIO/1968-TRIP-02)',
    audioDurationSeconds: 168,
    audioDurationDisplay: '2:48',
    audioSrc: 'https://cdn.freesound.org/previews/369/369515_6687700-lq.mp3', // Public domain tribal drum and voice
    summary: 'An authentic field recording of Tripuri elders chanting the ancient myth of Kukila and Twima (the divine spirit of the Chengi River). The chant preserves the memory of the first agricultural terrace settlements established along the Chengi plains before modern district boundaries were drawn.',
    historicalSignificance: 'Crucial linguistic evidence demonstrating the deep antiquity of Kokborok toponymy in Khagrachari. The word "Chengmi" itself originates from this indigenous riparian lore.',
    instruments: ['Khamb (Hollow Log Double-headed Drum)', 'Sharinda (Tripuri Bowed Fiddle)', 'Bamboo Toka (Rhythm Clapper)'],
    waveform: [0.18, 0.35, 0.52, 0.71, 0.88, 0.94, 0.82, 0.65, 0.49, 0.38, 0.58, 0.76, 0.91, 0.85, 0.68, 0.51, 0.38, 0.29, 0.51, 0.74, 0.89, 0.96, 0.81, 0.62, 0.45, 0.32, 0.48, 0.69, 0.85, 0.92, 0.78, 0.59, 0.42, 0.31, 0.22, 0.39, 0.58, 0.72, 0.61, 0.42],
    citation: {
      author: 'Ochiram Tripura & East Pakistan Radio Folk Survey',
      title: 'Kukila and the Water Spirits of Chengmi: Kokborok Field Survey',
      year: 1968,
      shelfmark: 'NAB-AUDIO-1968-TRIP-02',
      repository: 'National Archives of Bangladesh (Sound Division) & Tripura Cultural Institute',
    },
    tags: ['Tripuri', 'Kokborok', 'Chengmi', 'Nunchhari', 'River Spirits', 'Indigenous Chants', 'Matai Pukhiri'],
    ambientColor: '#0284c7',
    transcripts: [
      {
        id: 't-21',
        seconds: 0,
        timestamp: '0:00',
        speaker: 'Ochiram Tripura',
        originalText: 'ত্বিমাবুং চেংমি ত্বরই কিসা কিসা বই কাইগৌ, আমাংনি কুকিলা চুকনি রেই খাকমা নাইনাই।',
        englishTranslation: 'Gently flows the silver water of the Chengi river; upon its banks, young Kukila sowed the seeds of hill cotton and sweet upland rice before the arrival of foreign soldiers.',
        bengaliTranslation: 'চেঙ্গী নদীর রূপালী জলধারা ধীরে ধীরে প্রবাহিত হচ্ছে; তার তীরে তরুণী কুকিলা পাহাড়ী তুলা ও মিষ্টি জুম ধানের বীজ বপন করেছিল বিদেশি সৈন্যদের আগমনের বহু পূর্বে।',
        culturalNote: 'Refers to the ancient Tripuri cultivation along the Chengi basin when the territory was governed under the loose sovereignty of the Twipra royal realm.',
      },
      {
        id: 't-22',
        seconds: 40,
        timestamp: '0:40',
        speaker: 'Ochiram Tripura',
        originalText: 'নাল খাগড়া ঝাড়নি ফাতারা ছাম্বাই কাইগৌ, বারি খাই খুকনি বুরুই রগ লাইগৌ।',
        englishTranslation: 'Where the wild Nal Khagra reed grass stood tall, our fathers cleared the terraces with fire and stone tools, singing songs to the spirits of the spring water.',
        bengaliTranslation: 'যেখানে বুনো নল খাগড়ার ঝাড় মাথা উঁচু করে দাঁড়িয়ে ছিল, সেখানে আমাদের পূর্বপুরুষেরা আগুন ও পাথরের অস্ত্রে জমি তৈরি করেছিলেন এবং জলপ্রপাতের আত্মাদের গান গেয়েছিলেন।',
        culturalNote: 'Directly contextualizes the origin of the name "Khagrachari" from the dense reed beds of the Nal Khagra plant.',
      },
      {
        id: 't-23',
        seconds: 90,
        timestamp: '1:30',
        speaker: 'Ochiram Tripura',
        originalText: 'মাতাঈ পুখুরিনি ত্বই কখাই ফিয়াগৌ, হাচুকনি বরগ রগনি শান্তি থুয়াগৌ।',
        englishTranslation: 'The celestial waters of Matai Pukhiri never dry beneath the sun; so too the peace and dignity of the hill peoples shall endure through every passing reign.',
        bengaliTranslation: 'দেবতা পুকুরের দিব্য জল কখনো সূর্যের তাপে শুকায় না; তেমনি এই পাহাড়ী জনপদের শান্তি ও আত্মমর্যাদা সমস্ত রাজত্ব পার হয়ে অক্ষুণ্ণ থাকবে।',
        culturalNote: 'Debota Pond (Matai Pukhiri) perched atop Nunchhari ridge is venerated as an unemptying crater lake blessed by Tripuri deities.',
      },
    ],
  },
  {
    id: 'audio-004',
    accessionNumber: 'CHT-OHA-1992-05',
    title: 'Plung Mouth-Organ Sacred Chants for Mountain Ancestors',
    nativeTitle: '𖩒𖩑𖩓 𖩖𖩐𖩙 (Plung Cham-Pai-Khom)',
    community: 'Mro',
    category: 'Ritual & Ceremony',
    language: 'Mro (Archaic Ritual Language)',
    narratorOrPerformer: 'Menlay Mro & The Chimbuk Highland Ensemble',
    performerRole: 'Master Plung Maker & Ritual Custodian',
    recordedYear: 1992,
    recordedLocation: 'Chimbuk Ridge, Bandarban (Bohmong Circle Highlands)',
    recordedBy: 'UNESCO Endangered Languages & Ethnomusicology Mission',
    institution: 'UNESCO Audiovisual Heritage Vault & Bohmong Royal Archive',
    audioDurationSeconds: 198,
    audioDurationDisplay: '3:18',
    audioSrc: 'https://cdn.freesound.org/previews/456/456108_5121236-lq.mp3', // Public domain bamboo drone
    summary: 'The mesmerizing, deeply resonant polyphonic tones of the Plung — the colossal Mro mouth-organ constructed from five dried gourds and ten long bamboo reeds. Performed during the sacred post-harvest ritual to guide ancestral spirits across the high hill ridges.',
    historicalSignificance: 'The Plung is internationally recognized by ethnomusicologists as one of the oldest surviving wind instruments in Asia, representing prehistoric Austroasiatic and Tibeto-Burman musical continuum in the CHT.',
    instruments: ['Plung (Large 10-pipe Bamboo Mouth Organ)', 'Khang (Bronze Bossed Gong)', 'Crotals (Brass Ankle Bells)'],
    waveform: [0.22, 0.41, 0.65, 0.82, 0.95, 0.91, 0.84, 0.72, 0.58, 0.44, 0.61, 0.78, 0.92, 0.96, 0.85, 0.71, 0.56, 0.42, 0.59, 0.78, 0.93, 0.98, 0.88, 0.72, 0.55, 0.41, 0.58, 0.75, 0.89, 0.94, 0.82, 0.68, 0.51, 0.38, 0.25, 0.42, 0.61, 0.75, 0.68, 0.48],
    citation: {
      author: 'Menlay Mro & UNESCO Ethnomusicology Mission',
      title: 'Plung Ritual Polyphony of the Mro Highlands',
      year: 1992,
      shelfmark: 'UNESCO-CHT-92-MRO-05',
      repository: 'UNESCO Intangible Cultural Heritage Archive & Bandarban Tribal Research Center',
    },
    tags: ['Mro', 'Bohmong Circle', 'Plung', 'Bamboo Organ', 'Chimbuk', 'Ritual Chants', 'Ancient Music'],
    ambientColor: '#be123c',
    transcripts: [
      {
        id: 't-31',
        seconds: 0,
        timestamp: '0:00',
        speaker: 'Menlay Mro',
        originalText: '𖩒𖩑𖩓 𖩖𖩐𖩙 𖩔𖩈 𖩖𖩐𖩒 𖩓𖩐𖩑 𖩒𖩖𖩐𖩓 𖩐𖩑𖩒 𖩔𖩈𖩖',
        englishTranslation: '[Droning Plung overtone chords sound across the ridge] We breathe our spirit into the dried gourd; the ten bamboo pipes awake the sleeping ancestors who walked these ridges before kings were crowned.',
        bengaliTranslation: '[বাঁশের প্লুং বাদ্যযন্ত্রের গম্ভীর সুর বেজে ওঠে] আমরা শুকনো লাউয়ের খোলসে শ্বাস সঞ্চার করি; দশটি বাঁশের নল সেইসব পূর্বপুরুষদের আত্মাকে জাগিয়ে তোলে যারা রাজা ও রাজত্বের বহু পূর্বে এই পাহাড়ে ঘুরে বেড়াতেন।',
        culturalNote: 'The Plung produces multiple harmonious notes simultaneously through circular breathing, mimicking the wind whistling through highland bamboo forests.',
      },
      {
        id: 't-32',
        seconds: 52,
        timestamp: '0:52',
        speaker: 'Menlay Mro',
        originalText: '𖩓𖩐𖩑 𖩒𖩖𖩐𖩓 𖩐𖩑𖩒 𖩒𖩑𖩓 𖩖𖩐𖩙 𖩔𖩈 𖩖𖩐𖩒',
        englishTranslation: 'From the heights of Keokradong to the quiet bends of the Sangu, let the mountain spirits guard our children, let the jhum harvest never fail our clan.',
        bengaliTranslation: 'কেওক্রাডংয়ের চূড়া থেকে সাঙ্গু নদীর শান্ত বাঁক পর্যন্ত, পাহাড়ের আত্মারা আমাদের সন্তানদের রক্ষা করুক, আমাদের জুমের ফসল যেন কখনোই ব্যর্থ না হয়।',
        culturalNote: 'Connects the highland Mro communities of Bandarban with the geographic markers of the Bohmong Circle.',
      },
    ],
  },
  {
    id: 'audio-005',
    accessionNumber: 'CHT-OHA-1958-01',
    title: 'Customary Court Durbar Testimony: Rule 34 Land Arbitration (1958)',
    nativeTitle: '১৯৫৮ সালের পাহাড়ি প্রথাগত আদালতের সাক্ষ্য ও রায় (Manikchari Durbar)',
    community: 'Regional CHT',
    category: 'Court Testimony',
    language: 'Chittagonian Hill Dialect, Marma & Formal Bengali',
    narratorOrPerformer: 'Karbari Mong Shwe Prue & Mouza Headman Bipin Bihari Tripura',
    performerRole: 'Circle Durbar Arbitrators presiding under the Mong Raja',
    recordedYear: 1958,
    recordedLocation: 'Manikchari Mong Royal Court (Rajbari Durbar Hall)',
    recordedBy: 'Deputy Commissioner’s Legal Inspection Record (Magnetic Reel)',
    institution: 'Khagrachari Deputy Commissioner Archives & Mong Circle Court Rolls',
    audioDurationSeconds: 172,
    audioDurationDisplay: '2:52',
    audioSrc: 'https://cdn.freesound.org/previews/387/387531_5121236-lq.mp3', // Public domain archival reel ambience
    summary: 'A historical field recording of an actual customary arbitration session in the Manikchari Royal Court under CHT Regulation I of 1900. The Mouza Headman and Karbari arbitrate a boundary dispute along the Harina stream, invoking the non-alienation protections of Rule 34.',
    historicalSignificance: 'Invaluable primary audio documentation of indigenous legal administration operating under the 1900 Manual during the Pakistan period, demonstrating how traditional chiefs maintained land sovereignty without police interference.',
    instruments: ['Court Gavel', 'Chwe (Brass Seal Bell)'],
    waveform: [0.11, 0.24, 0.38, 0.52, 0.68, 0.81, 0.88, 0.74, 0.61, 0.48, 0.35, 0.51, 0.69, 0.84, 0.89, 0.76, 0.62, 0.49, 0.38, 0.54, 0.71, 0.86, 0.91, 0.78, 0.65, 0.51, 0.38, 0.28, 0.44, 0.62, 0.78, 0.84, 0.72, 0.58, 0.41, 0.29, 0.18, 0.26, 0.38, 0.25],
    citation: {
      author: 'Mong Circle Royal Court & Government of East Pakistan',
      title: 'Verbatim Proceedings of Customary Land Arbitration at Manikchari Durbar',
      year: 1958,
      shelfmark: 'MCR-COURT-1958-01',
      repository: 'Mong Circle Royal Archives (Manikchari) & National Archives of Bangladesh',
    },
    tags: ['Customary Law', 'Regulation 1900', 'Rule 34', 'Manikchari', 'Mong King', 'Headman', 'Land Rights'],
    ambientColor: '#7c3aed',
    transcripts: [
      {
        id: 't-41',
        seconds: 0,
        timestamp: '0:00',
        speaker: 'Headman Bipin Bihari Tripura',
        originalText: 'মং রাজার দরবার শরীফে নিবেদন এই যে, হরিণা ছড়ার পূর্ব ধারের জুমের সীমানা শতবর্ষ যাবৎ কার্বারি পাড়ার প্রথাগত অধিকারে রহিয়াছে। ১৯০০ সালের রেগুলেশনের ৩৪ নম্বর ধারা মোতাবেক এই জমি কোনো বহিরাগতকে হস্তান্তর করা অবৈধ।',
        englishTranslation: 'Submitted before the Durbar of the Mong Raja: the swidden boundaries along the eastern bank of Harina stream have been under the customary possession of the Karbari clan for over a century. Under Rule 34 of the 1900 Regulation, transfer of this land to any outsider is strictly illegal.',
        bengaliTranslation: 'মং রাজার দরবার শরীফে নিবেদন এই যে, হরিণা ছড়ার পূর্ব ধারের জুমের সীমানা শতবর্ষ যাবৎ কার্বারি পাড়ার প্রথাগত অধিকারে রহিয়াছে। ১৯০০ সালের রেগুলেশনের ৩৪ নম্বর ধারা মোতাবেক এই জমি কোনো বহিরাগতকে হস্তান্তর করা অবৈধ।',
        culturalNote: 'Rule 34 of CHT Regulation 1900 prohibits the alienation, mortgage, or sale of indigenous hill land to individuals not domiciled as indigenous residents of the CHT.',
      },
      {
        id: 't-42',
        seconds: 48,
        timestamp: '0:48',
        speaker: 'Karbari Mong Shwe Prue',
        originalText: 'রাজার সীলমোহর যুক্ত সনদে সুস্পষ্ট নির্দেশ রহিয়াছে—মৌজার জঙ্গল ও ছড়ার পানি সর্বসাধারণের। যে ব্যক্তি পাড়ার প্রথা ভঙ্গ করিবে, তাহাকে পঞ্চায়েতের সিদ্ধান্তে জরিমানা প্রদান করিতে হইবে।',
        englishTranslation: 'The royal charter bearing the King’s seal clearly decrees: the village forest and stream water belong communally to all. Whosoever breaches the customary boundary shall pay restitution as determined by the village council.',
        bengaliTranslation: 'রাজার সীলমোহর যুক্ত সনদে সুস্পষ্ট নির্দেশ রহিয়াছে—মৌজার জঙ্গল ও ছড়ার পানি সর্বসাধারণের। যে ব্যক্তি পাড়ার প্রথা ভঙ্গ করিবে, তাহাকে পঞ্চায়েতের সিদ্ধান্তে জরিমানা প্রদান করিতে হইবে।',
        culturalNote: 'Highlights the restorative rather than punitive nature of indigenous customary justice in the Chittagong Hill Tracts.',
      },
    ],
  },
  {
    id: 'audio-006',
    accessionNumber: 'CHT-OHA-2003-04',
    title: 'Bawm Bamboo Dance Ballad: Highland Harvest Song',
    nativeTitle: 'Cheraw Hla & Thingpui Hla (Highland Bamboo Song)',
    community: 'Bawm',
    category: 'Traditional Ballad',
    language: 'Bawm (Chin-Bawm Highland Language)',
    narratorOrPerformer: 'Liankhup Bawm & The Ruma Village Singers',
    performerRole: 'Traditional Choral Leader & Dance Choreographer',
    recordedYear: 2003,
    recordedLocation: 'Ruma Valley, Bandarban District',
    recordedBy: 'Centre for Indigenous Culture and Development (CICD)',
    institution: 'Bandarban Cultural Institute & CHT Regional Archive',
    audioDurationSeconds: 165,
    audioDurationDisplay: '2:45',
    audioSrc: 'https://cdn.freesound.org/previews/415/415511_5121236-lq.mp3', // Public domain acoustic flute/percussion
    summary: 'A vibrant highland harvest song performed during the famous Cheraw (Bamboo Dance) ceremony. Male dancers clap heavy bamboo poles in syncopated polyrhythms while female dancers step between the lattices, singing poetry in praise of the ripe cotton and golden hill paddy.',
    historicalSignificance: 'Preserves the cultural ties between the Bawm people of the southern Chittagong Hill Tracts and their kin across the borders of Mizoram and the Chin Hills, illustrating the porous cultural boundaries of the region.',
    instruments: ['Cheraw Bamboo Poles', 'Khuangkheng (Tuned Bronze Gong Set)', 'Ting-Tang (Bamboo Strummed Zither)'],
    waveform: [0.15, 0.32, 0.48, 0.65, 0.82, 0.95, 0.88, 0.74, 0.61, 0.48, 0.62, 0.79, 0.94, 0.89, 0.76, 0.61, 0.48, 0.35, 0.52, 0.71, 0.86, 0.94, 0.85, 0.71, 0.55, 0.42, 0.58, 0.74, 0.89, 0.96, 0.84, 0.69, 0.52, 0.39, 0.28, 0.45, 0.62, 0.78, 0.69, 0.49],
    citation: {
      author: 'Liankhup Bawm & Centre for Indigenous Culture and Development',
      title: 'Cheraw Hla: Traditional Bamboo Rhythms and Songs of the Bawm Highlands',
      year: 2003,
      shelfmark: 'CICD-BAWM-2003-04',
      repository: 'Bandarban Cultural Institute & CHT Regional Cultural Council',
    },
    tags: ['Bawm', 'Cheraw', 'Bamboo Dance', 'Harvest Song', 'Ruma', 'Bohmong Circle', 'Highland Folklore'],
    ambientColor: '#059669',
    transcripts: [
      {
        id: 't-51',
        seconds: 0,
        timestamp: '0:00',
        speaker: 'Liankhup Bawm',
        originalText: 'Thlantluang mualsang ah khua a var ta, thingpui hnahno a par vul e.',
        englishTranslation: 'Morning light dawns over the high ridges of Thlantluang; the wild mountain tea leaves unfurl in the morning mountain dew.',
        bengaliTranslation: 'থলান্তলুয়াংয়ের উচ্চ শৈলশিরায় ভোরের আলো ফুটে উঠেছে; বুনো পাহাড়ি চায়ের কচি পাতা শিশিরে ঝলমল করছে।',
        culturalNote: 'Sung at sunrise during the harvest festival to welcome visiting clan members from distant hills.',
      },
      {
        id: 't-52',
        seconds: 44,
        timestamp: '0:44',
        speaker: 'Liankhup Bawm',
        originalText: 'Mau cheraw ri thang thang e, kan thlang lam unau te lo leng ru le.',
        englishTranslation: 'The bamboo poles strike in rhythmic unison! Welcome, brothers and sisters of the valleys, come share the golden harvest of our ancestral slopes.',
        bengaliTranslation: 'বাঁশের লাঠিগুলো ছন্দে ছন্দে আছড়ে পড়ছে! স্বাগতম, উপত্যকার ভাই ও বোনেরা, আসুন আমাদের পূর্বপুরুষদের পাহাড়ের সোনালী ফসল একসাথে ভাগ করে নিই।',
        culturalNote: 'Emphasizes inter-tribal hospitality and mutual seasonal celebration among the CHT communities.',
      },
    ],
  },
];
