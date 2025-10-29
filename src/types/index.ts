export interface EmotionEntry {
  id: string;
  date: string;
  time: string;
  emotion: string;
  intensity: number;
  trigger: string;
  bodyFeeling: string;
  copingUsed: string;
  effectiveness?: number;
}

export interface ThoughtRecord {
  id: string;
  date: string;
  time: string;
  situation: string;
  emotion: string;
  emotionBefore: number;
  automaticThought: string;
  evidenceFor: string;
  evidenceAgainst: string;
  balancedThought: string;
  emotionAfter: number;
}

export interface DearManPlan {
  id: string;
  date: string;
  scenario: string;
  describe: string;
  express: string;
  assert: string;
  reinforce: string;
  mindful: string;
  appear: string;
  negotiate: string;
}

export interface CrisisTimer {
  type: 'cold-water' | 'exercise' | 'breathing' | 'muscle';
  duration: number;
  remaining: number;
  isActive: boolean;
}

export interface UserProgress {
  level: 'beginner' | 'intermediate' | 'advanced';
  daysActive: number;
  totalRecords: number;
  achievements: string[];
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  reminderTime: string;
  language: string;
  dataSync: boolean;
}
