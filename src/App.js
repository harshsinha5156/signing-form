// src/App.js
import React from 'react';
import { FormProvider } from './context/FormContext';
import FormContainer from './components/FormContainer';

function App() {
  return (
    <FormProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <FormContainer />
      </div>
    </FormProvider>
  );
}

export default App;