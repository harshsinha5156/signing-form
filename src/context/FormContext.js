// src/context/FormContext.js
import { createContext, useState, useEffect, useCallback } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode !== null) return savedMode === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
    country: '',
    newsletter: false,
    languages: [],
    terms: false
  });

  // Apply dark mode to entire page
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Load saved form data
  useEffect(() => {
    const savedData = localStorage.getItem('signupFormData');
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (e) {
        console.error('Error parsing form data from localStorage', e);
      }
    }
  }, []);

  // Save form data to localStorage
  useEffect(() => {
    localStorage.setItem('signupFormData', JSON.stringify(formData));
  }, [formData]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prevMode => !prevMode);
  }, []);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && name === 'languages') {
      setFormData(prev => {
        const languages = [...prev.languages];
        if (checked) {
          languages.push(value);
        } else {
          const index = languages.indexOf(value);
          if (index > -1) languages.splice(index, 1);
        }
        return { ...prev, languages };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  return (
    <FormContext.Provider 
      value={{ 
        step, 
        setStep, 
        formData, 
        setFormData, 
        nextStep, 
        prevStep, 
        handleChange,
        darkMode,
        toggleDarkMode
      }}
    >
      {children}
    </FormContext.Provider>
  );
};