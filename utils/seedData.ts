// utils/seedData.ts
import { Entry } from '@/context/EntriesContext';

// Generates a realistic week of sample entries, spread across the last 7 days.
// Useful for demos where you want to show off the weekly chart without
// manually adding entries to 7 different days by hand.
export function generateSampleWeekEntries(): Entry[] {
  const sampleMeals = [
    { food: 'Chicken & rice bowl', calories: 650, protein: 45, carbs: 70, fat: 15 },
    { food: 'Greek yogurt & granola', calories: 320, protein: 20, carbs: 40, fat: 8 },
    { food: 'Turkey sandwich', calories: 480, protein: 28, carbs: 45, fat: 18 },
    { food: 'Protein shake', calories: 250, protein: 30, carbs: 15, fat: 5 },
    { food: 'Steak & vegetables', calories: 720, protein: 50, carbs: 30, fat: 35 },
    { food: 'Oatmeal & banana', calories: 380, protein: 12, carbs: 65, fat: 8 },
    { food: 'Pasta with marinara', calories: 590, protein: 18, carbs: 90, fat: 12 },
  ];

  const entries: Entry[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // Give each day 1-2 meals so totals vary and look realistic
    const mealsToday = sampleMeals[i % sampleMeals.length];
    entries.push({
      id: `seed-${i}-a`,
      food: mealsToday.food,
      calories: mealsToday.calories,
      protein: mealsToday.protein,
      carbs: mealsToday.carbs,
      fat: mealsToday.fat,
      date: date.toISOString(),
    });

    // Add a second, smaller entry on some days for variety
    if (i % 2 === 0) {
      const secondMeal = sampleMeals[(i + 3) % sampleMeals.length];
      entries.push({
        id: `seed-${i}-b`,
        food: secondMeal.food,
        calories: Math.round(secondMeal.calories * 0.6),
        protein: Math.round(secondMeal.protein * 0.6),
        carbs: Math.round(secondMeal.carbs * 0.6),
        fat: Math.round(secondMeal.fat * 0.6),
        date: date.toISOString(),
      });
    }
  }

  return entries;
}