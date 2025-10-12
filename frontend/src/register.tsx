import React, { useState, ChangeEvent } from 'react';
import { User, Lock, UserCircle, Shield, Loader2, AlertCircle, CheckCircle, UserPlus } from 'lucide-react';
import { AuthLayout, FormCard, Input, Select, Alert, Button } from './components/ui';

const Registrarse: React.FC = () => {
  const [datos, setDatos] = useState({ username: '', password: '', nombre: '', tipo: 'paramedico' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDatos({ ...datos, [event.target.name]: event.target.value });
  };

  const handleSendData = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    const request = new Request('http://127.0.0.1:3000/registrarse', {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    try {
      const res = await fetch(request);
      if (res.status < 200 || res.status >= 300) {
        throw new Error(res.statusText);
      }
      setSuccess(true);
      setDatos({ username: '', password: '', nombre: '', tipo: 'paramedico' });
    } catch {
      setError('No se pudo registrar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const userTypeOptions = [
    { value: 'paramedico', label: 'Paramédico' },
    { value: 'urbano', label: 'Respondiente de emergencias urbanas' },
    { value: 'jefe', label: 'Jefe de turno' },
    { value: 'admin', label: 'Administrador' },
  ];

  return (
    <AuthLayout>
      <FormCard
        title="Registro de Nuevos Usuarios"
        subtitle="Alcaldía Cuajimalpa de Morelos"
        className="w-full"
        maxWidth="md"
        footer={
          <p className="text-sm text-gray-600 text-center">
            © 2025 Alcaldía Cuajimalpa. Todos los derechos reservados.
          </p>
        }
      >
        {/* Hero Icon */}
        <div className="flex justify-center mb-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-lg opacity-50"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 rounded-full p-4 shadow-lg">
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 animate-in slide-in-from-top-2 duration-300">
            <Alert variant="error" icon={<AlertCircle className="w-5 h-5" />}>
              {error}
            </Alert>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="mb-6 animate-in slide-in-from-top-2 duration-300">
            <Alert variant="success" icon={<CheckCircle className="w-5 h-5" />}>
              Usuario registrado exitosamente
            </Alert>
          </div>
        )}

        {/* Form Fields Container */}
        <div className="space-y-5">
          {/* Username Field */}
          <div className="transform transition-all duration-200 hover:scale-[1.01]">
            <Input
              id="username"
              name="username"
              type="text"
              value={datos.username}
              onChange={handleChange}
              label="Usuario"
              placeholder="Ingresa el usuario"
              icon={<User className="w-5 h-5 text-gray-500" />}
              required
            />
          </div>

          {/* Password Field */}
          <div className="transform transition-all duration-200 hover:scale-[1.01]">
            <Input
              id="password"
              name="password"
              type="password"
              value={datos.password}
              onChange={handleChange}
              label="Contraseña"
              placeholder="Ingresa la contraseña"
              icon={<Lock className="w-5 h-5 text-gray-500" />}
              required
            />
          </div>

          {/* Nombre Completo Field */}
          <div className="transform transition-all duration-200 hover:scale-[1.01]">
            <Input
              id="nombre"
              name="nombre"
              type="text"
              value={datos.nombre}
              onChange={handleChange}
              label="Nombre Completo"
              placeholder="Ingresa el nombre completo"
              icon={<UserCircle className="w-5 h-5 text-gray-500" />}
              required
            />
          </div>

          {/* Tipo de Usuario Field */}
          <div className="transform transition-all duration-200 hover:scale-[1.01]">
            <Select
              id="tipo"
              name="tipo"
              value={datos.tipo}
              onChange={handleChange}
              label="Tipo de Usuario"
              options={userTypeOptions}
              icon={<Shield className="w-5 h-5 text-gray-500" />}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
        style={{
            width: '100%',
            marginTop: '18px',
            marginBottom: '18px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            padding: '10px',
        }}
          type="button"
          onClick={handleSendData}
          disabled={loading}
        //   className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creando Usuario...</span>
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              <span>Crear Usuario</span>
            </>
          )}
        </Button>
        {/* Helper Text */}
      </FormCard>
    </AuthLayout>
  );
};

export default Registrarse;