import { useContext } from 'react';
import { sessionStatsContext } from './sessionStatsContext';

export const useSessionStats = () => {
  return useContext(sessionStatsContext);
}
