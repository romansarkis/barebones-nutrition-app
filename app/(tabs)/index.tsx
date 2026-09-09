import { useEntries } from '@/context/EntriesContext';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [foodInput, setFoodInput] = useState('');
  const [calorieInput, setCalorieInput] = useState('');
  const [proteinInput, setProteinInput] = useState('');
  const [carbsInput, setCarbsInput] = useState('');
  const [fatInput, setFatInput] = useState('');

    const { entries, addEntry } = useEntries();

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

      <Text style={styles.subtitle}>Today's Entries</Text>

      {/* Entry list 
      *   Pull data from entries useState and display it in a FlatList
      *   If no entries exist, display a message saying "No entries yet."
      */}
      <FlatList
        data={entries}
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
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  subtitle: { fontSize: 18, fontWeight: '600', marginTop: 24, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 8 },
  macroRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  macroInput: { flex: 1 },
  button: { backgroundColor: '#2563eb', borderRadius: 8, padding: 12, marginTop: 4, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  food: { fontSize: 16, fontWeight: '500' },
  entryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  timestamp: { color: '#888', fontSize: 12, marginTop: 2 },
  empty: { color: '#888', marginTop: 12 },
});