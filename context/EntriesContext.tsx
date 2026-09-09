import React, { createContext, ReactNode, useContext, useState } from 'react';

// shape of a single logged entry
export type Entry = {
id: string;
    food: string;
    calories: number;
    protein: number; // grams
    carbs: number;   // grams
    fat: number;      // grams
    date: string; // ISO string, e.g. new Date().toISOString()
}

// context of entries, array of entry data to be shared across the app
type EntriesContextType = {
    entries: Entry[];

    // => void functions take no arguments and return nothing, used for adding and removing entries
    addEntry: (food: string, calories: number, protein: number, carbs: number, fat: number) => void;
    removeEntry: (id: string) => void;
    updateEntry: (id: string, updates: Partial<Omit<Entry, 'id'>>) => void;
}

// our entries context, declared without a default value, will be provided by the EntriesProvider component
const EntriesContext = createContext<EntriesContextType | undefined>(undefined);

// destructing child node from props so we can use it in the provider component
export function EntriesProvider({ children }: {children: ReactNode}) {
    // useState hook to manage the entries state, intialized as an empty array of Entry objects
    const [entries, setEntries] = useState<Entry[]>([]);

    // addEntry function within our provider component, takes food and calories as arguments, creates a new entry object with a unique id and current data, and updates the entries state with the new entry
    const addEntry = (food: string, calories: number, protein: number, carbs: number, fat: number) => {
        const newEntry: Entry = {
            id: Date.now().toString(),
            food,
            calories,
            protein,
            carbs,
            fat,
            date: new Date().toISOString(),
        };
        setEntries((prev) => [newEntry, ...prev]);
    };

    const removeEntry = (id: string) => {
        // removeEntry function within our provider component, takes an id as an argument and updates the entries state by filtering out the entry with the matching id
        setEntries((prev) => prev.filter((entry) => entry.id !== id))
    };

    const updateEntry = (id: string, updates: Partial<Omit<Entry, 'id'>>) => {
        setEntries((prev) => prev.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry))
        );
    }

    return (
        <EntriesContext.Provider value={{ entries, addEntry, removeEntry, updateEntry }}>
            {children}
        </EntriesContext.Provider>
    );
}

export function useEntries() {
    // custom hook to access the entries context, throws an error if used outside of the EntriesProvider
    // screens dont need to import the context directly, they can just use this hook to access the entries state and functions
    const context = useContext(EntriesContext);
    if (!context) {
        throw new Error('useEntries must be used within an EntriesProvider');
    }
    return context;
}