import React, { useState } from 'react';
import { Coffee, Sandwich, Apple, Moon, Plus, Check, Edit2 } from 'lucide-react';

interface Meal {
  id: string;
  name: string;
  icon: React.ReactNode;
  time: string;
  logged: boolean;
  items?: string[];
}

interface DailyTrackerProps {
  darkMode: boolean;
}

export function DailyTracker({ darkMode }: DailyTrackerProps) {
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: 'breakfast',
      name: 'Desayuno',
      icon: <Coffee size={20} />,
      time: '08:00',
      logged: true,
      items: ['Avena con frutas', 'Té verde']
    },
    {
      id: 'lunch',
      name: 'Almuerzo',
      icon: <Sandwich size={20} />,
      time: '13:00',
      logged: true,
      items: ['Ensalada de pollo', 'Arroz integral']
    },
    {
      id: 'snack',
      name: 'Merienda',
      icon: <Apple size={20} />,
      time: '17:00',
      logged: true,
      items: ['Yogur natural', 'Almendras']
    },
    {
      id: 'dinner',
      name: 'Cena',
      icon: <Moon size={20} />,
      time: '20:00',
      logged: false,
      items: []
    }
  ]);

  const [editingMeal, setEditingMeal] = useState<string | null>(null);
  const [mealInput, setMealInput] = useState('');

  const toggleMeal = (id: string) => {
    setMeals(meals.map(meal => 
      meal.id === id ? { ...meal, logged: !meal.logged } : meal
    ));
  };

  const addMealItem = (id: string) => {
    if (!mealInput.trim()) return;
    
    setMeals(meals.map(meal => 
      meal.id === id 
        ? { ...meal, items: [...(meal.items || []), mealInput.trim()], logged: true }
        : meal
    ));
    setMealInput('');
    setEditingMeal(null);
  };

  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-500';
  const cardBg = darkMode ? 'bg-gray-700' : 'bg-gray-50';
  const cardBgLogged = darkMode ? 'bg-gray-700 border-cyan-500' : 'bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200';
  const inputBg = darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'bg-white border-cyan-300';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg ${textColor}`}>Registro Diario</h2>
        <span className={`text-sm ${textSecondary}`}>
          {meals.filter(m => m.logged).length}/{meals.length} comidas
        </span>
      </div>

      <div className="space-y-3">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className={`rounded-xl p-4 transition-all border ${
              meal.logged
                ? cardBgLogged
                : `${cardBg} ${darkMode ? 'border-gray-600' : 'border-gray-200'}`
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  meal.logged 
                    ? 'bg-gradient-to-br from-cyan-400 to-cyan-500 text-white' 
                    : `${darkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-300 text-gray-600'}`
                }`}>
                  {meal.icon}
                </div>
                <div>
                  <h3 className={`${meal.logged ? textColor : textSecondary}`}>
                    {meal.name}
                  </h3>
                  <p className={`text-xs ${textSecondary}`}>{meal.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditingMeal(editingMeal === meal.id ? null : meal.id)}
                  className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-white'} transition-colors`}
                >
                  {editingMeal === meal.id ? (
                    <Check size={18} className="text-cyan-500" />
                  ) : (
                    <Edit2 size={18} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                  )}
                </button>
                
                <button
                  onClick={() => toggleMeal(meal.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    meal.logged
                      ? 'bg-gradient-to-br from-cyan-400 to-cyan-500 border-cyan-500'
                      : `${darkMode ? 'border-gray-500 bg-gray-700' : 'border-gray-300 bg-white'}`
                  }`}
                >
                  {meal.logged && <Check size={14} className="text-white" />}
                </button>
              </div>
            </div>

            {meal.logged && meal.items && meal.items.length > 0 && (
              <div className="mt-3 space-y-1 ml-11">
                {meal.items.map((item, idx) => (
                  <p key={idx} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>• {item}</p>
                ))}
              </div>
            )}

            {editingMeal === meal.id && (
              <div className="mt-3 ml-11 flex gap-2">
                <input
                  type="text"
                  value={mealInput}
                  onChange={(e) => setMealInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addMealItem(meal.id)}
                  placeholder="Agregar alimento..."
                  className={`flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
                />
                <button
                  onClick={() => addMealItem(meal.id)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-lg hover:from-cyan-500 hover:to-cyan-600 transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}