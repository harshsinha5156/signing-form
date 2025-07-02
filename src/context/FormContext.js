import { createContext, useState, useEffect } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
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

 
  useEffect(() => {
    const savedData = localStorage.getItem('signupFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  
  useEffect(() => {
    localStorage.setItem('signupFormData', JSON.stringify(formData));
  }, [formData]);

  
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
          if (index > -1) {
            languages.splice(index, 1);
          }
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

  const toggleDarkMode = () => setDarkMode(!darkMode);

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