import { createContext, useState, useEffect, useCallback } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) return savedMode === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
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

  // Initialize dark mode on first render
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]); // Added darkMode as dependency

  // Load saved form data
  useEffect(() => {
    const savedData = localStorage.getItem('signupFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save form data to localStorage
  useEffect(() => {
    localStorage.setItem('signupFormData', JSON.stringify(formData));
  }, [formData]);

  // Memoize toggle function to prevent unnecessary recreations
  const toggleDarkMode = useCallback(() => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  }, [darkMode]);

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