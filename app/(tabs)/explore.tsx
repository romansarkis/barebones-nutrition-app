import { Entry, useEntries } from '@/context/EntriesContext';
import { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function ExploreScreen() {
  const { entries, updateEntry, removeEntry } = useEntries();
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

   // local input state for the edit modal
  const [foodInput, setFoodInput] = useState('');
  const [calorieInput, setCalorieInput] = useState('');
  const [proteinInput, setProteinInput] = useState('');
  const [carbsInput, setCarbsInput] = useState('');
  const [fatInput, setFatInput] = useState('');

  const openEditModal = (entry: Entry) => {
    setEditingEntry(entry);
    setFoodInput(entry.food);
    setCalorieInput(entry.calories.toString());
    setProteinInput(entry.protein.toString());
    setCarbsInput(entry.carbs.toString());
    setFatInput(entry.fat.toString());
  };

  const handleSave = () => {
    if (!editingEntry) return;

    const parsedCalories = parseInt(calorieInput, 10);
    if (isNaN(parsedCalories)) return;

    updateEntry(editingEntry.id, {
      food: foodInput.trim(),
      calories: parsedCalories,
      protein: parseInt(proteinInput, 10) || 0,
      carbs: parseInt(carbsInput, 10) || 0,
      fat: parseInt(fatInput, 10) || 0,
    });

    setEditingEntry(null);
  };

  const handleDelete = () => {
    if (!editingEntry) return;
    removeEntry(editingEntry.id);
    setEditingEntry(null);
  };

 return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.entryRow} onPress={() => openEditModal(item)}>
            <View>
              <Text style={styles.food}>{item.food || 'Untitled entry'}</Text>
              <Text style={styles.timestamp}>
                {new Date(item.date).toLocaleDateString()} · {new Date(item.date).toLocaleTimeString()}
              </Text>
            </View>
            <Text style={styles.calories}>{item.calories} cal</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No entries yet.</Text>}
      />

      <Modal visible={editingEntry !== null} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Edit Entry</Text>

            <TextInput style={styles.input} placeholder="Food name" value={foodInput} onChangeText={setFoodInput} />
            <TextInput style={styles.input} placeholder="Calories" keyboardType="numeric" value={calorieInput} onChangeText={setCalorieInput} />
            <View style={styles.macroRow}>
              <TextInput style={[styles.input, styles.macroInput]} placeholder="Protein (g)" keyboardType="numeric" value={proteinInput} onChangeText={setProteinInput} />
              <TextInput style={[styles.input, styles.macroInput]} placeholder="Carbs (g)" keyboardType="numeric" value={carbsInput} onChangeText={setCarbsInput} />
              <TextInput style={[styles.input, styles.macroInput]} placeholder="Fat (g)" keyboardType="numeric" value={fatInput} onChangeText={setFatInput} />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setEditingEntry(null)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  entryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  food: { fontSize: 16, fontWeight: '500' },
  timestamp: { color: '#888', fontSize: 12, marginTop: 2 },
  calories: { fontSize: 16, fontWeight: '600' },
  empty: { color: '#888', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 8 },
  macroRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  macroInput: { flex: 1 },
  button: { backgroundColor: '#2563eb', borderRadius: 8, padding: 12, marginTop: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  deleteButton: { backgroundColor: '#dc2626' },
  cancelButton: { padding: 12, marginTop: 4, alignItems: 'center' },
  cancelText: { color: '#666', fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20, paddingBottom: 40 },
});