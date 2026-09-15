# Ohio State Nutrition App

A lightweight React Native nutrition tracking app built with Expo. Log meals with calorie and macro (protein/carbs/fat) data, see a weekly calorie chart, and review or edit past entries.

## Features

- **Log entries** — food name, calories, and protein/carbs/fat grams
- **Weekly calorie chart** — bar chart of the last 7 days, built with `react-native-chart-kit`
- **Today's entries** — quick view of everything logged today, right on the home screen
- **History screen** — every entry, sorted newest first, with tap-to-edit and delete
- **Macro breakdown bar** — a compact segmented bar (protein/carbs/fat) next to each history entry, with a color legend
- **Sample data loader** — a "Load Sample Week" button seeds a full week of entries for demo purposes

## Tech stack

- [Expo](https://expo.dev/) (SDK 54) with [expo-router](https://docs.expo.dev/router/introduction/) for file-based navigation
- React Native + TypeScript
- `react-native-chart-kit` + `react-native-svg` for the weekly chart
- React Context (`EntriesContext`) for shared app state — no external state management library

## Project structure

```
app/
  index.tsx          # Home screen — log entry form, weekly chart, today's entries
  explore.tsx         # History screen — full entry list, edit/delete, macro bars
context/
  EntriesContext.tsx  # Shared entry state: addEntry, removeEntry, updateEntry, loadSampleData
components/
  MacroBar.tsx         # Segmented protein/carbs/fat visual
utils/
  dateUtils.ts         # isToday() — local-time date comparison
  chartData.ts          # getWeeklyCalorieData() — builds the last 7 days of totals
  seedData.ts            # generateSampleWeekEntries() — demo data for "Load Sample Week"
constants/
  theme.ts              # Colors and shared theming (OSU scarlet palette)
```

## Getting started

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** on your phone, or press `w` to run in a web browser.

## Data & persistence

Entries are held in memory via React Context for the duration of the app session. There is currently no persistent storage (e.g. `AsyncStorage`) — restarting the app clears all entries. This is a known limitation and a planned next step.

## Known limitations / next steps

- No persistent storage between app restarts
- No entry date-editing (entries are timestamped at creation)
- Weekly chart shows total calories only, not a macro breakdown per day
- "Load Sample Week" is a demo convenience and can be removed for production use