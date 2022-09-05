# react-native-session-stats

Package provides context that stores information about user session. Next information is available - `timeSpent`, `sessionCount` and `lastSessionEnd`. Package can be used for internal analytics, as well as for implementing UI user will interact with. Some possible use cases are:
- show user session time;
- show popup, based on session count or session time;
- log out user after specified session time;
- send warning push notifications on session end.

## Install

```
// npm usage
npm i @kkurko/react-native-session-stats

// yarn usage
yarn add @kkurko/react-native-session-stats
```

## Usage

The `SessionStats` component takes two props: `onSessionStart` is fired when the app's state changes to `active`, `onSessionEnd`, when it changes to `inactive` or `background`.

```javascript
import SessionStats from '@kkurko/react-native-session-stats';

// ...

<SessionStats
  onSessionStart={({
    timeSpent, // total time spent, in seconds
    sessionCount, // number of sessions as of at opening the app
    lastSessionEnd, // timestamp of the last session end
  }) => { /* ... */ }}
  onSessionEnd={({
    timeSpent, // total time spent in seconds
    sessionCount, // and number of sessions as of at closing the app
    lastSessionEnd, // timestamp of the last session end
    sessionDuration, // the length of the ending session, in seconds
  }) => { /* ... */ }}
/>
```
 
`SessionStats` is used as a context provider

```javascript
import SessionStats from '@kkurko/react-native-session-stats';

// ...

<SessionStats>
  <App />
<SessionStats/>
```

Values are available via `useSessionStats` hook:

```javascript
import { useSessionStats } from '@kkurko/react-native-session-stats';

const SomeComponent = () => {
    const { timeSpent, sessionCount, lastSessionEnd } = useSessionStats();
    //...
};
```


or via `sessionStatsContext` and `useContext` hook:

```javascript
import { useContext } from 'react';
import { sessionStatsContext } from '@kkurko/react-native-session-stats';

const SomeComponent = () => {
    const { timeSpent, sessionCount, lastSessionEnd } = useContext(sessionStatsContext);
    //...
};
```
