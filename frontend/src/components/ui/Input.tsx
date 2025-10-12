import React, { ChangeEvent, ReactNode, useState } from 'react';

export interface InputProps {
  id: string;
  name: string;
  type?: 'text' | 'password' | 'email' | 'number';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  icon?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  label,
  placeholder,
  icon,
  required = false,
  disabled = false,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <label
        htmlFor={id}
        className={`flex items-center gap-2 text-sm font-semibold mt-4 transition-colors duration-200 ${
          isFocused ? 'text-blue-600' : 'text-gray-700'
        } ${disabled ? 'opacity-50' : ''}`}
      >
        {icon && (
          <span className={`transition-all duration-200 ${
            isFocused ? 'text-blue-600 scale-110' : 'text-gray-500'
          }`}>
            {icon}
          </span>
        )}
        <span>{label} {required && <span className="text-red-500">*</span>}</span>
      </label>
      <div className="relative group">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          style={{ 
            borderRadius: '4px',
            padding: '10px',
            height: '40px' }}
          className={`
            w-full px-6 py-5
            border-2
            bg-white text-gray-900 text-lg
            placeholder-gray-400
            transition-all duration-200 ease-in-out
          `}
        />
      </div>
    </div>
  );
};

