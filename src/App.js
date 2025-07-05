import { FormProvider } from './context/FormContext';
import FormProgress from './components/FormProgress';
import FormStep from './components/FormStep';

const App = () => {
  return (
    <FormProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-md mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 sm:p-8 transition-colors duration-300">
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
              Sign Up
            </h1>
            <FormProgress />
            <FormStep />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default App;