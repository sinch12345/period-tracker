export interface PeriodLog {
  id: string;
  startDate: string;
  endDate: string;
  flow: 'light' | 'medium' | 'heavy';
  symptoms: string[];
  notes?: string;
  sleepHours?: number;
  stressLevel?: 'low' | 'medium' | 'high';
}
export interface CycleStats {
  averageCycleLength: number; // default: 28 days
  averagePeriodLength: number; // default: 5 days
}

export interface PartnerSharingSettings {
  isEnabled: boolean;
  inviteCode?: string;
  expiresAt?: string; // ISO string for time-limited sharing
  
  // Granular Toggles (Default to false)
  shareMoodEnergy: boolean;       // Tier 1: Mood/Energy status
  shareCyclePhase: boolean;       // Tier 1: "Season" framing only
  shareNudges: boolean;           // Tier 1: Auto-generated thoughtful nudges
  sharePredictedDates: boolean;   // Tier 2: Expected start date
  shareGeneralSymptoms: boolean;  // Tier 2: Category only ("physical discomfort")
  sharePartnerNote: boolean;      // Tier 2: Manual custom message
  
  partnerNote?: string;
}

export interface PartnerViewData {
  moodIndicator?: string;
  cycleSeason?: string;
  nudge?: string;
  predictedStartDate?: string;
  symptomSummary?: string;
  customNote?: string;
}