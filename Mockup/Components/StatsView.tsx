import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, Calendar, Award } from 'lucide-react';

const weeklyData = [
  { day: 'Lun', meals: 4, percentage: 100 },
  { day: 'Mar', meals: 3, percentage: 75 },
  { day: 'Mié', meals: 4, percentage: 100 },
  { day: 'Jue', meals: 3, percentage: 75 },
  { day: 'Vie', meals: 4, percentage: 100 },
  { day: 'Sáb', meals: 2, percentage: 50 },
  { day: 'Dom', meals: 4, percentage: 100 }
];

const nutritionData = [
  { day: 'Lun', proteinas: 85, carbohidratos: 78, grasas: 65, frutas: 90 },
  { day: 'Mar', proteinas: 70, carbohidratos: 82, grasas: 70, frutas: 85 },
  { day: 'Mié', proteinas: 90, carbohidratos: 75, grasas: 60, frutas: 95 },
  { day: 'Jue', proteinas: 75, carbohidratos: 88, grasas: 68, frutas: 80 },
  { day: 'Vie', proteinas: 88, carbohidratos: 80, grasas: 72, frutas: 88 },
  { day: 'Sáb', proteinas: 65, carbohidratos: 70, grasas: 75, frutas: 70 },
  { day: 'Dom', proteinas: 92, carbohidratos: 85, grasas: 65, frutas: 92 }
];

interface StatsViewProps {
  darkMode: boolean;
}

export function StatsView({ darkMode }: StatsViewProps) {
  const [viewType, setViewType] = useState<'weekly' | 'nutrition'>('weekly');

  const cardBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200';
  const whiteBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const toggleBg = darkMode ? 'bg-gray-800' : 'bg-gray-100';

  return (
    <div className="space-y-6 pb-8">
      <h2 className={`text-xl ${textColor}`}>Progreso y Estadísticas</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className={`${cardBg} rounded-xl p-4 border`}>
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full mb-2 mx-auto">
            <TrendingUp className="text-white" size={20} />
          </div>
          <p className="text-2xl text-center text-cyan-600">12</p>
          <p className={`text-xs text-center ${textSecondary} mt-1`}>Días seguidos</p>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'} rounded-xl p-4 border`}>
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full mb-2 mx-auto">
            <Calendar className="text-white" size={20} />
          </div>
          <p className="text-2xl text-center text-blue-600">86%</p>
          <p className={`text-xs text-center ${textSecondary} mt-1`}>Esta semana</p>
        </div>
        
        <div className={`${cardBg} rounded-xl p-4 border`}>
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full mb-2 mx-auto">
            <Award className="text-white" size={20} />
          </div>
          <p className="text-2xl text-center text-cyan-600">3</p>
          <p className={`text-xs text-center ${textSecondary} mt-1`}>Logros</p>
        </div>
      </div>

      {/* View Toggle */}
      <div className={`flex gap-2 ${toggleBg} p-1 rounded-xl`}>
        <button
          onClick={() => setViewType('weekly')}
          className={`flex-1 py-2 px-4 rounded-lg transition-all ${
            viewType === 'weekly'
              ? `${darkMode ? 'bg-gray-700' : 'bg-white'} text-cyan-600 shadow-sm`
              : textSecondary
          }`}
        >
          Registro Semanal
        </button>
        <button
          onClick={() => setViewType('nutrition')}
          className={`flex-1 py-2 px-4 rounded-lg transition-all ${
            viewType === 'nutrition'
              ? `${darkMode ? 'bg-gray-700' : 'bg-white'} text-cyan-600 shadow-sm`
              : textSecondary
          }`}
        >
          Balance Nutricional
        </button>
      </div>

      {/* Charts */}
      {viewType === 'weekly' ? (
        <div className={`${whiteBg} rounded-2xl p-4 shadow-sm border`}>
          <h3 className={`text-sm ${textColor} mb-4`}>Comidas Registradas por Día</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f0f0f0'} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }} />
              <YAxis tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? '#1f2937' : 'white',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: darkMode ? 'white' : 'black'
                }}
              />
              <Bar dataKey="meals" radius={[8, 8, 0, 0]}>
                {weeklyData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.percentage === 100 ? 'url(#colorGradient)' : '#94a3b8'} 
                  />
                ))}
              </Bar>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className={`${whiteBg} rounded-2xl p-4 shadow-sm border`}>
          <h3 className={`text-sm ${textColor} mb-4`}>Cumplimiento Nutricional (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={nutritionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#f0f0f0'} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }} />
              <YAxis tick={{ fontSize: 12, fill: darkMode ? '#9ca3af' : '#6b7280' }} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: darkMode ? '#1f2937' : 'white',
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  color: darkMode ? 'white' : 'black'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="proteinas" 
                stroke="#06b6d4" 
                strokeWidth={2}
                dot={{ fill: '#06b6d4', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="carbohidratos" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="grasas" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="frutas" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
              <span className={`text-xs ${textSecondary}`}>Proteínas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className={`text-xs ${textSecondary}`}>Carbohidratos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className={`text-xs ${textSecondary}`}>Grasas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className={`text-xs ${textSecondary}`}>Frutas/Verduras</span>
            </div>
          </div>
        </div>
      )}

      {/* Insights */}
      <div className="space-y-3">
        <h3 className={`text-sm ${textColor}`}>Áreas de Mejora</h3>
        
        <div className={`${darkMode ? 'bg-green-900/20 border-green-800' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'} rounded-xl p-4 border`}>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
            <div>
              <p className={`text-sm ${textColor}`}>Excelente consistencia</p>
              <p className={`text-xs ${textSecondary} mt-1`}>
                Llevas 12 días consecutivos registrando tus comidas. ¡Sigue así!
              </p>
            </div>
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-yellow-900/20 border-yellow-800' : 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200'} rounded-xl p-4 border`}>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5"></div>
            <div>
              <p className={`text-sm ${textColor}`}>Oportunidad de mejora</p>
              <p className={`text-xs ${textSecondary} mt-1`}>
                Los fines de semana tienden a tener menos registro. Intenta mantener el hábito.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}