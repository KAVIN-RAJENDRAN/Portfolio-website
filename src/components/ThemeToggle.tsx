import React from 'react';
import { useTheme } from './ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-8 rounded-full border-none cursor-pointer flex items-center p-1 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] select-none shadow-[inset_0_2px_5px_rgba(0,0,0,0.1),0_4px_10px_rgba(0,0,0,0.05)] ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-[#1E1E2F] to-[#12121F]'
          : 'bg-gradient-to-b from-[#4FB1E0] to-[#78C7EB]'
      }`}
      aria-label="Toggle Dark Mode"
    >
      {/* Sun/Moon Handle */}
      <div
        className={`w-6 h-6 rounded-full relative z-10 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_3px_8px_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden ${
          theme === 'dark'
            ? 'translate-x-8 bg-[#E0E0E0] shadow-[0_3px_8px_rgba(0,0,0,0.3),0_0_15px_rgba(255,255,255,0.1),inset_-3px_-3px_5px_rgba(0,0,0,0.2)]'
            : 'translate-x-0 bg-[#FFD54F] shadow-[0_3px_8px_rgba(245,124,0,0.3),0_0_15px_rgba(255,213,79,0.5),inset_0_-2px_5px_rgba(0,0,0,0.1)]'
        }`}
      >
        {/* Sun Glow */}
        {theme !== 'dark' && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4)_0%,transparent_70%)] opacity-100 transition-opacity duration-300" />
        )}
        
        {/* Moon Craters */}
        {theme === 'dark' && (
          <div className="absolute inset-0 opacity-100 transition-opacity duration-300">
            <div className="absolute top-[4px] left-[4px] w-[5px] h-[5px] bg-[rgba(0,0,0,0.15)] rounded-full" />
            <div className="absolute top-[12px] left-[13px] w-[4px] h-[4px] bg-[rgba(0,0,0,0.15)] rounded-full shadow-[6px_3px_0_-1px_rgba(0,0,0,0.15),-2px_5px_0_-1px_rgba(0,0,0,0.12)]" />
          </div>
        )}
      </div>

      {/* Cloud Elements for Light Mode */}
      <div
        className={`absolute top-[40%] right-3 w-4 h-1 bg-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[-6px_3px_0_-0.5px_#fff] ${
          theme === 'dark' ? 'translate-x-10 opacity-0' : 'translate-x-0 opacity-80'
        }`}
      />

      {/* Stars for Dark Mode */}
      <div
        className={`absolute top-1.5 left-3 w-0.5 h-0.5 bg-white rounded-full transition-all duration-500 shadow-[6px_8px_0_#fff,11px_12px_0_rgba(255,255,255,0.7),16px_4px_0_#fff,2px_14px_0_rgba(255,255,255,0.5)] ${
          theme === 'dark' ? 'translate-y-0 opacity-80' : '-translate-y-6 opacity-0'
        }`}
      />
    </button>
  );
};
