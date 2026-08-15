export interface PeriodLog {
  id: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  flow: 'light' | 'medium' | 'heavy';
  symptoms: string[];
  notes?: string;
}

export interface CycleStats {
  averageCycleLength: number; // default: 28 days
  averagePeriodLength: number; // default: 5 days
}