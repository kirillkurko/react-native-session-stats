export type SessionStats = {
  timeSpent: number;
  sessionCount: number;
  lastSessionEnd: number;
  sessionDuration?: number;
}

export enum AppState {
  Active = 'active',
  Inactive = 'inactive',
  Background = 'background',
}
