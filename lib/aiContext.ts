import { PeriodLog } from '@/types';

export function generateUserCycleContext(logs: PeriodLog[]) {
  if (!logs || logs.length === 0) {
    return "The user has not logged any cycle data yet.";
  }

  // Sort logs by start date descending
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  const lastLog = sortedLogs[0];
  const lastStart = new Date(lastLog.startDate);
  const today = new Date();
  
  const diffTime = Math.abs(today.getTime() - lastStart.getTime());
  const rawDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  const currentDay = ((rawDay - 1) % 28) + 1;

  let currentPhase = 'Menstrual Phase';
  if (currentDay > 5 && currentDay <= 13) currentPhase = 'Follicular Phase';
  else if (currentDay > 13 && currentDay <= 15) currentPhase = 'Ovulatory Phase';
  else if (currentDay > 15) currentPhase = 'Luteal Phase';

  const recentSymptoms = Array.from(
    new Set(sortedLogs.slice(0, 3).flatMap((l) => l.symptoms))
  );

  return `
USER'S LOGGED CYCLE DATA:
- Current Cycle Day: Day ${currentDay} of ~28
- Estimated Current Phase: ${currentPhase}
- Most Recent Period Start: ${lastLog.startDate} (Ended: ${lastLog.endDate})
- Recent Flow Level: ${lastLog.flow}
- Recent Logged Symptoms: ${recentSymptoms.length > 0 ? recentSymptoms.join(', ') : 'None logged'}
- Notes from last log: "${lastLog.notes || 'None'}"
`;
}