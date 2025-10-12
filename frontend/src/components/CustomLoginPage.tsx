import React, { useState } from 'react';
import { Login, useLogin, useNotify } from 'react-admin';
import { Eye, EyeOff, User, Lock, Loader2, AlertCircle } from 'lucide-react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login({ username, password });
      notify('¡Bienvenido!', { type: 'success' });
    } catch (err) {
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
      notify('Error de autenticación', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed inset-0 z-[9999] min-h-screen bg-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/cuajimalpa-login.webp)' }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40 z-[1]" />
      
      {/* Logo en esquina superior izquierda */}
      <div className="absolute top-5 left-5 sm:top-7 sm:left-10 z-[10000]">
        <img 
          src="/logo.png" 
          alt="Logo Alcaldía Cuajimalpa" 
          className="h-[60px] w-auto object-contain"
        />
      </div>
      
      {/* Login Card Container */}
      <div className="relative z-[2] flex items-center justify-center w-full h-full p-2 sm:p-4">
        <div className="w-[95%] sm:w-[400px] max-w-[400px] bg-white rounded-lg shadow-none">
          <div className="p-4 sm:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-4xl font-bold text-black mb-2">
                Alcaldía Cuajimalpa de Morelos
              </h1>
              <p className="text-sm sm:text-base text-black">
                Atención a Emergencias Urbanas
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <div className="relative">
                <label htmlFor="username" className="block text-sm font-medium text-black mb-1">
                  Usuario
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-black rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 hover:border-blue-600 transition-colors"
                    placeholder="Ingresa tu usuario"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative">
                <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-black rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 hover:border-blue-600 transition-colors"
                    placeholder="Ingresa tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3.5 px-7 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Cargando...</span>
                  </>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-sm text-black">
                © 2025 Alcaldía Cuajimalpa. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CustomLoginPage = () => (
  <Login>
    <LoginForm />
  </Login>
);
