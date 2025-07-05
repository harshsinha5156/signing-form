// src/components/FormProgress.js
import React, { useContext } from 'react';
import { FormContext } from '../context/FormContext';

const FormProgress = () => {
  const { step } = useContext(FormContext);
  const steps = ['Basic Info', 'Profile Details', 'Preferences', 'Confirmation'];

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between relative">
        {steps.map((label, index) => (
          <div key={label} className="flex flex-col items-center z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center 
              ${step > index + 1 ? 'bg-green-500 text-white' : 
                step === index + 1 ? 'bg-blue-500 text-white' : 
                'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
              {index + 1}
            </div>
            <span className={`text-sm mt-2 ${step >= index + 1 ? 'font-medium' : 'text-gray-500'}`}>
              {label}
            </span>
          </div>
        ))}
        <div className="absolute h-1 bg-gray-200 dark:bg-gray-700 top-5 left-0 right-0 -z-1">
          <div 
            className="h-1 bg-blue-500 transition-all duration-300" 
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FormProgress;