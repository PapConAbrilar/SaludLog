import React, { useState } from 'react';
import { Plus, Trash2, Calculator } from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  serving: number;
}

const commonFoods = [
  { name: 'Pollo (pechuga)', calories: 165, protein: 31, carbs: 0, fats: 3.6, serving: 100 },
  { name: 'Arroz integral', calories: 370, protein: 7.9, carbs: 77.2, fats: 2.9, serving: 100 },
  { name: 'Huevo', calories: 155, protein: 13, carbs: 1.1, fats: 11, serving: 100 },
  { name: 'Aguacate', calories: 160, protein: 2, carbs: 8.5, fats: 14.7, serving: 100 },
  { name: 'Avena', calories: 389, protein: 16.9, carbs: 66.3, fats: 6.9, serving: 100 },
  { name: 'Plátano', calories: 89, protein: 1.1, carbs: 22.8, fats: 0.3, serving: 100 },
  { name: 'Yogur natural', calories: 59, protein: 10, carbs: 3.6, fats: 0.4, serving: 100 },
  { name: 'Almendras', calories: 579, protein: 21.2, carbs: 21.6, fats: 49.9, serving: 100 }
];

interface NutritionCalculatorProps {
  darkMode: boolean;
}

export function NutritionCalculator({ darkMode }: NutritionCalculatorProps) {
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customAmount, setCustomAmount] = useState<{ [key: string]: number }>({});

  const addFood = (food: typeof commonFoods[0]) => {
    const newFood: FoodItem = {
      id: Date.now().toString(),
      ...food
    };
    setSelectedFoods([...selectedFoods, newFood]);
    setCustomAmount({ ...customAmount, [newFood.id]: 100 });
  };

  const removeFood = (id: string) => {
    setSelectedFoods(selectedFoods.filter(f => f.id !== id));
    const newAmounts = { ...customAmount };
    delete newAmounts[id];
    setCustomAmount(newAmounts);
  };

  const updateAmount = (id: string, amount: number) => {
    setCustomAmount({ ...customAmount, [id]: amount });
  };

  const calculateTotal = () => {
    return selectedFoods.reduce((acc, food) => {
      const multiplier = (customAmount[food.id] || 100) / 100;
      return {
        calories: acc.calories + (food.calories * multiplier),
        protein: acc.protein + (food.protein * multiplier),
        carbs: acc.carbs + (food.carbs * multiplier),
        fats: acc.fats + (food.fats * multiplier)
      };
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  const totals = calculateTotal();

  const filteredFoods = commonFoods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const cardBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200';
  const whiteBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const inputBg = darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300';
  const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-cyan-50';

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full">
          <Calculator className="text-white" size={20} />
        </div>
        <h2 className={`text-xl ${textColor}`}>Analizador Nutricional</h2>
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar alimento..."
          className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
        />
      </div>

      {/* Food suggestions */}
      {searchTerm && (
        <div className={`${whiteBg} rounded-xl border shadow-sm max-h-48 overflow-y-auto`}>
          {filteredFoods.map((food, idx) => (
            <button
              key={idx}
              onClick={() => {
                addFood(food);
                setSearchTerm('');
              }}
              className={`w-full px-4 py-3 text-left ${hoverBg} transition-colors border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} last:border-b-0`}
            >
              <p className={`text-sm ${textColor}`}>{food.name}</p>
              <p className={`text-xs ${textSecondary}`}>{food.calories} kcal por 100g</p>
            </button>
          ))}
        </div>
      )}

      {/* Selected Foods */}
      {selectedFoods.length > 0 && (
        <div className="space-y-3">
          <h3 className={`text-sm ${textColor}`}>Alimentos Seleccionados</h3>
          {selectedFoods.map((food) => (
            <div
              key={food.id}
              className={`${cardBg} rounded-xl p-4 border`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className={`text-sm ${textColor}`}>{food.name}</p>
                  <p className={`text-xs ${textSecondary} mt-1`}>
                    {((customAmount[food.id] || 100) / 100 * food.calories).toFixed(0)} kcal
                  </p>
                </div>
                <button
                  onClick={() => removeFood(food.id)}
                  className={`p-2 ${darkMode ? 'hover:bg-red-900/20' : 'hover:bg-red-100'} rounded-lg transition-colors`}
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={customAmount[food.id] || 100}
                  onChange={(e) => updateAmount(food.id, parseInt(e.target.value) || 0)}
                  className={`w-20 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
                />
                <span className={`text-sm ${textSecondary}`}>gramos</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Totals */}
      {selectedFoods.length > 0 && (
        <div className="bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl p-6 text-white shadow-lg">
          <h3 className="text-lg mb-4 flex items-center gap-2">
            <Calculator size={20} />
            Valores Totales
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-xs opacity-90">Calorías</p>
              <p className="text-2xl">{totals.calories.toFixed(0)}</p>
              <p className="text-xs opacity-90">kcal</p>
            </div>
            
            <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-xs opacity-90">Proteínas</p>
              <p className="text-2xl">{totals.protein.toFixed(1)}</p>
              <p className="text-xs opacity-90">g</p>
            </div>
            
            <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-xs opacity-90">Carbohidratos</p>
              <p className="text-2xl">{totals.carbs.toFixed(1)}</p>
              <p className="text-xs opacity-90">g</p>
            </div>
            
            <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-xs opacity-90">Grasas</p>
              <p className="text-2xl">{totals.fats.toFixed(1)}</p>
              <p className="text-xs opacity-90">g</p>
            </div>
          </div>
        </div>
      )}

      {selectedFoods.length === 0 && !searchTerm && (
        <div className="text-center py-12">
          <div className={`flex items-center justify-center w-16 h-16 ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-cyan-100 to-blue-100'} rounded-full mb-4 mx-auto`}>
            <Plus className={darkMode ? 'text-cyan-400' : 'text-cyan-500'} size={32} />
          </div>
          <p className={`${textSecondary} text-sm`}>Busca y agrega alimentos para calcular valores nutricionales</p>
        </div>
      )}
    </div>
  );
}