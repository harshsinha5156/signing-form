import { useContext } from 'react';
import { FormContext } from '../context/FormContext';
import { validateEmail, validatePassword } from '../utils/validation';

const FormStep = () => {
  const { 
    step, 
    formData, 
    handleChange, 
    nextStep, 
    prevStep,
    darkMode,
    toggleDarkMode
  } = useContext(FormContext);

  const countries = [
    'India', 'United States', 'Canada', 'United Kingdom', 
    'Australia', 'Germany', 'France', 'Japan'
  ];

  const languages = [
    'Hindi', 'English', 'Spanish', 'French', 
    'German', 'Chinese', 'Japanese'
  ];

  const validateStep = () => {
    switch(step) {
      case 1:
        return (
          formData.fullName.trim() !== '' && 
          validateEmail(formData.email) && 
          validatePassword(formData.password)
        );
      case 2:
        return (
          formData.dob !== '' && 
          formData.gender !== '' && 
          formData.country !== ''
        );
      case 3:
        return formData.terms;
      default:
        return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Basic Information</h2>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="fullName">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
            {formData.email && !validateEmail(formData.email) && (
              <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
              Password (min 6 characters) *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
              minLength="6"
            />
            {formData.password && !validatePassword(formData.password) && (
              <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Profile Details</h2>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="dob">
              Date of Birth *
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Gender *
            </label>
            <div className="space-y-2">
              {['Male', 'Female', 'Other', 'Prefer not to say'].map(gender => (
                <label key={gender} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={handleChange}
                    className="text-blue-500"
                    required
                  />
                  <span className="text-gray-700 dark:text-gray-300">{gender}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="country">
              Country *
            </label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              required
            >
              <option value="">Select a country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Preferences</h2>
          <div className="flex items-center justify-between">
            <label className="text-gray-700 dark:text-gray-300" htmlFor="newsletter">
              Subscribe to newsletter
            </label>
            <div className="relative inline-block w-12 mr-2 align-middle select-none">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
              />
              <label
                htmlFor="newsletter"
                className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${formData.newsletter ? 'bg-blue-500' : 'bg-gray-300'}`}
              ></label>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Preferred Language(s)
            </label>
            <div className="space-y-2">
              {languages.map(lang => (
                <label key={lang} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="languages"
                    value={lang}
                    checked={formData.languages.includes(lang)}
                    onChange={handleChange}
                    className="text-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{lang}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="text-blue-500"
                required
              />
              <span className="text-gray-700 dark:text-gray-300">
                I agree to the Terms & Conditions *
              </span>
            </label>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Confirmation</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Your Information</h3>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Full Name:</span> {formData.fullName}
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span> {formData.email}
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Date of Birth:</span> {formData.dob}
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Gender:</span> {formData.gender}
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Country:</span> {formData.country}
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Newsletter Subscription:</span> {formData.newsletter ? 'Yes' : 'No'}
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Preferred Languages:</span> {formData.languages.join(', ') || 'None'}
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <p className="text-blue-800 dark:text-blue-200">
              Thank you for signing up! Your account has been created successfully.
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        {step > 1 && step < 4 && (
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors duration-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            Previous
          </button>
        )}
        {step < 3 && (
          <button
            type="submit"
            disabled={!validateStep()}
            className={`px-6 py-2 rounded-lg transition-colors duration-200 ml-auto ${validateStep() ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700'}`}
          >
            Next
          </button>
        )}
        {step === 3 && (
          <button
            type="submit"
            disabled={!validateStep()}
            className={`px-6 py-2 rounded-lg transition-colors duration-200 ml-auto ${validateStep() ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700'}`}
          >
            Submit
          </button>
        )}
        {step === 4 && (
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('signupFormData');
              window.location.reload();
            }}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
          >
            Start New Form
          </button>
        )}
      </div>
      
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors duration-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </form>
  );
};

export default FormStep;