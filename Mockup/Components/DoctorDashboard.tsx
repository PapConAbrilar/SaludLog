import React, { useState } from 'react';
import { Users, Search, TrendingUp, AlertCircle, Activity, FileText } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  sodiumAvg: number;
  compliance: number;
  alerts: number;
  weight: number;
  height: number;
  bmi: number;
}

const patients: Patient[] = [
  {
    id: '1',
    name: 'María García',
    age: 32,
    gender: 'F',
    lastVisit: '2026-04-13',
    sodiumAvg: 1850,
    compliance: 85,
    alerts: 0,
    weight: 65,
    height: 165,
    bmi: 23.9
  },
  {
    id: '2',
    name: 'Juan Pérez',
    age: 45,
    gender: 'M',
    lastVisit: '2026-04-12',
    sodiumAvg: 2450,
    compliance: 72,
    alerts: 2,
    weight: 82,
    height: 175,
    bmi: 26.8
  },
  {
    id: '3',
    name: 'Ana Martínez',
    age: 58,
    gender: 'F',
    lastVisit: '2026-04-11',
    sodiumAvg: 2100,
    compliance: 90,
    alerts: 0,
    weight: 70,
    height: 160,
    bmi: 27.3
  },
  {
    id: '4',
    name: 'Carlos López',
    age: 38,
    gender: 'M',
    lastVisit: '2026-04-10',
    sodiumAvg: 2680,
    compliance: 65,
    alerts: 3,
    weight: 95,
    height: 180,
    bmi: 29.3
  }
];

const patientDetailData = [
  { day: 'Lun', sodio: 1800, calorias: 1950 },
  { day: 'Mar', sodio: 1650, calorias: 2100 },
  { day: 'Mié', sodio: 1900, calorias: 2000 },
  { day: 'Jue', sodio: 1750, calorias: 1850 },
  { day: 'Vie', sodio: 2000, calorias: 2150 },
  { day: 'Sáb', sodio: 1850, calorias: 1900 },
  { day: 'Dom', sodio: 1950, calorias: 2050 }
];

interface DoctorDashboardProps {
  darkMode: boolean;
}

