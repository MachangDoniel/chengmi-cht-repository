import { TimelineEvent } from '../types';

export const TIMELINE_EVENTS: TimelineEvent[] = [
  // ==========================================
  // ANCIENT & PRE-COLONIAL ERA (PRE-1760)
  // ==========================================
  {
    id: 'tl-001',
    year: 650,
    yearDisplay: 'c. 650 – 1400 CE',
    title: 'Ancient Settlements & Tarak Realm (Northern Hills)',
    localNameOrAlias: 'Tarak / Chengmi Basin',
    circle: 'mong',
    era: 'Ancient & Pre-Colonial',
    category: 'Chiefdoms & Monarchy',
    primaryLocation: 'Chengi Valley & Northern Hills (Khagrachari)',
    summary:
      'Indigenous Tripuri, early Marma, and Kuki-Chin clans inhabit the fertile Chengi and Maini river basins. The region is historically identified in early indigenous oral epics by the ancient name "Tarak", and in local Kokborok and regional dialects as "Chengmi" (referencing the Chengi river waters).',
    historicalSignificance:
      'Establishes that Khagrachari was a recognized historical entity with customary tribal governance long before colonial intrusion.',
    references: [
      {
        sourceType: 'Oral History',
        authorOrBody: 'Tripura Cultural Institute & Mong Royal Archives',
        title: 'Oral Epics and Place-Names of the Northern Hill Tracts',
        year: '1984',
        shelfmarkOrCallNumber: 'TCI-KHA-MS-04',
        pageOrFolio: 'pp. 12-19',
      },
      {
        sourceType: 'Academic Journal',
        authorOrBody: 'Dr. Suniti Bhushan Qanungo',
        title: 'A History of Chittagong: Pre-Colonial Borderlands',
        year: '1988',
        shelfmarkOrCallNumber: 'ISBN 984-05-1048-2',
        pageOrFolio: 'Ch. 3, pp. 67-82',
      },
    ],
  },
  {
    id: 'tl-chk-001',
    year: 1250,
    yearDisplay: 'c. 1250 – 1350 CE',
    title: 'Prince Bijoy Giri & the Foundation of the Chakma Realm',
    localNameOrAlias: 'Champakanagar Expedition to Karnaphuli',
    circle: 'chakma',
    era: 'Ancient & Pre-Colonial',
    category: 'Chiefdoms & Monarchy',
    primaryLocation: 'Karnaphuli River Basin (Rangamati)',
    summary:
      'According to classical Chakma palm-leaf chronicles (*The Bijak*), Prince Bijoy Giri of Champakanagar leads a southward military and settler expedition across the hills into the Karnaphuli river valley, establishing a fortified sovereign principality that successfully negotiates borders with the kingdoms of Arakan and Tripura.',
    historicalSignificance:
      'The foundational Genesis event of the Chakma royal chiefdom in the central Chittagong Hill Tracts.',
    references: [
      {
        sourceType: 'British Library IOR',
        authorOrBody: 'Lewin, Thomas Herbert',
        title: 'The Hill Tracts of Chittagong and the Dwellers Therein',
        year: 1869,
        shelfmarkOrCallNumber: 'IOR/V/27/64/1',
        pageOrFolio: 'pp. 62–74',
      },
      {
        sourceType: 'Oral History',
        authorOrBody: 'Chakma Royal Council',
        title: 'The Radhamon-Dhanapati & Bijoy Giri Chronicles',
        year: 1974,
        shelfmarkOrCallNumber: 'CR-MS-1250-B',
        pageOrFolio: 'Section 1',
      },
    ],
  },
  {
    id: 'tl-boh-001',
    year: 1599,
    yearDisplay: '1599 CE',
    title: 'Pegu Dynastic Genesis: Bestowal of the Title "Bohmong"',
    localNameOrAlias: 'Prince Maha Theingathu Royal Investiture',
    circle: 'bohmong',
    era: 'Ancient & Pre-Colonial',
    category: 'Chiefdoms & Monarchy',
    primaryLocation: 'Sangu River Valley (Bandarban)',
    summary:
      'Following the 1599 military conquest of Pegu (Hanthawaddy, lower Burma) by King Min Razagyi of Arakan, royal prince Maha Theingathu of the Taungoo-Pegu dynasty is granted governorship of the northern Chittagong defense frontier. King Min Razagyi confers upon him the hereditary title "Bohmong Raza" (Burmese: Supreme Commander / Military Lord), establishing the southern chiefdom along the upper Sangu (Rigray Khyoung) river.',
    historicalSignificance:
      'Establishes the royal Burmese/Arakanese aristocratic lineage that has uninterruptedly governed the Bohmong Circle for over 400 years.',
    references: [
      {
        sourceType: 'Academic Journal',
        authorOrBody: 'Phayre, Sir Arthur P.',
        title: 'History of Burma: The Taungoo and Arakanese Dynasties',
        year: 1883,
        shelfmarkOrCallNumber: 'BL-954.91-PHA',
        pageOrFolio: 'pp. 119–128',
      },
      {
        sourceType: 'Colonial Gazette',
        authorOrBody: 'O’Malley, L. S. S.',
        title: 'Eastern Bengal District Gazetteers: Chittagong Hill Tracts',
        year: 1908,
        shelfmarkOrCallNumber: 'IOR/V/27/65/54',
        pageOrFolio: 'pp. 41–48',
      },
    ],
  },
  {
    id: 'tl-chk-002',
    year: 1715,
    yearDisplay: '1715 CE',
    title: 'Raja Jalal Khan & Mughal Tribute Treaty',
    localNameOrAlias: 'Farrukhsiyar Cotton Sanad',
    circle: 'chakma',
    era: 'Ancient & Pre-Colonial',
    category: 'Boundary & Treaties',
    primaryLocation: 'Rajanagar & Chittagong Borders',
    summary:
      'Chakma King Raja Jalal Khan concludes an agreement with Mughal Subahdar Farrukhsiyar in Dhaka to pay an annual tribute of raw cotton (*Karpas*) in exchange for unhindered trade between the hill people and the plains merchants of Bengal.',
    historicalSignificance:
      'Established the legal precedent that the hills were an autonomous tributary territory rather than directly administered revenue land.',
    references: [
      {
        sourceType: 'National Archives',
        authorOrBody: 'Mughal Imperial Revenue Records / Bengal Board of Revenue',
        title: 'Sanad of Cotton Tribute: Chittagong Frontier',
        year: 1715,
        shelfmarkOrCallNumber: 'IOR/P/67/12',
        pageOrFolio: 'Record 88b',
      },
    ],
  },
  {
    id: 'tl-002',
    year: 1724,
    yearDisplay: '1724 CE',
    title: 'Codification of the "Karpas Mahal" (Cotton Estate)',
    localNameOrAlias: 'Karpas Mahal Frontier Tax Tract',
    circle: 'all',
    era: 'Ancient & Pre-Colonial',
    category: 'Boundary & Treaties',
    primaryLocation: 'Chittagong-Hill Borderlands',
    summary:
      'Mughal authorities under the Subahdar of Bengal formalize the revenue tract known as "Karpas Mahal". Hill chieftains agree to deliver raw hill cotton at frontier markets rather than submitting land taxes, formally establishing the hills as an autonomous buffer realm.',
    historicalSignificance:
      'Codified the administrative separation between the alluvial plains of Bengal and the hill tracts.',
    references: [
      {
        sourceType: 'National Archives',
        authorOrBody: 'Board of Revenue, Bengal Presidency',
        title: 'Proceedings of the Governor-General in Council: Revenue Department, Vol. XII',
        year: 1772,
        shelfmarkOrCallNumber: 'IOR/P/67/41',
        pageOrFolio: 'Folio 114b-118a',
      },
    ],
  },

  // ==========================================
  // BRITISH COLONIAL PERIOD (1760–1947)
  // ==========================================
  {
    id: 'tl-003',
    year: 1760,
    yearDisplay: '1760 CE',
    title: 'British East India Company Acquires Chittagong',
    localNameOrAlias: 'Mir Qasim Cession Treaty',
    circle: 'all',
    era: 'British Colonial Period',
    category: 'Colonial Administration',
    primaryLocation: 'Chittagong Port & Foothills',
    summary:
      'Nawab Mir Qasim of Bengal cedes the revenue rights of the district of Chittagong to the British East India Company. The British inherit the Karpas Mahal tribute system and soon attempt to extract increased cash taxes from the hill tribes.',
    historicalSignificance:
      'Marked the beginning of British colonial commercial and political encounters with the Chittagong Hill Tracts.',
    references: [
      {
        sourceType: 'Treaty Instrument',
        authorOrBody: 'East India Company & Nawab of Bengal',
        title: 'Treaty of Cession of Burdwan, Midnapore, and Chittagong',
        year: 1760,
        shelfmarkOrCallNumber: 'IOR/L/L/2/18',
        pageOrFolio: 'Treaty Series 1760-A',
      },
    ],
  },
  {
    id: 'tl-chk-003',
    year: 1776,
    yearDisplay: '1776–1787 CE',
    title: 'The Chakma Resistance War & General Ranu Khan',
    localNameOrAlias: 'The 11-Year Guerrilla War of the Hills',
    circle: 'chakma',
    era: 'British Colonial Period',
    category: 'Rebellion & Struggle',
    primaryLocation: 'Karnaphuli Gorge, Rangunia & Matamuhuri Valley',
    summary:
      'When the British East India Company attempts to enforce commercial monopolies and double the cotton tax, Chakma King Raja Sher Daulat Khan and supreme commander Ranu Khan launch a fierce 11-year guerrilla campaign. Hill warriors block river gorges, ambushing Company troop detachments and defeating successive punitive expeditions sent from Chittagong.',
    historicalSignificance:
      'Proved that the British could not subjugate the hills through military force, forcing the British Governor-General to seek diplomatic terms.',
    references: [
      {
        sourceType: 'British Library IOR',
        authorOrBody: 'Hutchinson, R. H. Sneyd',
        title: 'Eastern Bengal and Assam District Gazetteers: Chittagong Hill Tracts',
        year: 1906,
        shelfmarkOrCallNumber: 'IOR/V/27/65/53',
        pageOrFolio: 'pp. 21–25',
      },
    ],
  },
  {
    id: 'tl-004',
    year: 1782,
    yearDisplay: '1782 CE',
    title: 'Founding of the Northern Chieftaincy by Chieftain Mrachai',
    localNameOrAlias: 'Arrival of Mrachai & Ramgarh Settlement',
    circle: 'mong',
    era: 'British Colonial Period',
    category: 'Chiefdoms & Monarchy',
    primaryLocation: 'Ramgarh & Manikchari (Khagrachari)',
    summary:
      'Following the Burmese conquest of Mrauk U (Arakan) by King Bodawpaya, thousands of Marma refugees seek sanctuary across the frontier. Marma Chieftain Mrachai leads his royal clan into the northern hills, negotiating settlement around Ramgarh and along the Chengi basin, establishing the dynasty that would become the Mong Circle.',
    historicalSignificance:
      'The foundational arrival of the Marma royal house in Khagrachari, intertwining with existing indigenous Tipra communities.',
    references: [
      {
        sourceType: 'Circle Chief Record',
        authorOrBody: 'Manikchari Rajbari Court',
        title: 'Genealogical Record of Chieftain Mrachai and the Royal Household of the Northern Circle',
        year: 1883,
        shelfmarkOrCallNumber: 'MCRA-REC-1782-A',
        pageOrFolio: 'Palm-leaf folio 1–4',
      },
    ],
  },
  {
    id: 'tl-chk-004',
    year: 1787,
    yearDisplay: '1787 CE',
    title: 'The 1787 Calcutta Peace Treaty: Raja Jan Bakhsh Khan',
    localNameOrAlias: 'Settlement of the Karpas Mahal',
    circle: 'chakma',
    era: 'British Colonial Period',
    category: 'Boundary & Treaties',
    primaryLocation: 'Fort William (Calcutta) & Rangamati',
    summary:
      'Chakma King Raja Jan Bakhsh Khan travels to Calcutta to meet Governor-General Lord Cornwallis. They conclude the historic 1787 Peace Treaty: the British recognize the Chakma King\'s sovereign internal jurisdiction over the hills in exchange for a fixed annual cotton tribute (500 maunds).',
    historicalSignificance:
      'Preserved the internal political autonomy of the Chakma Circle under British suzerainty.',
    references: [
      {
        sourceType: 'Treaty Instrument',
        authorOrBody: 'Governor-General in Council & Raja Jan Bakhsh Khan',
        title: 'Treaty of Peace between the East India Company and the Chakma Raja',
        year: 1787,
        shelfmarkOrCallNumber: 'IOR/P/67/48',
        pageOrFolio: 'Consultations 28th May 1787',
      },
    ],
  },
  {
    id: 'tl-boh-002',
    year: 1805,
    yearDisplay: 'c. 1805 CE',
    title: 'Bohmong Kong Hla Prue Consolidates Bandarban',
    localNameOrAlias: 'Establishment of Bandarban Capital',
    circle: 'bohmong',
    era: 'British Colonial Period',
    category: 'Chiefdoms & Monarchy',
    primaryLocation: 'Bandarban Town & Sangu River Valley',
    summary:
      'Bohmong Raja Kong Hla Prue consolidates traditional chieftaincy authority across the Sangu and Matamuhuri valleys, providing sanctuary to tens of thousands of Marma, Mro, and Bawm families fleeing Burmese warfare in Arakan and formalizing Bandarban town as the permanent royal capital.',
    historicalSignificance:
      'Turned Bandarban into the central sanctuary and Buddhist cultural center of the southern hills.',
    references: [
      {
        sourceType: 'British Library IOR',
        authorOrBody: 'Hunter, Sir William Wilson',
        title: 'A Statistical Account of Bengal: Chittagong Hill Tracts',
        year: 1876,
        shelfmarkOrCallNumber: 'IOR/V/27/64/6',
        pageOrFolio: 'pp. 48–55',
      },
    ],
  },
  {
    id: 'tl-chk-005',
    year: 1832,
    yearDisplay: '1832–1873 CE',
    title: 'The Sovereign 41-Year Reign of Queen Monarch Rani Kalindi',
    localNameOrAlias: 'Golden Age of Chakma Resistance & Codification',
    circle: 'chakma',
    era: 'British Colonial Period',
    category: 'Chiefdoms & Monarchy',
    primaryLocation: 'Rajanagar & Chittagong Hill Tracts',
    summary:
      'Following the death of Raja Dharam Bakhsh Khan, his widow Queen Rani Kalindi ascends the throne and reigns as supreme monarch for 41 remarkable years. She fiercely resists British attempts to introduce direct civil courts and Christian missionaries, protects customary land tenure, revives pure Theravada Buddhism by bringing Sangharaja Saramedha Mahathero from Arakan, and constructs the great Mahamuni Rajvihara.',
    historicalSignificance:
      'A legendary era of female indigenous sovereignty that defended Chakma legal autonomy and codified customary laws against colonial aggression.',
    references: [
      {
        sourceType: 'Colonial Gazette',
        authorOrBody: 'Hunter, W. W.',
        title: 'Statistical Account of Bengal, Vol. VI: The Chieftaincy of Rani Kalindi',
        year: 1876,
        shelfmarkOrCallNumber: 'IOR/V/27/64/6',
        pageOrFolio: 'pp. 22–38',
      },
    ],
  },
  {
    id: 'tl-005',
    year: 1860,
    yearDisplay: '1860 CE',
    title: 'Act XXII of 1860: Creation of CHT & Initial "Mun Circle" Classification',
    localNameOrAlias: 'Excluded Area Genesis & The "Mun Circle"',
    circle: 'mong',
    isMunToMongTransition: true,
    era: 'British Colonial Period',
    category: 'Colonial Administration',
    primaryLocation: 'Ramgarh & Northern Hills (Khagrachari)',
    summary:
      'The British Crown enacts Act XXII of 1860, formally separating the Hill Tracts from the Regulation district of Chittagong. In the initial surveys and district mapping, the northern hill region is designated as the "Mun Circle" (acknowledging the indigenous Tipra/Tripuri communities and their dialectal identifier). Ramgarh is established as the principal administrative headquarters of the northern subdivision.',
    historicalSignificance:
      'HISTORICAL VALIDATION: Officially documented the northern region as "Mun Circle" under British law, demonstrating that the area was initially identified with its indigenous Tripuri inhabitants.',
    references: [
      {
        sourceType: 'Colonial Gazette',
        authorOrBody: 'Governor-General of India in Council',
        title: 'Act No. XXII of 1860: An Act to remove certain tracts on the Eastern frontier of Chittagong from the jurisdiction of the Civil and Criminal Courts',
        year: 1860,
        shelfmarkOrCallNumber: 'ACT-XXII-1860',
        pageOrFolio: 'Sections 1–5, Sched. Boundaries',
      },
    ],
  },
  {
    id: 'tl-006',
    year: 1881,
    yearDisplay: '1881–1884 CE',
    title: 'The Great Bypass: Delineation of Mong Circle under Kyaja Sain Chowdhury',
    localNameOrAlias: 'Transition from "Mun Circle" to "Mong Circle"',
    circle: 'mong',
    isMunToMongTransition: true,
    era: 'British Colonial Period',
    category: 'Boundary & Treaties',
    primaryLocation: 'Manikchari Rajbari & Ramgarh',
    summary:
      'To prevent the Maharaja of Tripura from exerting territorial taxation claims over the northern hills, Bengal Secretary Sir Alexander Mackenzie formally delineates the three permanent revenue circles in 1881–1884. British administrators decisively bypass the Tripura clan heads and elevate Marma Chieftain Kyaja Sain Chowdhury at Manikchari, officially changing the circle name from "Mun Circle" to "Mong Circle" (derived from the Marma/Burmese royal title). Manikchari Palace is confirmed as the judicial and revenue seat.',
    historicalSignificance:
      'HISTORICAL VALIDATION: The defining administrative transition that transferred customary authority over the northern CHT from Tripuri rulers to the Marma Mong King.',
    references: [
      {
        sourceType: 'British Library IOR',
        authorOrBody: 'Mackenzie, Sir Alexander',
        title: 'History of the Relations of the Government with the Hill Tribes of the North-East Frontier of Bengal',
        year: 1884,
        shelfmarkOrCallNumber: 'IOR/L/PJ/6/112',
        pageOrFolio: 'pp. 331–348',
      },
      {
        sourceType: 'Colonial Gazette',
        authorOrBody: 'Bengal Secretariat Press',
        title: 'Demarcation Report on the Tripartite Revenue Circles of CHT',
        year: 1884,
        shelfmarkOrCallNumber: 'CAL-REV-1884-CIRCLES',
        pageOrFolio: 'Vol. IV, pp. 88–96',
      },
    ],
  },
  {
    id: 'tl-boh-003',
    year: 1881,
    yearDisplay: '1881 CE',
    title: 'Formal Delimitation of the Southern Bohmong Circle',
    localNameOrAlias: 'Bohmong Maung Pru Boundary Charter',
    circle: 'bohmong',
    era: 'British Colonial Period',
    category: 'Boundary & Treaties',
    primaryLocation: 'Bandarban Rajbari & Sangu Basin',
    summary:
      'Under the 1881 circle reorganization, Bohmong King Raja Maung Pru is formally recognized by the British Crown as the hereditary ruler of the southern circle (Bohmong Circle). The borders encompassing Bandarban and the Matamuhuri valleys are permanently surveyed.',
    historicalSignificance:
      'Formally demarcated the Southern Bohmong Circle, confirming the King\'s exclusive right to customary tax collection.',
    references: [
      {
        sourceType: 'Colonial Gazette',
        authorOrBody: 'Government of Bengal',
        title: 'Report on the Internal Administration of the Chittagong Hill Tracts',
        year: 1882,
        shelfmarkOrCallNumber: 'IOR/V/27/65/12',
        pageOrFolio: 'pp. 14–22',
      },
    ],
  },
  {
    id: 'tl-chk-006',
    year: 1881,
    yearDisplay: '1881 CE',
    title: 'Raja Harish Chandra & Demarcation of the Chakma Circle',
    localNameOrAlias: 'Establishment of Rangamati Palace',
    circle: 'chakma',
    era: 'British Colonial Period',
    category: 'Colonial Administration',
    primaryLocation: 'Rangamati Sadar & Karnaphuli',
    summary:
      'Following the death of Rani Kalindi, her grandson Raja Harish Chandra is confirmed as Circle Chief during the 1881 territorial survey. The capital of the Chakma kingdom is permanently shifted from Rajanagar to Rangamati on the banks of the Karnaphuli river.',
    historicalSignificance:
      'Established Rangamati as the permanent royal and administrative heart of the central Chittagong Hill Tracts.',
    references: [
      {
        sourceType: 'Colonial Gazette',
        authorOrBody: 'Bengal Secretariat Press',
        title: 'Administrative Notification: Chakma Royal Seat Relocation',
        year: 1881,
        shelfmarkOrCallNumber: 'CAL-GAZ-1881-CHAKMA',
        pageOrFolio: 'pp. 102–105',
      },
    ],
  },
  {
    id: 'tl-007',
    year: 1900,
    yearDisplay: '1900 CE',
    title: 'The CHT Manual (Regulation I of 1900): Statutory Autonomy',
    localNameOrAlias: 'Regulation I of 1900 / CHT Manual',
    circle: 'all',
    era: 'British Colonial Period',
    category: 'Colonial Administration',
    primaryLocation: 'All 3 Circles (Mong, Chakma, Bohmong)',
    summary:
      'Lord Curzon\'s administration passes the historic Chittagong Hill Tracts Regulation (Regulation I of 1900). The regulation grants statutory self-governance: lands cannot be transferred to non-indigenous plainsmen; the three Kings (Mong, Chakma, Bohmong) exercise judicial authority over tribal customary civil law; and village headmen (mouza chiefs) manage local revenues.',
    historicalSignificance:
      'The foundational "Magna Carta" of indigenous rights in the Chittagong Hill Tracts, maintaining validity under Bangladesh law today.',
    references: [
      {
        sourceType: 'Treaty Instrument',
        authorOrBody: 'Government of Bengal',
        title: 'The Chittagong Hill Tracts Regulation, 1900 (Bengal Act I of 1900)',
        year: 1900,
        shelfmarkOrCallNumber: 'REG-I-1900-MANUAL',
        pageOrFolio: 'Complete Rules 1–58',
      },
    ],
  },
  {
    id: 'tl-boh-004',
    year: 1910,
    yearDisplay: '1910–Present',
    title: 'The Annual Raj Punyah Festival of the Bohmong King',
    localNameOrAlias: 'Bandarban Royal Revenue Durbar',
    circle: 'bohmong',
    era: 'British Colonial Period',
    category: 'Chiefdoms & Monarchy',
    primaryLocation: 'Bohmong Rajbari (Bandarban Sadar)',
    summary:
      'The traditional *Raj Punyah* festival is codified into an annual 3-day royal durbar. Hundreds of mouza headmen and karbaris across Bandarban gather in traditional Marma, Mro, and Bawm costumes to pay customary tax tributes to the Bohmong King, accompanied by classical Buddhist music and dance.',
    historicalSignificance:
      'Preserves one of the last living traditional indigenous royal durbars in South Asia.',
    references: [
      {
        sourceType: 'Academic Journal',
        authorOrBody: 'Bhattacharjee, S. B.',
        title: 'Customary Kingship and the Raj Punyah in Bandarban',
        year: 2002,
        shelfmarkOrCallNumber: 'CHTR-VOL-4',
        pageOrFolio: 'pp. 44–61',
      },
    ],
  },

  // ==========================================
  // PAKISTAN PERIOD (1947–1971)
  // ==========================================
  {
    id: 'tl-008',
    year: 1947,
    yearDisplay: 'August 1947',
    title: 'The Radcliffe Boundary Award & CHT Dislocation',
    localNameOrAlias: 'Partition of Bengal / The Radcliffe Line',
    circle: 'all',
    era: 'Pakistan Period',
    category: 'Boundary & Treaties',
    primaryLocation: 'Ramgarh Border & All 3 Circles',
    summary:
      'Despite the Chittagong Hill Tracts possessing a 97.5% non-Muslim indigenous majority whose leaders campaigned for union with India or an independent status, Sir Cyril Radcliffe awards the entire CHT to East Pakistan to provide an economic hinterland and hydroelectric basin for the port of Chittagong.',
    historicalSignificance:
      'Severed traditional social and economic ties between Khagrachari and neighboring Tripura, turning the Feni River at Ramgarh into a militarized international border.',
    references: [
      {
        sourceType: 'Colonial Gazette',
        authorOrBody: 'Boundary Commission (Radcliffe)',
        title: 'Report of the Bengal Boundary Commission, Award Relating to CHT',
        year: 1947,
        shelfmarkOrCallNumber: 'IOR/L/PJ/7/12501',
        pageOrFolio: 'Paras 8–11',
      },
    ],
  },
  {
    id: 'tl-chk-007',
    year: 1960,
    yearDisplay: '1960–1962 CE',
    title: 'The Kaptai Dam Catastrophe (Bara Parang / The Great Exodus)',
    localNameOrAlias: 'Bara Parang / Karnaphuli Hydroelectric Flooding',
    circle: 'chakma',
    era: 'Pakistan Period',
    category: 'Rebellion & Struggle',
    primaryLocation: 'Karnaphuli Basin & Old Rangamati Palace',
    summary:
      'The Pakistan government constructs the Kaptai Hydroelectric Dam without indigenous consultation or compensation. The reservoir floods 54,000 acres of prime arable land (40% of the entire district\'s cultivation) and submerges the historic Chakma Royal Palace in Old Rangamati. Over 100,000 Chakmas are displaced; more than 40,000 are forced to flee to India as permanent refugees (*Bara Parang*).',
    historicalSignificance:
      'The defining demographic catastrophe in modern CHT history, igniting the modern Jumma political consciousness and armed resistance movements.',
    references: [
      {
        sourceType: 'Academic Journal',
        authorOrBody: 'Sopher, David E.',
        title: 'Population Dislocation in the Chittagong Hills',
        year: 1963,
        shelfmarkOrCallNumber: 'GEO-REV-1963-337',
        pageOrFolio: 'Geographical Review, Vol. 53, No. 3, pp. 337–362',
      },
    ],
  },

  // ==========================================
  // LIBERATION & BANGLADESH ERA (1971–1983)
  // ==========================================
  {
    id: 'tl-009',
    year: 1971,
    yearDisplay: 'March – Dec 1971',
    title: '1971 Bangladesh Liberation War: Ramgarh Sector 1 Command',
    localNameOrAlias: 'The Ramgarh Lifeline & Freedom Gateway',
    circle: 'mong',
    era: 'Liberation & Bangladesh',
    category: 'Rebellion & Struggle',
    primaryLocation: 'Ramgarh Border Post & Feni River (Khagrachari)',
    summary:
      'During the 1971 Bangladesh Liberation War, Ramgarh serves as the operational headquarters of Sector 1 under Major Rafiqul Islam. The town becomes a vital lifeline across the Feni river to Tripura, providing safe passage for hundreds of thousands of refugees and freedom fighters (*Mukti Bahini*).',
    historicalSignificance:
      'Anchored Khagrachari\'s pivotal contribution to the independence of Bangladesh.',
    references: [
      {
        sourceType: 'National Archives',
        authorOrBody: 'Ministry of Liberation War Affairs',
        title: 'History of the War of Liberation: Sector 1 (Chittagong & Ramgarh Operations)',
        year: 1982,
        shelfmarkOrCallNumber: 'BD-LWA-1971-SEC1',
        pageOrFolio: 'Ch. 2, pp. 112–145',
      },
    ],
  },
  {
    id: 'tl-chk-008',
    year: 1972,
    yearDisplay: 'Feb 1972',
    title: 'M.N. Larma & The Four-Point Jumma Autonomy Deputation',
    localNameOrAlias: 'Founding of PCJSS & Jumma Nationality',
    circle: 'chakma',
    era: 'Liberation & Bangladesh',
    category: 'Rebellion & Struggle',
    primaryLocation: 'Dhaka Parliament & Rangamati',
    summary:
      'Indigenous parliamentarian Manabendra Narayan Larma (M.N. Larma) leads an all-party CHT delegation to Prime Minister Sheikh Mujibur Rahman, demanding constitutional recognition of indigenous distinctiveness, regional autonomy under Regulation 1900, retention of the Chiefs\' courts, and prohibition of outside settlement. The rejection of these demands leads to the founding of PCJSS.',
    historicalSignificance:
      'Formulated modern Jumma political identity and initiated the 25-year struggle for constitutional rights.',
    references: [
      {
        sourceType: 'National Archives',
        authorOrBody: 'PCJSS & Constituent Assembly of Bangladesh',
        title: 'Memorandum of the Chittagong Hill Tracts Peoples Deputation to Bangabandhu',
        year: 1972,
        shelfmarkOrCallNumber: 'CAB-MEMO-FEB-1972',
        pageOrFolio: 'pp. 1–8',
      },
    ],
  },
  {
    id: 'tl-boh-005',
    year: 1981,
    yearDisplay: '1981 CE',
    title: 'Creation of Bandarban Hill District',
    localNameOrAlias: 'Elevation of the Bohmong Realm to Zila Status',
    circle: 'bohmong',
    era: 'Liberation & Bangladesh',
    category: 'Modern Upgrades',
    primaryLocation: 'Bandarban Sadar',
    summary:
      'The Government of Bangladesh elevates Bandarban from a subdivision into a full administrative district (Hill District). Bohmong Raja Maung Shwe Prue Chowdhury guides the integration of customary mouza headmen with the new civil district magistracy.',
    historicalSignificance:
      'Broke the unitary CHT district into specialized hill district administrative units.',
    references: [
      {
        sourceType: 'Colonial Gazette',
        authorOrBody: 'Government of Bangladesh',
        title: 'Cabinet Division Gazette: Bandarban District Upgradation',
        year: 1981,
        shelfmarkOrCallNumber: 'BD-GAZ-OCT-1981',
        pageOrFolio: 'pp. 5110–5112',
      },
    ],
  },
  {
    id: 'tl-010',
    year: 1983,
    yearDisplay: 'Nov 7, 1983',
    title: 'Elevation of Khagrachari to Full District Status',
    localNameOrAlias: 'S.R.O. 441-L/83 / Khagrachari Zila Inauguration',
    circle: 'mong',
    era: 'Liberation & Bangladesh',
    category: 'Modern Upgrades',
    primaryLocation: 'Khagrachari Sadar (Chengi Riverbank)',
    summary:
      'The administrative headquarters of the northern subdivision are officially relocated from Ramgarh to Khagrachari Sadar along the Chengi River. Under Gazette Notification S.R.O. 441-L/83, Khagrachari is elevated to a full district (zila), encompassing all 9 northern upazilas.',
    historicalSignificance:
      'Marked the transition from the colonial "Ramgarh Subdivision" to the modern "Khagrachari Hill District", cementing Chengmi as the civic capital.',
    references: [
      {
        sourceType: 'Colonial Gazette',
        authorOrBody: 'Government of Bangladesh, Ministry of Law and Land Reforms',
        title: 'Establishment of Khagrachhari District, Bangladesh Gazette Extraordinary',
        year: 1983,
        shelfmarkOrCallNumber: 'S.R.O. 441-L/83',
        pageOrFolio: 'pp. 6421–6424',
      },
    ],
  },

  // ==========================================
  // CONTEMPORARY CHT ERA (1997–PRESENT)
  // ==========================================
  {
    id: 'tl-011',
    year: 1997,
    yearDisplay: 'Dec 2, 1997',
    title: 'The Historic CHT Peace Accord & Regional Council',
    localNameOrAlias: 'Chittagong Hill Tracts Peace Accord',
    circle: 'all',
    era: 'Contemporary CHT',
    category: 'Boundary & Treaties',
    primaryLocation: 'Dhaka & All 3 Circle Seats',
    summary:
      'The Government of Bangladesh and the PCJSS sign the landmark CHT Peace Accord, ending over two decades of armed conflict. The treaty establishes the CHT Regional Council in Rangamati, strengthens the three Hill District Councils (Khagrachari, Rangamati, Bandarban), and re-affirms the customary legal authority of the three Kings (Mong, Chakma, Bohmong).',
    historicalSignificance:
      'Recognized the CHT as a tribal-inhabited special region with unique customary administrative status.',
    references: [
      {
        sourceType: 'Treaty Instrument',
        authorOrBody: 'National Committee on CHT Affairs & PCJSS',
        title: 'Chittagong Hill Tracts Peace Accord, 1997',
        year: 1997,
        shelfmarkOrCallNumber: 'BD-CHT-PA-1997',
        pageOrFolio: 'Clauses A, B, C, D',
      },
    ],
  },
  {
    id: 'tl-chk-009',
    year: 2004,
    yearDisplay: '2004–Present',
    title: 'Raja Barrister Devasish Roy & International Indigenous Jurisprudence',
    localNameOrAlias: 'UNPFII & Indigenous Land Advocacy',
    circle: 'chakma',
    era: 'Contemporary CHT',
    category: 'Chiefdoms & Monarchy',
    primaryLocation: 'Rangamati Sadar & United Nations (Geneva / New York)',
    summary:
      '51st Chakma Raja Barrister Devasish Roy serves as a member of the United Nations Permanent Forum on Indigenous Issues (UNPFII). He publishes seminal scholarly works defending customary tenure, codifying customary family and inheritance laws, and arbitrating hundreds of land disputes across the central circle.',
    historicalSignificance:
      'Brought international legal prominence to the customary institutions of the Chittagong Hill Tracts.',
    references: [
      {
        sourceType: 'Academic Journal',
        authorOrBody: 'Roy, Raja Devasish',
        title: 'Traditional Customary Laws and Indigenous Peoples’ Rights in the CHT',
        year: 2004,
        shelfmarkOrCallNumber: 'ILO-IP-2004-DR',
        pageOrFolio: 'International Labour Organization (ILO) Report',
      },
    ],
  },
  {
    id: 'tl-boh-006',
    year: 2013,
    yearDisplay: '2013–Present',
    title: 'Enthronement of 17th Bohmong King U Chaw Prue',
    localNameOrAlias: 'Royal Theravada Coronation at Bandarban Rajbari',
    circle: 'bohmong',
    era: 'Contemporary CHT',
    category: 'Chiefdoms & Monarchy',
    primaryLocation: 'Bandarban Rajbari & Buddha Dhatu Jadi',
    summary:
      'Following traditional Theravada Buddhist royal rituals, Raja U Chaw Prue is enthroned as the 17th Bohmong King. He presides over the annual Raj Punyah assemblies, customary judicial arbitration, and cultural preservation for Bandarban\'s diverse Jumma communities.',
    historicalSignificance:
      'Continues the unbroken 400-year dynastic continuity of the southern chiefdom.',
    references: [
      {
        sourceType: 'National Archives',
        authorOrBody: 'Ministry of Chittagong Hill Tracts Affairs',
        title: 'Official Notification of the Enthronement of the 17th Bohmong King',
        year: 2013,
        shelfmarkOrCallNumber: 'MOCHTA-BOH-2013',
        pageOrFolio: 'Gazette 2013',
      },
    ],
  },
  {
    id: 'tl-012',
    year: 2026,
    yearDisplay: 'Contemporary Era (Present)',
    title: 'Living Customary Jurisprudence of Raja Saching Prue Chowdhury',
    localNameOrAlias: 'Contemporary Mong King Traditional Justice',
    circle: 'mong',
    era: 'Contemporary CHT',
    category: 'Chiefdoms & Monarchy',
    primaryLocation: 'Manikchari Rajbari & Khagrachari Town',
    summary:
      'The reigning Mong King, Raja Saching Prue Chowdhury, exercises customary judicial authority under the CHT Regulation 1900, arbitrating customary disputes, confirming mouza headmen, issuing permanent resident certificates, and safeguarding indigenous Marma, Tripuri, and Chakma cultural traditions.',
    historicalSignificance:
      'Demonstrates the resilience and uninterrupted continuity of Khagrachari\'s customary chiefdom system into the 21st century.',
    references: [
      {
        sourceType: 'Circle Chief Record',
        authorOrBody: 'Office of the Mong Circle Chief',
        title: 'Annual Customary Arbitration and Mouza Administration Report',
        year: 2024,
        shelfmarkOrCallNumber: 'MC-ADM-2024-REP',
        pageOrFolio: 'Sections 1–6',
      },
    ],
  },
];
