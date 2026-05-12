import React, { useState } from 'react';
import { User, Edit2, Save, LogOut, Weight, Ruler, Calendar, Activity } from 'lucide-react';

interface UserData {
  name: string;
  email: string;
  type: 'patient' | 'doctor' | null;
  weight?: number;
  height?: number;
  age?: number;
  gender?: string;
  sodiumLimit?: number;
}

interface ProfileViewProps {
  darkMode: boolean;
  userData: UserData;
  setUserData: (data: UserData) => void;
  onLogout: () => void;
}

export function ProfileView({ darkMode, userData, setUserData, onLogout }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
  };

  const calculateBMI = () => {
    if (formData.weight && formData.height) {
      const heightInMeters = formData.height / 100;
      return (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return null;
  };

  const bmi = calculateBMI();
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { text: 'Bajo peso', color: 'text-yellow-500' };
    if (bmi < 25) return { text: 'Normal', color: 'text-green-500' };
    if (bmi < 30) return { text: 'Sobrepeso', color: 'text-orange-500' };
    return { text: 'Obesidad', color: 'text-red-500' };
  };

  const cardBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const inputBg = darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300';

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className={`text-xl ${textColor}`}>Mi Perfil</h2>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-xl hover:from-cyan-500 hover:to-cyan-600 transition-all shadow-sm"
        >
          {isEditing ? (
            <>
              <Save size={18} />
              <span className="text-sm">Guardar</span>
            </>
          ) : (
            <>
              <Edit2 size={18} />
              <span className="text-sm">Editar</span>
            </>
          )}
        </button>
      </div>

      {/* Profile Card */}
      <div className={`${cardBg} rounded-2xl p-6 shadow-sm border`}>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full">
            <User className="text-white" size={36} />
          </div>
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
              />
            ) : (
              <h3 className={`text-xl ${textColor}`}>{userData.name}</h3>
            )}
            <p className={`text-sm ${textSecondary} mt-1`}>{userData.email}</p>
          </div>
        </div>

        {/* BMI Display */}
        {bmi && (
          <div className={`${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-cyan-50 to-blue-50'} rounded-xl p-4 mb-6 border ${darkMode ? 'border-gray-600' : 'border-cyan-200'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${textSecondary} mb-1`}>Índice de Masa Corporal (IMC)</p>
                <p className={`text-3xl ${textColor}`}>{bmi}</p>
                <p className={`text-sm ${getBMICategory(parseFloat(bmi)).color} mt-1`}>
                  {getBMICategory(parseFloat(bmi)).text}
                </p>
              </div>
              <Activity className={darkMode ? 'text-cyan-400' : 'text-cyan-500'} size={40} />
            </div>
          </div>
        )}
      </div>

      {/* Personal Information */}
      <div className={`${cardBg} rounded-2xl p-6 shadow-sm border`}>
        <h3 className={`text-lg mb-4 ${textColor}`}>Información Personal</h3>
        
        <div className="space-y-4">
          {/* Weight */}
          <div>
            <label className={`block text-sm mb-2 ${textSecondary} flex items-center gap-2`}>
              <Weight size={16} />
              Peso (kg)
            </label>
            {isEditing ? (
              <input
                type="number"
                value={formData.weight || ''}
                onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
              />
            ) : (
              <p className={`${textColor} px-4 py-3`}>{userData.weight || 'No especificado'} kg</p>
            )}
          </div>

          {/* Height */}
          <div>
            <label className={`block text-sm mb-2 ${textSecondary} flex items-center gap-2`}>
              <Ruler size={16} />
              Altura (cm)
            </label>
            {isEditing ? (
              <input
                type="number"
                value={formData.height || ''}
                onChange={(e) => setFormData({ ...formData, height: parseFloat(e.target.value) })}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
              />
            ) : (
              <p className={`${textColor} px-4 py-3`}>{userData.height || 'No especificado'} cm</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className={`block text-sm mb-2 ${textSecondary} flex items-center gap-2`}>
              <Calendar size={16} />
              Edad
            </label>
            {isEditing ? (
              <input
                type="number"
                value={formData.age || ''}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
              />
            ) : (
              <p className={`${textColor} px-4 py-3`}>{userData.age || 'No especificado'} años</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className={`block text-sm mb-2 ${textSecondary} flex items-center gap-2`}>
              <User size={16} />
              Sexo
            </label>
            {isEditing ? (
              <select
                value={formData.gender || ''}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
              >
                <option value="">Seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            ) : (
              <p className={`${textColor} px-4 py-3`}>{userData.gender || 'No especificado'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Health Goals */}
      <div className={`${cardBg} rounded-2xl p-6 shadow-sm border`}>
        <h3 className={`text-lg mb-4 ${textColor}`}>Objetivos de Salud</h3>
        
        <div>
          <label className={`block text-sm mb-2 ${textSecondary}`}>
            Límite diario de sodio (mg)
          </label>
          {isEditing ? (
            <input
              type="number"
              value={formData.sodiumLimit || ''}
              onChange={(e) => setFormData({ ...formData, sodiumLimit: parseInt(e.target.value) })}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
            />
          ) : (
            <p className={`${textColor} px-4 py-3`}>{userData.sodiumLimit || 2300} mg</p>
          )}
          <p className={`text-xs ${textSecondary} mt-2`}>
            Recomendado: 2300 mg/día para adultos sanos, 1500 mg/día para personas con hipertensión
          </p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className={`w-full py-4 ${darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'} border rounded-xl hover:bg-red-100 transition-all flex items-center justify-center gap-2 text-red-600`}
      >
        <LogOut size={20} />
        <span>Cerrar Sesión</span>
      </button>
    </div>
  );
}
