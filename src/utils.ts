import { AppState } from './types';
import { MILLISECONDS_IN_SECOND } from './const';

export const getNow = () => Math.round(Date.now() / MILLISECONDS_IN_SECOND);

export const isActive = (appState) => appState === AppState.Active;

export const isInactiveOrBackground = (appState) => appState === AppState.Inactive || appState === AppState.Background
