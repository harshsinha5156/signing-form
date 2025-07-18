// src/components/DarkModeToggle.js
import React, { useContext } from 'react';
import { FormContext } from '../context/FormContext';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(FormContext);

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-lg transition-colors duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white z-50"
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
    >
      {darkMode ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};

export default DarkModeToggle;