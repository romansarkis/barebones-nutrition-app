import { StyleSheet, View } from 'react-native';

type MacroBarProps = {
  protein: number;
  carbs: number;
  fat: number;
};

export function MacroBar({ protein, carbs, fat }: MacroBarProps) {
  const total = protein + carbs + fat;
  if (total === 0) return null;

  const proteinPct = (protein / total) * 100;
  const carbsPct = (carbs / total) * 100;
  const fatPct = (fat / total) * 100;

  return (
    <View style={styles.track}>
      <View style={[styles.segment, { width: `${proteinPct}%`, backgroundColor: '#eb5449' }]} />
      <View style={[styles.segment, { width: `${carbsPct}%`, backgroundColor: '#e6bc4a' }]} />
      <View style={[styles.segment, { width: `${fatPct}%`, backgroundColor: '#2456e0' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    height: 16,        // was 8 — match roughly to your calorie fontSize
    width: 100,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  segment: {
    height: '100%',
  },
});