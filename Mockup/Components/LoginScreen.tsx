import React, { useState } from 'react';
import { User, Stethoscope, Mail, Lock, Moon, Sun } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (type: 'patient' | 'doctor', email: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function LoginScreen({ onLogin, darkMode, onToggleDarkMode }: LoginScreenProps) {
  const [userType, setUserType] = useState<'patient' | 'doctor'>('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(userType, email);
    }
  };

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-white';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = darkMode ? 'text-white' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const inputBg = darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300';

  return (
    <div className={`min-h-screen ${bgColor} flex flex-col transition-colors`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-400 text-white px-6 py-12 rounded-b-3xl shadow-lg relative">
        <button
          onClick={onToggleDarkMode}
          className="absolute top-6 right-6 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="text-center mt-8">
          <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4 mx-auto backdrop-blur-sm">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h1 className="text-4xl mb-2">SaludLog</h1>
          <p className="text-lg opacity-90">Tu salud, tu control</p>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* User Type Selection */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              onClick={() => setUserType('patient')}
              className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                userType === 'patient'
                  ? 'border-cyan-500 bg-cyan-50 shadow-lg'
                  : darkMode 
                    ? 'border-gray-700 bg-gray-800' 
                    : 'border-gray-200 bg-white'
              }`}
            >
              <div className={`flex items-center justify-center w-14 h-14 rounded-full ${
                userType === 'patient'
                  ? 'bg-gradient-to-br from-cyan-400 to-cyan-500'
                  : darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <User className={userType === 'patient' ? 'text-white' : darkMode ? 'text-gray-400' : 'text-gray-500'} size={28} />
              </div>
              <div className="text-center">
                <p className={`${userType === 'patient' ? 'text-cyan-600' : textColor}`}>Paciente</p>
                <p className={`text-xs ${textSecondary} mt-1`}>Seguimiento personal</p>
              </div>
            </button>

            <button
              onClick={() => setUserType('doctor')}
              className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${
                userType === 'doctor'
                  ? 'border-cyan-500 bg-cyan-50 shadow-lg'
                  : darkMode 
                    ? 'border-gray-700 bg-gray-800' 
                    : 'border-gray-200 bg-white'
              }`}
            >
              <div className={`flex items-center justify-center w-14 h-14 rounded-full ${
                userType === 'doctor'
                  ? 'bg-gradient-to-br from-cyan-400 to-cyan-500'
                  : darkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <Stethoscope className={userType === 'doctor' ? 'text-white' : darkMode ? 'text-gray-400' : 'text-gray-500'} size={28} />
              </div>
              <div className="text-center">
                <p className={`${userType === 'doctor' ? 'text-cyan-600' : textColor}`}>Médico</p>
                <p className={`text-xs ${textSecondary} mt-1`}>Panel profesional</p>
              </div>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={`${cardBg} rounded-2xl p-6 shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
              <h2 className={`text-xl mb-6 ${textColor}`}>
                Iniciar Sesión
              </h2>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm mb-2 ${textSecondary}`}>
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Mail size={18} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={userType === 'doctor' ? 'doctor@hospital.com' : 'tu@email.com'}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm mb-2 ${textSecondary}`}>
                    Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <Lock size={18} className={darkMode ? 'text-gray-500' : 'text-gray-400'} />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 ${inputBg}`}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-xl hover:from-cyan-500 hover:to-cyan-600 transition-all shadow-md font-medium"
                >
                  Ingresar
                </button>
              </div>

              <div className="mt-4 text-center">
                <button type="button" className={`text-sm ${darkMode ? 'text-cyan-400' : 'text-cyan-600'} hover:underline`}>
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className={textSecondary}>
              ¿No tienes cuenta?{' '}
              <button className={`${darkMode ? 'text-cyan-400' : 'text-cyan-600'} hover:underline`}>
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-6 text-center">
        <p className={`text-xs ${textSecondary}`}>
          © 2026 SaludLog - Cuidando tu salud preventiva
        </p>
      </div>
    </div>
  );
}
