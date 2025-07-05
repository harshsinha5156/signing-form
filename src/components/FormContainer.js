// src/components/FormContainer.js
import React from 'react';
import FormProgress from './FormProgress';
import FormStep from './FormStep';
import DarkModeToggle from './DarkModeToggle';

const FormContainer = () => {
  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 sm:p-8 transition-colors duration-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Sign Up
        </h1>
        <FormProgress />
        <FormStep />
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default FormContainer;