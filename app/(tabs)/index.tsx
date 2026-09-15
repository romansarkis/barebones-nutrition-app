import { Colors } from '@/constants/theme';
import { useEntries } from '@/context/EntriesContext';
import { getWeeklyCalorieData } from '@/utils/chartData';
import { isToday } from '@/utils/dateUtils';
import { generateSampleWeekEntries } from '@/utils/seedData';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';


const chartConfig = {
  backgroundGradientFrom: Colors.cardBackground,
  backgroundGradientTo: Colors.cardBackground,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(187, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(110, 110, 115, ${opacity})`,
  barPercentage: 0.9,
  fillShadowGradient: Colors.scarletMuted,
  fillShadowGradientOpacity: 1,
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: Colors.grayLight,
    strokeDasharray: '',
  },
  propsForLabels: {
    fontSize: 12,
    fontFamily: 'System',
  },
};

export default function HomeScreen() {
  const [foodInput, setFoodInput] = useState('');
  const [calorieInput, setCalorieInput] = useState('');
  const [proteinInput, setProteinInput] = useState('');
  const [carbsInput, setCarbsInput] = useState('');
  const [fatInput, setFatInput] = useState('');

  const { entries, addEntry, loadSampleData } = useEntries();
  
  // useMemo to compute weekly calorie data only when entries change, improving performance
  const weeklyData = useMemo(() => getWeeklyCalorieData(entries), [entries]);

  const { width: screenWidth } = useWindowDimensions();

  const todaysEntries = useMemo(() => entries.filter((entry) => isToday(entry.date)), [entries]);

  const handleAddEntry = () => {
    //if no calories entered, do not create a new entry
    if (calorieInput.trim() === '') return;

    //parse the calorie input to a number and add the entry using the addEntry function from the context
    const parsedCalories = parseInt(calorieInput, 10);
    if (isNaN(parsedCalories)) return;

    // default missing/invalid macro inputs to 0 rather than blocking submission
    const parsedProtein = parseInt(proteinInput, 10) || 0;
    const parsedCarbs = parseInt(carbsInput, 10) || 0;
    const parsedFat = parseInt(fatInput, 10) || 0;

    addEntry(foodInput.trim(), parsedCalories, parsedProtein, parsedCarbs, parsedFat);

    setFoodInput('');
    setCalorieInput('');
    setProteinInput('');
    setCarbsInput('');
    setFatInput('');
  };

  //UI component of homescreen
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.appTitle}>Ohio State Nutrition App</Text>

      <Text style={styles.title}>Log an Entry</Text>

      <TextInput style={styles.input} placeholder="Food name" value={foodInput} onChangeText={setFoodInput} />

      {/* Calorie Input */}
      <TextInput style={styles.input} placeholder="Calories" keyboardType="numeric" value={calorieInput} onChangeText={setCalorieInput}/>

      {/* Macro Inputs */}
      <View style={styles.macroRow}>
        <TextInput style={[styles.input, styles.macroInput]} placeholder="Protein (g)" keyboardType="numeric" value={proteinInput} onChangeText={setProteinInput} />
        <TextInput style={[styles.input, styles.macroInput]} placeholder="Carbs (g)" keyboardType="numeric" value={carbsInput} onChangeText={setCarbsInput} />
        <TextInput style={[styles.input, styles.macroInput]} placeholder="Fat (g)" keyboardType="numeric" value={fatInput} onChangeText={setFatInput} />
      </View>

      {/* Add Entry Button */}
      <TouchableOpacity style={styles.button} onPress={handleAddEntry}>
        <Text style={styles.buttonText}>Add Entry</Text>
      </TouchableOpacity>

      {/* Temporary — for demoing a full week's data. Remove before final submission. */}
      <TouchableOpacity
        style={styles.demoButton}
        onPress={() => loadSampleData(generateSampleWeekEntries())}
      >
        <Text style={styles.demoButtonText}>Load Sample Week</Text>
      </TouchableOpacity>

      {/* Chart Section */}
      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>This Week</Text>
        <BarChart
          data={weeklyData}
          width={screenWidth - 64}
          height={200}
          yAxisLabel=""
          yAxisSuffix=" cal"
          fromZero
          showValuesOnTopOfBars
          segments={4}
          chartConfig={chartConfig}
          style={{
            borderRadius: 8,
          }}
        />
      </View>

      <Text style={styles.subtitle}>Today's Entries</Text>

      {/* Entry list 
      *   Pull data from entries useState and display it in a FlatList
      *   If no entries exist, display a message saying "No entries yet."
      */}
      <FlatList
        data={todaysEntries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entryRow}>
            <View>
              <Text style={styles.food}>{item.food || 'Untitled entry'}</Text>
              <Text style={styles.timestamp}>
                {item.protein}g Protein, {item.carbs}g Carbs, {item.fat}g Fat
              </Text>
            </View>
            <Text>{item.calories} cal</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No entries yet.</Text>}
      />

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#fff' },
  appTitle: { fontSize: 14, fontWeight: '600', color: Colors.scarlet, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  subtitle: { fontSize: 18, fontWeight: '600', marginTop: 24, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 8 },
  macroRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  macroInput: { flex: 1, minWidth: 0 },
  button: { backgroundColor: Colors.scarlet, borderRadius: 8, padding: 12, marginTop: 4, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  food: { fontSize: 16, fontWeight: '500' },
  entryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  timestamp: { color: '#888', fontSize: 12, marginTop: 2 },
  empty: { color: '#888', marginTop: 12 },
  chartCard: { backgroundColor: '#ffffff', borderRadius: 12, padding: 16, marginVertical: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, },
  chartTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#1a1a1a', },
  demoButton: { backgroundColor: '#e5e5e5', paddingVertical: 8, borderRadius: 6, alignItems: 'center', marginBottom: 12, },
  demoButtonText: { color: '#555', fontSize: 13, },
});