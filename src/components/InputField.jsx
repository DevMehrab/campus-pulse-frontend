import React from "react";

export default function InputField({
  icon: Icon,
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = true,
  children,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-1 tracking-wider"
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-indigo-400">
            <Icon className="h-5 w-5" />
          </div>
        )}
        {children ? (
          <select
            id={name}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            className="w-full p-3 pl-10 border border-gray-300 rounded-xl bg-gray-50 text-gray-800 transition duration-300 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
          >
            {children}
          </select>
        ) : (
          <input
            id={name}
            type={type}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full p-3 ${
              Icon ? "pl-10" : "pl-4"
            } border border-gray-300 rounded-xl bg-gray-50 text-gray-800 transition duration-300 ease-in-out focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-gray-400`}
          />
        )}
      </div>
    </div>
  );
}
