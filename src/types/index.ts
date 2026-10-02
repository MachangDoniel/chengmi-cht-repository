export type UserRole = 'super_admin' | 'archivist' | 'researcher' | 'contributor' | 'public_reader';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution?: string;
  avatar?: string;
  canViewSensitive: boolean;
  canPublish: boolean;
  canManageUsers: boolean;
  createdDate: string;
  passwordHash?: string; // For mock client auth validation
}

export type SensitivityLevel = 'public' | 'restricted' | 'declassified';

export interface Citation {
  sourceType: 'Colonial Gazette' | 'British Library IOR' | 'Circle Chief Record' | 'National Archives' | 'Treaty Instrument' | 'Oral History' | 'Academic Journal' | 'Royal Chronicle' | 'Survey Document' | 'Government Report';
  authorOrBody: string;
  title: string;
  year: number | string;
  shelfmarkOrCallNumber: string;
  urlOrRepository?: string;
  pageOrFolio?: string;
}

export interface ArchiveRecord {
  id: string;
  accessionNumber: string;
  title: string;
  era: 'Pre-Colonial (Pre-1760)' | 'British Colonial (1760-1947)' | 'Pakistan Era (1947-1971)' | 'Post-Independence (1971-1983)' | 'Modern Era (1983-Present)';
  year: number | string;
  category: 'Administration' | 'Mong Circle & Chiefs' | 'Land & Customary Law' | 'Ethnography & Language' | 'Treaties & Regulations' | 'Ecological Geography';
  region: 'Mong Circle (Khagrachari)' | 'Chakma Circle (Rangamati)' | 'Bohmong Circle (Bandarban)' | 'General CHT';
  abstract: string;
  fullTranscription: string;
  sensitivity: SensitivityLevel;
  references: Citation[];
  keywords: string[];
  submittedBy: string;
  submissionDate: string;
  verifiedBy?: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  yearDisplay: string;
  title: string;
  localNameOrAlias?: string;
  circle?: 'mong' | 'chakma' | 'bohmong' | 'all';
  isSharedPanChtMilestone?: boolean;
  sharedCircleImpact?: string;
  era: 'Ancient & Pre-Colonial' | 'British Colonial Period' | 'Pakistan Period' | 'Liberation & Bangladesh' | 'Contemporary CHT';
  category: 'Chiefdoms & Monarchy' | 'Colonial Administration' | 'Boundary & Treaties' | 'Rebellion & Struggle' | 'Modern Upgrades';
  summary: string;
  historicalSignificance: string;
  primaryLocation: string;
  isMunToMongTransition?: boolean;
  references: Citation[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string;
  references: Citation[];
  status: 'published' | 'draft';
}

export interface UpazilaInfo {
  id: string;
  name: string;
  bengaliName: string;
  district?: 'Khagrachari' | 'Rangamati' | 'Bandarban';
  circle?: 'mong' | 'chakma' | 'bohmong';
  historicalNames: string[];
  areaSqKm: number;
  headquarters: string;
  keyRivers: string[];
  mongCircleSignificance: string;
  landmarks: string[];
  description: string;
  historicalNotes: string;
  references: Citation[];
}

export interface LandmarkInfo {
  id: string;
  name: string;
  upazilaId: string;
  district?: 'Khagrachari' | 'Rangamati' | 'Bandarban';
  category: 'Natural Wonder' | 'Royal Heritage' | 'Spiritual Sanctuary' | 'Historic Frontier' | 'Archaeological';
  coordinates: { x: number; y: number }; // SVG percentage
  geoCoordinates?: [number, number]; // Real GPS latitude, longitude
  summary: string;
  historicalContext: string;
  citations: Citation[];
  audioId?: string;
}

export interface ChronologicalMilestone {
  era: string;
  yearRange: string;
  title: string;
  details: string;
  significance: string;
  keyFigures: string[];
  reference?: string;
}

export interface CircleDetail {
  id: 'mong' | 'chakma' | 'bohmong';
  name: string;
  district: string;
  rulerTitle: string;
  currentRuler: string;
  seat: string;
  historicalSeats: string[];
  dominantTribes: string;
  color: string;
  badgeColor: string;
  accentBg: string;
  summary: string;
  royalLineageOrigin: string;
  historicalIncidentExplanation?: string;
  chronologicalEvaluation: ChronologicalMilestone[];
  keyDynasticRulers: Array<{ name: string; reign: string; achievement: string }>;
  citations: Citation[];
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  userEmail: string;
  action: string;
  recordId?: string;
  sensitivity: SensitivityLevel;
}

export interface GalleryItem {
  id: string;
  title: string;
  type: 'photograph' | 'map' | 'document_plate';
  era: 'Pre-Colonial (Pre-1760)' | 'British Colonial (1760-1947)' | 'Pakistan Era (1947-1971)' | 'Post-Independence & Modern';
  year: number | string;
  location: string;
  category: 'Historical Maps' | 'Royal Chiefs & Monarchy' | 'Colonial Frontiers' | 'Ecological & Riverways' | 'Ethnographic Portraits' | 'Architectural Heritage';
  imageUrl: string;
  thumbnailUrl?: string;
  caption: string;
  curatorNotes: string;
  archiveRef: string;
  physicalMedium?: string;
  dimensions?: string;
  tags: string[];
  references: Citation[];
}

