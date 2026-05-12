import React, { useState } from 'react';
import { Droplet, AlertTriangle, TrendingDown, Plus } from 'lucide-react';

interface SodiumTrackerProps {
  darkMode: boolean;
  userData: {
    sodiumLimit?: number;
  };
}

interface SodiumEntry {
  id: string;
  food: string;
  amount: number;
  time: string;
}

export function SodiumTracker({ darkMode, userData }: SodiumTrackerProps) {
  const [sodiumEntries, setSodiumEntries] = useState<SodiumEntry[]>([
    { id: '1', food: 'Avena con frutas', amount: 150, time: '08:00' },
    { id: '2', food: 'Ensalada de pollo', amount: 480, time: '13:00' },
    { id: '3', food: 'Yogur natural', amount: 85, time: '17:00' }
  ]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFood, setNewFood] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const sodiumLimit = userData.sodiumLimit || 2300;
  const totalSodium = sodiumEntries.reduce((acc, entry) => acc + entry.amount, 0);
  const percentage = (totalSodium / sodiumLimit) * 100;
  const remaining = sodiumLimit - totalSodium;

  const getStatusColor = () => {
    if (percentage >= 100) return 'text-red-500';
    if (percentage >= 80) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getProgressBarColor = () => {
    if (percentage >= 100) return 'from-red-400 to-red-500';
    if (percentage >= 80) return 'from-yellow-400 to-yellow-500';
    return 'from-green-400 to-green-500';
  };

  const addEntry = () => {
    if (newFood && newAmount) {
      const entry: SodiumEntry = {
        id: Date.now().toString(),
        food: newFood,
        amount: parseInt(newAmount),
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };
      setSodiumEntries([...sodiumEntries, entry]);
      setNewFood('');
      setNewAmount('');
      setShowAddModal(false);
    }
  };

  const cardBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const inputBg = darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300';
  const accentBg = darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200';

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplet className={darkMode ? 'text-cyan-400' : 'text-cyan-500'} size={24} />
            <h2 className={`text-lg ${textColor}`}>Control de Sodio</h2>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="p-2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-lg hover:from-cyan-500 hover:to-cyan-600 transition-all"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Main Card */}
        <div className={`${accentBg} rounded-2xl p-6 shadow-sm border`}>
          {/* Progress Circle/Stats */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <p className={`text-sm ${textSecondary} mb-2`}>Consumo de hoy</p>
              <div className="flex items-baseline gap-2">
                <p className={`text-4xl ${getStatusColor()}`}>
                  {totalSodium}
                </p>
                <p className={`text-lg ${textSecondary}`}>/ {sodiumLimit} mg</p>
              </div>
              <p className={`text-sm mt-2 ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {remaining >= 0 ? `Quedan ${remaining} mg` : `Excedido por ${Math.abs(remaining)} mg`}
              </p>
            </div>

            {/* Status Icon */}
            <div className={`flex items-center justify-center w-20 h-20 rounded-full ${
              percentage >= 100 
                ? 'bg-red-100' 
                : percentage >= 80 
                  ? 'bg-yellow-100' 
                  : 'bg-green-100'
            }`}>
              {percentage >= 100 ? (
                <AlertTriangle className="text-red-500" size={36} />
              ) : percentage >= 80 ? (
                <AlertTriangle className="text-yellow-500" size={36} />
              ) : (
                <TrendingDown className="text-green-500" size={36} />
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className={`h-4 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-full overflow-hidden shadow-inner`}>
            <div 
              className={`h-full bg-gradient-to-r ${getProgressBarColor()} transition-all duration-500 rounded-full`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <p className={`text-xs text-center mt-2 ${textSecondary}`}>
            {percentage.toFixed(0)}% del límite diario
          </p>
        </div>

        {/* Sodium Entries */}
        {sodiumEntries.length > 0 && (
          <div className={`${cardBg} rounded-2xl p-4 shadow-sm border`}>
            <h3 className={`text-sm mb-3 ${textSecondary}`}>Detalle de consumo</h3>
            <div className="space-y-2">
              {sodiumEntries.map((entry) => (
                <div
                  key={entry.id}
                  className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}
                >
                  <div className="flex-1">
                    <p className={`text-sm ${textColor}`}>{entry.food}</p>
                    <p className={`text-xs ${textSecondary}`}>{entry.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`${textColor}`}>{entry.amount} mg</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Health Alert */}
        {percentage >= 80 && (
          <div className={`${percentage >= 100 ? 'bg-red-100 border-red-300' : 'bg-yellow-100 border-yellow-300'} rounded-xl p-4 border`}>
            <div className="flex items-start gap-3">
              <AlertTriangle className={percentage >= 100 ? 'text-red-600' : 'text-yellow-600'} size={20} />
              <div>
                <p className={`text-sm ${percentage >= 100 ? 'text-red-800' : 'text-yellow-800'}`}>
                  {percentage >= 100 
                    ? '⚠️ Has superado tu límite diario de sodio' 
                    : '⚠️ Te acercas a tu límite diario'}
                </p>
                <p className={`text-xs mt-1 ${percentage >= 100 ? 'text-red-700' : 'text-yellow-700'}`}>
                  El exceso de sodio puede aumentar el riesgo de hipertensión. 
                  Intenta elegir alimentos bajos en sal para tus próximas comidas.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div 
            className={`${cardBg} rounded-2xl max-w-md w-full p-6 border`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={`text-lg mb-4 ${textColor}`}>Agregar Consumo de Sodio</h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm mb-2 ${textSecondary}`}>
                  Alimento
                </label>
                <input
                  type="text"
                  value={newFood}
                  onChange={(e) => setNewFood(e.target.value)}
                  placeholder="Ej: Pan integral"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
                />
              </div>

              <div>
                <label className={`block text-sm mb-2 ${textSecondary}`}>
                  Cantidad de sodio (mg)
                </label>
                <input
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="Ej: 250"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
                />
              </div>

              <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg p-3`}>
                <p className={`text-xs ${textSecondary}`}>
                  💡 Tip: Revisa las etiquetas nutricionales. 1g de sal = 400mg de sodio aproximadamente.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className={`flex-1 px-4 py-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} ${textColor} rounded-xl hover:bg-gray-200 transition-colors`}
                >
                  Cancelar
                </button>
                <button
                  onClick={addEntry}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-xl hover:from-cyan-500 hover:to-cyan-600 transition-all"
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
