import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionStats } from './types'
import { ASYNC_STORAGE_KEY, CHANGE_EVENT } from './const';
import { isActive, getNow, isInactiveOrBackground } from './utils';

export const sessionStatsContext = createContext<SessionStats>({
  timeSpent: 0,
  sessionCount: 0,
  lastSessionEnd: 0,
});

type Props = {
  children: ReactNode;
  onSessionStart: (stats: SessionStats) => void;
  onSessionEnd: (stats: SessionStats) => void;
}

const SessionStatsProvider = ({ children, onSessionStart, onSessionEnd }: Props) => {
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    timeSpent: 0,
    sessionCount: 0,
    lastSessionEnd: 0,
  })

  const [appState, setAppState] = useState(AppState.currentState);
  const [activeFrom, setActiveFrom] = useState<number>(0);

  const handleSessionStart = async () => {
    setActiveFrom(getNow())

    const persistedStats = await AsyncStorage.getItem(ASYNC_STORAGE_KEY)

    const stats = persistedStats ? JSON.parse(persistedStats) : sessionStats

    setSessionStats(stats)
    onSessionStart(stats);
  }

  const handleSessionEnd = () => {
    const { timeSpent, sessionCount } = sessionStats;
    const now = getNow();
    const sessionDuration = now - activeFrom;

    const updatedSessionStats = {
      timeSpent: timeSpent + sessionDuration,
      sessionCount: sessionCount + 1,
      lastSessionEnd: now,
    };

    AsyncStorage.setItem(
      ASYNC_STORAGE_KEY,
      JSON.stringify(updatedSessionStats),
    );

    onSessionEnd({
      ...updatedSessionStats,
      sessionDuration,
    });
  }

  const handleAppStateChange = (nextAppState) => {
    if (isInactiveOrBackground(appState) && isActive(nextAppState)) {
      handleSessionStart();
    } else if (isActive(appState) && isInactiveOrBackground(nextAppState)) {
      handleSessionEnd();
    }
    setAppState(nextAppState);
  }

  useEffect(() => {
    const subscription = AppState.addEventListener(CHANGE_EVENT, handleAppStateChange);

    return () => {
      subscription.remove()
    }
  }, [handleAppStateChange])

  return (
    <sessionStatsContext.Provider value={sessionStats}>
      {children}
    </sessionStatsContext.Provider>
  );
}

export default SessionStatsProvider