export function DoctorDashboard({ darkMode }: DoctorDashboardProps) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const inputBg = darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300';

  if (selectedPatient) {
    return (
      <div className="space-y-6 pb-8">
        {/* Back Button */}
        <button
          onClick={() => setSelectedPatient(null)}
          className="flex items-center gap-2 text-cyan-500 hover:text-cyan-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a pacientes
        </button>

        {/* Patient Header */}
        <div className={`${cardBg} rounded-2xl p-6 shadow-sm border`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full">
                <Users className="text-white" size={28} />
              </div>
              <div>
                <h2 className={`text-xl ${textColor}`}>{selectedPatient.name}</h2>
                <p className={`text-sm ${textSecondary}`}>
                  {selectedPatient.age} años • {selectedPatient.gender === 'M' ? 'Masculino' : 'Femenino'}
                </p>
                <p className={`text-xs ${textSecondary} mt-1`}>
                  Última visita: {new Date(selectedPatient.lastVisit).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>
            {selectedPatient.alerts > 0 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-full">
                <AlertCircle size={16} />
                <span className="text-sm">{selectedPatient.alerts} alertas</span>
              </div>
            )}
          </div>

          {/* Vital Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-cyan-50 to-blue-50'} rounded-xl p-3 border ${darkMode ? 'border-gray-600' : 'border-cyan-200'}`}>
              <p className={`text-xs ${textSecondary} mb-1`}>IMC</p>
              <p className={`text-2xl ${textColor}`}>{selectedPatient.bmi}</p>
            </div>
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-cyan-50 to-blue-50'} rounded-xl p-3 border ${darkMode ? 'border-gray-600' : 'border-cyan-200'}`}>
              <p className={`text-xs ${textSecondary} mb-1`}>Peso</p>
              <p className={`text-2xl ${textColor}`}>{selectedPatient.weight}</p>
              <p className={`text-xs ${textSecondary}`}>kg</p>
            </div>
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-cyan-50 to-blue-50'} rounded-xl p-3 border ${darkMode ? 'border-gray-600' : 'border-cyan-200'}`}>
              <p className={`text-xs ${textSecondary} mb-1`}>Altura</p>
              <p className={`text-2xl ${textColor}`}>{selectedPatient.height}</p>
              <p className={`text-xs ${textSecondary}`}>cm</p>
            </div>
          </div>
        </div>

        {/* Sodium Tracking */}
        <div className={`${cardBg} rounded-2xl p-6 shadow-sm border`}>
          <h3 className={`text-lg mb-4 ${textColor}`}>Control de Sodio Semanal</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={patientDetailData}>
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
              <Line 
                type="monotone" 
                dataKey="sodio" 
                stroke="#06b6d4" 
                strokeWidth={2}
                dot={{ fill: '#06b6d4', r: 4 }}
                name="Sodio (mg)"
              />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className={`text-sm ${textSecondary}`}>Promedio semanal</p>
              <p className={`text-2xl ${selectedPatient.sodiumAvg > 2300 ? 'text-red-500' : 'text-green-500'}`}>
                {selectedPatient.sodiumAvg} mg
              </p>
            </div>
            <div className="text-right">
              <p className={`text-sm ${textSecondary}`}>Límite recomendado</p>
              <p className={`text-xl ${textColor}`}>2300 mg</p>
            </div>
          </div>
        </div>

        {/* Compliance */}
        <div className={`${cardBg} rounded-2xl p-6 shadow-sm border`}>
          <h3 className={`text-lg mb-4 ${textColor}`}>Cumplimiento del Programa</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className={textSecondary}>Registro de comidas</span>
                <span className={`${selectedPatient.compliance >= 80 ? 'text-green-500' : 'text-yellow-500'}`}>
                  {selectedPatient.compliance}%
                </span>
              </div>
              <div className={`h-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                <div 
                  className={`h-full rounded-full ${selectedPatient.compliance >= 80 ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-yellow-400 to-yellow-500'}`}
                  style={{ width: `${selectedPatient.compliance}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lab Results */}
        <div className={`${cardBg} rounded-2xl p-6 shadow-sm border`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg ${textColor}`}>Resultados de Exámenes</h3>
            <FileText className={darkMode ? 'text-cyan-400' : 'text-cyan-500'} size={20} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className={textColor}>Presión Arterial</p>
                <p className={`text-xs ${textSecondary}`}>2026-04-10</p>
              </div>
              <p className={`${textColor}`}>120/80 mmHg</p>
            </div>
            
            <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className={textColor}>Glucosa</p>
                <p className={`text-xs ${textSecondary}`}>2026-04-10</p>
              </div>
              <p className={`${textColor}`}>95 mg/dL</p>
            </div>
            
            <div className="flex justify-between items-center py-3">
              <div>
                <p className={textColor}>Colesterol Total</p>
                <p className={`text-xs ${textSecondary}`}>2026-04-10</p>
              </div>
              <p className={`${textColor}`}>185 mg/dL</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className={`${cardBg} rounded-2xl p-6 shadow-sm border`}>
          <h3 className={`text-lg mb-4 ${textColor}`}>Notas Clínicas</h3>
          <textarea
            placeholder="Agregar notas sobre el seguimiento del paciente..."
            rows={4}
            className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
          />
          <button className="mt-3 px-6 py-2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-xl hover:from-cyan-500 hover:to-cyan-600 transition-all">
            Guardar Nota
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`${cardBg} rounded-xl p-4 shadow-sm border`}>
          <div className="flex items-center gap-3 mb-2">
            <Users className={darkMode ? 'text-cyan-400' : 'text-cyan-500'} size={20} />
            <p className={`text-sm ${textSecondary}`}>Pacientes</p>
          </div>
          <p className={`text-2xl ${textColor}`}>{patients.length}</p>
        </div>
        
        <div className={`${cardBg} rounded-xl p-4 shadow-sm border`}>
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="text-red-500" size={20} />
            <p className={`text-sm ${textSecondary}`}>Alertas</p>
          </div>
          <p className={`text-2xl ${textColor}`}>
            {patients.reduce((acc, p) => acc + p.alerts, 0)}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search size={18} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar paciente..."
          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
        />
      </div>

      {/* Patients List */}
      <div>
        <h3 className={`text-lg mb-4 ${textColor}`}>Mis Pacientes</h3>
        <div className="space-y-3">
          {filteredPatients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className={`w-full ${cardBg} rounded-xl p-4 shadow-sm border hover:border-cyan-400 transition-all text-left`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full">
                    <Users className="text-white" size={20} />
                  </div>
                  <div>
                    <p className={`${textColor}`}>{patient.name}</p>
                    <p className={`text-xs ${textSecondary}`}>
                      {patient.age} años • {patient.gender === 'M' ? 'M' : 'F'}
                    </p>
                  </div>
                </div>
                {patient.alerts > 0 && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 rounded-full">
                    <AlertCircle size={14} />
                    <span className="text-xs">{patient.alerts}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className={`text-xs ${textSecondary}`}>Sodio promedio</p>
                  <p className={`text-sm ${patient.sodiumAvg > 2300 ? 'text-red-500' : 'text-green-500'}`}>
                    {patient.sodiumAvg} mg
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${textSecondary}`}>Cumplimiento</p>
                  <p className={`text-sm ${patient.compliance >= 80 ? 'text-green-500' : 'text-yellow-500'}`}>
                    {patient.compliance}%
                  </p>
                </div>
                <div>
                  <p className={`text-xs ${textSecondary}`}>IMC</p>
                  <p className={`text-sm ${textColor}`}>{patient.bmi}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
