import { useContext } from 'react';
import { sessionStatsContext } from './SessionStatsContext';

export const useSessionStats = () => {
  return useContext(sessionStatsContext);
}
