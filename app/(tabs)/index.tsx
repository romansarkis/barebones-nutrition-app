import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Entry object (TypeScript Type Alias / Type Definition in React Native)
type Entry = {
  id: string;
  calories: string;
  timestamp: string;
}

export default function HomeScreen() {
  //Logic component of homescreen
  //calorie input (expects an empty string)
  const [calorieInput, setCalorieInput] = useState('');
  //entries input (expects an array of entry objects)
  const [entries, setEntries] = useState<Entry[]>([]);

  const addEntry = () => {
    //if no calories entered, do not create a new entry
    if (calorieInput.trim() === '') return;

    const newEntry: Entry = {
      //id = date in string form
      id: Date.now().toString(),
      // directly assign value fromo calorieInput useState
      calories: calorieInput,
      //calculate timestamp
      timestamp: new Date().toLocaleTimeString(),
    };

    //after data is parsed from useStates, update entries with the new entry and all others
    setEntries([newEntry, ...entries]);
    //same with calorieinput
    setCalorieInput('');
  };

  //UI component of homescreen
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Log an Entry</Text>

      {/* Calorie Input */}
      <TextInput style={styles.input} placeholder="Calories" keyboardType="numeric" value={calorieInput} onChangeText={setCalorieInput}/>

      {/* Add Entry Button */}
      <TouchableOpacity style={styles.button} onPress={addEntry}>
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
            <Text>{item.calories} cal</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No entries yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  subtitle: { fontSize: 18, fontWeight: '600', marginTop: 24, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16 },
  button: { backgroundColor: '#2563eb', borderRadius: 8, padding: 12, marginTop: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  entryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  timestamp: { color: '#888' },
  empty: { color: '#888', marginTop: 12 },
});