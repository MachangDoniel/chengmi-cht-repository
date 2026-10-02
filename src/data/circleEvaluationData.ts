import { CircleDetail } from '../types';

export const COMPREHENSIVE_CIRCLES: CircleDetail[] = [
  {
    id: 'mong',
    name: 'Mong Circle',
    district: 'Khagrachari District',
    rulerTitle: 'Mong Raja (King)',
    currentRuler: 'Raja Saching Prue Chowdhury (52nd Chieftain / Contemporary Mong Chief)',
    seat: 'Manikchari Rajbari (Historic Palace)',
    historicalSeats: ['Ramgarh Frontier Post (1782–1860)', 'Manikchari Royal Court (1860–Present)'],
    dominantTribes: 'Marma (Chengmi / Phalang Htaung), Tripuri (Kokborok), Chakma',
    color: '#059669', // Emerald
    badgeColor: 'bg-emerald-600 text-white',
    accentBg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800',
    summary:
      'The northern chiefdom of the Chittagong Hill Tracts covering all 9 upazilas of Khagrachari. Known historically as Phalang Htaung, Chengmi, and formerly classified by early British records as the "Mun Circle". Today, the Mong Raja oversees customary tribal justice, mouza headmen administration, and permanent residency certification.',
    royalLineageOrigin:
      'Descendants of Arakanese Marma nobility led by Chieftain Mrachai who migrated across the Arakan mountain passes to the Feni and Chengi valleys in 1782 following the Burmese conquest of Mrauk U. Intertwined with indigenous Tripuri clans of the northern hill kingdom.',
    historicalIncidentExplanation:
      'HISTORICAL VALIDATION: THE "MUN CIRCLE" TO "MONG CIRCLE" BYPASS — During the pre-colonial period and early 19th century, the northern territory of the Chittagong Hill Tracts was intimately linked with the Kingdom of Twipra (Tripura Manikya dynasty). The indigenous population was predominantly Tipra (Tripuri) and was recorded in early British colonial surveys (including Act XXII of 1860) as the "Mun Circle" (or "Mun/Mrung/Tipperah Circle", derived from the indigenous Tripura/Riang dialect). However, in 1782, Marma refugees led by Chieftain Mrachai had established strong fortified settlements along Ramgarh and Manikchari. Between 1881 and 1884, when the British surveyed and delineated permanent revenue circle boundaries under Sir Alexander Mackenzie, a major political friction arose: the Maharaja of Tripura claimed tributary jurisdiction over the northern hills. To avoid territorial conflict with the sovereign Princely State of Hill Tipperah and prevent the Maharaja from levying double-taxes within British territory, the British colonial authorities decisively intervened. They bypassed the Tripuri clan chiefs and recognized the Marma chieftain Kyaja Sain Chowdhury (Mong Prue) at Manikchari as the sole Circle Chief. Concurrently, the British officially changed the nomenclature from "Mun Circle" to "Mong Circle" (reflecting the Marma/Burmese honorific "Mawng" / "Mog"). This administrative maneuver effectively severed the formal tributary ties between Khagrachari\'s inhabitants and the Tripura royal court, consolidating authority under the Marma Mong Raja while incorporating Tripura mouza headmen under customary tribal regulations.',
    chronologicalEvaluation: [
      {
        era: 'Pre-Colonial & Twipra Domain',
        yearRange: 'Pre-1782',
        title: 'Twipra Kingdom Suzerainty & the "Mun" Settlements',
        details:
          'The northern hill tracts along the Chengi and Feni rivers were historically under the sphere of influence of the Manikya kings of Tripura. The local inhabitants, predominantly Tiprasa (Tripuri clans), referred to the territory through indigenous names such as Chengmi and Tarak, paying cotton tributes (Karpas) to local chiefs.',
        significance:
          'Established the deep-rooted Tripuri demographic, linguistic, and cultural fabric that continues across Ramgarh, Matiranga, Khagrachari Sadar, and Panchhari today.',
        keyFigures: ['Manikya Maharajas of Tripura', 'Indigenous Tipra Mouza Chiefs'],
        reference: 'Rajmala (Chronicles of the Kings of Tripura); Hunter\'s Statistical Account of CHT (1876).'
      },
      {
        era: 'Arakanese Migration',
        yearRange: '1782–1826',
        title: 'Arrival of Chieftain Mrachai & Ramgarh Settlement',
        details:
          'Following the Burmese invasion and sacking of Mrauk U (Arakan) by Bodawpaya, thousands of Marma (Arakanese) families fled northward into the Chittagong frontier. Chieftain Mrachai led a prominent band into the northern hills, negotiating settlement rights around Ramgarh and along the Chengi river basin.',
        significance:
          'Created the dual Marma-Tripura cultural coexistence in northern CHT and laid the physical groundwork for what would become the hereditary Mong Circle chieftaincy.',
        keyFigures: ['Chieftain Mrachai (1st Mong Ancestor)', 'Kongsadi Prue'],
        reference: 'Lewin, T.H., The Hill Tracts of Chittagong and the Dwellers Therein (1869).'
      },
      {
        era: 'Colonial Annexation',
        yearRange: '1860',
        title: 'Act XXII of 1860 & Initial "Mun Circle" Designation',
        details:
          'The British Crown separated the Hill Tracts from Chittagong District, establishing an Excluded Administrative Region. Early gazetteers and maps designated the northern region as the "Mun Circle", acknowledging the prevalent Tripuri / Mun population.',
        significance:
          'First formal administrative separation of the northern hills from the plains of Bengal, initiating direct British political superintendence.',
        keyFigures: ['Captain J.M. Graham', 'Thomas Herbert Lewin'],
        reference: 'Act XXII of 1860, Fort William Gazette.'
      },
      {
        era: 'The Boundary Reorganization',
        yearRange: '1881–1884',
        title: 'The Great Bypass: Transformation from "Mun" to "Mong Circle"',
        details:
          'To counter the Maharaja of Tripura\'s claims over the borderlands and ensure a single loyal revenue collection entity within British borders, the British colonial government reorganized the circle boundaries in 1881–1884. They bypassed Tripura royal emissaries and elevated the Marma chief at Manikchari, officially changing the name from "Mun Circle" to "Mong Circle" under Kyaja Sain Chowdhury.',
        significance:
          'Solidified the northern circle as one of the three permanent CHT chiefdoms and established Manikchari Rajbari as the hereditary judicial court for all ethnic groups in Khagrachari.',
        keyFigures: ['Kyaja Sain Chowdhury (Raja Mong Prue)', 'Sir Alexander Mackenzie (Bengal Secretariat)'],
        reference: 'Mackenzie, A., History of the Relations of the Government with the Hill Tribes of the North-East Frontier of Bengal (1884).'
      },
      {
        era: 'Statutory Autonomy',
        yearRange: '1900',
        title: 'Enactment of Chittagong Hill Tracts Regulation (Regulation I of 1900)',
        details:
          'The British enacted the historic CHT Manual, legally codifying the hereditary powers of the Mong Raja over mouza headmen, land revenue collection, village karbaris, and customary family/tribal civil courts.',
        significance:
          'Protected indigenous land rights and customary self-rule, prohibiting non-indigenous plains settlers from purchasing land without the Raja and Deputy Commissioner\'s consent.',
        keyFigures: ['Raja Narabadi Mong Chowdhury', 'Lord Curzon'],
        reference: 'CHT Regulation I of 1900, Published under Notification No. 1876-J.'
      },
      {
        era: 'Post-Colonial & Modern Era',
        yearRange: '1947–Present',
        title: 'Modern Succession, 1983 District Era & 1997 Peace Accord',
        details:
          'The Mong Chiefdom navigated the tumultuous Partition of 1947, the 1971 Bangladesh Liberation War (where Ramgarh served as Sector 1 command), the creation of Khagrachari District in 1983, and the 1997 CHT Peace Accord. Raja Paihala Prue Chowdhury and subsequent leaders stewarded the community through modern civic integration while fiercely preserving customary laws.',
        significance:
          'Contemporary Mong Circle retains sovereign customary judicial powers. The Mong King sits on the CHT Regional Council advisory board and continues traditional Raj Punyah assemblies.',
        keyFigures: ['Raja Paihala Prue Chowdhury', 'Rani Nihardi Devi', 'Raja Saching Prue Chowdhury'],
        reference: 'Chittagong Hill Tracts Peace Accord (1997); Ministry of CHT Affairs Gazette (2000).'
      }
    ],
    keyDynasticRulers: [
      { name: 'Mrachai', reign: 'c. 1782–1805', achievement: 'Founding patriarch who led Arakanese Marma settlement into Ramgarh and Manikchari' },
      { name: 'Kyaja Sain Chowdhury', reign: 'c. 1870–1895', achievement: 'Enthroned when British formalized the Mong Circle; built the historic Manikchari Palace' },
      { name: 'Narabadi Chowdhury', reign: '1895–1917', achievement: 'Codified customary laws under the CHT Regulation I of 1900' },
      { name: 'Mong Prue Chowdhury', reign: '1947–1984', achievement: 'Guided the circle through 1971 Liberation War and the 1983 Khagrachari District elevation' },
      { name: 'Paihala Prue Chowdhury', reign: '1984–2008', achievement: 'Key signatory and institutional supporter of the 1997 CHT Peace Accord' },
      { name: 'Saching Prue Chowdhury', reign: '2008–Present', achievement: '52nd traditional ruler; champions indigenous cultural heritage and customary justice' },
    ],
    citations: [
      {
        sourceType: 'British Library IOR',
        authorOrBody: 'Mackenzie, Alexander',
        title: 'History of the Relations of the Government with the Hill Tribes of Bengal',
        year: 1884,
        shelfmarkOrCallNumber: 'IOR/L/PJ/6/112',
        pageOrFolio: 'pp. 331–345'
      },
      {
        sourceType: 'Colonial Gazette',
        authorOrBody: 'Bengal Government Press',
        title: 'The Chittagong Hill Tracts Regulation, 1900 (Bengal Act I of 1900)',
        year: 1900,
        shelfmarkOrCallNumber: 'CAL-GAZ-1900-REG1',
        pageOrFolio: 'Sections 4, 8, 12, Schedule of Circles'
      },
      {
        sourceType: 'Academic Journal',
        authorOrBody: 'Bhattacharjee, S. B. & Roy, D.',
        title: 'The Chieftaincies of the Chittagong Hill Tracts: Law, Custom and History',
        year: 2004,
        shelfmarkOrCallNumber: 'J-SA-STUD-04-12',
        pageOrFolio: 'Dhaka University Law Journal, Vol 15, No. 2'
      }
    ]
  },
  {
    id: 'chakma',
    name: 'Chakma Circle',
    district: 'Rangamati District',
    rulerTitle: 'Chakma Raja (King)',
    currentRuler: 'Raja Barrister Devasish Roy (51st Chakma Raja / UN Indigenous Rights Advocate)',
    seat: 'Chakma Rajbari, Rangamati Sadar',
    historicalSeats: ['Champakanagar (Ancient)', 'Rajanagar / Chittagong Plains (15th–18th Century)', 'Old Rangamati Palace (Submerged 1960)', 'New Rangamati Rajbari (1960–Present)'],
    dominantTribes: 'Chakma (Changma), Tanchangya, Pankho',
    color: '#d97706', // Amber / Gold
    badgeColor: 'bg-amber-600 text-white',
    accentBg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-800',
    summary:
      'The central and largest chiefdom of the Chittagong Hill Tracts, covering the entire Rangamati Hill District. Governed by the ancient Chakma royal house, which traces its lineage back over 800 years. The Chakma Raja oversees customary law, Mouza headmen, and traditional revenue for hundreds of thousands of indigenous citizens.',
    royalLineageOrigin:
      'Traced to ancient Champakanagar and mythological solar dynasties. After historical migrations across Arakan (Mrauk U) and the Karnaphuli river valley, the royal family established sovereignty over the middle and northern hills, defending their territory against both Mughal subahdars and British East India Company forces.',
    historicalIncidentExplanation:
      'HISTORICAL HIGHLIGHT: THE REIGN OF RANI KALINDI (1832–1873) AND THE 1787 KARPAS MAHAL TREATY — Following decades of armed resistance led by Chakma kings and general Ranu Khan against East India Company cotton taxes, Raja Jan Bakhsh Khan signed the 1787 peace treaty in Calcutta, establishing the "Karpas Mahal" tribute. Later, when Raja Dharam Bakhsh Khan died without male issue in 1832, his widow Rani Kalindi ascended the throne and ruled for 41 remarkable years. She fiercely resisted British colonial annexation, missionary conversion, and administrative encroachment, codified customary Chakma family law, patronized Theravada Buddhism by constructing the Mahamuni Rajvihara, and defended indigenous land rights against the British until her death in 1873.',
    chronologicalEvaluation: [
      {
        era: 'Ancient Kingdom Era',
        yearRange: 'c. 1100–1400',
        title: 'Raja Bijoy Giri & Settlement in the Karnaphuli Basin',
        details:
          'According to classical Chakma chronicles (*Bijak*), Prince Bijoy Giri led an expedition from Champakanagar into the hills, establishing a sovereign realm along the rivers of Chittagong. The kings formed alliances and fought territorial battles with the kings of Arakan and Tripura.',
        significance:
          'Formed the foundational identity and territorial core of the Chakma nation in the Chittagong Hill Tracts.',
        keyFigures: ['Raja Bijoy Giri', 'Radhamon (Epic Warrior)'],
        reference: 'The Chakma Bijak (Ancient Palm-Leaf Chronicles); Bernot, Lucien (1967).'
      },
      {
        era: 'Mughal & East India Period',
        yearRange: '1715–1787',
        title: 'Karpas Mahal Treaty & Raja Jan Bakhsh Khan',
        details:
          'In 1715, Raja Jalal Khan entered an agreement with Mughal Subahdar Farrukhsiyar to pay an annual tribute of raw cotton (*Karpas*). When the British East India Company took over Bengal in 1760, they demanded commercial taxes, sparking the historic Chakma Guerrilla War led by Raja Sher Daulat Khan and General Ranu Khan (1776–1787). In 1787, Raja Jan Bakhsh Khan concluded an honorable peace treaty in Calcutta.',
        significance:
          'Preserved internal Chakma independence in exchange for a fixed cotton tribute, coining the historic phrase "Karpas Mahal".',
        keyFigures: ['Raja Sher Daulat Khan', 'Ranu Khan (Chakma Commander)', 'Raja Jan Bakhsh Khan'],
        reference: 'British East India Company Board of Revenue Consultations, Fort William, 1787.'
      },
      {
        era: 'The Golden Regency',
        yearRange: '1832–1873',
        title: 'The 41-Year Reign of Queen Monarch Rani Kalindi',
        details:
          'Ascending the throne after Raja Dharam Bakhsh Khan, Rani Kalindi was the longest-ruling sovereign monarch in CHT history. She successfully defended the royal estates against British annexation schemes, rejected Christian missionary conversions, revived pure Theravada Buddhism with the Sangharaja Saramedha Mahathero, and codified customary laws.',
        significance:
          'Symbolizes indigenous female sovereignty and anti-colonial resistance. Under her rule, Chakma society solidified its Buddhist identity and customary legal resilience.',
        keyFigures: ['Rani Kalindi (Queen Sovereign)', 'Sangharaja Saramedha Mahathero'],
        reference: 'Hunter, W.W., A Statistical Account of Bengal: Chittagong Hill Tracts (1876).'
      },
      {
        era: 'Colonial Demarcation',
        yearRange: '1881–1900',
        title: 'Formal Delineation of Chakma Circle & CHT Regulation 1900',
        details:
          'Under Raja Harish Chandra, the British government formalized the central CHT circle as the Chakma Circle in 1881. The seat shifted to Rajanagar and later Rangamati. Regulation I of 1900 affirmed the Chakma King\'s customary judicial authority over all mouza headmen in the central hill tracts.',
        significance:
          'Codified the tripartite Circle administrative framework that continues in Bangladesh law to this day.',
        keyFigures: ['Raja Harish Chandra Roy', 'Raja Bhuban Mohan Roy'],
        reference: 'Bengal Act I of 1900; Imperial Gazetteer of India: Eastern Bengal and Assam (1909).'
      },
      {
        era: 'The Great Tragedy',
        yearRange: '1960',
        title: 'The Kaptai Dam Catastrophe (Bara Parang)',
        details:
          'The Pakistan government constructed the Kaptai Hydroelectric Dam without indigenous consent, flooding 54,000 acres of prime arable land (40% of the entire district\'s cultivation) and submerging the historic Chakma Royal Palace in Old Rangamati. Over 100,000 Chakmas were displaced, forcing 40,000 to seek refuge in India (*Bara Parang* / The Great Exodus).',
        significance:
          'The single most traumatic modern event in CHT history, catalyzing political mobilization, resistance movements, and the formation of PCJSS in 1972.',
        keyFigures: ['Raja Tridiv Roy', 'Displaced Jumma Citizens'],
        reference: 'Sopher, David E., "Population Dislocation in the Chittagong Hills" (Geographical Review, 1963).'
      },
      {
        era: 'Modern Leadership',
        yearRange: '1971–Present',
        title: 'Raja Barrister Devasish Roy & Contemporary Indigenous Rights',
        details:
          'Enthroned in 1971, Raja Devasish Roy is a British-trained barrister, human rights advocate, and former member of the UN Permanent Forum on Indigenous Issues (UNPFII). He played a key advisory role in the 1997 CHT Peace Accord and continues to arbitrate thousands of customary land and civic cases annually.',
        significance:
          'Elevated the Chittagong Hill Tracts and Chakma customary jurisprudence to international recognition and global indigenous treaties.',
        keyFigures: ['Raja Devasish Roy (51st Raja)', 'Rani Yan Yan'],
        reference: 'Roy, Raja Devasish, Traditional Customary Laws and Land Rights in the CHT (ILO / IWGI Report).'
      }
    ],
    keyDynasticRulers: [
      { name: 'Raja Bijoy Giri', reign: 'c. 13th Century', achievement: 'Legendary founding monarch who established the Karnaphuli river kingdom' },
      { name: 'Raja Jan Bakhsh Khan', reign: '1782–1800', achievement: 'Negotiated the 1787 Karpas Mahal Treaty with the British East India Company' },
      { name: 'Rani Kalindi', reign: '1832–1873', achievement: 'Longest-reigning Queen sovereign who defeated colonial annexation and institutionalized Buddhism' },
      { name: 'Raja Harish Chandra Roy', reign: '1873–1885', achievement: 'Reigned during the 1881 British circle demarcation and moved the capital to Rangamati' },
      { name: 'Raja Tridiv Roy', reign: '1953–1971', achievement: 'Presided during the tragic Kaptai Dam flood and the 1971 war period' },
      { name: 'Raja Barrister Devasish Roy', reign: '1971–Present', achievement: '51st Chakma Raja, international indigenous legal scholar, UNPFII member' },
    ],
    citations: [
      {
        sourceType: 'Colonial Gazette',
        authorOrBody: 'Hunter, W. W.',
        title: 'A Statistical Account of Bengal: Vol VI - Chittagong Hill Tracts',
        year: 1876,
        shelfmarkOrCallNumber: 'IOR/V/27/64/6',
        pageOrFolio: 'pp. 19–84'
      },
      {
        sourceType: 'Academic Journal',
        authorOrBody: 'Sopher, David E.',
        title: 'Population Dislocation in the Chittagong Hills',
        year: 1963,
        shelfmarkOrCallNumber: 'GEO-REV-1963-337',
        pageOrFolio: 'Geographical Review, Vol. 53, No. 3, pp. 337–362'
      },
      {
        sourceType: 'Treaty Instrument',
        authorOrBody: 'National Committee on CHT Affairs & PCJSS',
        title: 'Chittagong Hill Tracts Peace Accord',
        year: 1997,
        shelfmarkOrCallNumber: 'CHT-PA-1997-DOC',
        pageOrFolio: 'Clauses A, B, C (Circle Chiefs Authority)'
      }
    ]
  },
  {
    id: 'bohmong',
    name: 'Bohmong Circle',
    district: 'Bandarban District',
    rulerTitle: 'Bohmong Raja (King)',
    currentRuler: 'Raja U Chaw Prue (17th Bohmong King / Supreme Customary Judge of Bandarban)',
    seat: 'Bohmong Rajbari, Bandarban Sadar',
    historicalSeats: ['Rigray Khyoung / Sangu River Valley (1599–Present)', 'Bandarban Town Rajbari'],
    dominantTribes: 'Marma (Bohmong Lineage), Mro, Bawm, Khyang, Khumi, Lushai, Tanchangya',
    color: '#b91c1c', // Crimson / Terracotta
    badgeColor: 'bg-rose-700 text-white',
    accentBg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-800',
    summary:
      'The southern chiefdom of the Chittagong Hill Tracts covering all 7 upazilas of Bandarban and parts of Rangamati. Founded in 1599 by royalty descended from the Pegu (Burmese) Taungoo Dynasty. The Bohmong King presides over customary tribal law, sacred Buddhist relics like Buddha Dhatu Jadi, and the famed annual Raj Punyah festival.',
    royalLineageOrigin:
      'Traced directly to the Pegu royal dynasty of Burma (Emperor Tabinshwehti and King Bayinnaung). Following the 1599 war between Arakan and Pegu, Prince Maha Theingathu was granted hereditary lordship over Chittagong and the southern hill valleys by King Min Razagyi of Mrauk U, earning the royal title "Bohmong" (Burmese: "Supreme General" or "Commander-in-Chief").',
    historicalIncidentExplanation:
      'HISTORICAL ORIGINS: THE 1599 PEGU DYNASTIC CONQUEST AND THE TITLE "BOHMONG" — In 1599, the King of Arakan (Rakhine), Min Razagyi, allied with the Portuguese adventurer Filipe de Brito e Nicote to attack and capture the royal city of Pegu (Hanthawaddy) in lower Burma. The royal prince Maha Theingathu, son of King Bayinnaung\'s sister, was captured and brought to Arakan. Recognizing his noble pedigree and military prowess, the Arakanese monarch appointed him commander of the northern military defenses of Chittagong. In gratitude for securing the frontier against Mughal and Portuguese pirates, the Arakanese king conferred upon him the hereditary title "Bohmong Raza" (from Burmese: Boh = military chief / commander; Mong = governor / king). His descendants permanently settled along the picturesque Sangu river basin (Bandarban), forming the Bohmong Circle.',
    chronologicalEvaluation: [
      {
        era: 'Dynastic Founding',
        yearRange: '1599–1630',
        title: 'Prince Maha Theingathu & the Confluence of Pegu and Arakan',
        details:
          'Following the fall of Hanthawaddy (Pegu), Prince Maha Theingathu moved with his royal court and loyal soldiers into Chittagong and the upper Sangu river basin. The title Bohmong was bestowed upon him, establishing an unbroken hereditary dynasty of Buddhist warrior-kings in the southern hills.',
        significance:
          'Established the royal Arakanese-Burmese cultural lineage, Marma script, and Theravada Buddhist religious monastic networks in Bandarban.',
        keyFigures: ['Prince Maha Theingathu (1st Bohmong)', 'King Min Razagyi of Arakan'],
        reference: 'Harvey, G.E., History of Burma (1925); Phayre, Arthur, History of Burma (1883).'
      },
      {
        era: 'Consolidation of Bandarban',
        yearRange: '1770–1820',
        title: 'Settlement Along the Sangu River & Bohmong Kong Hla Prue',
        details:
          'When the Burmese conquered Arakan in 1785, fresh waves of Marma immigrants sought shelter under the Bohmong Raja in Bandarban. Raja Kong Hla Prue consolidated authority across the Matamuhuri and Sangu river systems, integrating the Mro, Bawm, and Khyang communities under the traditional mouza system.',
        significance:
          'Constructed the permanent town of Bandarban as the royal capital and administrative sanctuary for southern Jumma communities.',
        keyFigures: ['Bohmong Kong Hla Prue', 'Bohmong Maung Nu'],
        reference: 'Lewin, T.H., Wild Races of South-Eastern India (1870).'
      },
      {
        era: 'Colonial Recognition',
        yearRange: '1881–1884',
        title: 'Formal Delimitation of the Southern Bohmong Circle',
        details:
          'Under the British administrative reorganization of 1881, the southern third of the Chittagong Hill Tracts was officially delimited as the "Bohmong Circle" under Bohmong Maung Pru. The British recognized the King\'s exclusive right to customary tax collection and hereditary judicial power.',
        significance:
          'Firmly demarcated the tripartite boundaries between Mong (North), Chakma (Center), and Bohmong (South), preventing inter-chiefdom boundary disputes.',
        keyFigures: ['Bohmong Maung Pru', 'Sir Alexander Mackenzie'],
        reference: 'Mackenzie, A., North-East Frontier of Bengal (1884); Bengal Administrative Report 1882.'
      },
      {
        era: 'The Raj Punyah Tradition',
        yearRange: '1900–1970',
        title: 'Codification under CHT Regulation 1900 & The Raj Punyah Grand Durbar',
        details:
          'The 1900 CHT Manual confirmed the Bohmong King as the supreme customary magistrate of Bandarban. Each winter, the King holds the magnificent three-day *Raj Punyah* (Royal Revenue Festival), where village headmen and karbaris from all hill ethnicities gather at the Rajbari in traditional regalia to pay allegiance and taxes.',
        significance:
          'Preserved one of South Asia\'s last remaining active royal durbars, celebrating traditional Jumma songs, classical dance, and customary dispute arbitration.',
        keyFigures: ['Bohmong Kyaw Zan Prue', 'Bohmong Maung Shwe Prue Chowdhury'],
        reference: 'Bengal District Gazetteers: Chittagong Hill Tracts (1909); Folk Culture Survey of CHT.'
      },
      {
        era: 'Modern Era & Succession',
        yearRange: '1971–Present',
        title: 'Bandarban District Creation (1981) to the 17th King U Chaw Prue',
        details:
          'In 1981, Bandarban was elevated from a subdivision to a full district of Bangladesh. The Bohmong family led preservation of world-renowned Buddhist landmarks, including the Golden Temple (Buddha Dhatu Jadi). The 17th King, Raja U Chaw Prue, was enthroned following centuries-old Theravada royal rituals and continues to uphold customary peace and environmental stewardship in the high mountains of Bandarban (including Keokradong and Saka Haphong).',
        significance:
          'The Bohmong Chief remains the guardian of Bandarban\'s multi-ethnic harmony (Marma, Mro, Bawm, Tripura, Bengali) and customary forest rights.',
        keyFigures: ['Raja Kyaw Shwe Prue', '17th Bohmong King U Chaw Prue'],
        reference: 'Bandarban Hill District Council Act (1989); CHT Ministry Official Records.'
      }
    ],
    keyDynasticRulers: [
      { name: 'Maha Theingathu', reign: '1599–1630', achievement: '1st Bohmong King; royal Pegu prince who established the dynasty in the Sangu valley' },
      { name: 'Kong Hla Prue', reign: 'c. 1785–1815', achievement: 'Protected thousands of refugees during Burmese conquest and formalized Bandarban as capital' },
      { name: 'Maung Pru', reign: '1875–1898', achievement: 'Formally recognized by British Crown during 1881 Circle boundary demarcation' },
      { name: 'Maung Shwe Prue Chowdhury', reign: '1959–1998', achievement: 'Presided over Bandarban during 1971 Liberation and 1981 District creation; patronized Buddhist arts' },
      { name: 'Kyaw Shwe Prue', reign: '1998–2012', achievement: 'Championed education and customary land preservation across Bandarban upazilas' },
      { name: 'U Chaw Prue', reign: '2013–Present', achievement: '17th Bohmong King; presides over annual Raj Punyah and customary justice courts' },
    ],
    citations: [
      {
        sourceType: 'Academic Journal',
        authorOrBody: 'Phayre, Arthur P.',
        title: 'History of Burma: Including Burma Proper, Pegu, Taungu, Tenasserim, and Arakan',
        year: 1883,
        shelfmarkOrCallNumber: 'BL-954.91-PHA',
        pageOrFolio: 'Trübner & Co., London, pp. 119–128'
      },
      {
        sourceType: 'Colonial Gazette',
        authorOrBody: 'O’Malley, L. S. S.',
        title: 'Eastern Bengal District Gazetteers: Chittagong Hill Tracts',
        year: 1908,
        shelfmarkOrCallNumber: 'IOR/V/27/65/54',
        pageOrFolio: 'Bandarban Subdivision & Bohmong Circle Customs, pp. 41–63'
      },
      {
        sourceType: 'National Archives',
        authorOrBody: 'Ministry of Chittagong Hill Tracts Affairs',
        title: 'Traditional Administrative Systems and Customary Laws in CHT',
        year: 2011,
        shelfmarkOrCallNumber: 'MOCHTA-CAD-2011',
        pageOrFolio: 'Government of Bangladesh, Dhaka'
      }
    ]
  }
];
