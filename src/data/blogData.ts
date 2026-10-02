import { BlogPost } from '../types';

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-001',
    slug: 'etymology-of-chengmi-nal-khagra',
    title: 'The Etymology of Chengmi: How Wild Reed Grass Gave Name to Khagrachari',
    subtitle: 'Tracing the geographical linguistic roots from indigenous Kokborok and Marma dialects to colonial cartography',
    author: 'Doniel Tripura',
    authorRole: 'Chief Archivist & Historian',
    date: 'February 14, 2025',
    readTime: '6 min read',
    category: 'Linguistic Geography',
    excerpt: 'Before British survey maps standardized the spelling, locals called the valley Chengmi. Explore how the mountain stream (chhari) and dense wild thickets of Nal Khagra reeds forged the modern identity of Khagrachari.',
    content: `For centuries before the modern administrative zila was created, the indigenous inhabitants of this lush mountain corridor in the Chittagong Hill Tracts knew the land by its indigenous names: Chengmi, referring to the sparkling waters of the Chengi river, and Tarak, an ancient name preserved in oral genealogies.

### The Botanical Genesis: Nal Khagra
The modern name "Khagrachari" is derived directly from the area's physical geography and native riparian flora:
* **"Khagra"**: Refers to *Nal Khagra* (*Phragmites karka* and *Saccharum spontaneum* / Catkin reed grass), a sturdy, tall reed plant that grows densely along riverbanks throughout sub-tropical South Asia.
* **"Chhari" (or Chhara)**: In the regional dialect of the Chittagong Hill Tracts, this signifies a small mountain stream, perennial spring, or river tributary descending from the shale hills.

Historically, a winding mountain stream flowed right through what is now the heart of Khagrachari Sadar town. Both banks of this stream were covered in dense, wild forests of Nal Khagra reeds that towered over ten to twelve feet high. As traders, jhum farmers, and travelers journeyed down from the upper ridges to exchange mountain cotton, sesame, and ginger, they naturally designated this confluence "Khagrachari"—the stream of the reed grass.

### The Transition from Chengmi to Modern Khagrachari
In the indigenous Tripuri (Kokborok) tongue and Marma vocabulary, the valley was traditionally named after the river itself: *Chengmi*. As Captain Thomas Herbert Lewin noted in his 1869 field survey:
> *"The river known to the Bengalis as the Chengi is named by the hill peoples the Chengmi. Where the mountain streams cut through the sandstone terraces, tall reeds choke the shallows, creating natural barriers and safe anchorages for dug-out canoes."*

When the administrative center was relocated from the border garrison town of Ramgarh to the central valley in 1983, the name of the marketplace upon the stream became the official name of the entire district. Today, the reed-bordered stream remains an enduring emblem of the intimate connection between indigenous toponymy and natural ecology.`,
    references: [
      {
        sourceType: 'Colonial Gazette',
        authorOrBody: 'Captain Thomas Herbert Lewin',
        title: 'The Hill Tracts of Chittagong and the Dwellers Therein',
        year: 1869,
        shelfmarkOrCallNumber: 'BL-8356.b.12',
        pageOrFolio: 'pp. 41-47',
      },
      {
        sourceType: 'Academic Journal',
        authorOrBody: 'Tripura Cultural Institute',
        title: 'Geographical Toponymy and Indigenous Place-Names of Khagrachari',
        year: 2012,
        shelfmarkOrCallNumber: 'TCI-PUB-2012-03',
        pageOrFolio: 'pp. 24-39',
      }
    ],
    status: 'published'
  },
  {
    id: 'blog-002',
    slug: 'mong-circle-customary-justice-1900-regulation',
    title: 'The Mong Circle: Legal Custodianship & Customary Justice Under the 1900 Regulation',
    subtitle: 'How a 240-year-old hereditary chiefdom preserves community harmony in modern Khagrachari',
    author: 'Kripayan Marma',
    authorRole: 'Senior Legal Historian & Research Archivist',
    date: 'January 28, 2025',
    readTime: '9 min read',
    category: 'Customary Law & Chiefdoms',
    excerpt: 'Established in 1782 by Chieftain Mrachai, the Mong Circle stands as one of Bangladesh’s three recognized hereditary chiefdoms. Learn how the 1900 CHT Regulation balances modern state administration with indigenous self-governance.',
    content: `The Chittagong Hill Tracts occupies a unique constitutional space in South Asia. Unlike the plains where district administration relies exclusively on magistrates and civil courts, Khagrachari preserves an unbroken hereditary chiefdom system that dates back to the late 18th century: the Mong Circle.

### Historical Roots: Chieftain Mrachai (1782)
The chiefdom was formally established around 1782 by its first chieftain, Mrachai, of Arakanese Marma ancestry. Uniting the disparate Marma, Tripuri, and Chakma clans living across the northern hills, Mrachai established a royal seat (later centered at Manikchari Rajbari) and formalized the system of village headmen.

In 1860, when the British East India Company partitioned the Chittagong Hill Tracts into an independent administrative territory, this northern jurisdiction was documented as the *Mun Circle*, a name derived from the local Tripura dialect. By 1881, the British government formalized the name as the *Mong Circle*, alongside the Chakma Circle in Rangamati and the Bohmong Circle in Bandarban.

### The Bedrock of Autonomous Law: Regulation I of 1900
The legal authority of the Mong Chief (Raja) was codified under the landmark **Chittagong Hill Tracts Regulation of 1900** (Act I of 1900). This regulation established a tripartite administrative architecture:
1. **The Deputy Commissioner**: Handled general administrative, criminal, and colonial border matters.
2. **The Circle Chief (Mong Raja)**: Handled customary civil law, family disputes, divorce, inheritance, and land allocations.
3. **The Mouza Headman & Village Karbari**: Village-level leaders responsible for maintaining local law, collecting jhum taxes, and recommending permanent residency.

### The Modern Role of the Mong King
While sovereign political control resides with the national government of Bangladesh following the 1971 Liberation War, the 1997 Peace Accord and subsequent statutory enactments reaffirmed the traditional judicial role of the Mong Raja.

Today, the Mong King presides over customary arbitration courts, hearing disputes concerning traditional land boundaries, customary marital pacts, and social governance. The Raja's seal is legally required on Permanent Resident Certificates (PRCs) issued to citizens in Khagrachari, making the chiefdom an indispensable pillar of civic identity in the hills.`,
    references: [
      {
        sourceType: 'Treaty Instrument',
        authorOrBody: 'Governor-General in Council',
        title: 'Regulation I of 1900: Chittagong Hill Tracts Regulation',
        year: 1900,
        shelfmarkOrCallNumber: 'Calcutta Gazette Extraordinary',
        pageOrFolio: 'Sections 4, 18, 34',
      },
      {
        sourceType: 'Academic Journal',
        authorOrBody: 'Raja Devasish Roy',
        title: 'The Legal System of the Chittagong Hill Tracts: An Overview',
        year: 2002,
        shelfmarkOrCallNumber: 'ISBN 984-05-1550-6',
        pageOrFolio: 'pp. 88-115',
      }
    ],
    status: 'published'
  },
  {
    id: 'blog-003',
    slug: 'from-karpas-mahal-to-modern-zila',
    title: 'From Karpas Mahal to Modern Zila: 200 Years of Ramgarh & Khagrachari Administration',
    subtitle: 'From Mughal cotton tributary lands to the 1983 administrative elevation',
    author: 'Dr. Ananya Chakma',
    authorRole: 'Anthropological Researcher',
    date: 'January 10, 2025',
    readTime: '7 min read',
    category: 'Colonial Administration',
    excerpt: 'How the northern hill tracts transitioned from a Mughal cotton-revenue tract (Karpas Mahal) through the colonial subdivision headquarters of Ramgarh, culminating in the 1983 zila declaration.',
    content: `The administrative history of Khagrachari reflects centuries of balancing external state interests with internal tribal autonomy.

### The Karpas Mahal (1724–1776)
During the Mughal period, the Chittagong Hill Tracts was treated not as an annexed agrarian province, but as the *Karpas Mahal*—a cotton tract. Rather than surveying hill lands for cash taxation, the Mughal Subahdar agreed with the hill chiefs that an annual tribute of raw mountain cotton (*karpas*) would be paid in exchange for open trade with the bazaar towns of Chittagong. This arrangement left internal tribal customs entirely untouched.

### The Primacy of Ramgarh
When the British established the Chittagong Hill Tracts as a district in 1860, they established their primary administrative headquarters at Chandraghona and later Rangamati, while **Ramgarh** served as the paramount subdivision headquarters for the entire northern hill tract.

Ramgarh was strategically positioned on the Feni River border with Tripura. All judicial, police, and tax matters for Mahalchari, Dighinala, and what was then the rural union of Khagrachari were managed from Ramgarh. Ramgarh remained the administrative capital throughout the British Raj, the Pakistan period, and the early years of independent Bangladesh.

### The 1983 Shift to Khagrachari Sadar
By the late 1970s, demographic growth and economic activity shifted toward the fertile central valley of the Chengi river. On November 7, 1983, the Government of Bangladesh officially upgraded the subdivision into a full District (Zila), formally shifting the headquarters to Khagrachari Sadar.

Ramgarh was reorganized as an upazila, while Khagrachari became the capital of a district spanning eight upazilas, uniting the historic territories of the Mong Circle under modern administrative governance.`,
    references: [
      {
        sourceType: 'National Archives',
        authorOrBody: 'Government of Bangladesh',
        title: 'Administrative Reorganization Committee Report',
        year: 1983,
        shelfmarkOrCallNumber: 'NAB-ARC-1983-VOL-2',
        pageOrFolio: 'pp. 110-128',
      },
      {
        sourceType: 'Academic Journal',
        authorOrBody: 'Sirajul Islam',
        title: 'Banglapedia: Administrative Evolution of Khagrachhari',
        year: 2003,
        shelfmarkOrCallNumber: 'Asiatic Society of Bangladesh',
        pageOrFolio: 'Entry: Khagrachhari District',
      }
    ],
    status: 'published'
  }
];
