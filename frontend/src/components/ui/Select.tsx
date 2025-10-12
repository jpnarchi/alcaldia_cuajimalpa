import React, { ChangeEvent, ReactNode, useState } from 'react';
import { ChevronRight } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  options: SelectOption[];
  icon?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  id,
  name,
  value,
  onChange,
  label,
  options,
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
        className={`flex items-center gap-2 text-sm font-semibold mt-2 transition-colors duration-200 ${
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
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          disabled={disabled}
          style={{ 
            borderRadius: '4px',
            padding: '10px',
            height: '40px' }}
          className={`
            w-full px-6 py-5
            border-2
            bg-white text-gray-900 text-lg
            transition-all duration-200 ease-in-out
            appearance-none cursor-pointer`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}

        </select>
        <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 ${
          isFocused ? 'text-blue-600 rotate-180' : 'text-gray-400'
        }`}>

        </div>
      </div>
    </div>
  );
};

