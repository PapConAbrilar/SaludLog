import React, { useState } from 'react';
import { defineProperties } from 'figma:react';
import { Home, Camera, BarChart3, Calculator, Plus, Check, Apple, Coffee, Sandwich, Moon, User, Sun } from 'lucide-react';
import { DailyTracker } from './components/DailyTracker';
import { StatsView } from './components/StatsView';
import { NutritionCalculator } from './components/NutritionCalculator';
import { PhotoGallery } from './components/PhotoGallery';
import { LoginScreen } from './components/LoginScreen';
import { ProfileView } from './components/ProfileView';
import { DoctorDashboard } from './components/DoctorDashboard';
import { SodiumTracker } from './components/SodiumTracker';

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

export default function Component() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    type: null,
    sodiumLimit: 2300
  });
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const handleLogin = (type: 'patient' | 'doctor', email: string) => {
    setUserData({
      name: type === 'doctor' ? 'Dr. Juan Rodríguez' : 'María González',
      email: email,
      type: type,
      weight: type === 'patient' ? 65 : undefined,
      height: type === 'patient' ? 165 : undefined,
      age: type === 'patient' ? 32 : 45,
      gender: type === 'patient' ? 'Femenino' : 'Masculino',
      sodiumLimit: 2300
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({
      name: '',
      email: '',
      type: null,
      sodiumLimit: 2300
    });
    setActiveTab('home');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />;
  }

  // Doctor Dashboard
  if (userData.type === 'doctor') {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors pb-20`}>
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-400 text-white px-6 py-8 rounded-b-3xl shadow-lg relative">
          <button
            onClick={toggleDarkMode}
            className="absolute top-6 right-6 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <h1 className="text-3xl mb-2">SaludLog</h1>
          <p className="opacity-90">Panel Médico</p>
        </div>

        {/* Main Content */}
        <div className="px-4 py-6">
          {activeTab === 'home' && <DoctorDashboard darkMode={darkMode} />}
          {activeTab === 'profile' && (
            <ProfileView 
              darkMode={darkMode} 
              userData={userData} 
              setUserData={setUserData}
              onLogout={handleLogout}
            />
          )}
        </div>

        {/* Bottom Navigation */}
        <div className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t px-4 py-3 shadow-lg transition-colors`}>
          <div className="flex justify-around items-center max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'home' 
                  ? 'text-cyan-500 bg-cyan-50' 
                  : darkMode ? 'text-gray-400' : 'text-gray-400'
              }`}
            >
              <Home size={24} />
              <span className="text-xs">Pacientes</span>
            </button>
            
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'profile' 
                  ? 'text-cyan-500 bg-cyan-50' 
                  : darkMode ? 'text-gray-400' : 'text-gray-400'
              }`}
            >
              <User size={24} />
              <span className="text-xs">Perfil</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Patient Dashboard
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors pb-20`}>
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-400 text-white px-6 py-8 rounded-b-3xl shadow-lg relative">
        <button
          onClick={toggleDarkMode}
          className="absolute top-6 right-6 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <h1 className="text-3xl mb-2">SaludLog</h1>
        <p className="opacity-90">Tu salud, tu control</p>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        {activeTab === 'home' && <HomeView darkMode={darkMode} userData={userData} />}
        {activeTab === 'stats' && <StatsView darkMode={darkMode} />}
        {activeTab === 'calculator' && <NutritionCalculator darkMode={darkMode} />}
        {activeTab === 'photos' && <PhotoGallery darkMode={darkMode} />}
        {activeTab === 'profile' && (
          <ProfileView 
            darkMode={darkMode} 
            userData={userData} 
            setUserData={setUserData}
            onLogout={handleLogout}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t px-4 py-3 shadow-lg transition-colors`}>
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'home' 
                ? 'text-cyan-500 bg-cyan-50' 
                : darkMode ? 'text-gray-400' : 'text-gray-400'
            }`}
          >
            <Home size={24} />
            <span className="text-xs">Inicio</span>
          </button>
          
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'stats' 
                ? 'text-cyan-500 bg-cyan-50' 
                : darkMode ? 'text-gray-400' : 'text-gray-400'
            }`}
          >
            <BarChart3 size={24} />
            <span className="text-xs">Progreso</span>
          </button>
          
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'calculator' 
                ? 'text-cyan-500 bg-cyan-50' 
                : darkMode ? 'text-gray-400' : 'text-gray-400'
            }`}
          >
            <Calculator size={24} />
            <span className="text-xs">Nutrición</span>
          </button>
          
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'photos' 
                ? 'text-cyan-500 bg-cyan-50' 
                : darkMode ? 'text-gray-400' : 'text-gray-400'
            }`}
          >
            <Camera size={24} />
            <span className="text-xs">Fotos</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'profile' 
                ? 'text-cyan-500 bg-cyan-50' 
                : darkMode ? 'text-gray-400' : 'text-gray-400'
            }`}
          >
            <User size={24} />
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
}

interface HomeViewProps {
  darkMode: boolean;
  userData: UserData;
}

function HomeView({ darkMode, userData }: HomeViewProps) {
  const today = new Date().toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const cardBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-100';
  const whiteBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className="space-y-6">
      {/* Date */}
      <div className="text-center">
        <p className={`text-sm capitalize ${textSecondary}`}>{today}</p>
      </div>

      {/* Progress Summary Card */}
      <div className={`${cardBg} rounded-2xl p-6 shadow-sm border`}>
        <h2 className={`text-lg mb-4 ${darkMode ? 'text-cyan-400' : 'text-cyan-900'}`}>Resumen del Día</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className={`${whiteBg} rounded-xl p-4 shadow-sm border`}>
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full mb-2 mx-auto">
              <Check className="text-white" size={24} />
            </div>
            <p className="text-2xl text-center text-cyan-600">3/4</p>
            <p className={`text-xs text-center ${textSecondary} mt-1`}>Comidas registradas</p>
          </div>
          
          <div className={`${whiteBg} rounded-xl p-4 shadow-sm border`}>
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full mb-2 mx-auto">
              <Apple className="text-white" size={24} />
            </div>
            <p className="text-2xl text-center text-blue-600">85%</p>
            <p className={`text-xs text-center ${textSecondary} mt-1`}>Meta nutricional</p>
          </div>
        </div>
      </div>

      {/* Sodium Tracker */}
      <SodiumTracker darkMode={darkMode} userData={userData} />

      {/* Daily Tracker */}
      <DailyTracker darkMode={darkMode} />

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl p-6 text-white shadow-md">
        <h3 className="text-lg mb-2">💡 Tip del día</h3>
        <p className="text-sm opacity-90">
          Mantener un registro fotográfico de tus comidas te ayuda a ser más consciente de tus elecciones alimentarias y facilita el seguimiento a largo plazo.
        </p>
      </div>
    </div>
  );
}